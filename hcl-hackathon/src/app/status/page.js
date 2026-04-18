import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

export default function ApplicationStatusCheckPage() {
  return <div>
    <Container maxWidth="sm">
    <h1 aria-label='Application Status'>Application Status</h1><br></br>
     <TextField fullWidth margin='normal' id="outlined-basic" label="Application number" variant="outlined" tabIndex={0} /><br></br>
     <TextField fullWidth margin='normal' id="outlined-basic" label="Contact No" variant="outlined" tabIndex={0} /><br></br>
      <TextField fullWidth margin='normal' id="outlined-basic" label="Pan no" variant="outlined" tabIndex={0} /><br></br>
      <Button margin='normal' variant="contained" href="#" tabIndex={0} aria-label='Submit'>Submit</Button>
      </Container>
    </div>;
}
