import React, { useState, useEffect } from "react";
import axios from "axios";
import john from "../../assets/Images/john.jpeg";

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
  const [therapists, setTherapists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTopTherapists = async () => {
    try {
      const response = await axios.get("http://localhost:5000/list_therapists");
      if (response.status === 200) {
        setTherapists(response.data.slice(0, 3));
      }
    } catch (err) {
      setError("Failed to fetch therapist data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopTherapists();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

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
              <Avatar
                src={`https://api.dicebear.com/6.x/initials/svg?seed=${therapist.name}`}
              ></Avatar>
              <div className="space-y-3">
                <p className="font-medium">{therapist.name}</p>
                <p className="text-xs text-gray-500 font-normal">
                  {therapist.designation}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">
                {therapist.patients_treated} patients
              </span>
              {/* <Button
                size="sm"
                className="bg-blue-500 text-white px-3 py-2 rounded-md"
              >
                View
              </Button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TherapistOverview;
