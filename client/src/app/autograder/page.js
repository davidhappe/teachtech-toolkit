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
  //const [skeletonCode, setSkeletonCode] = useState(null); // For the optional skeleton code file

  // function to add a new test case
  const addTestCase = (newTestCase) => {
    setTestCases([...testCases, newTestCase]);
  };

  // function for removing a test case
  const removeTestCase = (indexToRemove) => {
    setTestCases(testCases.filter((_, index) => index !== indexToRemove));
  };

  // submission handler for the assignment form
  const handleSubmit = async (e) => {
    // make sure there's at least one test case
    if (testCases.length === 0) {
      alert("Please add at least one test case before submitting.");
      return;
    }

    /*const autograderData = {
      language,
      solutionFile,
      testCases,
    };*/

    const formData = new FormData(); // using formData to be able to pass files

    formData.append("language", language);
    formData.append("useDiffTesting", useDiffTesting);

    if (useDiffTesting && solutionFile) {
      formData.append("solutionFile", solutionFile);
    }

    formData.append("testCases", JSON.stringify(testCases));

    //console.log('Autograder Data:', autograderData);

    // sending data to the backend
    try {
      const response = await fetch("http://localhost:8000/api/autograder/", { // POST request to the django backend with the autograder data
        method: "POST",
        body: formData,
      });

      // if django backend returns success
      if (response.ok) {
        console.log("Autograder created successfully");
        const data = await response.json();
        setSubmissionStatus("success");
        setMessage(data.message);

        // set zip file/download link eventually?

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
      <h1>Create Autograder</h1>
      <div className="form-group">
        <label>Language</label>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="Java">Java</option>
          <option value="Python">Python</option>
        </select>
      </div>

      <div className="form-group checkbox-group">
        <label>
          Use Diff Testing?
          <input
            type="checkbox"
            checked={useDiffTesting}
            onChange={(e) => setUseDiffTesting(e.target.checked)}
          />
        </label>
      </div>

      {useDiffTesting && (
        <div className="form-group">
          <label>Upload Solution File</label>
          <input
            type="file"
            onChange={(e) => setSolutionFile(e.target.files[0])}
          />
        </div>
      )}

      <h2>Test Cases</h2>
      {testCases.length === 0 ? (
        <p className="no-test-cases">No test cases added yet.</p>
      ) : (
        <div className="test-cases">
          {testCases.map((testCase, index) => (
            <div key={index} className="test-case">
              <div>
                <p><strong>{`Test ${index + 1}: `}</strong></p>
                <p><strong>Name:</strong> {testCase.name}</p>
                <p><strong>Type:</strong> {testCase.type}</p>
                {testCase.type === "unit" && ( <p><strong>Method:</strong> {testCase.method}</p> )}
                <p><strong>Input:</strong> {testCase.input}</p>
                {!useDiffTesting && ( <p><strong>Expected Output:</strong> {testCase.output}</p> )}
                <p><strong>Weight:</strong> {testCase.weight}</p>
                <p><strong>Visibility:</strong> {testCase.visibility}</p>
              </div>
              <button type="button" className="remove-button" onClick={() => removeTestCase(index)}>
                &times;
              </button>
            </div>
          ))}
        </div>
      )}

      <TestCaseForm addTestCase={addTestCase} useDiffTesting={useDiffTesting} />

      <button type="submit" className="submit-button" onClick={handleSubmit}>
        Create Autograder
      </button>

      <SubmissionStatus status={submissionStatus} message={message} />
    </div>
  );
}
