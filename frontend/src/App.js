import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import axios from "axios";

function App() {
  const [shopifyUrl, setShopifyUrl] = useState("");
  const [responseData, setResponseData] = useState(null);

  const validateUrl = (url) => {
    let trimmed = url.trim();
    if (trimmed.endsWith("/")) trimmed = trimmed.slice(0, -1);
    if (!trimmed.endsWith(".js")) trimmed += ".js";
    return trimmed;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const finalUrl = validateUrl(shopifyUrl);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/upload`,
        { shopify_url: finalUrl },
        { headers: { "Content-Type": "application/json" } }
      );
      setResponseData(response.data);
      console.log("Response from backend:", response.data);
    } catch (error) {
      console.error("Error uploading URL:", error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0D0D2B, #251E48)",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
      }}
    >
      <Grid
        container
        spacing={4}
        sx={{
          maxWidth: 1000,
          width: "100%",
          display: "flex",
          alignItems: "stretch", // Keeps both sections the same height
        }}
      >
        {/* Left Panel: Form */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            p: 4,
          }}
        >
          <Typography variant="h3" fontWeight={700} gutterBottom>
            AI Creative Generator
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 3, color: "#aaa" }}>
            Effortlessly boost your sales with AI-driven ad creatives.
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Shopify Product URL"
              variant="outlined"
              value={shopifyUrl}
              onChange={(e) => setShopifyUrl(e.target.value)}
              required
              fullWidth
              sx={{
                mb: 2,
                "& label": { color: "#ccc" },
                "& input": { color: "#fff" },
                "& fieldset": { borderColor: "#555" },
                "&:hover fieldset": { borderColor: "#fff" },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: "#ff5a5f", fontWeight: "bold", px: 4 }}
            >
              Generate Ad
            </Button>
          </form>
        </Grid>

        {/* Right Panel: Image Display */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 4,
            minHeight: 400,
            overflow: "hidden",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "8px",
          }}
        >
          {responseData?.creative_urls?.length > 0 ? (
            <>
              <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
                Generated Ad Preview
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  height: "450px", // Ensures image fits within a fixed space
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={responseData.creative_urls[0]}
                  alt="Generated Ad"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain", // Keeps image inside without cropping
                    borderRadius: 8,
                  }}
                />
              </Box>
            </>
          ) : (
            <Typography variant="h5" fontWeight={600} sx={{ opacity: 0.5 }}>
              Ad will appear here.
            </Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
