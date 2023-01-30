import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import NavBar from "../../Pageframe/Navbar";

const CreateSKU = () => {
  const [skuName, setSkuName] = useState("");
  const [skuMsrp, setSkuMsrp] = useState("");
  const [skuStyle, setSkuStyle] = useState("");
  const [skuColor, setSkuColor] = useState("");
  const [skuSeason, setSkuSeason] = useState("");
  const [skuHasSize, setSkuHasSize] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [skuId, setSkuId] = useState("");

  const getSizes = () => {
    axios.get("/size/sizes").then((res) => setSizes(res.data));
  };

  const onSelectedSizesChange = (target) => {
    if (target.checked) {
      setSelectedSizes([...selectedSizes, target.value]);
    } else if (!target.checked) {
      const filtered = selectedSizes.filter((size) => size !== target.id);
      setSelectedSizes(filtered);
    }
  };

  const onClick = () => {
    axios
      .post("/sku/create", {
        name: skuName,
        msrp: skuMsrp,
        style: skuStyle,
        color: skuColor,
        season: skuSeason,
        sizes: selectedSizes,
        skuHasSize: skuHasSize,
        skuId: skuId,
      })
      .then((res) => {
        console.log(res);
      });
  };

  useEffect(() => {
    getSizes();
  }, []);

  return (
    <>
      <NavBar />
      <h3>You are now creating a SKU</h3>
      <Form>
        <Form.Group className="mb-3" controlId="formSkuName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={skuName}
            onChange={(e) => setSkuName(e.target.value)}
            type="text"
            placeholder="Enter name of SKU"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formSkuName">
          <Form.Label>SKU ID</Form.Label>
          <Form.Control
            value={skuId}
            onChange={(e) => setSkuId(e.target.value)}
            type="text"
            placeholder="Enter ID of SKU"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formSkuMsrp">
          <Form.Label>MSRP $</Form.Label>
          <Form.Control
            value={skuMsrp}
            onChange={(e) => setSkuMsrp(e.target.value)}
            type="number"
            placeholder="Enter MSRP"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Style</Form.Label>
          <Form.Control
            value={skuStyle}
            onChange={(e) => setSkuStyle(e.target.value)}
            type="text"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Color</Form.Label>
          <Form.Control
            type="text"
            value={skuColor}
            onChange={(e) => setSkuColor(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Season</Form.Label>
          <Form.Control
            value={skuSeason}
            onChange={(e) => setSkuSeason(e.target.value)}
            type="text"
          />
        </Form.Group>
        <Form.Group>
          <Form.Check
            type="switch"
            label="Does your Sku have a size chart?"
            value={skuHasSize}
            onChange={(e) => setSkuHasSize(e.target.checked)}
          />
        </Form.Group>
        {skuHasSize &&
          sizes.map((size) => (
            <Form.Check
              value={size.id}
              label={size.size}
              key={size.id}
              onChange={(e) => onSelectedSizesChange(e.target)}
            />
          ))}
        <Button onClick={onClick}>Create</Button>
      </Form>
    </>
  );
};

export default CreateSKU;
