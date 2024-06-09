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
use App\Repositories\Product\ProductEloquentRepository;
use Illuminate\Pagination\LengthAwarePaginator;

class ProductController extends Controller
{

    protected $productRepository;

    public function __construct(ProductEloquentRepository $productRepo)
    {
        $this->productRepository = $productRepo;
    }

    /**
     * Display a listing of the resource.
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
     * @var \App\Http\Requests\StoreProductRequest $request
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

        return to_route('products.manage')->with('success', 'Product created successfully.');
    }

    /**
     * Display the specified resource.
     * @var string $id
     */
    public function show(string $id)
    {
        $product = Product::findOrfail($id)->with(['book', 'cd', 'dvd']);

        switch ($product->type) {
            case 'book':
                return Inertia::render('Products/Show', [
                    'product' => new BookResource($product),
                ]);
                break;
            case 'cd':
                return Inertia::render('Products/Show', [
                    'product' => new CDResource($product),
                ]);
                break;
            case 'dvd':
                return Inertia::render('Products/Show', [
                    'product' => new DVDResource($product),
                ]);
                break;
        }
    }

    /**
     * Show the form for editing the specified resource.
     * @var string $id
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
     * @var \App\Http\Requests\UpdateProductRequest $request
     */
    public function update(UpdateProductRequest $request, string $id)
    {
        $product = Product::findOrFail($id);

        if (auth()->user()->cannot('update', $product)) {
            return back()->with('fail', 'You are not authorized to edit a product.');
        }

        $data = $request->validated();

        if ($request->hasFile('image')) {
            Storage::disk('public')->delete($product->image_path);
            $data['image_path'] = $data['image']->store($data['type'] . 's/', 'public');
        }

        unset($data['image']);
        $data['price'] = $data['price'] * 1000;
        $data['updated_at'] = now();

        $product->update($data);

        return to_route('products.manage')->with('success', 'Product updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     * @var string $id
     */
    public function destroy(string $id)
    {
        $product = Product::findOrfail($id);

        if (auth()->user()->cannot('delete', $product)) {
            return back()->with('fail', 'You are not authorized to delete a product.');
        };

        $product->delete();

        return to_route('products.manage')->with('success', 'Product deleted successfully.');
    }

    /**
     * Display a listing of the resource. (For admin and manager only)
     * 
     * @var \Illuminate\Pagination\LengthAwarePaginator $products 
     */
    public function manage()
    {
        return $this->productRepository->manageProducts();
    }
}
