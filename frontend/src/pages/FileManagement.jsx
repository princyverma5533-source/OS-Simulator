import { useState } from "react";

function FileManagement() {
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("Sequential");
  const [simulated, setSimulated] = useState(false);
  const [files, setFiles] = useState([]);

  const simulate = () => {
    const fileNames = inputValue
      .split(",")
      .map((file) => file.trim())
      .filter((file) => file.length > 0);

    if (fileNames.length === 0) {
      alert("Please enter at least one file name.");
      return;
    }

    const newFiles = fileNames.map((name, index) => ({
      id: `${name}-${index}-${Date.now()}`,
      name: name,
      block: index + 1,
    }));

    setFiles(newFiles);
    setSimulated(true);
  };

  const deleteFile = (id) => {
    setFiles((currentFiles) =>
      currentFiles.filter((file) => file.id !== id)
    );
  };

  const reset = () => {
    setInputValue("");
    setSelected("Sequential");
    setSimulated(false);
    setFiles([]);
  };

  return (
    <>
      {/* PAGE HEADER */}

      <header className="cpu-page__header">
        <div>
          <span className="dashboard__kicker">
            Storage Management
          </span>

          <h2>File Management</h2>

          <p>
            Configure file-system inputs and review a
            structured storage visualization preview.
          </p>
        </div>
      </header>

      {/* MAIN WORKSPACE */}

      <div className="cpu-workspace">

        {/* INPUT SECTION */}

        <div className="cpu-panel">

          <h3>Input Section</h3>

          <p>
            Configure the file-system inputs.
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: "20px",
              marginTop: "18px",
            }}
          >

            {/* FILE NAMES */}

            <div
              style={{
                width: "100%",
              }}
            >
              <label
                style={{
                  display: "block",
                  width: "100%",
                  marginBottom: "8px",
                  fontWeight: "600",
                }}
              >
                File Names
              </label>

              <input
                type="text"
                value={inputValue}
                onChange={(event) =>
                  setInputValue(event.target.value)
                }
                placeholder="Example: notes.txt, report.pdf, data.csv"
                style={{
                  display: "block",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* ORGANIZATION METHOD */}

            <div
              style={{
                width: "100%",
              }}
            >
              <label
                style={{
                  display: "block",
                  width: "100%",
                  marginBottom: "8px",
                  fontWeight: "600",
                }}
              >
                Organization Method
              </label>

              <select
                value={selected}
                onChange={(event) =>
                  setSelected(event.target.value)
                }
                style={{
                  display: "block",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              >
                <option value="Sequential">
                  Sequential
                </option>

                <option value="Linked">
                  Linked
                </option>

                <option value="Indexed">
                  Indexed
                </option>
              </select>
            </div>

            {/* BUTTONS */}

            <div
              style={{
                display: "flex",
                gap: "12px",
                alignItems: "center",
                marginTop: "2px",
              }}
            >
              <button
                type="button"
                onClick={simulate}
              >
                Simulate
              </button>

              <button
                type="button"
                className="button--secondary"
                onClick={reset}
              >
                Reset
              </button>
            </div>

          </div>
        </div>

        {/* FILE ORGANIZATION VIEW */}

        <div className="cpu-panel">

          <h3>File Organization View</h3>

          <p>
            Visualization area
          </p>

          {!simulated ? (
            <p>
              Run a simulation to populate this view.
            </p>
          ) : (
            <div>

              <h4>
                {selected} File Organization
              </h4>

              {files.length > 0 && (
                <table className="process-table">

                  <thead>
                    <tr>
                      <th>File</th>
                      <th>Block</th>
                    </tr>
                  </thead>

                  <tbody>
                    {files.map((file) => (
                      <tr key={file.id}>

                        <td>
                          {file.name}
                        </td>

                        <td>
                          {file.block}
                        </td>

                      </tr>
                    ))}
                  </tbody>

                </table>
              )}

            </div>
          )}

        </div>

      </div>

      {/* OUTPUT SECTION */}

      <div className="cpu-panel">

        <h3>Output Section</h3>

        {!simulated ? (
          <>
            <h4>
              Awaiting simulation
            </h4>

            <p>
              Results and file information will appear
              here.
            </p>
          </>
        ) : (
          <>
            <h4>
              File Details
            </h4>

            <p>
              <strong>
                Organization Method:
              </strong>{" "}
              {selected}
            </p>

            <p>
              <strong>
                Total Files:
              </strong>{" "}
              {files.length}
            </p>

            <table className="process-table">

              <thead>
                <tr>
                  <th>File Name</th>
                  <th>Block</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {files.map((file) => (
                  <tr key={file.id}>

                    <td>
                      {file.name}
                    </td>

                    <td>
                      {file.block}
                    </td>

                    <td>
                      <button
                        type="button"
                        className="button--secondary"
                        onClick={() =>
                          deleteFile(file.id)
                        }
                      >
                        Delete
                      </button>
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>
          </>
        )}

      </div>
    </>
  );
}

export default FileManagement;