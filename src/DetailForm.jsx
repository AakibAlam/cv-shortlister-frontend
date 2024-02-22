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
            {Array.isArray(details["Education"]) &&
              details["Education"].map((item, index) => (
                <div key={index}>
                  <p>
                    <strong>{item.degree}</strong>
                  </p>
                  <Row style={{ marginBottom: "10px" }}>
                    <Col sm={3}>Name</Col>
                    <Col sm={9} style={{ color: "gray" }}>
                      {item.name}
                    </Col>
                  </Row>
                  <Row style={{ marginBottom: "10px" }}>
                    <Col sm={3}>Branch</Col>
                    <Col sm={9} style={{ color: "gray" }}>
                      {item.branch}
                    </Col>
                  </Row>
                  <Row style={{ marginBottom: "10px" }}>
                    <Col sm={3}>CGPA</Col>
                    <Col sm={9} style={{ color: "gray" }}>
                      {item.cgpa}
                    </Col>
                  </Row>
                  <Row style={{ marginBottom: "10px" }}>
                    <Col sm={3}>Start</Col>
                    <Col sm={9} style={{ color: "gray" }}>
                      {item.start}
                    </Col>
                  </Row>
                  <Row style={{ marginBottom: "10px" }}>
                    <Col sm={3}>End</Col>
                    <Col sm={9} style={{ color: "gray" }}>
                      {item.end}
                    </Col>
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
                    <Col sm={8} style={{ color: "gray" }}>
                      {item.role}
                    </Col>
                  </Row>
                  <Row style={{ marginBottom: "10px" }}>
                    <Col sm={4}>Short Description</Col>
                    <Col sm={8} style={{ color: "gray" }}>
                      {item.short_description}
                    </Col>
                  </Row>
                  <Row style={{ marginBottom: "10px" }}>
                    <Col sm={4}>Tech Stack</Col>
                    <Col sm={8} style={{ color: "gray" }}>
                      {item.tech_stack}
                    </Col>
                  </Row>
                  <Row style={{ marginBottom: "10px" }}>
                    <Col sm={4}>Time Duration</Col>
                    <Col sm={8} style={{ color: "gray" }}>
                      {item.time_duration?.start} - {item.time_duration?.end} (
                      {item.time_duration?.duration_months} months)
                    </Col>
                  </Row>
                  <Row style={{ marginBottom: "10px" }}>
                    <Col sm={4}>Relevance Score</Col>
                    <Col sm={8} style={{ color: "gray" }}>
                      {item.relevancy}
                    </Col>
                  </Row>
                </div>
              ))}
          </div>
        );
      case "projects":
        return (
          <div>
            {Array.isArray(details["Projects"]) &&
              details["Projects"].map((item, index) => (
                <div key={index}>
                  <p>
                    <strong>{item.project_title}</strong>
                  </p>
                  <Row style={{ marginBottom: "10px" }}>
                    <Col sm={4}>Short Description</Col>
                    <Col sm={8} style={{ color: "gray" }}>
                      {item.short_description}
                    </Col>
                  </Row>
                  <Row style={{ marginBottom: "10px" }}>
                    <Col sm={4}>Tech Stack</Col>
                    <Col sm={8} style={{ color: "gray" }}>
                      {item.tech_stack}
                    </Col>
                  </Row>
                  <Row style={{ marginBottom: "10px" }}>
                    <Col sm={4}>Time Duration</Col>
                    <Col sm={8} style={{ color: "gray" }}>
                      {item.time_duration?.start} - {item.time_duration?.end} (
                      {item.time_duration?.duration_months} months)
                    </Col>
                  </Row>
                  <Row style={{ marginBottom: "10px" }}>
                    <Col sm={4}>Relevance Score</Col>
                    <Col sm={8} style={{ color: "gray" }}>
                      {item.relevancy}
                    </Col>
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
          padding: "10px",
          borderRadius: "10px",
          position: "relative",
          width: "90%",
          height: "70%",
          overflow: "auto",
          textAlign: "left",
          maxWidth: "600px",
          marginLeft: "0px",
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
                backgroundColor:
                  activeSection === "education" ? "aliceblue" : "transparent",
              }}
              onClick={() => setActiveSection("education")}
            >
              Degree
            </button>
            <button
              style={{
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
              WEX
            </button>
          </div>
          {renderSection(activeSection)}
        </div>
      </div>
    </div>
  );
};

export default OverlayCard;
