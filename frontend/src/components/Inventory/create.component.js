import React, { useState, useEffect } from "react";
import { useParams, redirect } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import NavBar from "../Pageframe/Navbar";

const CreateInventory = () => {
  const { id } = useParams();
  const [inventory, setInventory] = useState("");
  const [sku, setSku] = useState({});
  const onClick = () => {
    axios
      .post("/inventory/new", {
        sku_id: sku.sku_id,
        size: sku.SizeId,
        amount: inventory,
      })
      .then(() => redirect("/sku"));
  };
  useEffect(() => {
    axios.get(`/sku/sku/${id}`).then((res) => {
      setSku(res.data);
    });
    //get sku
  }, []);
  return (
    <>
      <NavBar />
      <Form>
        <Form.Group className="mb-3" controlId="formSizeName">
          <Form.Label>Inventory</Form.Label>
          <Form.Control
            value={inventory}
            onChange={(e) => setInventory(e.target.value)}
            type="number"
            placeholder="Enter starting inventory"
          />
        </Form.Group>
      </Form>
      <Button onClick={onClick}>Create</Button>
    </>
  );
};

export default CreateInventory;
