"use client";
import React, { useState } from "react";

// This component handles the input for adding test cases
export default function TestCaseForm({ addTestCase }) {
  const [type, setType] = useState("functional");
  const [method, setMethod] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [points, setPoints] = useState(0);

  // handling adding the new test case
  const handleAddTestCase = () => {
    const newTestCase = {
      type, // function or unit
      method: type === "unit" ? method : null, // method name is only required for unit tests
      input, // test case input
      output, // expected output
      points: parseInt(points, 10), // converting points to an int
    };

    addTestCase(newTestCase); // sends the new test case to the parent component (Autograder)

    // resetting form fields after adding test case
    setInput("");
    setOutput("");
    setPoints(0);
    setMethod("");
  };

  return (
    <div>
      <label>
        Test Type:
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="functional">Functional Test</option>
          <option value="unit">Unit Test</option>
        </select>
      </label>

      {type === "unit" && (
        <label>
          Method to Test:
          <input
            type="text"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            placeholder="e.g., isEven()"
          />
        </label>
      )}

      <label>
        Input:
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          //required
        />
      </label>

      <label>
        Expected Output:
        <textarea
          value={output}
          onChange={(e) => setOutput(e.target.value)}
          //required
        />
      </label>

      <label>
        Points:
        <input
          type="number"
          value={points}
          onChange={(e) => setPoints(parseInt(e.target.value))}
          //required
        />
      </label>

      <button type="button" onClick={handleAddTestCase}>
        Add Test Case
      </button>
    </div>
  );
}
