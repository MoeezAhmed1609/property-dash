import * as React from "react";
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
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../Config";

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  // Handling deal done
  const HandleDeal = async (id, status) => {
    const washingtonRef2 = doc(db, "BrokerEnquiry", id);
    let s = status === "pending" ? "done" : "pending";
    await updateDoc(washingtonRef2, {
      Deal: s,
    });
    console.log("Status updated!");
  };

  const handleActiveUpdate = async (id, active) => {
    const washingtonRef2 = doc(db, "properties", id);
    let a = !active;
    await updateDoc(washingtonRef2, {
      isActive: a,
    });
    alert("Property deactivated!");
  };
  console.log({ row });
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row" sx={{ color: "#cbd0d6" }}>
          {row.name}
        </TableCell>
        <TableCell sx={{ color: "#cbd0d6" }}>{row.Email}</TableCell>
        <TableCell sx={{ color: "#cbd0d6" }}>{row.phone}</TableCell>
        <TableCell sx={{ color: "#cbd0d6" }}>{row.properties.length}</TableCell>
        <TableCell sx={{ color: "#cbd0d6" }}>
          <span
            className="text-green-800 inline-flex cursor-pointer rounded-full  border-2 px-3 text-xs font-semibold leading-5 hover:bg-[#6ee7b7] hover:text-white"
            style={{ borderColor: "#6ee7b7" }}
            onClick={() => HandleDeal(row?._id, row?.Deal)}
          >
            {row.Deal}
          </span>
        </TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            sx={{ color: "#cbd0d6" }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Properties
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.properties?.map((property, i) => (
                    <TableRow key={i}>
                      <TableCell component="th" scope="row">
                        {property?.Property_Name}
                      </TableCell>
                      <TableCell>{property?.County}</TableCell>
                      <TableCell align="right">
                        {property?.Property_Type}
                      </TableCell>
                      <TableCell align="right">
                        ${property?.Property_Price}
                      </TableCell>
                      <TableCell align="right">
                        <span
                          className="text-green-800 inline-flex cursor-pointer rounded-full  border-2 px-3 text-xs font-semibold leading-5 hover:bg-[#6ee7b7] hover:text-white"
                          style={{ borderColor: "#6ee7b7" }}
                          onClick={() =>
                            handleActiveUpdate(
                              property?._id,
                              property?.isActive
                            )
                          }
                        >
                          Deactivate
                        </span>
                      </TableCell>
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
}

export default function BrokerTable({ rows }) {
  console.log(rows);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow sx={{ background: "#1a222c" }}>
            <TableCell
              sx={{ color: "#aab2bb", paddingY: 1, textTransform: "uppercase" }}
            >
              Name
            </TableCell>
            <TableCell
              sx={{ color: "#aab2bb", paddingY: 1, textTransform: "uppercase" }}
            >
              Email
            </TableCell>
            <TableCell
              sx={{ color: "#aab2bb", paddingY: 1, textTransform: "uppercase" }}
            >
              Phone No.
            </TableCell>
            <TableCell
              sx={{ color: "#aab2bb", paddingY: 1, textTransform: "uppercase" }}
            >
              Total Properties
            </TableCell>
            <TableCell
              sx={{ color: "#aab2bb", paddingY: 1, textTransform: "uppercase" }}
            >
              Deal
            </TableCell>
            <TableCell sx={{ color: "#aab2bb", paddingY: 1 }} align="right" />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row, i) => (
            <Row key={i} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
