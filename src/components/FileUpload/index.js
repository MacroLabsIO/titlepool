import React from "react";
import { Form } from "react-bootstrap";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles.scss";

const FileUploader = React.memo((props) => {
  const hiddenFileInput = React.useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    props.handleFile(fileUploaded);
  };
  return (
    <>
      <Form.Group>
        <Form.Label className="label">
          {props.label ?? "Upload Image"}
        </Form.Label>
        <Form.Control
          id="upload"
          type="file"
          accept={props.accept}
          ref={hiddenFileInput}
          onChange={handleChange}
          style={{ display: "none" }}
        />
      </Form.Group>
      <div onClick={handleClick} className="upload-btn mb-5">
        <div className="upload-icon mb-3">
          <FontAwesomeIcon icon={faArrowUpFromBracket} fontSize="24px" />
        </div>
        {props.file ? props.file?.name : "Upload here"}
      </div>
    </>
  );
});

export default FileUploader;
