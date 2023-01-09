import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";

const CreateInventory = () => {
  const [inventory, setInventory] = useState("");
  const [sku, setSku] = useState({});
  const onClick = () => {};
  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="formSizeName">
          <Form.Label>Inventory</Form.Label>
          <Form.Control
            value={inventory}
            onChange={(e) => setInventory(e.target.value)}
            type="number"
            placeholder="Enter name of the size"
          />
        </Form.Group>
      </Form>
      <Button onClick={onClick}>Create</Button>
    </>
  );
};

export default CreateInventory;
