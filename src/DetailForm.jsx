import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Row, Col } from "react-bootstrap";

const OverlayCard = ({ onClose, details }) => {
  const [activeSection, setActiveSection] = useState("education");

  const renderSection = (section) => {
    switch (section) {
      case "education":
        return (
          <div>
            {Array.isArray(details["education"]) &&
              details["education"].map((item, index) => (
                <div key={index}>
                  <p>
                    <strong>{item.degree}</strong>
                  </p>
                  <Row style={{ marginBottom: "10px" }}>
                    <Col sm={3}>Name</Col>
                    <Col sm={9}>{item.name}</Col>
                  </Row>
                  <Row style={{ marginBottom: "10px" }}>
                    <Col sm={3}>Branch</Col>
                    <Col sm={9}>{item.branch}</Col>
                  </Row>
                  <Row style={{ marginBottom: "10px" }}>
                    <Col sm={3}>CGPA</Col>
                    <Col sm={9}>{item.cgpa}</Col>
                  </Row>
                  <Row style={{ marginBottom: "10px" }}>
                    <Col sm={3}>Start</Col>
                    <Col sm={9}>{item.start}</Col>
                  </Row>
                  <Row style={{ marginBottom: "10px" }}>
                    <Col sm={3}>End</Col>
                    <Col sm={9}>{item.end}</Col>
                  </Row>
                </div>
              ))}
          </div>
        );
      case "Professional Experience":
        return (
          <div>
            {Array.isArray(details["Professional Experience"]) &&
              details["Professional Experience"].map((item, index) => (
                <div key={index}>
                  <p>
                    <strong>{item.organization}</strong>
                  </p>
                  <Row style={{ marginBottom: "10px" }}>
                    <Col sm={4}>Role</Col>
                    <Col sm={8}>{item.role}</Col>
                  </Row>
                  <Row style={{ marginBottom: "10px" }}>
                    <Col sm={4}>Short Description</Col>
                    <Col sm={8}>{item.short_description}</Col>
                  </Row>
                  <Row style={{ marginBottom: "10px" }}>
                    <Col sm={4}>Tech Stack</Col>
                    <Col sm={8}>{item.tech_stack}</Col>
                  </Row>
                  <Row style={{ marginBottom: "10px" }}>
                    <Col sm={4}>Time Duration</Col>
                    <Col sm={8}>
                      {item.time_duration?.start} - {item.time_duration?.end} (
                      {item.time_duration?.duration_months} months)
                    </Col>
                  </Row>
                  <Row style={{ marginBottom: "10px" }}>
                    <Col sm={4}>Relevance Score</Col>
                    <Col sm={8}>{item.relevancy}</Col>
                  </Row>
                </div>
              ))}
          </div>
        );
      case "projects":
        return (
          <div>
            {Array.isArray(details["projects"]) &&
              details["projects"].map((item, index) => (
                <div key={index}>
                  <p>
                    <strong>{item.project_title}</strong>
                  </p>
                  <Row style={{ marginBottom: "10px" }}>
                    <Col sm={4}>Short Description</Col>
                    <Col sm={8}>{item.short_description}</Col>
                  </Row>
                  <Row style={{ marginBottom: "10px" }}>
                    <Col sm={4}>Tech Stack</Col>
                    <Col sm={8}>{item.tech_stack}</Col>
                  </Row>
                  <Row style={{ marginBottom: "10px" }}>
                    <Col sm={4}>Time Duration</Col>
                    <Col sm={8}>
                      {item.time_duration?.start} - {item.time_duration?.end} (
                      {item.time_duration?.duration_months} months)
                    </Col>
                  </Row>
                  <Row style={{ marginBottom: "10px" }}>
                    <Col sm={4}>Relevance Score</Col>
                    <Col sm={8}>{item.relevancy}</Col>
                  </Row>
                </div>
              ))}
          </div>
        );
      default:
        return null;
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
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "10px",
          position: "relative",
          width: "60%",
          height: "70%", // Adjust this height as needed
          overflow: "auto", // Enable scrolling if content exceeds container height
          textAlign: "left",
        }}
      >
        <div style={{ margin: "50px" }}>
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
          <div style={{ marginBottom: "20px" }}>
            <button
              style={{
                marginRight: "10px",
                backgroundColor:
                  activeSection === "education" ? "aliceblue" : "transparent",
              }}
              onClick={() => setActiveSection("education")}
            >
              Education
            </button>
            <button
              style={{
                marginRight: "10px",
                backgroundColor:
                  activeSection === "projects" ? "aliceblue" : "transparent",
              }}
              onClick={() => setActiveSection("projects")}
            >
              Projects
            </button>
            <button
              style={{
                backgroundColor:
                  activeSection === "Professional Experience"
                    ? "aliceblue"
                    : "transparent",
              }}
              onClick={() => setActiveSection("Professional Experience")}
            >
              Work Experience
            </button>
          </div>
          {renderSection(activeSection)}
        </div>
      </div>
    </div>
  );
};

export default OverlayCard;
