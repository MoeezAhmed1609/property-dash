import React, { useEffect, useState } from 'react'
import DefaultLayout from '../../layout/DefaultLayout'
// import { Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import { collection, onSnapshot, query, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../Config';
import { Box, Typography, Table, TableContainer, TableHead, TableBody, TableCell, TableRow, IconButton, Collapse } from '@mui/material';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    // Handling deal done
    const HandleDeal = async (id, status) => {
        const washingtonRef2 = doc(db, "Contact__Form", id);
        let s = status === "pending" ? "done" : "pending";
        await updateDoc(washingtonRef2, {
            status: s,
        });
        console.log("Status updated!");
    };

    // const handleActiveUpdate = async (id, active) => {
    //     const washingtonRef2 = doc(db, "properties", id);
    //     let a = !active;
    //     await updateDoc(washingtonRef2, {
    //         isActive: a,
    //     });
    //     alert("Property deactivated!");
    // };
    console.log({ row })
    return (
        <React.Fragment>
            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                <TableCell component="th" scope="row" sx={{ color: "#cbd0d6" }}>
                    {row.name}
                </TableCell>
                <TableCell sx={{ color: "#cbd0d6" }}>{row.Phone}</TableCell>
                <TableCell sx={{ color: "#cbd0d6" }}>{row.Email}</TableCell>
                <TableCell sx={{ color: "#cbd0d6" }}>{row.Subject}</TableCell>
                <TableCell sx={{ color: "#cbd0d6" }}>
                    <span
                        className="text-green-800 inline-flex cursor-pointer rounded-full  border-2 px-3 text-xs font-semibold leading-5 hover:bg-[#6ee7b7] hover:text-white"
                        style={{ borderColor: "#6ee7b7" }}
                        onClick={() => HandleDeal(row?.id, row.status ? row.status : "pending")}
                    >
                        {row.status ? row.status : "pending"}
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
                            <Typography variant="h6">
                                Message
                            </Typography>
                            <Typography variant="subtitle1" sx={{ paddingLeft: "5px" }}>
                                {row.Message}
                            </Typography>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function Contact() {
    // Modal
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [contact, setContact] = useState([]);

    const ContactData = async () => {
        const q = query(collection(db, "/Contact__Form"));
        const unsubscribe = await onSnapshot(q, (querySnapshot) => {
            const cities = [];
            querySnapshot.forEach((doc) => {
                cities.push({ id: doc.id, ...doc.data() });
            });
            setContact(cities)
        });
    }
    useEffect(() => {
        ContactData()
    }, [])

    console.log({ contact })

    return (
        <DefaultLayout>

            <div className="w-full h-screen">
                <div className="w-full overflow-hidden rounded-lg shadow-xs">
                    <div className="w-full overflow-x-auto">
                        <TableContainer>
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
                                            Phone
                                        </TableCell>
                                        <TableCell
                                            sx={{ color: "#aab2bb", paddingY: 1, textTransform: "uppercase" }}
                                        >
                                            Email
                                        </TableCell>
                                        <TableCell
                                            sx={{ color: "#aab2bb", paddingY: 1, textTransform: "uppercase" }}
                                        >
                                            Subject
                                        </TableCell>
                                        <TableCell
                                            sx={{ color: "#aab2bb", paddingY: 1, textTransform: "uppercase" }}
                                        >
                                            Status
                                        </TableCell>
                                        <TableCell
                                            sx={{ color: "#aab2bb", paddingY: 1, textTransform: "uppercase" }}
                                        >
                                            Message
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody sx={{ background: 'white' }}>
                                    {contact?.map((row, i) => (
                                        <Row key={i} row={row} />
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>


            </div>


        </DefaultLayout>
    )
}


