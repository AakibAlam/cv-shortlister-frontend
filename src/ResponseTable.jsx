import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Row, Col, Spinner } from "react-bootstrap";
import OverlayCard from "./DetailForm";
import axios from "axios";

function ResponseTable() {
  const location = useLocation();
  const [result, setResult] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [allScoresReceived, setAllScoresReceived] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  const [sortDirection, setSortDirection] = useState("desc"); // State variable to store sort direction
  const [sortedResult, setSortedResult] = useState([]); // State variable to store sorted result

  const files = location.state?.files;

  const pollServer = async () => {
    try {
      // const response = await axios.get("http://localhost:8000/poll/");
      const response = await axios.get(
        "https://cv-shortlister-backend.azurewebsites.net/poll/"
      );
      setResult((prevResult) => [...prevResult, ...response.data]);
    } catch (error) {
      console.error("Error polling server:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(pollServer, 5000);
    setIntervalId(interval); // Store the interval ID
    return () => clearInterval(interval);
  }, []); // Run only once on component mount

  useEffect(() => {
    if (result.length === files.length) {
      setAllScoresReceived(true);
      clearInterval(intervalId); // Stop polling when all scores are received
    }
  }, [result, files, intervalId]);

  useEffect(() => {
    setSortedResult(
      result.slice().sort((a, b) => {
        if (sortDirection === "asc") {
          return a.score - b.score;
        } else {
          return b.score - a.score;
        }
      })
    );
  }, [result, sortDirection]);

  const handleViewDetails = (data) => {
    setSelectedDetails(data.details);
    setShowOverlay(true);
  };

  const handleCloseOverlay = () => {
    setSelectedDetails(null);
    setShowOverlay(false);
  };

  const handleSort = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  return (
    <>
      <h1 style={{ margin: "2rem" }}>
        {!allScoresReceived ? (
          <>
            {files.length - result.length} Resumes left{" "}
            <Spinner style={{ marginLeft: "20px" }} animation="border" />
          </>
        ) : (
          <>Completed :)</>
        )}
      </h1>
      <hr style={{ margin: "2rem" }} />

      <Row style={{ margin: "2rem" }}>
        <Col sm={4}>
          <div>
            <h4>Recommended Profiles</h4>
            <p style={{ fontSize: "20px" }}>Resumes fit for the job role </p>
          </div>
        </Col>
        <Col sm={8}>
          <table style={{ width: "100%" }}>
            <thead style={{ backgroundColor: "aliceblue" }}>
              <tr>
                <th>Name</th>
                <th onClick={handleSort} style={{ cursor: "pointer" }}>
                  Score {sortDirection === "asc" ? "▲" : "▼"}
                </th>
                <th>Resume</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {sortedResult.map((data, index) => (
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
