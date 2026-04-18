'use client';
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Box,
  Chip,
  Card,
  Container,
  Typography,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Modal,
  colors
} from "@mui/material";

const Dashboard = () => {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);
  const [rowData, setRowData] = useState(null);

  const handleLogout = () => {
    console.log("In handleLogout");
    // dispatch(logout());
    router.push("/approver/login");
  };

  const handleRowClick = (record) => {
    console.log("In handleRowClick", rowData);
    setRowData(record);
    setOpen(true);
  }

  useEffect(() => {
    setData([
      { id: 1001, name: "User1 User1", contactNo: "9876543210", panNo: "ABCDE1234F", status: "Pending" },
      { id: 1002, name: "User2 User2", contactNo: "9876543211", panNo: "ABCDE1234G", status: "Pending" },
      { id: 1003, name: "User3 User3", contactNo: "9876543210", panNo: "ABCDE1234H", status: "Pending" },
      { id: 1004, name: "User4 User4", contactNo: "9876543211", panNo: "ABCDE1234I", status: "Pending" },
    ]);
  }, [])

  return (
    <>
      <Container style={{ marginTop: "10px", display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4">Approver Dashboard</Typography>
        <Button variant="contained" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Container>
      <TableContainer component={Card} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Contact No.</TableCell>
              <TableCell>PAN No.</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.contactNo}</TableCell>
                <TableCell>{row.panNo}</TableCell>
                <TableCell>
                  <Chip
                    label={row.status}
                    color="warning"
                    onClick={() => handleRowClick(row)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setRowData(null);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            width: 600,
            background: "#fff",
            top: 50,
            left: 200
          }}
        >
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  ID: {rowData?.id}
                </TableCell>
                <TableCell>
                  Name: {rowData?.name}
                </TableCell>
                <TableCell>
                  Contact No: {rowData?.contactNo}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  PAN NO: {rowData?.panNo}
                </TableCell>
                <TableCell>
                  Status: {rowData?.status}
                </TableCell>
                <TableCell>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Modal>
    </>
  );
};

export default Dashboard;