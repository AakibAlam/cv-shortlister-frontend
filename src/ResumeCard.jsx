import React from "react";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const FileCard = ({ file, onDelete }) => {
  return (
    <Card style={{ width: "40%", margin: "auto" }}>
      <Card.Body
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
          }}
        >
          <FontAwesomeIcon icon={faFilePdf} style={{ marginRight: "10px" }} />
          <a
            href={URL.createObjectURL(file)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {file.name}
          </a>
        </div>
        <FontAwesomeIcon
          icon={faTimesCircle}
          style={{ cursor: "pointer" }}
          onClick={onDelete} // Fixed this line
        />
      </Card.Body>
    </Card>
  );
};

export default FileCard;
