import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import OverlayCard from "./DetailForm";

function ResponseTable() {
  const location = useLocation();
  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState(null);
  const response = location.state?.response ?? [];
  const files = location.state?.files;

  const handleViewDetails = (data) => {
    setSelectedDetails(data.details);
    setShowOverlay(true);
  };

  const handleCloseOverlay = () => {
    setSelectedDetails(null);
    setShowOverlay(false);
  };

  return (
    <>
      <h1 style={{ margin: "2rem" }}>{response.length} Resumes filtered</h1>
      <hr style={{ margin: "2rem" }} />

      <Row style={{ margin: "2rem" }}>
        <Col sm={4}>
          <div>
            <h4>Recommended Profiles</h4>
            <p style={{ fontSize: "20px" }}>Resumes fit for the job role</p>
          </div>
        </Col>
        <Col sm={8}>
          <table style={{ width: "100%" }}>
            <thead style={{ backgroundColor: "aliceblue" }}>
              <tr>
                <th>Name</th>
                <th>Score</th>
                <th>Resume</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {response.map((data, index) => (
                <React.Fragment key={2 * index}>
                  <tr key={2 * index}>
                    <td>{data.name}</td>
                    <td>{data.score}</td>
                    <td>
                      <a
                        href={URL.createObjectURL(
                          files[parseInt(data.resume_index)]
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Link
                      </a>
                    </td>
                    <td>
                      <a onClick={() => handleViewDetails(data)}>View</a>
                    </td>
                  </tr>
                  <tr key={2 * index + 1}>
                    <td colSpan="4">
                      <hr style={{ margin: "0.5rem 0" }} />
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </Col>
      </Row>
      {showOverlay && (
        <OverlayCard onClose={handleCloseOverlay} details={selectedDetails} />
      )}
    </>
  );
}

export default ResponseTable;
