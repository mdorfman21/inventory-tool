import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import NavBar from "../../Pageframe/Navbar";

import axios from "axios";

const EditSKU = () => {
  const { sku_id } = useParams();
  const [skuName, setSkuName] = useState("");
  const [skuMsrp, setSkuMsrp] = useState(0);
  const [skuStyle, setSkuStyle] = useState("");
  const [skuColor, setSkuColor] = useState("");
  const [skuSeason, setSkuSeason] = useState("");
  const [skuHasSize, setSkuHasSize] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState("");
  const [skuId, setSkuId] = useState("");

  const getSizes = () => {
    axios.get("/size/sizes").then((res) => setSizes(res.data));
  };

  const getSku = () => {
    axios.get(`/sku/${sku_id}`).then((res) => {
      setSkuName(res.data.name);
      setSkuMsrp(res.data.msrp);
      setSkuStyle(res.data.style);
      setSkuColor(res.data.color);
      setSkuSeason(res.data.season);
      setSkuHasSize(res.data.hasSize);
      setSkuId(res.data.sku_id);
      if (res.data.hasSize) {
        const sizes = [];
        res.data.associatedSizes.forEach((sku) => sizes.push(sku.Size.id));
        setSelectedSizes(sizes);
      }
    });
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
      .put(`/sku/edit/${sku_id}`, {
        name: skuName,
        msrp: skuMsrp,
        style: skuStyle,
        color: skuColor,
        season: skuSeason,
        sizes: selectedSizes,
        skuHasSize: skuHasSize,
        sku_id: skuId,
      })
      .then((res) => {
        console.log(res);
      });
  };

  useEffect(() => {
    getSizes();
    getSku();
  }, []);

  console.log(selectedSizes);

  return (
    <>
      <NavBar />
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
            checked={skuHasSize}
            value={skuHasSize}
            onChange={(e) => setSkuHasSize(e.target.checked)}
          />
        </Form.Group>
        {skuHasSize &&
          sizes.map((size) => (
            <Form.Check
              checked={selectedSizes.some((strSize) => strSize == size.id)}
              value={size.id}
              label={size.size}
              key={size.id}
              onChange={(e) => onSelectedSizesChange(e.target)}
            />
          ))}
        <Button onClick={onClick}>Edit</Button>
      </Form>
    </>
  );
};

export default EditSKU;
