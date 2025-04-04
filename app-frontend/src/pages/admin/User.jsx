import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import DashboardHeader from "@/components/admin/DashboardHeader";
import DashboardShell from "@/components/admin/DashboardShell";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function User() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    is_active: true,
  });

  useEffect(() => {
    fetch("http://localhost:5000/list_users")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }
        return res.json();
      })
      .then((data) => {
        const formatted = data.map((u) => ({
          id: u.id,
          name: u.name,
          email: u.email,
          joinDate: new Date(u["Joined At"]).toLocaleDateString(),
          status: u.Active,
        }));
        setUsers(formatted);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Something went wrong while fetching users.");
        setLoading(false);
      });
  }, []);

  const handleEditClick = (user) => {
    const [first_name = "", last_name = ""] = user.name.split(" ");
    setEditingUser(user);
    setFormData({
      first_name,
      last_name,
      email: user.email,
      is_active: user.status,
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmitEdit = () => {
    fetch(`http://localhost:5000/edit_user_admin/${editingUser.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update user");
        }
        return res.json();
      })
      .then((data) => {
        alert(data.message);
        // Update user list
        setUsers((prevUsers) =>
          prevUsers.map((u) =>
            u.id === editingUser.id
              ? {
                  ...u,
                  name: `${formData.first_name} ${formData.last_name}`,
                  email: formData.email,
                  status: formData.is_active,
                }
              : u
          )
        );
        setEditingUser(null);
      })
      .catch((err) => {
        console.error(err);
        alert("Error updating user", err);
      });
  };

  return (
    <>
      <Helmet>
        <title>Users | Admin Dashboard</title>
        <meta name="description" content="Manage therapists on the Eunoia platform" />
      </Helmet>

      <DashboardShell>
        <DashboardHeader heading="Users" text="Manage and monitor user accounts." />
        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p>Loading users...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.joinDate}</TableCell>
                        <TableCell>{user.status ? "Active" : "Inactive"}</TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            className="bg-blue-500 text-white hover:bg-blue-600"
                            onClick={() => handleEditClick(user)}
                          >
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {editingUser && (
                  <div className="mt-4 border p-4 rounded bg-gray-100">
                    <h2 className="text-lg font-semibold mb-2">Edit User</h2>
                    <div className="flex flex-col gap-2">
                      <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                        placeholder="First Name"
                      />
                      <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                        placeholder="Last Name"
                      />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                      />
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="is_active"
                          checked={formData.is_active}
                          onChange={handleInputChange}
                        />
                        Active
                      </label>
                      <div className="flex gap-2 mt-2">
                        <Button onClick={handleSubmitEdit}>Save</Button>
                        <Button
                          variant="outline"
                          onClick={() => setEditingUser(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </DashboardShell>
    </>
  );
}

export default User;
