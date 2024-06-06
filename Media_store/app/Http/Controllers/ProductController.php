<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Http\Request;
use function Pest\Laravel\json;
use App\Http\Resources\CDResource;
use App\Http\Resources\DVDResource;
use App\Http\Resources\BookResource;
use Illuminate\Pagination\Paginator;
use App\Http\Resources\ProductResource;

use Illuminate\Support\Facades\Storage;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Pagination\LengthAwarePaginator;

class ProductController extends Controller
{

    /**
     * Display a listing of the resource.
     * 
     * @var \Illuminate\Pagination\LengthAwarePaginator $products 
     */
    public function index()
    {
        $products = Product::where('in_stock', '>', '0')->paginate(12);

        $transformedProducts = ProductResource::collection($products);

        $paginatedProducts = new LengthAwarePaginator(
            $transformedProducts,
            $products->total(),
            $products->perPage(),
            $products->currentPage(),
            ['path' => Paginator::resolveCurrentPath()]
        );

        return Inertia::render('Products/Index', [
            'products' => $paginatedProducts,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // check policy
        if (auth()->user()->cannot('create', Product::class)) {
            return back()->with('fail', 'You are not authorized to create a product.');
        };
        return Inertia::render('Products/Create', [
            'alert' => session('success') ?? session('fail'),
            'success' => session('success') ? true : false
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        if (auth()->user()->cannot('create', Product::class)) {
            return to_route('products.manage')->with('fail', 'You are not authorized to create a product.');
        };

        $data = $request->validated();
        $data['image_path'] = $data['image']->store($data['type'] . 's/', 'public');

        // dd($data);
        $product = Product::create([
            'name' => $data['name'],
            'type' => $data['type'],
            'image_path' => $data['image_path'],
            'description' => $data['description'],
            'price' => $data['price'] * 1000,
            'in_stock' => $data['in_stock'],
            'weight' => $data['weight'],
            'genre' => $data['genre'],
        ]);
        switch ($data['type']) {
            case 'book':
                $data['book']['authors'] = json_encode($data['book']['authors']);
                $product->book()->create($data['book']);
                break;
            case 'cd':
                $data['cd']['artists'] = json_encode($data['cd']['artists']);
                $data['cd']['albums'] = json_encode($data['cd']['albums']);
                $data['cd']['track_list'] = json_encode($data['cd']['track_list']);
                $data['cd']['record_label'] = json_encode($data['cd']['record_label']);
                $product->cd()->create($data['cd']);
                break;
            case 'dvd':
                $product->dvd()->create($data['dvd']);
                break;
        }
        // record action
        $product->productActions()->create([
            'action' => 'created',
            'done_at' => now(),
            'user_id' => auth()->id(),
            'details' => json_encode($product->toArray())
        ]);

        return to_route('products.manage')->with('success', 'Product created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $product = Product::findOrfail($id)->with(['book', 'cd', 'dvd']);

        //     switch ($product->type) {
        //         case 'book':
        //             return new BookResource($product->book);
        //         case 'cd':
        //             return new CDResource($product->cd);
        //         case 'dvd':
        //             return new DVDResource($product->dvd);
        //         default:
        //             return $product;
        //     }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $product = Product::findOrfail($id);
        if (auth()->user()->cannot('update', $product)) {
            return back()->with('fail', 'You are not authorized to edit a product.');
        };
        return Inertia::render('Products/Edit', [
            'product' => new ProductResource($product),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, string $id)
    {
        $product = Product::findOrfail($id);
        if (auth()->user()->cannot('update', $product)) {
            return back()->with('fail', 'You are not authorized to edit a product.');
        };

        $oldProduct = $product->getOriginal();

        $data = $request->validated();
        if ($request->hasFile('image')) {
            Storage::disk('public')->delete($product->image_path);
            $data['image_path'] = $data['image']->store($data['type'] . 's/', 'public');
        }
        unset($data['image']);
        $data['price'] = $data['price'] * 1000;
        $data['updated_at'] = now();
        $product->update($data);

        $newProduct = $product->getAttributes();
        $changes = $this->getChanges($oldProduct, $newProduct);
        // record action
        $product->productActions()->create([
            'action' => 'updated',
            'done_at' => now(),
            'user_id' => auth()->id(),
            'details' => json_encode($changes)
        ]);

        return to_route('products.manage')->with('success', 'Product updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $product = Product::findOrfail($id);

        if (auth()->user()->cannot('delete', $product)) {
            return back()->with('fail', 'You are not authorized to delete a product.');
        };

        // record action
        $product->productActions()->create([
            'action' => 'deleted',
            'done_at' => now(),
            'user_id' => auth()->id(),
            'details' => json_encode($product->toArray())
        ]);

        // $product->productActions()->detach();

        $product->delete();

        return to_route('products.manage')->with('success', 'Product deleted successfully.');
    }

    /**
     * Add product to cart
     */
    public function addToCart(Request $request, Product $product)
    {
        $cart = $request->user()->cart;

        if ($cart) {
            $res = $cart->addProduct($product->id, 1);
        } else {
            $cart = $request->user()->cart()->create();
            $res = $cart->addProduct($product->id, 1);
        }
        return response()->json($res);
    }

    /**
     * Remove product from cart
     */
    public function removeFromCart(Request $request, Product $product)
    {
        $cart = $request->user()->cart;
        $cart->removeProduct($product->id);
        return to_route('cart.index');
    }

    /**
     * Change quantity of product in cart
     */
    public function changeQuantity(Request $request, Product $product)
    {
        $cart = $request->user()->cart;
        $res = $cart->changeQuantity($product->id, $request->quantity);
        return response()->json($res ? 'success' : 'fail');
    }

    /**
     * Display a listing of the resource. (For admin and manager only)
     * 
     * @var \Illuminate\Pagination\LengthAwarePaginator $products 
     */
    public function manage()
    {
        $query = Product::query();

        $sortField = request('sort_field', 'id');
        $sortDirection = request('sort_dir', 'asc');

        if (request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        } else if (request('type')) {
            request('type') === 'all' ? '' : $query->where('type', request('type'));
        }

        $products = $query->orderBy($sortField, $sortDirection)->paginate(10);

        $transformedProducts = ProductResource::collection($products);

        $paginatedProducts = new LengthAwarePaginator(
            $transformedProducts,
            $products->total(),
            $products->perPage(),
            $products->currentPage(),
            ['path' => Paginator::resolveCurrentPath()]
        );
        return Inertia::render('Products/Manage', [
            'products' => $paginatedProducts,
            'queryParams' => request()->query() ?: null,
            'alert' => session('success') ?? session('fail'),
            'success' => session('success') ? true : false
        ]);
    }

    /**
     * Get changes between two arrays
     * 
     * @param array $old
     * @param array $new
     * 
     * @return array
     */
    private function getChanges($oldValues, $newValues)
    {
        $changes = [];
        foreach ($newValues as $key => $value) {
            if (array_key_exists($key, $oldValues) && $oldValues[$key] !== $value) {
                $changes[$key] = [
                    'old' => $oldValues[$key],
                    'new' => $value,
                ];
            }
        }
        return $changes;
    }
}
