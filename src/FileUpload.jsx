import React, { useState, useRef, useEffect } from "react";
import dragDrop from "../public/static/drag-and-drop-icon.jpg";
import Button from "react-bootstrap/Button";
import FileCard from "./ResumeCard";
import OverlayCard from "./RoleForm";
import axios from "axios";

const FileUploadComponent = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (formData) => {
    try {
      console.log(formData);
      const response = await axios.post(
        "http://localhost:8000/submit/",
        // "https://cv-shortlister-backend.azurewebsites.net/submit/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log("Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = (index) => {
    const newSelectedFiles = [...selectedFiles];
    newSelectedFiles.splice(index, 1);
    setSelectedFiles(newSelectedFiles);
  };

  const handleNextButtonClick = () => {
    // check for size of each file and if it is greater than 5MB then show error message
    const totalSize = selectedFiles.reduce((acc, file) => acc + file.size, 0);
    const totalSizeInMB = totalSize / (1024 * 1024); // Convert total size to MB
    if (totalSizeInMB > 5) {
      alert("Total file size should be less than 5MB.");
    } else {
      setShowOverlay(true);
    }
  };

  const handleCloseOverlay = () => {
    setShowOverlay(false);
  };

  const handleOnCancel = () => {
    setSelectedFiles([]);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
          border: "2px solid #ccc",
          padding: "20px",
          marginTop: "100px",
          marginBottom: "20px",
          display: "inline-block",
          width: "40%",
        }}
      >
        <img src={dragDrop} alt="Drag and Drop" style={{ width: "70px" }} />
        <p>
          <a href="#" onClick={handleUploadButtonClick}>
            Click to upload PDF
          </a>{" "}
          or drag and drop
        </p>
        <input
          type="file"
          accept=".pdf"
          multiple
          onChange={handleFileChange}
          style={{ display: "none", width: "80%" }}
          ref={fileInputRef}
        />
      </div>
      {selectedFiles.length > 0 && (
        <div>
          <h3>Uploaded Resumes:</h3>
          {selectedFiles.map((file, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <FileCard file={file} onDelete={() => handleDelete(index)} />{" "}
            </div>
          ))}
        </div>
      )}
      <div style={{ margin: "20px" }}>
        <Button
          variant="light"
          style={{
            width: "8rem",
            border: "2px solid #000", // Add black border
            marginRight: "50px",
          }}
          onClick={handleOnCancel}
        >
          Cancel
        </Button>{" "}
        <Button
          variant="primary"
          style={{ width: "8rem" }}
          onClick={handleNextButtonClick}
        >
          Next
        </Button>{" "}
      </div>
      {showOverlay && (
        <OverlayCard
          onClose={handleCloseOverlay}
          selectedFiles={selectedFiles}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default FileUploadComponent;
