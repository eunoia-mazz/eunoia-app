import React, { useEffect, useState } from "react";
import TherapistCard from "../../../components/molecules/TherapistCard.jsx";
import { Helmet } from "react-helmet";
import therapist from "../../../assets/Images/therapist.png";
import therapistW from "../../../assets/Images/therapistW.png";
import axios from "axios";

export default function Therapists() {
  const [therapists, setTherapists] = useState([]);
  const fetchTherapists = () => {
    axios
      .get("http://localhost:5000/list_therapists")
      .then((res) => {
        setTherapists(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchTherapists();
  }, []);
  return (
    <>
      <Helmet>
        <title>Therapists | Eunoia</title>
        <meta
          name="description"
          content="Manage therapists on the Eunoia platform"
        />
      </Helmet>
      <div className="p-6 md:p-12 flex flex-col lg:flex-row gap-8 lg:gap-16">
        <div className="w-full">
          <div className="mt-4">
            {therapists.map((therapist, index) => {
              if (index == 0) return null;
              return <TherapistCard key={index} therapist={therapist} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
