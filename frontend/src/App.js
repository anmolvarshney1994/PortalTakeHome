import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

function App() {
  const [shopifyUrl, setShopifyUrl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("User submitted Shopify URL:", shopifyUrl);
  };

  return (
    <Box
      sx={{
        p: 2,
        maxWidth: 400,
        margin: "auto",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            Shopify Product URL
          </Typography>
        </Box>
        <TextField
          label="Shopify Product URL"
          variant="outlined"
          value={shopifyUrl}
          onChange={(e) => setShopifyUrl(e.target.value)}
          required
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </Box>
  );
}

export default App;
