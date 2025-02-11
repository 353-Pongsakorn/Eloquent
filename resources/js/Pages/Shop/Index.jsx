import React, { useState, useEffect } from "react";
import { Card, Typography, Button } from "@material-tailwind/react";
import { Inertia } from "@inertiajs/inertia";
import ApplicationLogo from "@/Components/ApplicationLogo";

export default function Index({ orders }) {
    const [sortedOrders, setSortedOrders] = useState(orders);
    const [showModal, setShowModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        console.log("อัพเดทข้อมูลออเดอร์:", sortedOrders);
    }, [sortedOrders]);

    const handleCreate = () => {
        Inertia.get(route("Shop.create"));
    };

    const handleEdit = (order) => {
        setSelectedOrder(order);
        setShowModal(true);
    };

    return (
        <div className="flex flex-col min-h-screen p-6 space-y-6 bg-[#FBE0C3] text-[#344648]">
            <div className="flex justify-center items-center mb-6">
                <ApplicationLogo className="w-20 h-20 text-[#344648]" />
            </div>

            <Typography variant="h5" className="font-bold text-center mb-6 text-[#7D8E95]">
                รายการสินค้าทั้งหมด
            </Typography>

            <div className="flex justify-between items-center mb-6">
                <Button className="bg-[#FFBB98] text-white px-4 py-2 rounded-lg" onClick={handleCreate}>
                    สร้างออเดอร์ใหม่
                </Button>
            </div>

            <Card className="w-full overflow-auto border-[#7D8E95] p-6 bg-white rounded-lg shadow-md">
                <table className="w-full min-w-max table-auto text-left rounded-lg overflow-hidden text-sm">
                    <thead>
                        <tr className="bg-[#344648] text-white">
                            <th className="p-3">หมายเลขออเดอร์</th>
                            <th className="p-3">วันที่</th>
                            <th className="p-3">สถานะ</th>
                            <th className="p-3">ลูกค้า</th>
                            <th className="p-3">อีเมล</th>
                            <th className="p-3">ยอดรวม</th>
                            <th className="p-3">การจัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedOrders.map((order) => (
                            <tr key={order.id} className="border-b border-[#7D8E95] hover:bg-[#FBE0C3]">
                                <td className="p-2">{order.id}</td>
                                <td className="p-2">{new Date(order.order_date).toLocaleDateString()}</td>
                                <td className="p-2 text-[#344648]">{order.status}</td>
                                <td className="p-2">{order.customer.name}</td>
                                <td className="p-2">{order.customer.email}</td>
                                <td className="p-2 font-semibold">${order.total_amount}</td>
                                <td className="p-2 flex space-x-2">
                                    <Button className="bg-[#7D8E95] text-white px-3 py-1 rounded-lg" onClick={() => handleEdit(order)}>
                                        แก้ไข
                                    </Button>
                                    <Button className="bg-[#FFBB98] text-white px-3 py-1 rounded-lg">
                                        ลบ
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
        </div>
    );
}
