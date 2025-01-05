import DashboardHeader from "@/components/admin/DashboardHeader";
import DashboardShell from "@/components/admin/DashboardShell";
import React from "react";
import { Helmet } from "react-helmet";

// function AdminDashboardHeader({ heading, text }) {
//   return (
//     <header className="dashboard-header">
//       <div>
//         <h1>{heading}</h1>
//         <p>{text}</p>
//       </div>
//     </header>
//   );
// }

// function AdminDashboardShell({ children }) {
//   return <div className="admin-dashboard-shell">{children}</div>;
// }

function User() {
  const users = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      joinDate: "2023-01-15",
      status: "Active",
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com",
      joinDate: "2023-02-20",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Charlie Brown",
      email: "charlie@example.com",
      joinDate: "2023-03-10",
      status: "Active",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Users | Admin Dashboard</title>
        <meta
          name="description"
          content="Manage therapists on the MindfulMe platform"
        />
      </Helmet>
      <DashboardShell>
        <DashboardHeader
          heading="Users"
          text="Manage and monitor user accounts."
        />
        <div className="card">
          <div className="card-header">
            <h2>User List</h2>
          </div>
          <div className="card-content">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Join Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.joinDate}</td>
                    <td>{user.status}</td>
                    <td>
                      <button className="btn-outline-sm">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </DashboardShell>
    </>
  );
}

export default User;
