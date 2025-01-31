<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
//กำหนดว่าสามารถสร้างอะไรได้บ้าง
class Order extends Model
{
    use HasFactory;
    //กำหนดฟีลที่สามารถกำหนดค่าได้
    protected $fillable = ['customer_id', 'order_date', 'total_amount', 'status'];

    public function customer() // สร้างฟังก์ชันเพื่อเชื่อมโยงกับ Customer
    {
        return $this->belongsTo(Customer::class);
    }

    public function orderDetails() // สร้างฟังก์ชันเพื่อเชื่อมโยงกับ OrderDetail
    {
        return $this->hasMany(OrderDetail::class);
    }

    // วิธีการใช้ with เพื่อดึงข้อมูล order_details พร้อมกับ product ที่เชื่อมโยงกับมัน
    public static function getOrderWithDetails()
    {
        return self::with(['orderDetails.product'])->get();
    }
}