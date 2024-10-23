"use client";
import React, { useState, useEffect } from "react";
import '@/styles/testCaseForm.css';

export default function TestCaseForm({ addTestCase, updateTestCase, useDiffTesting, editingTestCase, editingIndex, closeForm, }) {
  const [type, setType] = useState("unit");
  const [method, setMethod] = useState("");
  const [inputs, setInputs] = useState([]);
  const [output, setOutput] = useState({ value: "", type: "string" });
  const [weight, setWeight] = useState(0);
  const [name, setName] = useState("");
  const [testVisibility, setTestVisibility] = useState("visible");

  useEffect(() => {
    if (editingTestCase) {
      setType(editingTestCase.type || "unit");
      setMethod(editingTestCase.method || "");
      setInputs(editingTestCase.inputs || []);
      setOutput(editingTestCase.output || { value: "", type: "string" });
      setWeight(editingTestCase.weight || 0);
      setName(editingTestCase.name || "");
      setTestVisibility(editingTestCase.visibility || "visible");
    }
  }, [editingTestCase]);

  // Handling addition and removal of input fields
  const handleAddInput = () => {
    setInputs([...inputs, { value: "", type: "string" }]);
  };

  const handleRemoveInput = (index) => {
    setInputs(inputs.filter((_, i) => i !== index));
  };

  const handleInputChange = (index, field, value) => {
    const newInputs = [...inputs];
    newInputs[index][field] = value;
    setInputs(newInputs);
  };

  const handleSaveTestCase = (e) => {
    e.preventDefault();

    if (
      inputs.some((input) => !input.value) ||
      (!useDiffTesting && !output.value) ||
      !weight ||
      (type === "unit" && !method) ||
      !name
    ) {
      alert("Please fill out all required fields.");
      return;
    }

    const newTestCase = {
      name,
      type,
      method: type === "unit" ? method : null,
      inputs,
      output: useDiffTesting ? null : output,
      weight: parseInt(weight, 10),
      visibility: testVisibility,
    };

    if (editingIndex !== null) {
      // Editing existing test case
      updateTestCase(editingIndex, newTestCase);
    } else {
      // Adding new test case
      addTestCase(newTestCase);
    }

    closeForm(); // Close form after saving
  };

  return (
    <form onSubmit={handleSaveTestCase} className="test-case-form">
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
          <option value="unit">Unit Test</option>
          <option value="functional">Functional Test</option>
        </select>
      </label>

      {type === "unit" && (
          <label>
            Method to Test:
            <input
              type="text"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              placeholder="Without parentheses, e.g., isEven for isEven()"
            />
          </label>
      )}

      <div>
        <label>Inputs:</label>
        {inputs.map((input, index) => (
          <div key={index} className="input-group">
            <select
              value={input.type}
              onChange={(e) => handleInputChange(index, "type", e.target.value)}
            >
              <option value="string">String</option>
              <option value="int">Integer</option>
              <option value="bool">Boolean</option>
              <option value="array">Array</option>
              <option value="object">Object</option>
            </select>
            <textarea
              value={input.value}
              onChange={(e) => handleInputChange(index, "value", e.target.value)}
              placeholder="Enter input"
            />
            <button type="button" className="remove-button-small" onClick={() => handleRemoveInput(index)}>&times;</button>
          </div>
        ))}
        <button type="button" className="add-input-button" onClick={handleAddInput}>+ Add an Input</button>
        </div>

      {!useDiffTesting && (
        <div>
          <label>Expected Output:</label>
          <select
            value={output.type}
            onChange={(e) => setOutput({ ...output, type: e.target.value })}
          >
            <option value="string">String</option>
            <option value="int">Integer</option>
            <option value="bool">Boolean</option>
            <option value="array">Array</option>
            <option value="object">Object</option>
          </select>
          <textarea
            value={output.value}
            onChange={(e) => setOutput({ ...output, value: e.target.value })}
            placeholder="Expected output"
          />
        </div>
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

      <div className="button-group">
        <button type="button" className="cancel-button" onClick={closeForm}>
          Cancel
        </button>
        <button type="submit" className="create-test-button">
          {editingTestCase ? "Save Changes" : "Add Test Case"}
        </button>
      </div>
    </form>
  );
}
