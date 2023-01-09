import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Row from "../../shared/datatable/Row";

const ViewSKUS = () => {
  const [skus, setSkus] = useState([]);

  const getSkus = () => {
    axios.get("/sku/all").then((res) => {
      setSkus(res.data);
    });
  };

  useEffect(() => {
    getSkus();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Name</TableCell>
            <TableCell align="right">MSRP</TableCell>
            <TableCell align="right">Style</TableCell>
            <TableCell align="right">Color</TableCell>
            <TableCell align="right">Season</TableCell>
            <TableCell align="right">Total Inventory</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {skus.map((sku) => (
            <Row row={sku} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ViewSKUS;
