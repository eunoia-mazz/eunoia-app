import React from "react";

const activities = [
  { id: 1, name: "Daily Meditation", engagement: 78, completionRate: 65 },
  { id: 2, name: "Gratitude Journal", engagement: 62, completionRate: 58 },
  { id: 3, name: "Breathing Exercises", engagement: 85, completionRate: 80 },
  { id: 4, name: "Mood Check-in", engagement: 92, completionRate: 88 },
  { id: 5, name: "Sleep Tracker", engagement: 70, completionRate: 62 },
];

export default function ActivityEngagement({ className }) {
  return (
    <div className={`card ${className || ""}`}>
      <div className="card-header flex flex-row items-center justify-between pb-2 ">
        <div>
          <h2 className="card-title font-bold text-lg">Activity Engagement</h2>
          <p className="card-description font-normal text-sm">
            User engagement with various activities
          </p>
        </div>
        {/* <button className="btn">Add Activity</button> */}
      </div>
      <div className="card-content">
        <table className="table">
          <thead>
            <tr>
              <th>Activity Name</th>
              <th>Engagement Rate (%)</th>
              <th>Completion Rate (%)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity.id}>
                <td>{activity.name}</td>
                <td>{activity.engagement}%</td>
                <td>{activity.completionRate}%</td>
                <td>
                  <button className="btn-outline btn-sm">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
