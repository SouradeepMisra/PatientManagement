import type { Patient } from "../types/Patient";

type PatientGridProps = {
  isLoading: boolean;
  hasAnyPatients: boolean;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  filteredPatients: Patient[];
};

export function PatientGrid({
  isLoading,
  hasAnyPatients,
  searchQuery,
  onSearchChange,
  filteredPatients,
}: PatientGridProps) {
  return (
    <section aria-labelledby="grid-heading">
      <div>
        <h2 id="grid-heading">
          {isLoading ? "Still loading" : "Patient Records"}
        </h2>
        {!isLoading && hasAnyPatients ? (
          <div>
            <label htmlFor="patient-search">Search patients</label>
            <input
              id="patient-search"
              type="search"
              placeholder="Search by name or diagnosis…"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        ) : null}
      </div>

      {!isLoading && !hasAnyPatients ? (
        <div>
          <p>
            No patient records have been added yet. Use the form to add a new
            patient.
          </p>
        </div>
      ) : null}

      {!isLoading && hasAnyPatients ? (
        <div>
          <table>
            <thead>
              <tr>
                <th scope="col">Patient ID</th>
                <th scope="col">Patient name</th>
                <th scope="col">Diagnosis</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan={3}>No patients match your search.</td>
                </tr>
              ) : (
                filteredPatients.map((patient) => (
                  <tr key={`${patient.patientId}-${patient.patientName}`}>
                    <td>{patient.patientId}</td>
                    <td>{patient.patientName}</td>
                    <td>{patient.diagnosis}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  );
}
