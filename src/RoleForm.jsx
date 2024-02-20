import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faFlag } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const OverlayCard = ({ onClose, selectedFiles }) => {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      axios.post(
        "http://localhost:8000/submit/",
        // "https://cv-shortlister-backend.azurewebsites.net/submit/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    selectedFiles.forEach((file, index) => {
      formData.append("resume", file);
    });
    const role = document.querySelector('input[type="text"]').value;
    const jobDescription = document.querySelector("textarea").value;
    formData.append("role", role);
    formData.append("jobDescription", jobDescription);

    try {
      handleSubmit(formData);
      navigate("/result", {
        state: { files: selectedFiles },
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form
        onSubmit={handleOnSubmit}
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "10px",
          position: "relative",
          width: "90%",
          maxWidth: "600px",
          textAlign: "left",
        }}
      >
        <div style={{ margin: "50px" }}>
          <FontAwesomeIcon
            icon={faFlag}
            style={{
              position: "absolute",
              top: "20px",
              left: "20px",
              fontSize: "30px",
              cursor: "pointer",
            }}
          />
          <FontAwesomeIcon
            icon={faTimes}
            onClick={onClose}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              fontSize: "30px",
              cursor: "pointer",
            }}
          />
        </div>
        <h2>Add Role</h2>
        <p>Add the job description</p>
        <h5>Role*</h5>
        <input
          type="text"
          style={{ display: "block", margin: "0 auto", width: "100%" }}
          placeholder="e.g. Software Developer"
          required
        />
        <h5 style={{ marginTop: "15px", marginBottom: "10px" }}>
          Job Description*
        </h5>
        <textarea
          style={{
            display: "block",
            margin: "0 auto",
            padding: "10px",
            width: "100%",
            height: "120px",
            resize: "vertical",
          }}
          placeholder="e.g. I joined Crux's Customer Success team to help them scale their checkout product. I focused mainly on onboarding new customers and resolving new complaints"
          required
        />
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <Button variant="primary" style={{ width: "8rem" }} type="submit">
            Submit
          </Button>{" "}
        </div>
      </form>
    </div>
  );
};

export default OverlayCard;
