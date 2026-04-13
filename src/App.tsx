import { AddPatient } from './components/AddPatient'
import { PatientGrid } from './components/PatientGrid'
import { PatientSummary } from './components/PatientSummary'
import { usePatientCount } from './hooks/usePatientCount'
import { usePatients } from './hooks/usePatients'

function App() {
  const {
    patients,
    isLoading,
    searchQuery,
    setSearchQuery,
    filteredPatients,
    addPatient,
  } = usePatients()

  const totalCount = usePatientCount(patients)
  const hasAnyPatients = patients.length > 0

  return (
    <div>
      <header>
        <h1>Patient Management Dashboard</h1>
        <p>
          Add new patients, search by name or diagnosis, and see the total count.
        </p>
      </header>

      <div>
        <aside>
          <AddPatient onAdd={addPatient} />
          <PatientSummary totalCount={totalCount} />
        </aside>
        <main>
          <PatientGrid
            isLoading={isLoading}
            hasAnyPatients={hasAnyPatients}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filteredPatients={filteredPatients}
          />
        </main>
      </div>
    </div>
  )
}

export default App
