<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Loan;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Auth;

class LoanController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum',except:['index','show','stats'])
        ];
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        return Loan::with(['book', 'user'])
                ->where('user_id', $user->id) 
                ->latest()
                ->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            // 'user_id' => 'required|exists:users,id',
            'book_id' => 'required|exists:books,id',
            'loanDate'=>'required|date',
            'returnDate'=>'nullable|date'
        ]);

        $res = $request->user()->loans()->create($fields);
        return response()->json($res,201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Loan $loan)
    {
        return response()->json($loan, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Loan $loan)
    {
        //Checka los ids en el policy y da autorizacion
        Gate::authorize('modify', $loan);

        $fields = $request->validate([
            // 'user_id' => 'required|exists:users,id',
            'book_id' => 'required|exists:books,id',
            'loanDate'=>'required|date',
            'returnDate'=>'nullable|date'
        ]);

        $loan->update($fields);
        return response()->json($loan,200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Loan $loan)
    {
        //Checka los ids en el policy y da autorizacion
        Gate::authorize('modify', $loan);
        
        $loan->delete();
        return response()->json(null,204);
    }

    public function stats(){
        $popularBooks = Book::withCount('loans')
                        ->orderBy('loans_count', 'desc')
                        ->take(5)
                        ->get();

        $activeUsers = User::withCount('loans')
                       ->orderBy('loans_count', 'desc')
                       ->take(5)
                       ->get();

        return response()->json([
            'popularBooks'=>$popularBooks,
            'activeUsers'=>$activeUsers
        ],200);
    }
}
