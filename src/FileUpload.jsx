import React, { useState, useRef, useEffect } from "react";
import dragDrop from "../public/static/drag-and-drop-icon.jpg";
import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";
import FileCard from "./ResumeCard";
import OverlayCard from "./RoleForm";
import axios from "axios";

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

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (formData) => {
    try {
      console.log(formData);
      const response = await axios.post(
        // "http://localhost:8000/submit/",
        "https://cv-shortlister-backend.azurewebsites.net/submit/",
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
    <>
      <Row>
        <Col sm={4}></Col>
        <Col
          sm={4}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            style={{
              border: "2px solid blue",
              padding: "20px",
              marginTop: "100px",
              marginBottom: "20px",
              borderRadius: "10px",
              width: "27rem",
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
              style={{ display: "none" }}
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

          <div
            style={{ margin: "20px" }}
            className="d-flex justify-content-between"
          >
            <Button
              variant="light"
              style={{
                width: "10rem",
                border: "2px solid #000",
                margin: "20px",
              }}
              onClick={handleOnCancel}
            >
              Cancel
            </Button>{" "}
            <Button
              variant="primary"
              style={{ width: "10rem", margin: "20px" }}
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
        </Col>
        <Col sm={4}></Col>
      </Row>
    </>
  );
};

export default FileUploadComponent;
