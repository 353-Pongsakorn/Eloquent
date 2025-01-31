<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Booking;
use App\Models\Customer;
use App\Models\Room;

class BookingFactory extends Factory {
    protected $model = Booking::class;

    public function definition() {
        $check_in = $this->faker->dateTimeBetween('-1 month', '+1 month');
        $check_out = (clone $check_in)->modify('+'.rand(1, 5).' days');

        return [
            'customer_id' => Customer::factory(),
            'room_id' => Room::factory(),
            'check_in_date' => $check_in,
            'check_out_date' => $check_out,
            'total_price' => $this->faker->randomFloat(2, 1000, 20000)
        ];
    }
}
