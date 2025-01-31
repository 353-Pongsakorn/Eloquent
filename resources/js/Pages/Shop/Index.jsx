import React, { useState } from "react";
import { Card } from "@material-tailwind/react";
import ApplicationLogo from "@/Components/ApplicationLogo";

export default function Index({ orders }) {
    const [sortedOrders, setSortedOrders] = useState(orders);
    const [searchQuery, setSearchQuery] = useState("");

    const sortByPrice = () => {
        const sorted = [...sortedOrders].sort((a, b) => a.total_amount - b.total_amount);
        setSortedOrders(sorted);
    };

    const sortByDate = () => {
        const sorted = [...sortedOrders].sort((a, b) => new Date(a.order_date) - new Date(b.order_date));
        setSortedOrders(sorted);
    };

    const handleSortChange = (e) => {
        const value = e.target.value;
        if (value === "price") sortByPrice();
        else if (value === "date") sortByDate();
    };

    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const filteredOrders = orders.filter(order =>
            order.customer.name.toLowerCase().includes(query)
        );
        setSortedOrders(filteredOrders);
    };

    return (
        <div className="p-10 bg-gradient-to-r from-[#FBE0C3] to-[#FFBB98] min-h-screen font-['Semi-SL']">
            <div className="flex justify-center items-center mb-8">
                <ApplicationLogo className="w-28 h-28 text-[#344648]" />
            </div>
            <h3 className="text-4xl font-extrabold text-center mb-10 text-[#344648]">Order Details</h3>
            
            <Card className="w-full p-6 bg-white rounded-lg shadow-xl border border-[#7D8E95]">
                <div className="flex justify-between mb-6">
                    <input
                        type="text"
                        placeholder="Search by customer name"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="px-4 py-2 text-[#344648] bg-white border border-[#7D8E95] rounded-lg shadow-sm focus:ring-2 focus:ring-[#344648]"
                    />
                    <select
                        onChange={handleSortChange}
                        className="px-4 py-2 text-[#344648] bg-white border border-[#7D8E95] rounded-lg shadow-sm focus:ring-2 focus:ring-[#344648]"
                    >
                        <option value="">Sort Orders By</option>
                        <option value="price">Price</option>
                        <option value="date">Date</option>
                    </select>
                </div>
                
                <table className="w-full border-collapse text-sm">
                    <thead>
                        <tr className="bg-[#344648] text-white text-left">
                            <th className="p-4">Order #</th>
                            <th className="p-4">Date</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Customer</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Address</th>
                            <th className="p-4">Total Amount</th>
                            <th className="p-4">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedOrders.map((order, index) => {
                            const orderProductQuantities = {};
                            order.order_details.forEach((detail) => {
                                if (orderProductQuantities[detail.product.name]) {
                                    orderProductQuantities[detail.product.name] += detail.quantity;
                                } else {
                                    orderProductQuantities[detail.product.name] = detail.quantity;
                                }
                            });
                            return (
                                <tr
                                    key={order.id}
                                    className={`border-b border-[#7D8E95] ${index % 2 === 0 ? 'bg-[#FBE0C3]' : 'bg-white'} hover:bg-[#FFBB98] transition duration-200`}
                                >
                                    <td className="p-4 font-medium text-[#344648]">{order.id}</td>
                                    <td className="p-4">{new Date(order.order_date).toLocaleString()}</td>
                                    <td className="p-4">
                                        <span className="px-2 py-1 rounded-full text-sm font-semibold text-white bg-[#344648]">
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="p-4">{order.customer.name}</td>
                                    <td className="p-4">{order.customer.email}</td>
                                    <td className="p-4">{order.customer.address}</td>
                                    <td className="p-4 font-semibold text-[#344648]">${order.total_amount}</td>
                                    <td className="p-4">
                                        <ul className="list-disc ml-4 text-[#344648]">
                                            {Object.entries(orderProductQuantities).map(([productName, quantity]) => (
                                                <li key={productName} className="font-semibold">
                                                    {productName}: {quantity} pcs
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </Card>
        </div>
    );
}
