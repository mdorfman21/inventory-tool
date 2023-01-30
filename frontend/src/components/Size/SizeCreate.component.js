import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import NavBar from "../Pageframe/Navbar";

const CreateSize = () => {
  const [sizeName, setSizeName] = useState("");
  const [file, setFile] = useState({});

  const onClick = () => {
    axios
      .post("/size/size", { size: sizeName })
      .then(() => console.log("done"));
  };

  const uploadClick = async () => {
    const fd = new FormData();
    fd.append("file", file);
    fetch("/size/upload", {
      method: "POST",
      body: fd,
    });
  };

  return (
    <>
      <NavBar />
      <Form>
        <Form.Group className="mb-3" controlId="formSizeName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={sizeName}
            onChange={(e) => setSizeName(e.target.value)}
            type="text"
            placeholder="Enter name of the size"
          />
        </Form.Group>
      </Form>
      <Button onClick={onClick}>Create</Button>
      <input
        type="file"
        onChange={(e) =>
          e.target.files[0] ? setFile(e.target.files[0]) : null
        }
      />
      <Button onClick={uploadClick}>Upload</Button>
    </>
  );
};

export default CreateSize;
