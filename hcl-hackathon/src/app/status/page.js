import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

export default function ApplicationStatusCheckPage() {
  return <div>
    <Container maxWidth="sm">
    <h1>Application Status</h1><br></br>
     <TextField id="outlined-basic" label="Application number" variant="outlined" /><br></br>
     <TextField id="outlined-basic" label="Contact No" variant="outlined" /><br></br>
      <TextField id="outlined-basic" label="Pan no" variant="outlined" /><br></br>
      <Button variant="contained" href="#">Submit</Button>
      </Container>
    </div>;
}
