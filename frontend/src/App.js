import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import axios from "axios";

function App() {
  const [shopifyUrl, setShopifyUrl] = useState("");

  // Validator that removes a trailing slash if it exists,
  // then ensures the URL ends with ".js".
  const validateUrl = (url) => {
    let trimmed = url.trim();

    // 1. Remove trailing slash if present
    if (trimmed.endsWith("/")) {
      trimmed = trimmed.slice(0, -1);
    }

    // 2. Check if it ends with ".js"; if not, append ".js"
    if (!trimmed.endsWith(".js")) {
      trimmed += ".js";
    }

    return trimmed;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const finalUrl = validateUrl(shopifyUrl);
    try {
      // Send the shopifyUrl to the backend as JSON
      console.log("Sending to:", process.env.REACT_APP_BACKEND_URL + "/upload");
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/upload`,
        { shopify_url: finalUrl },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response from backend:", response.data);
    } catch (error) {
      console.error("Error uploading URL:", error);
    }
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
          <TextField
            label="Shopify Product URL"
            variant="outlined"
            value={shopifyUrl}
            onChange={(e) => setShopifyUrl(e.target.value)}
            required
            fullWidth
            sx={{ mb: 2 }}
          />
        </Box>

        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </Box>
  );
}

export default App;
