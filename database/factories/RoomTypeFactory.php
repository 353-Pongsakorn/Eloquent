<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\RoomType;

class RoomTypeFactory extends Factory {
    protected $model = RoomType::class;

    public function definition() {
        return [
            'name' => $this->faker->word(),
            'price' => $this->faker->randomFloat(2, 500, 5000)
        ];
    }
}
