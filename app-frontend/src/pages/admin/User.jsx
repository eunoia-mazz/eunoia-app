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
import axios from "axios";

function User() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [availableBadges, setAvailableBadges] = useState([]);
  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [selectedBadge, setSelectedBadge] = useState("");
  const [selectedCoupon, setSelectedCoupon] = useState("");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    is_active: true,
    badge_id: "",
    coupon_id: ""
  });

  const fetchBadgesAndCoupons = async () => {
    try {
      const [badgesRes, couponsRes] = await Promise.all([
        axios.get("http://localhost:5000/list_badges"),
        axios.get("http://localhost:5000/get_finances")
      ]);
      setAvailableBadges(badgesRes.data);
      setAvailableCoupons(couponsRes.data.coupons);
    } catch (err) {
      console.error("Failed to fetch badges or coupons:", err);
    }
  };

  useEffect(() => {
    fetchBadgesAndCoupons();
  }, []);

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
          coupons: u.Coupons,
          joinDate: new Date(u["Joined At"]).toLocaleDateString(),
          status: u.Active === "yes",
          badges: u.badges || []
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
      badge_id: "",
      coupon_id: ""
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmitEdit = async () => {
    try {
      // Update user details
      const updateResponse = await fetch(`http://localhost:5000/edit_user_admin/${editingUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          is_active: formData.is_active,
        }),
      });

      if (!updateResponse.ok) {
        throw new Error("Failed to update user");
      }

      // Allot badge if selected
      if (formData.badge_id) {
        const badgeResponse = await axios.post("http://localhost:5000/alot_badge", {
          user_id: editingUser.id,
          badge_id: parseInt(formData.badge_id)
        });
        if (badgeResponse.status !== 201) {
          throw new Error("Failed to allot badge");
        }
      }

      // Allot coupon if selected
      if (formData.coupon_id) {
        const couponResponse = await axios.post("http://localhost:5000/alot_coupons", {
          user_id: editingUser.id,
          coupon_id: parseInt(formData.coupon_id)
        });
        if (couponResponse.status !== 201) {
          throw new Error("Failed to allot coupon");
        }
      }

      alert("User updated successfully");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Error updating user: " + err.message);
    }
  };

  const handleAllotBadge = async (userId) => {
    try {
      if (!selectedBadge) {
        alert("Please select a badge to allot");
        return;
      }
      const response = await axios.post("http://localhost:5000/alot_badge", {
        user_id: userId,
        badge_id: parseInt(selectedBadge)
      });
      if (response.status === 201) {
        alert("Badge allotted successfully!");
        // Refresh user list to show new badge
        window.location.reload();
      }
    } catch (err) {
      alert(err.response?.data?.error || "Failed to allot badge");
    }
  };

  const handleAllotCoupon = async (userId) => {
    try {
      if (!selectedCoupon) {
        alert("Please select a coupon to allot");
        return;
      }
      const response = await axios.post("http://localhost:5000/alot_coupons", {
        user_id: userId,
        coupon_id: parseInt(selectedCoupon)
      });
      if (response.status === 201) {
        alert("Coupon allotted successfully!");
        // Refresh user list to show updated coupon count
        window.location.reload();
      }
    } catch (err) {
      alert(err.response?.data?.error || "Failed to allot coupon");
    }
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
                      <TableHead>Treated</TableHead>
                      <TableHead>Coupons</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Badges</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.treated}</TableCell>
                        <TableCell>{user.coupons}</TableCell>
                        <TableCell>{user.joinDate}</TableCell>
                        <TableCell>{user.status ? "Active" : "Inactive"}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {user.badges.map((badge, index) => (
                              <span key={index} className="text-sm text-gray-600">
                                {index > 0 ? ", " : ""}{badge}
                              </span>
                            ))}
                          </div>
                        </TableCell>
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
                        className="p-2 border rounded"
                      />
                      <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                        placeholder="Last Name"
                        className="p-2 border rounded"
                      />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        className="p-2 border rounded"
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
                      <select
                        name="badge_id"
                        value={formData.badge_id}
                        onChange={handleInputChange}
                        className="p-2 border rounded"
                      >
                        <option value="">Select Badge to Allot</option>
                        {availableBadges.map((badge) => (
                          <option key={badge.id} value={badge.id}>
                            {badge.name}
                          </option>
                        ))}
                      </select>
                      <select
                        name="coupon_id"
                        value={formData.coupon_id}
                        onChange={handleInputChange}
                        className="p-2 border rounded"
                      >
                        <option value="">Select Coupon to Allot</option>
                        {availableCoupons.map((coupon) => (
                          <option key={coupon.id} value={coupon.id}>
                            {coupon.partner_name} ({coupon.total_coupons} available)
                          </option>
                        ))}
                      </select>
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
