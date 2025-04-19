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
    DropdownTrigger,
    Button,
} from "@heroui/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

// Define the User type
type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    skillLevel: string;
    role: string;
};

export default function UserTable() {
    const [users, setUsers] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const { data: session } = useSession();
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
            const response = await fetch(`/api/user/delete`, { 
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId: id }),
            });
            const data = await response.json();

            if (response.ok) {
                toast.success(data.message || "User deleted successfully");
                fetchUsers(currentPage, search); // Refresh users
            } else {
                toast.error(data.error || "Failed to delete user");
            }
        } catch (error) {
            toast.error("Failed to delete user");
        }
    };

    // Handle promoting user to admin
    const handlePromoteToAdmin = async (id: string) => {
        try {
            const response = await fetch(`/api/user/promote`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId: id }),
            });
            const data = await response.json();

            if (response.ok) {
                toast.success(data.message || "User promoted to admin");
                fetchUsers(currentPage, search); // Refresh users
            } else {
                toast.error(data.error || "Failed to promote user");
            }
        } catch (error) {
            toast.error("Failed to promote user");
        }
    };

    // Handle demoting admin to regular user
    const handleDemoteToUser = async (id: string) => {
        try {
            const response = await fetch(`/api/user/demote`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId: id }),
            });
            const data = await response.json();

            if (response.ok) {
                toast.success(data.message || "Admin demoted to regular user");
                fetchUsers(currentPage, search); // Refresh users
            } else {
                toast.error(data.error || "Failed to demote admin");
            }
        } catch (error) {
            toast.error("Failed to demote admin");
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
            case "role":
                return user.role || "user";
            case "actions":
                return (
                    <Dropdown>
                        <DropdownTrigger>
                            <Button>Actions</Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Actions">
                            <DropdownItem
                                key="dashboard"
                                onClick={() => router.push(`/dashboard/${user.id}`)}
                            >
                                View Dashboard
                            </DropdownItem>
                            {user.role !== "admin" ? (
                                <DropdownItem 
                                    key="promote" 
                                    onClick={() => handlePromoteToAdmin(user.id)}
                                >
                                    Promote to Admin
                                </DropdownItem>
                            ) : null}
                            {user.role === "admin" && user.id !== session?.user?.id ? (
                                <DropdownItem 
                                    key="demote" 
                                    onClick={() => handleDemoteToUser(user.id)}
                                >
                                    Demote to User
                                </DropdownItem>
                            ) : null}
                            <DropdownItem 
                                key="delete" 
                                onClick={() => handleDelete(user.id)}
                                className="text-red-500"
                            >
                                Delete User
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                );
            default:
                return (user as any)[columnKey];
        }
    };

    return (
        <div className="p-4">
            {/* Search Input */}
            <Input
                placeholder="Search by name"
                value={search}
                onValueChange={(value) => setSearch(value)}
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
                        <TableColumn>ROLE</TableColumn>
                        <TableColumn>ACTIONS</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                {["id", "name", "email", "skillLevel", "role", "actions"].map((columnKey) => (
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
