import React, { useState, useRef, useEffect } from "react";
import dragDrop from "../public/static/drag-and-drop-icon.jpg";
import Button from "react-bootstrap/Button";
import FileCard from "./ResumeCard";
import OverlayCard from "./RoleForm";

const threshold_for_total_file_size = 5;

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

  const handleDelete = (index) => {
    const newSelectedFiles = [...selectedFiles];
    newSelectedFiles.splice(index, 1);
    setSelectedFiles(newSelectedFiles);
  };

  const handleNextButtonClick = () => {
    const totalSize = selectedFiles.reduce((acc, file) => acc + file.size, 0);
    const totalSizeInMB = totalSize / (1024 * 1024);
    if (totalSizeInMB > threshold_for_total_file_size) {
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
    <div style={{ maxWidth: "600px", margin: "80px auto" }}>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
          border: "2px solid blue",
          padding: "20px",
          marginBottom: "20px",
          borderRadius: "10px",
          textAlign: "center",
          width: "80%",
          margin: "auto",
          cursor: "pointer",
        }}
        onClick={() => fileInputRef.current.click()}
      >
        <img src={dragDrop} alt="Drag and Drop" style={{ width: "70px" }} />
        <p style={{ color: "black" }}>Click to upload PDF or drag and drop</p>
        <input
          type="file"
          accept=".pdf"
          multiple
          onChange={handleFileChange}
          style={{ display: "none" }}
          ref={fileInputRef}
        />
      </div>

      {selectedFiles.length > 0 && (
        <div style={{ textAlign: "left", marginTop: "30px" }}>
          {selectedFiles.map((file, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <FileCard file={file} onDelete={() => handleDelete(index)} />{" "}
            </div>
          ))}
        </div>
      )}
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Button
          variant="light"
          style={{
            width: "7rem",
            border: "2px solid #000",
            marginRight: "50px",
          }}
          onClick={handleOnCancel}
        >
          Cancel
        </Button>

        <Button
          variant="primary"
          style={{ width: "7rem" }}
          onClick={handleNextButtonClick}
        >
          Next
        </Button>
      </div>
      {showOverlay && (
        <OverlayCard
          onClose={handleCloseOverlay}
          selectedFiles={selectedFiles}
        />
      )}
    </div>
  );
};

export default FileUploadComponent;
