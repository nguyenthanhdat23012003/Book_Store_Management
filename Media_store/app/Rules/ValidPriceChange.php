<?php

namespace App\Rules;

use Closure;
use App\Models\Product;
use Illuminate\Contracts\Validation\ValidationRule;

class ValidPriceChange implements ValidationRule
{
    protected $productId;

    public function __construct($productId)
    {
        $this->productId = $productId;
    }

    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $product = Product::find($this->productId);

        if (!$product) {
            $fail('The product does not exist.');
            return;
        }

        $minPrice = (int) $product->price * 0.3;
        $maxPrice = (int) $product->price * 1.5;

        if ($value * 1000 < $minPrice || $value * 1000 > $maxPrice) {
            $fail("The {$attribute} must be between 30% and 150% of the previous price.");
        }
    }
}
