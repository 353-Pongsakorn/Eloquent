<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCustomerHotelsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('customer_hotels', function (Blueprint $table) {
            $table->id();
            $table->string('name');  // Customer name
            $table->string('email')->unique();  // Customer email (unique)
            $table->string('phone');  // Customer phone number
            $table->timestamps();  // created_at and updated_at
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('customer_hotels');
    }
}
