import ApplicationForm from "@/components/application-form/ApplicationForm";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export const metadata = {
  title: "New Application Registration",
};

export default function NewApplicationRegistrationPage() {
  return (
    <Container maxWidth="sm" sx={{ py: 2 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        New Application Registration
      </Typography>
      <ApplicationForm />
    </Container>
  );
}
