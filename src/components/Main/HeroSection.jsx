import { Search } from "lucide-react";
import { styled } from "@mui/styles";
import { Box, Container, Typography, TextField, InputAdornment, Chip } from "@mui/material";
import {  CategoryWiseHelp } from "../../constants/faqData";
const GradientBox = styled(Box)(({ theme }) => ({
  background: theme.palette.optigo.gradient,
  color: "#3B3B3B",
}));

const HeroSection = ({ searchQuery, setSearchQuery, onSearchEnter }) => {
  return (
    <GradientBox sx={{ py: 20 }}>
      <Container maxWidth="md">
        <Typography
          variant="h1"
          align="center"
          gutterBottom
          sx={{
            fontSize: {
              md: 45,
              xs: 40,
            },
          }}
        >
          Help Centre ?
        </Typography>
        <Typography
          variant="body1"
          align="center"
          sx={{
            mb: 4,
            opacity: 0.9,
            fontSize: {
              md: 18,
              xs: 15,
            },
          }}
        >
          We understand that sometimes you may encounter difficulties or have questions while using our services. That's why we've created this comprehensive guide to help you navigate through any challenges you might face.'
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search for help articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={onSearchEnter}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: "text.secondary" }} />
              </InputAdornment>
            ),
            sx: {
              bgcolor: "white",
              borderRadius: 2,
            },
          }}
          sx={{ maxWidth: 600, mx: "auto", display: "block" }}
        />
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1, maxWidth: "600px", mx: "auto" }}>
          {CategoryWiseHelp?.slice(0, 4)?.map((suggestion) => (
            <Chip
              key={suggestion}
              label={suggestion}
              onClick={() => setSearchQuery(suggestion)}
              sx={{
                bgcolor: "rgba(243, 231, 61, 0.81)",
                "&:hover": { bgcolor: "rgb(255, 238, 0)" },
              }}
            />
          ))}
        </Box>
      </Container>
    </GradientBox>
  );
};

export default HeroSection;
