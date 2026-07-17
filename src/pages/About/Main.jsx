import { Box, Container, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { aboutImages } from "../../assets";

const HeroSection = styled(Box)(({ theme, customImage }) => ({
    backgroundImage: `url(${customImage})`,
    backgroundPosition: "right center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    padding: theme.spacing(22, 2),
    color: theme.palette.common.white,
    textAlign: "center",
}));

const features = [
    {
        title: "People",
        image: aboutImages.about1, // Replace with your image path or imported image
        description: "At Orail, we understand that your business challenges are unique to your line of work. Our comprehensive industry expertise will require customization because they directly impact industry-specific functionality and support processes that are critical to micro-verticals like yours.",
    },
    {
        title: "Technology",
        image: aboutImages.about2,
        description: "We integrate your systems and processes quickly. Our next-generation middleware, OptigoApps, leverages HTML5 so users can access it from any device. We also feature an extensive wide range of business and device types, flexible deployment options, and let you run your business in the cloud, on-site or on-mobile, a combination of both.",
    },
    {
        title: "Resources",
        image: aboutImages.about3,
        description: "Our intuitive, responsive, and elegant user experience design empowers our application to work the way you do. We've replaced traditional workflows and continued screens with a beautiful, consumer-grade interface that paves the way for assets essential to each user's role.",
    },
];

const featureCards = [
    {
        image: aboutImages.developer,
        title: "Team Collaboration",
        heading: "Get things done with your team.",
        description: "Increase your team's productivity with real time shared info, attachments, task & conversations. Use the notification center to make sure you know when the important stuff happens.",
        footer: "Every day Good day.",
    },
    {
        image: aboutImages.Delivering,
        title: "Partnership",
        heading: "Breathe With Real Depth",
        description: "We view our company as an integrated whole, not an organizational silo that barely talk to each other, or worse, work at cross purposes. That philosophy and worldview is reflected in our product suite. The OptigoApps suite is as broad as it is deep, and we do both the company, we see the suite as an integrated whole, far greater than the sum of its parts.",
    },
    {
        image: aboutImages.happyabout3,
        title: "",
        heading: "",
        description: `The OptigoApps suite wasn’t built in a day; it has taken the better part of a decade to come this far. Unlike our competitors, who periodically wake up and discover gaping product holes they have to fill urgently with acquisitions, we craft software with patience and passion. Our strategy is born of the realization that most acquisitions fail in this industry, and the customer is the one who pays the price. OptigoApps has made a commitment to offer you real depth along with breadth in our offerings.`,
    },
    {
        image: aboutImages.weinvest,
        title: "",
        heading: "",
        description: `Our investment in people
is a vital part of our
edge.`,
    },
];


export default function AboutPage() {
    const { about } = aboutImages;

    return (
        <Box sx={{ bgcolor: "white" }}>
            {/* Hero section */}
            <HeroSection customImage={about}>
                <Container maxWidth="lg">
                    <Typography variant="h3" component="h1" gutterBottom fontWeight={600}>
                        We’re all about fast, awesome service.
                    </Typography>
                    <Typography variant="subtitle1">Our team is passionate about helping you deliver amazing service that sends satisfaction through the roof.</Typography>
                </Container>
            </HeroSection>
            {/* About Us */}
            <Container maxWidth="lg" sx={{ py: 6 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: "bold",
                                mb: 3,
                                color: "#2d3748",
                                fontSize: "1.5rem",
                            }}
                        >
                            About Orail
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: "#4a5568",
                                lineHeight: 1.8,
                                mb: 2,
                                fontSize: "0.95rem",
                            }}
                        >
                            Our Retail Store, established in 2004 and headquartered in Surat, is a cloud software firm that specializes in Enterprise Solutions, Mobile Shipments and Customer Service.
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: "#4a5568",
                                lineHeight: 1.8,
                                mb: 2,
                                fontSize: "0.95rem",
                            }}
                        >
                            With over decades of experience in jewelry software industry, OptigoApps has been developing and offering software solutions to the jewelry manufacturers, wholesalers & retailers.
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: "#4a5568",
                                lineHeight: 1.8,
                                fontSize: "0.95rem",
                            }}
                        >
                            Our jewelry Software (Retail) & Order Entry (B2B) app leverages latest Cloud Computing Model to deliver cost effective and hassle free technology platform to all jewelry companies.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: "bold",
                                mb: 3,
                                color: "#2d3748",
                                fontSize: "1.5rem",
                            }}
                        >
                            About OptigoApps
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: "#4a5568",
                                lineHeight: 1.8,
                                mb: 2,
                                fontSize: "0.95rem",
                            }}
                        >
                            It highly couples all the functions starting from Order Handling to production, inventory, returns & repairs, shipments and integration of all these with accounting. Backed by our exceptional performance and after sales support.
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: "#4a5568",
                                lineHeight: 1.8,
                                mb: 2,
                                fontSize: "0.95rem",
                            }}
                        >
                            Our jewelry Software (Retail) & Order Entry (B2B) app leverages latest Cloud Computing Model to deliver cost effective and hassle free technology platform to all jewelry companies.
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: "#4a5568",
                                lineHeight: 1.8,
                                fontSize: "0.95rem",
                            }}
                        >
                            With over decades of experience in jewelry software industry, OptigoApps have been offering software solutions to the jewelry manufacturers, wholesalers & retailers. It highly couples all the functions starting from Order Handling to production, inventory, returns & repairs, shipments and integration of all these with accounting. Backed by our exceptional performance and after sales support.
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
            {/* features  */}
            <FeaturesSection features={features} />

            <Container maxWidth="lg" sx={{ py: 6 }}>
                <Grid container spacing={4}>
                    {featureCards.map((card, index) => (
                        <Grid item xs={12} md={6} key={index}>
                            <Box
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    mb: 3,
                                }}
                            >
                                <Box
                                    component="img"
                                    src={card.image}
                                    alt={card.title}
                                    sx={{
                                        width: "100%",
                                        objectFit: "contain",
                                        borderRadius: 2,
                                        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                                        padding: 0,
                                        margin: 0,
                                    }}
                                />
                            </Box>
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: "bold",
                                    mb: 2,
                                    color: "#2d3748",
                                    fontSize: "1.3rem",
                                }}
                            >
                                {card.heading}
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    color: "#4a5568",
                                    lineHeight: 1.6,
                                    fontSize: "0.9rem",
                                }}
                            >
                                {card.description}
                            </Typography>
                            {card.footer && <Typography variant="body1">{card.footer}</Typography>}
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}

const FeaturesSection = ({ features }) => {
    return (
        <Box
            sx={{
                width: "100%",
                bgcolor: "#f9f9f96e",
                py: { xs: 6, md: 10 },
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={{ xs: 4, md: 6 }}>
                    {features.map((feature, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                    gap: 2,
                                }}
                            >
                                <Box
                                    component="img"
                                    src={feature.image}
                                    alt={feature.title}
                                    sx={{
                                        width: "100%",
                                        maxHeight: 250,
                                        objectFit: "contain",
                                        borderRadius: 2,
                                        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                                        padding: 0,
                                        margin: 0,
                                    }}
                                />

                                <Typography
                                    variant="h6"
                                    component="h3"
                                    sx={{
                                        fontWeight: 600,
                                        color: "text.primary",
                                    }}
                                >
                                    {feature.title}
                                </Typography>

                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: "text.secondary",
                                        lineHeight: 1.7,
                                    }}
                                >
                                    {feature.description}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};
