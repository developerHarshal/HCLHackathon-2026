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
  const [creditScore, setCreditScore] = useState(null);

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

  const handleCreditScore = (rowData) => {
    console.log("In handleCreditScore");
    setCreditScore(rowData.creditScore);
  }

  useEffect(() => {
    setData([
      { id: 1001, name: "User1 User1", contactNo: "9876543210", panNo: "ABCDE1234F", status: "Pending", email: "abc@gmail.com", occupation: "Private Job", income: "190000", age: "21", creditScore: "810" },
      { id: 1002, name: "User2 User2", contactNo: "9876543211", panNo: "ABCDE1234G", status: "Pending", email: "abc@gmail.com", occupation: "Private Job", income: "250000", age: "21", creditScore: "810" },
      { id: 1003, name: "User3 User3", contactNo: "9876543210", panNo: "ABCDE1234H", status: "Pending", email: "abc@gmail.com", occupation: "Private Job", income: "400000", age: "21", creditScore: "810" },
      { id: 1004, name: "User4 User4", contactNo: "9876543211", panNo: "ABCDE1234I", status: "Pending", email: "abc@gmail.com", occupation: "Private Job", income: "550000", age: "21", creditScore: "810" },
      { id: 1004, name: "User4 User4", contactNo: "9876543211", panNo: "ABCDE1234I", status: "Pending", email: "abc@gmail.com", occupation: "Private Job", income: "550000", age: "17", creditScore: "810" },
      { id: 1004, name: "User4 User4", contactNo: "9876543211", panNo: "ABCDE1234I", status: "Pending", email: "abc@gmail.com", occupation: "Private Job", income: "550000", age: "21", creditScore: "750" },
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
          <Typography variant="h4" sx={{ margin: "10px 0 10px 135px" }}>Application: {rowData?.id}</Typography>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell sx={{ border: "none"}}>
                  Name: {rowData?.name}
                </TableCell>
                <TableCell sx={{ border: "none"}}>
                  Contact No: {rowData?.contactNo}
                </TableCell>
                <TableCell sx={{ border: "none"}}>
                  Email: {rowData?.email}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ border: "none"}}>
                  PAN NO: {rowData?.panNo}
                </TableCell>
                <TableCell sx={{ border: "none"}}>
                  Occupation: {rowData?.occupation}
                </TableCell>
                <TableCell sx={{ border: "none"}}>
                  Annual Incom: {rowData?.income}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ border: "none"}}>
                  Age: {rowData?.age}
                </TableCell>
                <TableCell sx={{ border: "none"}}>
                </TableCell>
                <TableCell sx={{ border: "none"}}>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Container style={{ margin: "10px 0 10px 135px" }}>
            <Button variant="contained" color="error" onClick={() => handleCreditScore(rowData)}>
              Fetch Credit score
            </Button>
          </Container>
          {
            // creditScore ?
            //   <Container style={{ margin: "10px 0 10px 135px" }}>
            //     <TextField fullWidth label="Credit Score" margin="normal" disabled value={creditScore ? creditScore : ""} />
            //     <TextField fullWidth label="Credit limit" margin="normal" />
            //     <Button variant="contained">
            //       Approve
            //     </Button>
            //     <Button variant="contained" color="error">
            //       Reject
            //     </Button>
            //   </Container>
            // : <></>
          }
        </Box>
      </Modal>
    </>
  );
};

export default Dashboard;