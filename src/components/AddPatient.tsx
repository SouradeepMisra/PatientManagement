import { type FormEvent, useState } from "react";
import type { AddPatientErrors } from "../hooks/usePatients";

type AddPatientProps = {
  onAdd: (input: {
    patientId: number;
    patientName: string;
    diagnosis: string;
  }) => { success: true } | { success: false; errors: AddPatientErrors };
};

export function AddPatient({ onAdd }: AddPatientProps) {
  const [patientId, setPatientId] = useState("");
  const [patientName, setPatientName] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [errors, setErrors] = useState<AddPatientErrors>({});

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const idNumber = Number(patientId);
    const result = onAdd({
      patientId: Number.isFinite(idNumber) ? idNumber : NaN,
      patientName: patientName.trim(),
      diagnosis: diagnosis.trim(),
    });

    if (!result.success) {
      setErrors(result.errors);
      return;
    }

    setPatientId("");
    setPatientName("");
    setDiagnosis("");
    setErrors({});
  }

  return (
    <section aria-labelledby="add-patient-heading">
      <h2 id="add-patient-heading">Add patient</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="patientId">Patient ID</label>
          <input
            id="patientId"
            name="patientId"
            type="number"
            inputMode="numeric"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            aria-invalid={Boolean(errors.patientId)}
            aria-describedby={errors.patientId ? "patientId-error" : undefined}
          />
          {errors.patientId ? (
            <p id="patientId-error" role="alert">
              {errors.patientId}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="patientName">Patient name</label>
          <input
            id="patientName"
            name="patientName"
            type="text"
            autoComplete="name"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            aria-invalid={Boolean(errors.patientName)}
            aria-describedby={
              errors.patientName ? "patientName-error" : undefined
            }
          />
          {errors.patientName ? (
            <p id="patientName-error" role="alert">
              {errors.patientName}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="diagnosis">Diagnosis</label>
          <input
            id="diagnosis"
            name="diagnosis"
            type="text"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
          />
        </div>

        <button type="submit">Add patient</button>
      </form>
    </section>
  );
}
