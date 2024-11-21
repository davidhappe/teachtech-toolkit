"use client"; // enabling client side rendering for this component
import React, { useState } from "react";
import TestCaseForm from "@/components/TestCaseForm"; // form for defining test cases
//import SubmissionStatus from "@/components/SubmissionStatus"; // component to show success/error message after submitting tests 
import '@/styles/autograder.css';

export default function Autograder() {
  const [language, setLanguage] = useState("Java");
  const [expectedFiles, setExpectedFiles] = useState([]); // Expected student files
  const [newFileName, setNewFileName] = useState(""); // Input field for adding expected file names
  const [showExpectedFiles, setShowExpectedFiles] = useState(false); // Toggle for showing the expected files list
  const [useDiffTesting, setUseDiffTesting] = useState(false); // Toggle for diff testing
  const [solutionFile, setSolutionFile] = useState(null); // Solution file for diff testing
  const [testCases, setTestCases] = useState([]);
  //const [submissionStatus, setSubmissionStatus] = useState(null);
  //const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingTestCase, setEditingTestCase] = useState(null); // For editing
  const [editingIndex, setEditingIndex] = useState(null); // Track index of the test case being edited

  // Add expected file to the list
  const addExpectedFile = () => {
    if (newFileName.trim() && !expectedFiles.includes(newFileName.trim())) {
      setExpectedFiles([...expectedFiles, newFileName.trim()]);
      setNewFileName(""); // Reset input after adding
    }
  };

  // Remove a specific file from the list
  const removeExpectedFile = (fileName) => {
    setExpectedFiles(expectedFiles.filter(file => file !== fileName));
  };

  // Toggle the visibility of the expected files pop-out component with animation
  const toggleExpectedFiles = () => {
    if (showExpectedFiles) {
      // Trigger close animation before hiding
      document.querySelector('.expected-files-popout').classList.add('hidden-popout');
      setTimeout(() => setShowExpectedFiles(false), 50); // Wait for animation to complete
    } else {
      setShowExpectedFiles(true);
    }
  };
  
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

    // make sure there's at least one expected file
    if (expectedFiles.length === 0) {
      alert("Please add at least one expected student file before submitting.");
      return;
    }

    const formData = new FormData(); // using formData to be able to pass files
    
    formData.append("language", language);
    formData.append("expectedFiles", JSON.stringify(expectedFiles));
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
        const blob = await response.blob(); // Convert response to a blob
        const url = window.URL.createObjectURL(blob); // Create a URL for the blob
        const a = document.createElement("a");
        a.href = url;
        a.download = "autograder.zip"; // Set the download filename
        document.body.appendChild(a);
        a.click(); // Programmatically trigger a click to download
        a.remove(); // Remove the temporary element
        window.URL.revokeObjectURL(url); // Clean up the URL
        //setSubmissionStatus("success");
        //setMessage("Autograder downloaded successfully!");
      } else {
        console.error("Error creating autograder");
        const errorData = await response.json();
        //setSubmissionStatus("error");
        //setMessage(errorData.message || "Submission failed");
      }
    } catch (error) {
      //setSubmissionStatus("error");
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
        </div>

        <div className="form-group inline-group">
          <button onClick={toggleExpectedFiles} className="expected-files-button">
            Expected Student Files  ⇣
          </button>
          {showExpectedFiles && (
            <div className="expected-files-popout">
              <button className="close-popout-button" onClick={toggleExpectedFiles}>
                ⇡
              </button>
              <h3>Expected Files</h3>

              {expectedFiles.length === 0 ? ( <p>No files added yet.</p> ) : (
                  <ul>
                    {expectedFiles.map((file, index) => (
                      <li key={index} className="expected-file-item">
                        {file}
                        <button
                          type="button"
                          onClick={() => removeExpectedFile(file)}
                          className="remove-button-inline"
                        >
                          &times;
                        </button>
                      </li>
                    ))}
                  </ul>
              )}

              <div className="add-file-section">
                <input
                  type="text"
                  value={newFileName}
                  onChange={(e) => setNewFileName(e.target.value)}
                  placeholder="Enter file name"
                />
                <button onClick={addExpectedFile} className="add-file-button">
                  Add File
                </button>
              </div>
            </div>
          )}
        </div>

        <button type="submit" className="submit-button" onClick={handleSubmit}>
          Create Autograder
        </button>
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

      {/*<SubmissionStatus status={submissionStatus} message={message} />*/}
    </div>
  );
}

