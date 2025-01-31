<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Room;
use App\Models\RoomType;

class RoomFactory extends Factory {
    protected $model = Room::class;

    public function definition() {
        return [
            'room_type_id' => RoomType::factory(),
            'room_number' => $this->faker->unique()->numberBetween(100, 999),
            'status' => 'available'
        ];
    }
}
