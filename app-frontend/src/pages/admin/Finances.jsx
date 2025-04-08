import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import DashboardHeader from "@/components/admin/DashboardHeader";
import DashboardShell from "@/components/admin/DashboardShell";
import axios from "axios"; 

export default function Finances() {
  const [finances, setFinances] = useState(null); 
  const [coupons, setCoupons] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [partnerName, setPartnerName] = useState(""); 
  const [numCoupons, setNumCoupons] = useState(0); 
  const [validUntil, setValidUntil] = useState(""); 
  const [couponId, setCouponId] = useState(""); 
  const [addCoupons, setAddCoupons] = useState(0);
  const [addAmount, setAddAmount] = useState(0); 

  const fetchFinances = async () => {
    try {
      const response = await axios.get("http://localhost:5000/get_finances");
      if (response.status === 200) {
        setFinances(response.data.finances_available); 
        setCoupons(response.data.coupons); 
      }
    } catch (err) {
      setError("Failed to fetch finance data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFinances(); 
  }, []);

  if (loading) {
    return (
      <DashboardShell>
        <DashboardHeader heading="Finances" text="Manage and monitor financial data.">
          <Button className="bg-blue-500 text-white hover:bg-blue-600">
            Add Finance
          </Button>
        </DashboardHeader>
        <div className="text-center py-6">
          <p>Loading...</p>
        </div>
      </DashboardShell>
    );
  }

  if (error) {
    return (
      <DashboardShell>
        <DashboardHeader heading="Finances" text="Manage and monitor financial data.">
          <Button className="bg-blue-500 text-white hover:bg-blue-600">
            Add Finance
          </Button>
        </DashboardHeader>
        <div className="text-center py-6">
          <p className="text-red-500">{error}</p>
        </div>
      </DashboardShell>
    );
  }

  const handleEnlistCoupon = async () => {
    try {
      const response = await axios.post("http://localhost:5000/enlist_coupon", {
        partner_name: partnerName,
        num_coupons: numCoupons,
        valid_until: validUntil,
      });
      if (response.status === 201) {
        setCoupons([...coupons, response.data]); 
        alert("Coupon enlisted successfully!");
      }
    } catch (err) {
      setError("Failed to enlist coupon.");
    }
  };

  const handleAddCoupons = async () => {
    try {
      const response = await axios.post("http://localhost:5000/add_coupons", {
        coupon_id: couponId,
        num_coupons: addCoupons,
      });
      if (response.status === 201) {
        alert(`Successfully added ${addCoupons} coupons to coupon ID ${couponId}`);
        fetchFinances();       }
    } catch (err) {
      setError("Failed to add coupons.");
    }
  };

  const handleAddFinances = async () => {
    try {
      const response = await axios.post("http://localhost:5000/add_finances", {
        money: addAmount,
      });
      if (response.status === 201) {
        setFinances(response.data.current_finances); 
        alert(`Successfully added $${addAmount} to finances.`);
      }
    } catch (err) {
      setError("Failed to add finances.");
    }
  };

  return (
    <div>
      <Helmet>
        <title>Finances | Admin Dashboard</title>
        <meta name="description" content="Manage and monitor financial data." />
      </Helmet>
      <DashboardShell>
        <DashboardHeader heading="Finances" text="Manage and monitor financial data.">
          <Button onClick={() => {}} className="bg-blue-500 text-white hover:bg-blue-600">
            Add Finance
          </Button>
        </DashboardHeader>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Financial Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Finances Available: <strong>${finances}</strong>
              </p>

              <div className="mt-4">
                <input
                  type="number"
                  value={addAmount}
                  onChange={(e) => setAddAmount(e.target.value)}
                  className="border px-3 py-2 rounded-md w-full"
                  placeholder="Amount to add to finances"
                />
                <Button onClick={handleAddFinances} className="mt-2 bg-green-500 text-white hover:bg-green-600">
                  Add to Finances
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Coupons</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Partner Name</TableHead>
                    <TableHead>Total Coupons</TableHead>
                    <TableHead>Coupons Allotted</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {coupons.map((coupon) => (
                    <TableRow key={coupon.partner_name}>
                      <TableCell>{coupon.partner_name}</TableCell>
                      <TableCell>{coupon.total_coupons}</TableCell>
                      <TableCell>{coupon.coupons_allotted}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="mt-4">
                <input
                  type="number"
                  placeholder="Coupon ID"
                  value={couponId}
                  onChange={(e) => setCouponId(e.target.value)}
                  className="border px-3 py-2 rounded-md w-full"
                />
                <input
                  type="number"
                  placeholder="Number of Coupons to Add"
                  value={addCoupons}
                  onChange={(e) => setAddCoupons(e.target.value)}
                  className="border px-3 py-2 rounded-md w-full mt-2"
                />
                <Button onClick={handleAddCoupons} className="mt-2 bg-blue-500 text-white hover:bg-blue-600">
                  Add Coupons
                </Button>
              </div>

              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Partner Name"
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                  className="border px-3 py-2 rounded-md w-full"
                />
                <input
                  type="number"
                  placeholder="Number of Coupons"
                  value={numCoupons}
                  onChange={(e) => setNumCoupons(e.target.value)}
                  className="border px-3 py-2 rounded-md w-full mt-2"
                />
                <input
                  type="date"
                  value={validUntil}
                  onChange={(e) => setValidUntil(e.target.value)}
                  className="border px-3 py-2 rounded-md w-full mt-2"
                />
                <Button onClick={handleEnlistCoupon} className="mt-2 bg-green-500 text-white hover:bg-green-600">
                  Enlist Coupon
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardShell>
    </div>
  );
}
