import { Box, Button, alpha } from "@mui/material";
const LoadMoreButton = ({ hasMoreVersions, isMobile, handleLoadMore, theme }) => {
  if (!hasMoreVersions) return;
  return (
    <>
      <Box textAlign="center" mt={{ xs: 4, sm: 6 }}>
        <Button
          variant="outlined"
          size={isMobile ? "medium" : "large"}
          onClick={handleLoadMore}
          sx={{
            borderRadius: 3,
            px: { xs: 3, sm: 4 },
            py: { xs: 1, sm: 1.5 },
            border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
            color: theme.palette.primary.main,
            fontWeight: 600,
            fontSize: { xs: "0.875rem", sm: "1rem" },
            "&:hover": {
              borderColor: theme.palette.primary.main,
              backgroundColor: alpha(theme.palette.primary.main, 0.05),
              transform: "translateY(-1px)",
            },
            transition: "all 0.3s ease",
          }}
        >
          Load More Versions
        </Button>
      </Box>
    </>
  );
};

export default LoadMoreButton;
