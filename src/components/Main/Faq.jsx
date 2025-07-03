import { Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import {Link} from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { FaqList } from "../../constants/faqData";
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
const Faq = ({ expanded, handleChange }) => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 600,
            mb: 1,
            color: "#1a1a1a",
          }}
        >
          FAQ's
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "#666",
            mb: 1,
            lineHeight: 1.6,
          }}
        >
          Everything you need to know about the product and other information. Can't find the answer you're looking for?
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "#666",
            lineHeight: 1.6,
          }}
        >
          Say hi at{" "}
          <Link
            href="mailto:support@orail.in"
            sx={{
              color: "#2196f3",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            support@orail.in
          </Link>
        </Typography>
      </Box>

      <Box sx={{ width: "100%" }}>
        {FaqList?.slice(0, 10)?.map((faq, index) => (
          <Accordion
            key={index}
            expanded={expanded === index}
            onChange={handleChange(index)}
            sx={{
              boxShadow: "none",
              border: "none",
              borderBottom: "1px solid #e5e5e5",
              borderRadius: "0 !important",
              "&:before": {
                display: "none",
              },
              "&.Mui-expanded": {
                margin: 0,
              },
              py: 1,
            }}
          >
            <AccordionSummary
              expandIcon={
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    backgroundColor: "lightgray",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                  }}
                >
                  {expanded === index ? <RemoveIcon sx={{ fontSize: 16 }} /> : <AddIcon sx={{ fontSize: 16 }} />}
                </Box>
              }
              sx={{
                minHeight: "auto",
                "& .MuiAccordionSummary-content": {
                  margin: "16px 0",
                  "&.Mui-expanded": {
                    margin: "16px 0",
                  },
                },
                "& .MuiAccordionSummary-expandIconWrapper": {
                  "&.Mui-expanded": {
                    transform: "none",
                  },
                },
                px: 0,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 500,
                  color: "#1a1a1a",
                  fontSize: {
                    xs: 17,
                    md: 18,
                  },
                }}
              >
                {faq.question}
              </Typography>
            </AccordionSummary>

            {faq.answer && (
              <AccordionDetails
                sx={{
                  px: 0,
                  pt: 0,
                  pb: 2,
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: "#878787",
                    lineHeight: 1.6,
                    fontSize: {
                      xs: 15,
                      md: 18,
                    },
                  }}
                  dangerouslySetInnerHTML={{ __html: faq.answer }} />

              </AccordionDetails>
            )}
          </Accordion>
        ))}
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography
          component={Link}         // Render Typography as a Link
          to="/help?show_more=true"   // The route you want to navigate to
          sx={{
            textDecoration: 'none',  // Remove underline by default
            color: 'primary.main',   // Use theme primary color (like a link)
            cursor: 'pointer',
            '&:hover': {
              textDecoration: 'underline', // Show underline on hover
            },
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.5,
          }}
        >
          Show More <MoreHorizRoundedIcon fontSize="small" />
        </Typography>
      </Box>

    </Container>
  );
};

export default Faq;
