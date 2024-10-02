"use client";
import React, { useState } from "react";
import '@/styles/testCaseForm.css';

// This component handles the input for adding test cases
export default function TestCaseForm({ addTestCase }) {
  const [type, setType] = useState("functional");
  const [method, setMethod] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [points, setPoints] = useState(0);

  // handling adding the new test case
  const handleAddTestCase = (e) => {
    e.preventDefault();

    if (!input || !output || !points || (type === "unit" && !method)) { // make sure all fields are filled in
      alert("Please fill out all required fields.");
      return;
    }

    const newTestCase = {
      type, // functional or unit test
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
    <form onSubmit={handleAddTestCase}>
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
        />
      </label>

      <label>
        Expected Output:
        <textarea
          value={output}
          onChange={(e) => setOutput(e.target.value)}
        />
      </label>

      <label>
        Points:
        <input
          type="number"
          value={points}
          onChange={(e) => setPoints(parseInt(e.target.value))}
        />
      </label>

      <button type="button" onClick={handleAddTestCase}>
        Add Test Case
      </button>
    </form>
  );
}
