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
            'nombres' => fake()->regexify('[A-Za-z0-9]{255}'),
            'apellidos' => fake()->regexify('[A-Za-z0-9]{255}'),
            'ci' => fake()->regexify('[A-Za-z0-9]{9}'),
            'correo' => fake()->regexify('[A-Za-z0-9]{255}'),
            'telefono' => fake()->numberBetween(-10000, 10000),
            'direccion' => fake()->regexify('[A-Za-z0-9]{255}'),
            'fecha_nacimiento' => fake()->date(),
            'rol' => fake()->randomElement(["estudiante","profesor","administrador","contable","tutor"]),
        ];
    }
}
