function NeedMatrix({ needMatrix }) {
  return (
    <>
      <h3>Need Matrix</h3>

      {needMatrix.length === 0 ? (
        <p>Run simulation to generate Need Matrix.</p>
      ) : (
        <table className="process-table">
          <tbody>
            {needMatrix.map((row, i) => (
              <tr key={i}>
                <td>
                  <strong>P{i}</strong>
                </td>

                {row.map((value, j) => (
                  <td key={j}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default NeedMatrix;