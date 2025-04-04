import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import DashboardShell from "@/components/admin/DashboardShell";
import DashboardHeader from "@/components/admin/DashboardHeader";
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

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    description: "",
    reps: "",
    duration: "",
    category: "",
    difficulty_level: "easy",
  });

  const fetchActivities = () => {
    fetch("http://localhost:5000/list_exercises")
      .then(res => res.json())
      .then(data => {
        setActivities(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching activities:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = (activity) => {
    setFormData(activity);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    fetch("http://localhost:5000/delete_exercise", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ exercise_id: id }),
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        fetchActivities();
      })
      .catch(err => {
        console.error("Error deleting activity:", err);
      });
  };

  const handleSubmit = () => {
    const isEdit = !!formData.id;
    const endpoint = isEdit
      ? `http://localhost:5000/edit_exercise/${formData.id}`
      : "http://localhost:5000/add_exercise";
    const method = isEdit ? "PUT" : "POST";

    fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message || "Saved successfully!");
        setShowForm(false);
        setFormData({
          id: null,
          name: "",
          description: "",
          reps: "",
          duration: "",
          category: "",
          difficulty_level: "easy",
        });
        fetchActivities();
      })
      .catch(err => {
        console.error("Error saving activity:", err);
      });
  };

  return (
    <>
      <Helmet>
        <title>Activities | Admin Dashboard</title>
        <meta name="description" content="Manage activities on the Eunoia platform" />
      </Helmet>
      <DashboardShell>
        <DashboardHeader
          heading="Activities"
          text="Manage and create activities for users."
        >
          <Button
            size="sm"
            className="bg-blue-500 text-white hover:bg-blue-600"
            onClick={() => {
              setShowForm(true);
              setFormData({
                id: null,
                name: "",
                description: "",
                reps: "",
                duration: "",
                category: "",
                difficulty_level: "easy",
              });
            }}
          >
            Add Activity
          </Button>
        </DashboardHeader>
        <Card>
          <CardHeader>
            <CardTitle>Activity List</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p>Loading activities...</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Difficulty</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activities.map((activity) => (
                    <TableRow key={activity.id}>
                      <TableCell>{activity.name}</TableCell>
                      <TableCell>{activity.category}</TableCell>
                      <TableCell>{activity.duration} min</TableCell>
                      <TableCell>{activity.difficulty_level}</TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          onClick={() => handleEdit(activity)}
                          className="bg-blue-500 mx-1 text-white hover:bg-blue-600"
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleDelete(activity.id)}
                          className="bg-red-500 mx-1 text-white hover:bg-red-600"
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {showForm && (
          <Card className="mt-6 p-6 bg-gray-50 border rounded-lg shadow">
            <CardTitle className="text-lg mb-4">
              {formData.id ? "Edit Activity" : "Add New Activity"}
            </CardTitle>
            <CardContent className="grid grid-cols-2 gap-4">
              <input
                className="p-2 border rounded"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
              />
              <input
                className="p-2 border rounded"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleInputChange}
              />
              <input
                className="p-2 border rounded"
                name="reps"
                placeholder="Repetitions"
                type="number"
                value={formData.reps}
                onChange={handleInputChange}
              />
              <input
                className="p-2 border rounded"
                name="duration"
                placeholder="Duration (min)"
                type="number"
                value={formData.duration}
                onChange={handleInputChange}
              />
              <input
                className="p-2 border rounded"
                name="category"
                placeholder="Category"
                value={formData.category}
                onChange={handleInputChange}
              />
              <select
                className="p-2 border rounded"
                name="difficulty_level"
                value={formData.difficulty_level}
                onChange={handleInputChange}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
              <div className="col-span-2 flex gap-3 mt-4">
                <Button onClick={handleSubmit} className="bg-green-600 text-white hover:bg-green-700">
                  {formData.id ? "Update" : "Submit"}
                </Button>
                <Button variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </DashboardShell>
    </>
  );
}
