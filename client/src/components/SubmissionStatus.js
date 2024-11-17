import React from "react";

// This component displays the status of the autograder submission (either success or error)
export default function SubmissionStatus({ status, message }) {
  if (status === null) {
    return null; // If no status is set yet, return nothing
  }

  return (
    <div>
      {status === "success" ? (
        <div style={{ color: "green" }}>
          <p>{message}</p>
        </div>
      ) : (
        <div style={{ color: "red" }}>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}
