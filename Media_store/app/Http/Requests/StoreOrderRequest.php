<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
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
        return [
            'name' => ['required', 'string'],
            'email' => ['required', 'email:rfc,dns'],
            'phone' => ['required', 'string', 'regex:/(0)[0-9]{9}/'],
            'province' => ['required', 'string'],
            'address' => ['required', 'string'],
            'delivery_type' => ['required', 'string', 'in:rush,normal'],
            'shipping_fee' => ['required', 'integer'],
            'free_ship_discount' => ['required', 'integer'],
            'total_price' => ['required', 'integer'],
            'payment_method' => ['required', 'string', 'in:cod,vnpay'],
        ];
    }
}
