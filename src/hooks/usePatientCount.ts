import { useMemo } from "react";
import type { Patient } from "../types/Patient";

export function usePatientCount(patients: Patient[]): number {
  return useMemo(() => patients.length, [patients]);
}
