"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip } from "recharts";
import { PieChart, Pie, Cell } from "recharts";


interface Property {
    id: number;
    title: string;
    price: number;
    location: string;
    isForSale: boolean;
}

interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    image?: string;
    skillLevel: string;
}



export default function Dashboard() {
    const [users, setUsers] = useState<User[]>([]);
    const [properties, setProperties] = useState<Property[]>([]);

    const chartData = [
        { month: "Jan", value: 100 },
        { month: "Feb", value: 200 },
        { month: "Mar", value: 150 },
        { month: "Apr", value: 250 },
        { month: "May", value: 300 },
        { month: "Jun", value: 350 },
    ];

    const pieData = [
        { name: "For Sale", value: properties.filter((p) => p.isForSale).length, color: "#8884d8" },
        { name: "Not for Sale", value: properties.filter((p) => !p.isForSale).length, color: "#82ca9d" },
    ];

    useEffect(() => {
        fetch("/api/users")
            .then((res) => res.json())
            .then((data: User[]) => {
                console.log("Fetched Users:", data); // Debugging step
                setUsers(data);
            })
            .catch((err) => console.error("Error fetching users:", err));
    }, []);

    useEffect(() => {
        // Fetch users and properties from API
        fetch("/api/users").then((res) => res.json()).then(setUsers);
        fetch("/api/properties").then((res) => res.json()).then(setProperties);
    }, []);

    return (
        <div className="p-6 space-y-6">
            {/* Dashboard Stats */}
            <div className="grid grid-cols-4 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">{users.length}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Total Properties</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">{properties.length}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>For Sale</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">{properties.filter((p) => p.isForSale).length}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Saved Properties</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">{users.length * 2}</p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-2 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Visitor Growth</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <AreaChart width={400} height={250} data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <Tooltip />
                            <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
                        </AreaChart>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Property Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <PieChart width={400} height={250}>
                            <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value">
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                        </PieChart>
                    </CardContent>
                </Card>
            </div>

            {/* Property List */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Properties</CardTitle>
                </CardHeader>
                <CardContent>
                    <table className="min-w-full table-auto border border-gray-200">
                        <thead>
                            <tr className="">
                                <th className="border p-2">ID</th>
                                <th className="border p-2">Title</th>
                                <th className="border p-2">Price</th>
                                <th className="border p-2">Location</th>
                                <th className="border p-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {properties.slice(0, 5).map((property) => (
                                <tr key={property.id}>
                                    <td className="border p-2">{property.id}</td>
                                    <td className="border p-2">{property.title}</td>
                                    <td className="border p-2">${property.price}</td>
                                    <td className="border p-2">{property.location}</td>
                                    <td className="border p-2">{property.isForSale ? "For Sale" : "Sold"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardContent>
            </Card>
        </div>
    );
}
