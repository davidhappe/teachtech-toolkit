"use client";
import React, { useState } from "react";
import '@/styles/testCaseForm.css';

// This component handles the input for adding test cases
export default function TestCaseForm({ addTestCase, useDiffTesting }) {
  const [type, setType] = useState("functional");
  const [method, setMethod] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [weight, setWeight] = useState(0);
  const [name, setName] = useState("");
  const [testVisibility, setTestVisibility] = useState("visible");

  // handling adding the new test case
  const handleAddTestCase = (e) => {
    e.preventDefault();

    if (!input || (!useDiffTesting && !output) || !weight || (type === "unit" && !method) || !name) { // make sure all fields are filled in
      alert("Please fill out all required fields.");
      return;
    }

    const newTestCase = {
      name, // name for the test case
      type, // functional or unit test
      method: type === "unit" ? method : null, // method name is only required for unit tests
      input, // test case input
      output, // test case expected output
      weight: parseInt(weight, 10), // converting points to an int
      visibility: testVisibility, // test result visibility to student on gradescope 
    };

    addTestCase(newTestCase); // sends the new test case to the parent component (Autograder)

    // resetting form fields after adding test case
    setName("");
    setInput("");
    setOutput("");
    setWeight(0);
    setMethod("");
    setTestVisibility("visible");
  };

  return (
    <form onSubmit={handleAddTestCase}>
      <label>
        Test Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Test case name"
          required
        />
      </label>

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

      {!useDiffTesting && (
        <label>
          Expected Output:
          <textarea
            value={output}
            onChange={(e) => setOutput(e.target.value)}
          />
        </label>
      )}

      <label>
        Weight:
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(parseInt(e.target.value))}
        />
      </label>

      <label>
        Visibility:
        <select value={testVisibility} onChange={(e) => setTestVisibility(e.target.value)}>
          <option value="visible">Visible to students</option>
          <option value="after_due_date">Visible after due date</option>
          <option value="hidden">Hidden</option>
          <option value="after_published">Visible after published</option>
        </select>
      </label>

      <button type="button" onClick={handleAddTestCase}>
        Add Test Case
      </button>
    </form>
  );
}
