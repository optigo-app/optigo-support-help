import { Box, Container, Typography, TextField, Button, InputAdornment } from "@mui/material";
import { Search as SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HelpHero = ({ setSearchQuery, searchQuery }) => {
  const [searchTerm, setSearchTerm] = useState(searchQuery || "");


  const navigate = useNavigate();
  const HandleSearchOnEnter = () => {
    setSearchQuery(searchTerm);
    const Parsed = encodeURIComponent(searchTerm);
    navigate(`/help?query=${Parsed}`);
  };

  useEffect(() => {
    setSearchTerm(searchQuery);
  }, [searchQuery])

  return (
    <>
      <Box
        sx={{
          background: "#F8F9FA",
          py: 14,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", position: "relative", zIndex: 2 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: "bold",
                mb: 4,
                fontSize: { xs: "2rem", md: "3rem" },
                textTransform: "capitalize",
              }}
            >
              frequently asked questions ?
            </Typography>
            <Box sx={{ maxWidth: 600, mx: "auto", bgcolor: "white", borderRadius: 2, border: "none" }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(event) => event.key === "Enter" && HandleSearchOnEnter()}
                sx={{}}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "#666" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        onClick={() => HandleSearchOnEnter()}
                        variant="contained"
                        sx={{
                          px: 3,
                          borderRadius: 1,
                        }}
                      >
                        Search
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default HelpHero;
