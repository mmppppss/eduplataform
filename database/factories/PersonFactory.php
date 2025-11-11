<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Person;

class PersonFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Person::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'name' => fake()->regexify('[A-Za-z0-9]{255}'),
            'last_name' => fake()->regexify('[A-Za-z0-9]{255}'),
            'ci' => fake()->regexify('[A-Za-z0-9]{9}'),
            'phone' => fake()->numberBetween(-10000, 10000),
            'address' => fake()->regexify('[A-Za-z0-9]{255}'),
            'birth_date' => fake()->date(),
            'role' => fake()->randomElement(["estudiante","profesor","administrador","contable","tutor"]),
        ];
    }
}
