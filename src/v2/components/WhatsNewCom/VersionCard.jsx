import { Box, Typography, Chip, List, ListItem, ListItemIcon, ListItemText, Paper, alpha, Divider } from "@mui/material";
import { FiberManualRecord as DotIcon, AutoAwesome as SparklesIcon } from "@mui/icons-material";
const VersionCard = ({ version, sections, isLatest, theme, isMobile }) => (
  <Paper
    sx={{
      mb: 3,
      overflow: "hidden",
    }}
    elevation={0}
    role="article"
    aria-labelledby={`version-${version}`}
  >
    {/* Header Section */}
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        mb: 2,
        bgcolor: "#d8d8d83d",
        px: 2,
        borderRadius: 8,
      }}
    >
      <Typography id={`version-${version}`} variant={isMobile ? "h6" : "h5"} fontWeight={600} sx={{ flexGrow: 1 }} py={2}>
        Version {version}
      </Typography>
      {isLatest && (
        <Chip
          label="LATEST"
          size="small"
          sx={{
            background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            color: "white",
            fontWeight: 600,
            fontSize: { xs: "0.6rem", sm: "0.7rem" },
            height: { xs: 20, sm: 24 },
          }}
        />
      )}
    </Box>

    <Divider
      sx={{
        mb: 3,
        borderColor: alpha(theme.palette.text.primary, 0.1),
      }}
    />

    {/* Content Sections */}
    <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 2, sm: 3 }, pl: { xs: 1, sm: 3 } }}>
      {sections.map((section, idx) => (
        <Box key={`${version}-${idx}`}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            sx={{
              textTransform: "capitalize",
              fontFamily: "monospace",
              letterSpacing: 0.5,
              color: "text.secondary",
              mb: 1,
              fontSize: { xs: "0.9rem", sm: "1rem" },
            }}
          >
            {section.title}
          </Typography>
          <List
            dense
            sx={{
              pl: { xs: 0, sm: 1 },
              "& .MuiListItem-root": {
                px: 0,
                py: 0.25,
              },
            }}
          >
            {section.items.map((item, i) => (
              <ListItem key={`${version}-${idx}-${i}`}>
                <ListItemIcon sx={{ minWidth: { xs: 20, sm: 24 } }}>
                  <DotIcon
                    sx={{
                      fontSize: { xs: 10, sm: 12 },
                      color: theme.palette.primary.dark,
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={item}
                  primaryTypographyProps={{
                    variant: "body2",
                    sx: {
                      lineHeight: 1.5,
                      fontSize: { xs: "0.85rem", sm: "0.95rem" },
                      color: "text.primary",
                    },
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      ))}
    </Box>
  </Paper>
);

export default VersionCard;
