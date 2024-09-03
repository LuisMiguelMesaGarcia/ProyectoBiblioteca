<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Http\Requests\StoreBookRequest;
use App\Http\Requests\UpdateBookRequest;
use Illuminate\Http\Request;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Book::with('category')->latest()->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|max:255',
            'author'=>'required|max:255',
        ]);

        $book = Book::create($fields);
        return ['book'=>$book, 'category'=>$book->category];
    }

    /**
     * Display the specified resource.
     */
    public function show(Book $book)
    {
        return ['book'=>$book, 'category'=>$book->category];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Book $book)
    {
        $fields = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|max:255',
            'author'=>'required|max:255',
        ]);

        $book->update($fields);
        return ['book'=>$book, 'category'=>$book->category];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Book $book)
    {
        $book->delete();
        return response()->json(null,204);
    }
}
