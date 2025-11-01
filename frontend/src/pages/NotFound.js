import React from "react";
import { Container, Typography, Box } from "@mui/material";

const NotFound = () => (
  <Container sx={{ mt: 5 }}>
    <Box textAlign="center">
      <Typography variant="h3" color="error">404</Typography>
      <Typography>Page not found</Typography>
    </Box>
  </Container>
);

export default NotFound;
