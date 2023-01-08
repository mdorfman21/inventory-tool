import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";

const CreateSize = () => {
  const [sizeName, setSizeName] = useState("");

  const onClick = () => {
    axios
      .post("/size/size", { size: sizeName })
      .then(() => console.log("done"));
  };

  return (
    <>
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
    </>
  );
};

export default CreateSize;
