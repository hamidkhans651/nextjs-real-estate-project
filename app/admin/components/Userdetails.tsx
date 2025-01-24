"use client";

import React, { useState, useEffect } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Pagination,
    Dropdown,
    DropdownMenu,
    DropdownItem,
} from "@heroui/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// Define the User type
type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    skillLevel: string;
};

export default function UserTable() {
    const [users, setUsers] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    // Fetch users with pagination and search
    const fetchUsers = async (page = 1, search = "") => {
        setLoading(true);
        try {
            const response = await fetch(`/api/users?page=${page}&search=${search}`);
            const data = await response.json();
            setUsers(data.users);
            setTotalPages(data.totalPages);
            setCurrentPage(data.currentPage);
        } catch (error) {
            toast.error("Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers(currentPage, search);
    }, [currentPage, search]);

    // Handle user deletion
    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`/api/users?id=${id}`, { method: "DELETE" });
            const data = await response.json();

            if (response.ok) {
                toast.success(data.message);
                fetchUsers(currentPage, search); // Refresh users
            } else {
                toast.error(data.error || "Failed to delete user");
            }
        } catch (error) {
            toast.error("Failed to delete user");
        }
    };

    // Render cells in the table
    const renderCell = (user: User, columnKey: string) => {
        switch (columnKey) {
            case "name":
                return `${user.firstName} ${user.lastName}`;
            case "email":
                return user.email;
            case "skillLevel":
                return user.skillLevel;
            case "actions":
                return (
                    <Dropdown>
                        {[ // Wrap in an array
                            <DropdownMenu aria-label="Actions" key="menu">
                                <DropdownItem
                                    key="dashboard"
                                    onClick={() => router.push(`/dashboard/${user.id}`)}
                                >
                                    Give Dashboard Access
                                </DropdownItem>
                                <DropdownItem key="delete" onClick={() => handleDelete(user.id)}>
                                    Delete User
                                </DropdownItem>
                            </DropdownMenu>,
                        ]}
                    </Dropdown>

                );
            default:
                return (user as any)[columnKey]; // Use `as any` for dynamic keys
        }
    };

    return (
        <div className="p-4">
            {/* Search Input */}
            <Input
                placeholder="Search by name"
                value={search}
                onValueChange={(value) => setSearch(value)} // Directly use the value
                isClearable
                className="mb-4"
            />


            {/* Show loading as overlay */}
            {loading && <div className="text-center py-4">Loading...</div>}

            {/* User Table */}
            {!loading && (
                <Table aria-label="User Table">
                    <TableHeader>
                        <TableColumn>ID</TableColumn>
                        <TableColumn>NAME</TableColumn>
                        <TableColumn>EMAIL</TableColumn>
                        <TableColumn>SKILL LEVEL</TableColumn>
                        <TableColumn>ACTIONS</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                {["id", "name", "email", "skillLevel", "actions"].map((columnKey) => (
                                    <TableCell key={columnKey}>
                                        {renderCell(user, columnKey)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}

            {/* Pagination */}
            <Pagination
                page={currentPage}
                total={totalPages}
                onChange={(page) => setCurrentPage(page)}
            />
        </div>
    );
}
