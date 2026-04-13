import { useEffect, useMemo, useState } from "react";
import type { Patient } from "../types/Patient";

export type AddPatientErrors = {
  patientId?: string;
  patientName?: string;
};

export function usePatients() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setIsLoading(false), 500);
    return () => window.clearTimeout(timeoutId);
  }, []);

  const filteredPatients = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    if (!normalizedQuery) {
      return patients;
    }

    return patients.filter((patient) => {
      return (
        patient.patientName.toLowerCase().includes(normalizedQuery) ||
        patient.diagnosis.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [patients, searchQuery]);

  function addPatient(
    input: Patient,
  ): { success: true } | { success: false; errors: AddPatientErrors } {
    const errors: AddPatientErrors = {};
    const trimmedName = input.patientName.trim();

    if (input.patientId < 0) {
      errors.patientId = "Patient ID cannot be negative";
    }

    if (!trimmedName) {
      errors.patientName = "Patient name cannot be empty";
    }

    if (Object.keys(errors).length > 0) {
      return { success: false, errors };
    }

    const nextPatient: Patient = {
      patientId: input.patientId,
      patientName: trimmedName,
      diagnosis: input.diagnosis.trim(),
    };

    setPatients((previous) => [...previous, nextPatient]);
    return { success: true };
  }

  return {
    patients,
    isLoading,
    searchQuery,
    setSearchQuery,
    filteredPatients,
    addPatient,
  };
}
