import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const Row = (props) => {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  console.log(row);

  const addInventoryClick = () => {};

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.msrp}</TableCell>
        <TableCell align="right">{row.style}</TableCell>
        <TableCell align="right">{row.color}</TableCell>
        <TableCell align="right">{row.season}</TableCell>
        <TableCell align="right">{row.totalInventory}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Sizes
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Size</TableCell>
                    <TableCell align="right">Inventory</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.associatedSizes.map((assSize) => (
                    <TableRow key={assSize.id}>
                      <TableCell component="th" scope="row">
                        {assSize.Size.size}
                      </TableCell>
                      <TableCell>{assSize.size}</TableCell>
                      <TableCell>
                        {assSize.InventoryId ? (
                          assSize.Inventory.amount
                        ) : (
                          <Link to={`/new/inventory/${assSize.id}`}>
                            <Button>Add Inventory</Button>
                          </Link>
                        )}
                      </TableCell>

                      {/* <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default Row;
