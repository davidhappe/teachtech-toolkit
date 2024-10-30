"use client"; // enabling client side rendering for this component
import React, { useState } from "react";
import TestCaseForm from "@/components/TestCaseForm"; // form for defining test cases
import SubmissionStatus from "@/components/SubmissionStatus"; // component to show success/error message after submitting tests 
import '@/styles/autograder.css';

export default function Autograder() {
  const [language, setLanguage] = useState("Java");
  const [useDiffTesting, setUseDiffTesting] = useState(false); // Toggle for diff testing
  const [solutionFile, setSolutionFile] = useState(null); // Solution file for diff testing
  const [testCases, setTestCases] = useState([]);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingTestCase, setEditingTestCase] = useState(null); // For editing
  const [editingIndex, setEditingIndex] = useState(null); // Track index of the test case being edited
  
  // function to add a new test case
  const addTestCase = (newTestCase) => {
    setTestCases([...testCases, newTestCase]);
  };

  const updateTestCase = (index, updatedTestCase) => {
    const updatedCases = [...testCases];
    updatedCases[index] = updatedTestCase;
    setTestCases(updatedCases);
  };

  // function for removing a test case
  const handleRemoveTestCase = (index) => {
    setTestCases(testCases.filter((_, i) => i !== index));
  };

  const openForm = (testCase = null, index = null) => {
    setEditingTestCase(testCase);
    setEditingIndex(index);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingTestCase(null);
    setEditingIndex(null);
  };

  // submission handler for the assignment form
  const handleSubmit = async () => {
    // make sure there's at least one test case
    if (testCases.length === 0) {
      alert("Please add at least one test case before submitting.");
      return;
    }

    const formData = new FormData(); // using formData to be able to pass files
    
    formData.append("language", language);
    formData.append("useDiffTesting", useDiffTesting);
    
    if (useDiffTesting && solutionFile) {
      formData.append("solutionFile", solutionFile);
    }

    formData.append("testCases", JSON.stringify(testCases));

    // sending data to the backend
    try {
      const response = await fetch("http://localhost:8000/api/autograder/", {  // POST request to the django backend with the autograder data
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Autograder created successfully");
        const data = await response.json();
        setSubmissionStatus("success");
        setMessage(data.message);
      } else {
        console.error("Error creating autograder");
        const errorData = await response.json();
        setSubmissionStatus("error");
        setMessage(errorData.message || "Submission failed");
      }
    } catch (error) {
        setSubmissionStatus("error");
        console.error("Network error:", error);
    }
  };

  return (
    <div className="autograder-container">
      <div className="title">
        <img src="/images/gs.png" className="title-img"/>
        <h1>Gradescope Autograder Creator</h1>
      </div>
      <div className="header">
        <div className="header-left">
          <div className="form-group inline-group">
            <label>Language</label>
            <select value={language} onChange={(e) => setLanguage(e.target.value)}>
              <option value="Java">Java</option>
              <option value="Python">Python</option>
            </select>
          </div>

          <div className="form-group checkbox-group">

            <span>Use Diff Testing?</span>
            <input
              type="checkbox"
              id="diff-checkbox"
              checked={useDiffTesting}
              onChange={(e) => setUseDiffTesting(e.target.checked)}
            />

          </div>

          {useDiffTesting && (
            <div className="form-group">
              <span>Upload Solution File</span>
              <input
                type="file"
                id="file-upload-button"
                onChange={(e) => setSolutionFile(e.target.files[0])}
              />
            </div>
          )}

          <button type="submit" className="submit-button" onClick={handleSubmit}>
            Create Autograder
          </button>
        </div>
      </div>

      <div className="main-content">
        <div className="test-cases-container">
          <h2>Test Cases</h2>
          {testCases.length === 0 ? (
            <p className="no-test-cases">No test cases added yet.</p>
          ) : (
            <div className="test-cases">
              {testCases.map((testCase, index) => (
                <div key={index} className="test-case">
                  <div className="test-case-header">
                    <p className="test-case-title">{`Test ${index + 1}: ${testCase.name}`}</p>
                    <button type="button" className="remove-button small-remove-button" onClick={() => handleRemoveTestCase(index)}>&times;</button>
                  </div>
                  <div className="test-case-content">
                    <div>
                      <p><strong>Weight:</strong> {testCase.weight}</p>
                      <p><strong>Visibility:</strong> {testCase.visibility}</p>
                    </div>
                    <div>
                      <p><strong>Type of test:</strong> {testCase.type}</p>
                      {testCase.type === "unit" && <p><strong>Method being tested:</strong> {testCase.method}</p>}
                      {testCase.type === "style" && <p><strong>Style Check Type:</strong> {testCase.styleCheck === "whitespace" ? "Unnecessary Whitespace" : "Check Comments Exist"}</p>}
                    </div>
                    {testCase.type !== "style" && testCase.type !== "compilation" && (
                      <div>
                        <div>
                          {testCase.inputs.map((input, i) => (
                            <p key={i}><strong>Input {i + 1}:</strong> {input.value} ({input.type})</p>
                          ))}
                        </div>
                        <div>
                          <p><strong>Expected Output:</strong> {testCase.output.value} ({testCase.output.type})</p>
                        </div>
                      </div>
                    )}
                    <div>
                      <button type="button" onClick={() => openForm(testCase, index)} className="edit-button">Edit</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <button className="add-button" onClick={() => openForm(null)}>+ Add Test Case</button>
        </div>
      </div>

      {showForm && (
        <div className="form-modal">
          <TestCaseForm
            addTestCase={addTestCase}
            updateTestCase={updateTestCase} // Pass down update logic
            useDiffTesting={useDiffTesting}
            editingTestCase={editingTestCase}
            editingIndex={editingIndex} // Pass down index for editing
            closeForm={closeForm}
          />
        </div>
      )}

      <SubmissionStatus status={submissionStatus} message={message} />
    </div>
  );
}

