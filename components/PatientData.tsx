"use client";

import { IUserDoc } from "@/database/user.model";
import { pusherClient } from "@/lib/pusher";
import { useEffect, useState } from "react";
import PatientCard from "./PatientCard";

interface PatientDataProps {
  initialPatients: IUserDoc[];
}

const PatientData = ({ initialPatients }: PatientDataProps) => {
  const [patients, setPatients] = useState<IUserDoc[]>(initialPatients);

  useEffect(() => {
    //1.Subscribe to the channel
    const channel = pusherClient.subscribe("admin-dashboard");

    //2.Listen for a new patient
    channel.bind("new-patient", (newPatient: IUserDoc) => {
      setPatients((prev) =>
        [newPatient, ...prev].sort((a, b) => (a.hn || 0) - (b.hn || 0))
      );
    });

    //3.Listen for update patient data
    channel.bind("update-patient", (updatedPatient: IUserDoc) => {
      setPatients((prev) =>
        prev.map((p) => (p._id === updatedPatient._id ? updatedPatient : p))
      );
    });

    return () => {
      pusherClient.unsubscribe("admin-dashboard");
    };
  }, []);

  return (
    <div className="w-full flex flex-col gap-3 max-w-xl">
      {patients &&
        patients.map((patient) => (
          <PatientCard key={patient._id.toString()} patient={patient} />
        ))}
    </div>
  );
};

export default PatientData;
