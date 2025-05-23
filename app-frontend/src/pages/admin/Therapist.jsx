import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import DashboardHeader from "@/components/admin/DashboardHeader";
import DashboardShell from "@/components/admin/DashboardShell";

export function Therapist() {
  const [therapists, setTherapists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    designation: "",
    qualification: "",
    location: "",
    is_available: true,
  });
  const [patientsList, setPatientsList] = useState(null);

  const fetchTherapists = () => {
    fetch("http://localhost:5000/list_therapists")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTherapists(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching therapists:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTherapists();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    const method = formData.id ? "PUT" : "POST";
    const endpoint = formData.id
      ? `http://localhost:5000/edit_therapist/${formData.id}`
      : "http://localhost:5000/create_therapist";

    fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message || "Therapist saved!");
        setShowForm(false);
        setFormData({
          id: null,
          name: "",
          designation: "",
          qualification: "",
          location: "",
          is_available: true,
        });
        fetchTherapists();
      })
      .catch((err) => {
        console.error("Error saving therapist:", err);
      });
  };

  return (
    <>
      <Helmet>
        <title>Therapists | Admin Dashboard</title>
        <meta
          name="description"
          content="Manage therapists on the Eunoia platform"
        />
      </Helmet>
      <DashboardShell>
        <DashboardHeader
          heading="Therapists"
          text="Manage and monitor therapist accounts."
        ></DashboardHeader>
        <Card>
          <CardHeader>
            <CardTitle>Therapist List</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p>Loading therapists...</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Designation</TableHead>
                    <TableHead>Qualification</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Available</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {therapists.map((t) => (
                    <TableRow key={t.id}>
                      <TableCell>{t.name}</TableCell>
                      <TableCell>{t.designation}</TableCell>
                      <TableCell>{t.qualification || "-"}</TableCell>
                      <TableCell>{t.location || "-"}</TableCell>
                      <TableCell>{t.is_available ? "Yes" : "No"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {showForm && (
          <Card className="mt-4 p-4 bg-gray-100">
            <CardTitle>
              {formData.id ? "Edit Therapist" : "Add Therapist"}
            </CardTitle>
            <CardContent className="flex flex-col gap-3 mt-2">
              <input
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
              />
              <input
                name="designation"
                placeholder="Designation"
                value={formData.designation}
                onChange={handleInputChange}
              />
              <input
                name="qualification"
                placeholder="Qualification"
                value={formData.qualification}
                onChange={handleInputChange}
              />
              <input
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleInputChange}
              />
              <label>
                <input
                  type="checkbox"
                  name="is_available"
                  checked={formData.is_available}
                  onChange={handleInputChange}
                />{" "}
                Available
              </label>
              <div className="flex gap-2">
                <Button onClick={handleSubmit}>Submit</Button>
                <Button variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {patientsList && (
          <Card className="mt-4 p-4 bg-yellow-50">
            <CardTitle>Patients List</CardTitle>
            <CardContent>
              <h4 className="mt-2 font-semibold">Patients in Queue:</h4>
              <ul>
                {patientsList.patients_in_queue.map((p) => (
                  <li key={p.id}>
                    {p.name} ({p.email})
                  </li>
                ))}
              </ul>
              <h4 className="mt-4 font-semibold">Patients Treated:</h4>
              <ul>
                {patientsList.patients_treated.map((p) => (
                  <li key={p.id}>
                    {p.name} ({p.email})
                  </li>
                ))}
              </ul>
              <Button className="mt-3" onClick={() => setPatientsList(null)}>
                Close
              </Button>
            </CardContent>
          </Card>
        )}
      </DashboardShell>
    </>
  );
}
