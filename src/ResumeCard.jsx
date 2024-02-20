import React from "react";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const FileCard = ({ file, onDelete }) => {
  return (
    <Card style={{ width: "80%", maxWidth: "500px", margin: "auto" }}>
      <Card.Body
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <FontAwesomeIcon icon={faFilePdf} style={{ marginRight: "20px" }} />
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
          onClick={onDelete}
        />
      </Card.Body>
    </Card>
  );
};

export default FileCard;
