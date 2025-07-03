import { Container, Typography, Card, CardContent, Grid, CardMedia, CardActions, Button, Box } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Link } from "react-router-dom";

const HelpCategories = ({ helpCategories, handleClick }) => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography
        variant="h4"
        component="h1"
        align="left"
        sx={{
          fontWeight: 600,
          mb: 1,
          color: "#1a1a1a",
          textTransform: "capitalize",
        }}
      >
        Need help ? We've got your back
      </Typography>
      <Typography variant="body1" align="left" color="text.secondary" sx={{ mb: 7 }}>
        Perhaps you can find the answer in our category.
      </Typography>
      <Grid container spacing={3}>
        {helpCategories.map((category, index) => (

          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card onClick={() => handleClick(Number(category?.TabId))} sx={{ height: "100%", display: "flex", flexDirection: "column", position: "relative", borderRadius: 3 }} elevation={1}>
              <Link
                to={`/category/${encodeURI(category?.title)}`}
                style={{
                  all: "unset",
                }}
              >

                <CardMedia sx={{ height: 200, cursor: "pointer" }} image={category.src || "https://mui.com/static/images/cards/paella.jpg"} title={category.title} />
              </Link>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography align="center" variant="h6" gutterBottom>
                  {category.title}
                </Typography>
                <Typography align="center" variant="body2" color="text.secondary">
                  {category.description}
                </Typography>
              </CardContent>
              <CardActions disableSpacing sx={{ justifyContent: "space-between" }}>
                <Box></Box>
                <Link
                  to={`/category/${encodeURI(category?.title)}}`}
                  style={{
                    textDecoration: "none",
                  }}
                > <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  endIcon={<OpenInNewIcon />}
                  sx={{
                    borderRadius: "50px",
                    textTransform: "none",
                    height: 28,
                    width: 80,
                    fontSize: 12,
                  }}
                >
                    Visit
                  </Button></Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HelpCategories;
