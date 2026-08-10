
function SafeSequence({ safeSequence, safeState }) {
  return (
    <>
      <h3>Safe Sequence</h3>

      {safeSequence.length > 0 ? (
        <p>{safeSequence.join(" → ")}</p>
      ) : (
        <p>No sequence available.</p>
      )}

      {safeState !== null && (
        <h3>
          {safeState
            ? "✅ SAFE STATE"
            : "❌ UNSAFE STATE"}
        </h3>
      )}
    </>
  );
}

export default SafeSequence;