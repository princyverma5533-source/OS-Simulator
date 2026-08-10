import NeedMatrix from "./NeedMatrix";
import SafeSequence from "./SafeSequence";

function DeadlockResult({
  needMatrix,
  safeSequence,
  safeState,
}) {
  return (
    <div className="cpu-panel">
      <NeedMatrix needMatrix={needMatrix} />

      <br />

      <SafeSequence
        safeSequence={safeSequence}
        safeState={safeState}
      />
    </div>
  );
}

export default DeadlockResult;