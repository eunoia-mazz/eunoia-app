import React from "react";
import john from "../../assets/Images/john.jpeg";
// Simple Avatar component using fallback for user's initials
function Avatar({ children, src }) {
  return (
    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-300">
      {src ? (
        <img src={src} alt={children} className="object-cover w-full h-full" />
      ) : (
        <div className="flex items-center justify-center text-white">
          {children}
        </div>
      )}
    </div>
  );
}

const therapists = [
  {
    id: 1,
    name: "Dr. Emily Johnson",
    specialization: "Anxiety & Depression",
    patients: 28,
  },
  { id: 2, name: "Dr. Michael Lee", specialization: "PTSD", patients: 22 },
  {
    id: 3,
    name: "Dr. Sarah Williams",
    specialization: "Relationship Counseling",
    patients: 25,
  },
];

function Button({ children, variant = "solid", size = "md", ...props }) {
  const baseStyle = "rounded px-4 py-2 transition duration-200";
  const styles = {
    solid: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
  };

  return (
    <button
      className={`${baseStyle} ${styles[variant]} ${
        size === "sm" ? "text-sm" : "text-md"
      }`}
      {...props}
    >
      {children}
    </button>
  );
}

function TherapistOverview({ className }) {
  return (
    <div className={`p-4 bg-white shadow rounded-lg ${className}`}>
      <div className="flex items-center justify-between pb-4 space-y-0">
        <div className="space-y-1">
          <h2 className="text-xl font-bold">Therapist Overview</h2>
          <p className="text-sm text-gray-500">Manage and monitor therapists</p>
        </div>
      </div>
      <div className="space-y-4">
        {therapists.map((therapist) => (
          <div
            key={therapist.id}
            className="flex items-center justify-between space-x-4"
          >
            <div className="flex items-center space-x-4">
              <Avatar src={john}></Avatar>
              <div className="space-y-3">
                <p className="font-medium">{therapist.name}</p>
                <p className="text-xs text-gray-500 font-normal">
                  {therapist.specialization}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">
                {therapist.patients} patients
              </span>
              <Button
                size="sm"
                className="bg-blue-500 text-white px-3 py-2 rounded-md"
              >
                View
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TherapistOverview;
