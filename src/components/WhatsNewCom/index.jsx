import { useState, useMemo, useCallback } from "react";
import { Box, Container, useTheme, useMediaQuery } from "@mui/material";
import { releaseNotesData } from "../../constants/releaseNotesData";
import VersionCard from "./VersionCard";
import HeroW from "./HeroW";
import LoadMoreButton from "./LoadMoreButton";
import VersionFilter from "./VersionFilter";

export default function ReleaseNotes() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const isTablet = useMediaQuery(theme.breakpoints.down("md"));

    const [visibleVersions, setVisibleVersions] = useState(3);
    const [selectedVersion, setSelectedVersion] = useState("All versions");

    const versions = useMemo(() => Object.keys(releaseNotesData), []);
    const latestVersion = useMemo(() => versions[0], [versions]);

    // Filter versions based on selection
    const filteredVersions = useMemo(() => {
        if (selectedVersion === "All versions" || !selectedVersion) {
            return versions;
        }
        return [selectedVersion];
    }, [versions, selectedVersion]);

    // Apply visibility limit only when showing all versions 
    const visibleVersionsData = useMemo(() => {
        if (selectedVersion === "All versions" || !selectedVersion) {
            return filteredVersions.slice(0, visibleVersions);
        }
        return filteredVersions; // Show selected version without limit 
    }, [filteredVersions, visibleVersions, selectedVersion]);

    const handleLoadMore = useCallback(() => {
        setVisibleVersions((prev) => Math.min(prev + 2, versions.length));
    }, [versions.length]);

    const handleVersionChange = useCallback((newVersion) => {
        console.log("Selected version:", newVersion);
        setSelectedVersion(newVersion);

        if (newVersion === "All versions") {
            setVisibleVersions(3);
        }
    }, []);

    const hasMoreVersions = useMemo(() => {
        return (selectedVersion === "All versions" || !selectedVersion) &&
            visibleVersions < versions.length;
    }, [selectedVersion, visibleVersions, versions.length]);

    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "background.default",
            }}
        >
            <HeroW theme={theme} isMobile={isMobile} isTablet={isTablet} />
            <VersionFilter
                onChange={handleVersionChange}
                defaultVersion="All versions"
            />
            <Container
                maxWidth="lg"
                sx={{
                    py: { xs: 3, sm: 4, md: 4 },
                    px: { xs: 2, sm: 3, md: 4 },
                }}
            >
                <Box sx={{ mx: "auto", maxWidth: 900 }}>
                    {visibleVersionsData.map((version) => {
                        const sections = releaseNotesData[version];
                        if (!sections || !Array.isArray(sections) || sections.length === 0) {
                            return null;
                        }
                        const isLatest = version === latestVersion;
                        return (
                            <VersionCard
                                key={version}
                                version={version}
                                sections={sections}
                                isLatest={isLatest}
                                theme={theme}
                                isMobile={isMobile}
                            />
                        );
                    })}
                </Box>
                {hasMoreVersions && (
                    <LoadMoreButton
                        handleLoadMore={handleLoadMore}
                        hasMoreVersions={hasMoreVersions}
                        isMobile={isMobile}
                        theme={theme}
                    />
                )}
            </Container>
        </Box>
    );
}