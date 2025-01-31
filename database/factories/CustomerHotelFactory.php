<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\CustomerHotel;

class CustomerHotelFactory extends Factory {
    protected $model = CustomerHotel::class;

    public function definition() {
        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'phone' => $this->faker->phoneNumber()
        ];
    }
}
