"use client";

import { IUserDoc } from "@/database/user.model";
import { pusherClient } from "@/lib/pusher";
import { useEffect, useState } from "react";
import PatientCard from "./PatientCard";

interface PatientDataProps {
  initialPatients: IUserDoc[];
  query?: string;
  filter?: string;
  page?: string;
  pageSize?: string;
}

const PatientData = ({
  initialPatients,
  query,
  filter = "newest",
  page,
  pageSize = "5",
}: PatientDataProps) => {
  const [patients, setPatients] = useState<IUserDoc[]>(initialPatients);
  const currentPage = Number(page) || 1;

  useEffect(() => {
    setPatients(initialPatients);
  }, [initialPatients]);

  useEffect(() => {
    //1.Subscribe to the channel
    const channel = pusherClient.subscribe("admin-dashboard");

    //2.Listen for a new patient
    channel.bind("new-patient", (newPatient: IUserDoc) => {
      if (query) {
        const fullName =
          `${newPatient.firstName} ${newPatient.lastName}`.toLowerCase();
        const hnString = newPatient.hn?.toString().padStart(6, "0"); // "000001"
        const rawHn = newPatient.hn?.toString(); // "1"

        const matchesQuery =
          fullName.includes(query.toLowerCase()) ||
          hnString === query ||
          rawHn === query;

        if (!matchesQuery) return;
      }

      setPatients((prev: IUserDoc[]) => {
        const limit = Number(pageSize) || 5;

        if (filter === "oldest") {
          if (prev.length < limit) {
            return [...prev, newPatient];
          }

          return prev;
        }

        if (currentPage > 1) return prev;

        const updated = [newPatient, ...prev];
        return updated.slice(0, limit);
      });
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
  }, [query, filter, page, pageSize]);

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
