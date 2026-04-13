type PatientSummaryProps = {
  totalCount: number;
};

export function PatientSummary({ totalCount }: PatientSummaryProps) {
  return (
    <section aria-labelledby="summary-heading">
      <h2 id="summary-heading">Summary</h2>
      <p>
        Total patients: <strong>{totalCount}</strong>
      </p>
    </section>
  );
}
