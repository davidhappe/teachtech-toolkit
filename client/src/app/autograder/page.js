"use client"; // enabling client side rendering for this component
import React, { useState } from "react";
import TestCaseForm from "@/components/TestCaseForm"; // form for defining test cases
import SubmissionStatus from "@/components/SubmissionStatus"; // component to show success/error message after submitting tests 
import '@/styles/autograder.css';

export default function Autograder() {
  const [language, setLanguage] = useState("Java"); 
  const [testCases, setTestCases] = useState([]);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [message, setMessage] = useState("");

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

    const autograderData = {
      language,
      testCases,
    };

    console.log('Autograder Data:', autograderData);

    // sending data to the backend
    try {
      const response = await fetch("http://localhost:8000/api/autograder/", { // POST request to the django backend with the autograder data
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(autograderData),
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

      <h2>Test Cases</h2>
      {testCases.length === 0 ? (
        <p className="no-test-cases">No test cases added yet.</p>
      ) : (
        <div className="test-cases">
          {testCases.map((testCase, index) => (
            <div key={index} className="test-case">
              <div>
                <p>{`Test ${index + 1} - ${testCase.type} Test`}</p>
                <p>Input: {testCase.input}</p>
                <p>Expected Output: {testCase.output}</p>
                <p>Points: {testCase.points}</p>
              </div>
              <button type="button" className="remove-button" onClick={() => removeTestCase(index)}>
                &times;
              </button>
            </div>
          ))}
        </div>
      )}

      <TestCaseForm addTestCase={addTestCase} />

      <button type="submit" className="submit-button" onClick={handleSubmit}>
        Create Autograder
      </button>

      <SubmissionStatus status={submissionStatus} message={message} />
    </div>
  );
}
