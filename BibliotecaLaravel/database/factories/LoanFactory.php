<?php

namespace Database\Factories;

use App\Models\Book;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Loan>
 */
class LoanFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::inRandomOrder()->first()->id, // Selecciona un usuario aleatorio
            'book_id' => Book::inRandomOrder()->first()->id, // Selecciona un libro aleatorio
            'loanDate' => $this->faker->dateTimeBetween('-1 month', 'now'), // Fecha de préstamo en el último mes
            'returnDate' => $this->faker->optional()->dateTimeBetween('now', '+1 month'),
        ];
    }
}
