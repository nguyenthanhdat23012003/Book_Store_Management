<?php

namespace App\Http\Requests;

use Carbon\Carbon;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255'],
            'type' => ['required', Rule::in(['book', 'cd', 'dvd'])],
            'image' => ['required', 'image', 'max:1024'],
            'description' => ['required', 'string'],
            'price' => ['required', 'integer'],
            'in_stock' => ['required', 'integer'],
            'weight' => ['required', 'integer'],
            'genre' => ['nullable', 'array'],

            // // Book validation rules
            'book' => ['nullable', 'required_if:type,book', 'array'],
            'book.authors' => ['nullable', 'required_if:type,book', 'array'],
            'book.cover_type' => ['nullable', 'required_if:type,book', 'string', Rule::in(['hardcover', 'paperback'])],
            'book.publisher' => ['nullable', 'string'],
            'book.pages' => ['nullable', 'required_if:type,book', 'integer'],
            'book.language' => ['nullable', 'required_if:type,book', 'string'],
            'book.publication_date' => ['nullable', 'required_if:type,book', 'date_format:Y-m-d', 'before:today'],

            // // CD validation rules
            'cd' => ['nullable', 'required_if:type,cd', 'array'],
            'cd.collections' => ['nullable', 'required_if:type,cd',  'string'],
            'cd.albums' => ['nullable', 'array'],
            'cd.artists' => ['nullable', 'array'],
            'cd.record_label' => ['nullable', 'array'],
            'cd.track_list' => ['nullable', 'array'],
            'cd.videos' => ['nullable', 'array'],
            'cd.country' => ['nullable', 'string'],
            'cd.release_date' => ['nullable', 'required_if:type,cd', 'date_format:Y-m-d', 'before:today'],

            // // DVD validation rules
            'dvd' => ['nullable', 'required_if:type,dvd', 'array'],
            'dvd.disc_type' => ['nullable', 'required_if:type,dvd',  'string', Rule::in(['HD-DVD', 'Blu-ray'])],
            'dvd.director' => ['nullable', 'required_if:type,dvd',  'string'],
            'dvd.actors' => ['nullable', 'array'],
            'dvd.writer' => ['nullable', 'array'],
            'dvd.runtime' => ['nullable', 'integer'],
            'dvd.language' => ['nullable', 'string'],
            'dvd.country' => ['nullable', 'string'],
            'dvd.release_date' => ['nullable', 'required_if:type,dvd',  'date_format:Y-m-d', 'before:today'],
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'book.authors.required_if' => "Book's authors is required",
            'book.cover_type.required_if' => "Book's cover type is required",
            'book.publisher.required_if' => "Book's publisher is required",
            'book.pages.required_if' => "Book's pages is required",
            'book.pages.integer' => "Book's pages must be an integer",
            'book.language.required_if' => "Book's language is required",
            'book.publication_date.required_if' => "Book's publication date is required",
            'book.publication_date.before' => "Book's publication date must be before today",

            'cd.artists.required_if' => "CD's artists is required",
            'cd.artists.array' => "CD's artists must be an array of strings",
            'cd.albums.required_if' => "CD's albums is required",
            'cd.albums.array' => "CD's albums must be an array of strings",
            'cd.collections.required_if' => "CD's collections is required",
            'cd.record_label.required_if' => "CD's record label is required",
            'cd.record_label.string' => "CD's record label must be an array of object",
            'cd.track_list.required_if' => "CD's track list is required",
            'cd.track_list.array' => "CD's track list must be an array of strings",
            'cd.release_date.required_if' => "CD's release date is required",
            'cd.release_date.before' => "CD's release date must be before today",

            'dvd.director.required_if' => "DVD's director is required",
            'dvd.disc_type.required_if' => "DVD's disc type is required",
            'dvd.runtime.required_if' => "DVD's runtime is required",
            'dvd.runtime.integer' => "DVD's runtime must be an integer",
            'dvd.language.required_if' => "DVD's language is required",
            'dvd.release_date.required_if' => "DVD's release date is required",
            'dvd.release_date.before' => "DVD's release date must be before today",
        ];
    }
}
