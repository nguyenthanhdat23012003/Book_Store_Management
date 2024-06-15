<?php

namespace App\Http\Requests;

use App\Rules\ValidPriceChange;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $productID = $this->route('product');
        return [
            'name' => ['required', 'string', 'max:255'],
            'type' => ['required', Rule::in(['book', 'cd', 'dvd'])],
            'image' => ['nullable', 'image', 'max:1024'],
            'description' => ['required', 'string'],
            'price' => ['required', 'integer', new ValidPriceChange($productID)],
            'in_stock' => ['required', 'integer'],
            'genre' => ['required', 'array'],
        ];
    }
}
