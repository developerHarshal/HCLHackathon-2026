'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
} from "@mui/material";

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const handleLogin = () => {
    console.log("In handleLogin", username, password);
    // dispatch(login({ name: "User" }));
    router.push("/approver/dashboard");
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "100px" }}>
      <Card>
        <CardContent>
          <Typography variant="h5">Approver Login</Typography>
          <TextField fullWidth label="Username" margin="normal" onChange={(evt) => setUsername(evt.target.value.trim())} />
          <TextField fullWidth label="Password" type="password" margin="normal" onChange={(evt) => setPassword(evt.target.value.trim())} />
          <Button variant="contained" fullWidth onClick={handleLogin} disabled={!username || !password}>
            Login
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;