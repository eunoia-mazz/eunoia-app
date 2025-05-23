import React, { useState, useEffect } from "react";
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
import ModuleUsage from "@/components/admin/ModuleUsage";
import DashboardShell from "@/components/admin/DashboardShell";
import DashboardHeader from "@/components/admin/DashboardHeader";
import axios from "axios";

export default function Modules() {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editModule, setEditModule] = useState(null);

  const fetchVisitStats = async () => {
    try {
      const response = await axios.get("http://localhost:5000/get_visit_stats");
      if (response.status === 200) {
        setModules(response.data);
      }
    } catch (err) {
      setError("Failed to fetch module visit data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisitStats();
  }, []);

  if (loading) {
    return <div className="text-center py-6">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-6 text-red-500">{error}</div>;
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "http://localhost:5000/update_visit_stats",
        {
          module_name: editModule.module_name,
          visit_count: editModule.visit_count,
          last_visited_at: editModule.last_visited_at,
        }
      );
      if (response.status === 200) {
        setModules(
          modules.map((module) =>
            module.module_name === editModule.module_name ? editModule : module
          )
        );
        setEditModule(null);
      }
    } catch (err) {
      setError("Failed to update module.");
    }
  };

  const handleDelete = async (module_name) => {
    try {
      const response = await axios.delete(
        "http://localhost:5000/delete_visit_stats",
        {
          data: { module_name },
        }
      );
      if (response.status === 200) {
        setModules(
          modules.filter((module) => module.module_name !== module_name)
        );
      }
    } catch (err) {
      setError("Failed to delete module.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Modules | Admin Dashboard</title>
        <meta
          name="description"
          content="Manage modules and features on the Eunoia platform"
        />
      </Helmet>
      <DashboardShell>
        <DashboardHeader
          heading="Modules"
          text="Manage and monitor platform modules."
        >
          {/* <Button>Add New Module</Button> */}
        </DashboardHeader>
        <div className="grid gap-6">
          <ModuleUsage />
          {/*<Card>
             <CardHeader>
              <CardTitle>Module List</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Module Name</TableHead>
                    <TableHead>Visit Count</TableHead>
                    <TableHead>Last Visited</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {modules.map((module) => (
                    <TableRow key={module.module_name}>
                      <TableCell>{module.module_name}</TableCell>
                      <TableCell>{module.visit_count}</TableCell>
                      <TableCell>{module.last_visited_at}</TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          className="bg-blue-500 mx-1 text-white hover:bg-blue-600"
                          onClick={() => setEditModule(module)} // Open the edit form
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          className="bg-red-500 mx-1 text-white hover:bg-red-600"
                          onClick={() => handleDelete(module.module_name)} // Delete the module
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table> 
            </CardContent>
          </Card>*/}
        </div>

        {/* Edit Modal */}
        {editModule && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-md shadow-lg">
              <h2 className="text-2xl mb-4">
                Edit Module: {editModule.module_name}
              </h2>
              <form onSubmit={handleEditSubmit}>
                <div className="mb-4">
                  <label className="block mb-2">Visit Count</label>
                  <input
                    type="number"
                    value={editModule.visit_count}
                    onChange={(e) =>
                      setEditModule({
                        ...editModule,
                        visit_count: e.target.value,
                      })
                    }
                    className="w-full border rounded-md px-3 py-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Last Visited</label>
                  <input
                    type="datetime-local"
                    value={editModule.last_visited_at}
                    onChange={(e) =>
                      setEditModule({
                        ...editModule,
                        last_visited_at: e.target.value,
                      })
                    }
                    className="w-full border rounded-md px-3 py-2"
                  />
                </div>
                <Button type="submit" className="bg-blue-500 text-white">
                  Save Changes
                </Button>
                <Button
                  type="button"
                  className="bg-gray-500 text-white ml-4"
                  onClick={() => setEditModule(null)}
                >
                  Cancel
                </Button>
              </form>
            </div>
          </div>
        )}
      </DashboardShell>
    </>
  );
}
