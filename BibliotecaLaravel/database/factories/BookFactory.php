<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Book>
 */
class BookFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    private static int $counter = 1;
    public function definition(): array
    {
        return [
            'name' => 'Libro '.self::$counter++,
            'author' => fake()->name(),
            'category_id' => Category::inRandomOrder()->first()->id,
        ];
    }
}
