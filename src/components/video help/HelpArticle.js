import React from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  ThemeProvider,
  createTheme,
  CssBaseline,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Divider,
  Card,
  CardContent,
  Grid,
  Popover,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import LinkIcon from "@mui/icons-material/Link";
import OpenInNewIcon from "@mui/icons-material/OpenInNewRounded";
import SkipNextIcon from "@mui/icons-material/SkipNextRounded";
import SkipPreviousIcon from "@mui/icons-material/SkipPreviousRounded";
import IconButton from "@mui/material/IconButton";
import Slider from "@mui/material/Slider";
import "@fontsource-variable/manrope";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import { ROLES } from "./TrainingData";
import { HELP_VIDEOS } from "./HelpVideosData";
import { FaqList } from "../../constants/faqData";
import QuizRoundedIcon from "@mui/icons-material/QuizRounded";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";

const theme = createTheme({
  typography: {
    fontFamily: '"Manrope Variable", sans-serif',
    h4: { fontWeight: 600, fontSize: "1.75rem", color: "#111827" },
    h5: { fontWeight: 600, fontSize: "1.25rem", color: "#111827" },
    body1: { fontSize: "0.95rem", color: "#374151" },
    body2: { fontSize: "0.875rem", color: "#6B7280" },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          borderColor: "#F3F4F6",
          boxShadow: "none",
          border: "1px solid #E5E7EB",
        },
      },
    },
  },
});

const recommendedVideos = [
  {
    id: "dQw4w9WgXcQ",
    title: "Advanced Board Management",
    duration: "5:20",
    views: "12K views",
    author: "Optigo Team",
    category: "Advanced",
    categoryColor: "#8B5CF6",
  },
  {
    id: "ScMzIvxBSi4",
    title: "Collaboration Best Practices",
    duration: "4:15",
    views: "8.4K views",
    author: "Optigo Team",
    category: "Teamwork",
    categoryColor: "#3B82F6",
  },
  {
    id: "9bZkp7q19f0",
    title: "Dashboard Overview & Navigation",
    duration: "3:48",
    views: "21K views",
    author: "Optigo Team",
    category: "Beginner",
    categoryColor: "#10B981",
  },
  {
    id: "vjVkiyKr3Dg",
    title: "Managing Notifications & Alerts",
    duration: "6:02",
    views: "5.1K views",
    author: "Optigo Team",
    category: "Settings",
    categoryColor: "#F59E0B",
  },
];

const bentoArticles = [
  {
    title: "Keyboard Shortcuts",
    type: "Quick Reference",
    color: "#EC4899",
    span: 4,
    description:
      "Master every shortcut to navigate faster and work smarter without touching your mouse.",
    readTime: "2 min read",
    icon: "⌨️",
  },
  {
    title: "Integration Guide",
    type: "Documentation",
    color: "#8B5CF6",
    span: 8,
    description:
      "Connect Optigo with your existing tools — Slack, Jira, GitHub, and 40+ other platforms via our REST API and webhooks.",
    readTime: "8 min read",
    icon: "🔗",
  },
  {
    title: "API Documentation",
    type: "Developer Guide",
    color: "#6D28D9",
    span: 8,
    description:
      "Full reference for the Optigo REST API: authentication, endpoints, rate limits, and step-by-step code examples in JS, Python & cURL.",
    readTime: "15 min read",
    icon: "📡",
  },
  {
    title: "Community FAQ",
    type: "Support",
    color: "#3B82F6",
    span: 4,
    description:
      "The most common questions answered by Optigo experts and power users.",
    readTime: "4 min read",
    icon: "💬",
  },
];

function formatTime(sec) {
  if (!sec || isNaN(sec)) return "0:00";
  const mm = Math.floor(sec / 60);
  const ss = Math.floor(sec % 60)
    .toString()
    .padStart(2, "0");
  return `${mm}:${ss}`;
}

let ytScriptLoadingPromise = null;

function loadYTScript() {
  if (window.YT && window.YT.Player) {
    return Promise.resolve(window.YT);
  }
  if (ytScriptLoadingPromise) {
    return ytScriptLoadingPromise;
  }
  ytScriptLoadingPromise = new Promise((resolve) => {
    const checkYTReady = () => {
      if (window.YT && window.YT.Player) {
        resolve(window.YT);
      } else {
        setTimeout(checkYTReady, 50);
      }
    };

    const prevReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof prevReady === "function") {
        try {
          prevReady();
        } catch (_) {}
      }
      checkYTReady();
    };

    if (!document.getElementById("yt-iframe-api")) {
      const tag = document.createElement("script");
      tag.id = "yt-iframe-api";
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    } else {
      checkYTReady();
    }
  });

  return ytScriptLoadingPromise;
}

export default function HelpArticle() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const title = slug
    ? slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
    : "Help Video";

  const iframeRef = React.useRef(null);
  const ytPlayer = React.useRef(null);
  const progressTimer = React.useRef(null);

  const [isReady, setIsReady] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [playedSec, setPlayedSec] = React.useState(0);
  const [totalSec, setTotalSec] = React.useState(0);
  const [activeChapter, setActiveChapter] = React.useState(0);
  const [activeLink, setActiveLink] = React.useState(null);
  const [isHovered, setIsHovered] = React.useState(false);
  const [lang, setLang] = React.useState(
    () => localStorage.getItem("training_lang") || "en",
  );
  const [langAnchor, setLangAnchor] = React.useState(null);
  const [showLangPrompt, setShowLangPrompt] = React.useState(true);
  const [chapters, setChapters] = React.useState([]);
  // Ref so the polling interval always reads latest chapters without re-creating
  const chaptersRef = React.useRef([]);

  const [faqExpanded, setFaqExpanded] = React.useState(null);
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const [lightboxIndex, setLightboxIndex] = React.useState(0);
  const [lightboxImages, setLightboxImages] = React.useState([]);

  const handleFaqChange = (panel) => (event, isExpanded) => {
    setFaqExpanded(isExpanded ? panel : false);
  };

  const handleFaqClick = (e) => {
    if (e.target.tagName === "IMG") {
      e.preventDefault();
      const allImages = [];
      const parser = new DOMParser();
      relatedFaqs.forEach((faq) => {
        const doc = parser.parseFromString(faq.answer, "text/html");
        doc.querySelectorAll("img").forEach((img) => {
          allImages.push({ src: img.src, title: img?.alt, alt: img?.alt });
        });
      });
      const src = e.target.src;
      // Since doc.querySelectorAll("img")[0].src from a parsed string could be relative or absolute,
      // and e.target.src is absolute, let's just match by exact source or relative path suffix.
      let index = allImages.findIndex(
        (img) => src.includes(img.src) || img.src.includes(src),
      );
      if (index < 0) {
        // fallback to just finding the first image with the same ending filename
        const fileName = src.split("/").pop();
        index = allImages.findIndex((img) => img.src.includes(fileName));
      }
      setLightboxImages(allImages);
      setLightboxIndex(index >= 0 ? index : 0);
      setLightboxOpen(true);
    }
  };

  // ── Look up the current item + available languages from ROLES and HELP_VIDEOS ──
  const allItems = React.useMemo(
    () => [
      ...ROLES.flatMap((r) => r.menuData.flatMap((s) => s.items)),
      ...HELP_VIDEOS,
    ],
    [],
  );
  const currentItem = allItems.find((item) => item.slug === slug) || null;

  const pageTitle = React.useMemo(() => {
    if (!currentItem) return title;
    return lang === "hi" && currentItem.titleHindi
      ? currentItem.titleHindi
      : currentItem.title;
  }, [currentItem, title, lang]);

  const pageDesc = React.useMemo(() => {
    if (!currentItem)
      return "Learn the essential skills to master this topic dynamically.";
    return lang === "hi" && currentItem.descHindi
      ? currentItem.descHindi
      : currentItem.desc ||
          "Learn the essential skills to master this topic dynamically.";
  }, [currentItem, lang]);

  // Build language list from item — only include languages with a real video ID
  const availableLangs = React.useMemo(() => {
    const langs = [];
    if (currentItem?.youtubeIdEnglish)
      langs.push({
        code: "en",
        label: "English",
        flag: "🇬🇧",
        videoId: currentItem.youtubeIdEnglish,
      });
    if (currentItem?.youtubeIdHindi)
      langs.push({
        code: "hi",
        label: "हिंदी",
        flag: "🇮🇳",
        videoId: currentItem.youtubeIdHindi,
      });
    // Fallback: use generic youtubeId as English if no language-specific IDs
    if (langs.length === 0 && currentItem?.youtubeId)
      langs.push({
        code: "en",
        label: "English",
        flag: "🇬🇧",
        videoId: currentItem.youtubeId,
      });
    return langs;
  }, [currentItem]);

  const activeVideoId = React.useMemo(() => {
    return (
      availableLangs.find((l) => l.code === lang)?.videoId ||
      availableLangs[0]?.videoId ||
      ""
    );
  }, [availableLangs, lang]);

  // Auto-skip or set initial language from localStorage preference
  React.useEffect(() => {
    const storedLang = localStorage.getItem("training_lang");
    if (storedLang) {
      const hasPref = availableLangs.some((l) => l.code === storedLang);
      if (hasPref) {
        setLang(storedLang);
        setShowLangPrompt(false);
      }
    }
    if (availableLangs.length === 1) {
      setLang(availableLangs[0].code);
      setShowLangPrompt(false);
    }
  }, [availableLangs]);

  // Recommended: prefer same section/category, exclude current, must have a video
  const recommended = React.useMemo(() => {
    if (!currentItem) return [];
    const hasVideo = (i) => i.youtubeId || i.youtubeIdEnglish;
    const currentGroup = currentItem.section || currentItem.category;
    const same = allItems.filter(
      (i) =>
        i.slug !== slug &&
        (i.section === currentGroup || i.category === currentGroup) &&
        hasVideo(i),
    );
    const other = allItems.filter(
      (i) =>
        i.slug !== slug &&
        i.section !== currentGroup &&
        i.category !== currentGroup &&
        hasVideo(i),
    );
    return [...same, ...other].slice(0, 4);
  }, [allItems, currentItem, slug]);

  // Related FAQs: match module title keywords against homepage FaqList
  const relatedFaqs = React.useMemo(() => {
    if (!currentItem) return [];
    const keywords = currentItem.title
      .toLowerCase()
      .split(/[\s,\/\-&()]+/)
      .filter((w) => w.length >= 3);
    if (!keywords.length) return [];
    return FaqList.filter((faq) => {
      const text = [faq.question, faq.category, ...(faq.tags || [])]
        .join(" ")
        .toLowerCase();
      return keywords.some((kw) => text.includes(kw));
    }).slice(0, 4);
  }, [currentItem]);

  // Auto-generate chapter markers from total video duration
  const generateChapters = React.useCallback((totalSeconds) => {
    const LABELS = [
      "Introduction",
      "Getting Started",
      "Core Concepts",
      "Step by Step",
      "Tips & Shortcuts",
      "Summary & Next Steps",
    ];
    const count =
      totalSeconds < 180
        ? 3
        : totalSeconds < 360
          ? 4
          : totalSeconds < 600
            ? 5
            : 6;
    const seg = totalSeconds / count;
    return Array.from({ length: count }, (_, i) => ({
      seconds: Math.round(i * seg),
      time: formatTime(Math.round(i * seg)),
      label: LABELS[i] || `Part ${i + 1}`,
    }));
  }, []);

  const startPolling = React.useCallback(() => {
    clearInterval(progressTimer.current);
    progressTimer.current = setInterval(() => {
      const p = ytPlayer.current;
      if (!p || typeof p.getCurrentTime !== "function") return;
      try {
        const cur = p.getCurrentTime() ?? 0;
        const dur =
          typeof p.getDuration === "function" ? (p.getDuration() ?? 0) : 0;
        setPlayedSec(cur);
        if (dur > 0) setTotalSec(dur);
        // auto-highlight chapter using ref (no stale closure issue)
        const ch_list = chaptersRef.current;
        let ch = 0;
        for (let i = ch_list.length - 1; i >= 0; i--) {
          if (cur >= ch_list[i].seconds) {
            ch = i;
            break;
          }
        }
        setActiveChapter((prev) => (prev !== ch ? ch : prev));
      } catch (_) {
        /* player not ready yet */
      }
    }, 300);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const stopPolling = React.useCallback(() => {
    clearInterval(progressTimer.current);
    // capture final position immediately
    try {
      const p = ytPlayer.current;
      if (p && typeof p.getCurrentTime === "function") {
        const cur = p.getCurrentTime() ?? 0;
        setPlayedSec(cur);
      }
    } catch (_) {}
  }, []);

  // ── Mount: init YouTube IFrame player ───────────────────────────────────
  React.useEffect(() => {
    if (showLangPrompt || !activeVideoId) return;

    let cancelled = false;

    loadYTScript().then(() => {
      if (cancelled || !iframeRef.current) return;

      if (ytPlayer.current) {
        try {
          ytPlayer.current.destroy();
        } catch (_) {}
        ytPlayer.current = null;
      }

      ytPlayer.current = new window.YT.Player(iframeRef.current, {
        events: {
          onReady: (e) => {
            if (cancelled) return;
            setIsReady(true);
            const dur = e.target.getDuration();
            if (dur > 0) {
              setTotalSec(dur);
              // Generate chapter markers from the real video duration
              const gen = generateChapters(dur);
              setChapters(gen);
              chaptersRef.current = gen;
            }
          },
          onStateChange: (e) => {
            if (cancelled) return;
            const S = window.YT?.PlayerState;
            if (!S) return;
            switch (e.data) {
              case S.PLAYING:
                setIsPlaying(true);
                startPolling();
                break;
              case S.BUFFERING:
                // keep isPlaying=true during buffering — don't flicker
                setIsPlaying(true);
                break;
              case S.PAUSED:
              case S.ENDED:
                setIsPlaying(false);
                stopPolling();
                if (e.data === S.ENDED) setPlayedSec(totalSec);
                break;
              default:
                break;
            }
          },
        },
      });
    });

    return () => {
      cancelled = true;
      clearInterval(progressTimer.current);
      if (ytPlayer.current) {
        try {
          ytPlayer.current.destroy();
        } catch (_) {}
        ytPlayer.current = null;
      }
    };
  }, [
    showLangPrompt,
    activeVideoId,
    generateChapters,
    startPolling,
    stopPolling,
  ]);

  // ── Controls: always call API directly, never rely on stale state ────────
  const togglePlay = () => {
    const p = ytPlayer.current;
    if (!p) return;
    try {
      const state =
        typeof p.getPlayerState === "function" ? p.getPlayerState() : -1;
      const YT_STATE = window.YT?.PlayerState;
      if (!YT_STATE) {
        if (typeof p.playVideo === "function") p.playVideo();
        return;
      }
      // ONLY pause if strictly PLAYING (1)
      // Do NOT pause if state is BUFFERING (3), PAUSED (2), UNSTARTED (-1), CUED (5), or ENDED (0)
      if (state === YT_STATE.PLAYING) {
        if (typeof p.pauseVideo === "function") p.pauseVideo();
      } else if (state !== YT_STATE.BUFFERING) {
        if (typeof p.playVideo === "function") p.playVideo();
      }
    } catch (_) {
      try {
        if (typeof p.playVideo === "function") p.playVideo();
      } catch (__) {}
    }
  };

  const handleChapterClick = (idx, sec) => {
    setActiveChapter(idx);
    setPlayedSec(sec);
    const p = ytPlayer.current;
    if (p && typeof p.seekTo === "function") {
      try {
        p.seekTo(sec, true);
        if (typeof p.playVideo === "function") {
          p.playVideo();
        }
      } catch (_) {}
    }
  };

  const handleNextChapter = () => {
    if (activeChapter < chapters.length - 1) {
      const next = activeChapter + 1;
      handleChapterClick(next, chapters[next].seconds);
    }
  };

  const handlePrevChapter = () => {
    const prev = activeChapter > 0 ? activeChapter - 1 : 0;
    handleChapterClick(prev, chapters[prev]?.seconds ?? 0);
  };

  const handleSliderChange = (_, value) => {
    const sec = (value / 100) * totalSec;
    setPlayedSec(sec);
    const p = ytPlayer.current;
    if (p && typeof p.seekTo === "function") {
      try {
        p.seekTo(sec, true);
        if (typeof p.playVideo === "function") {
          p.playVideo();
        }
      } catch (_) {}
    }
  };

  const sliderValue = totalSec > 0 ? (playedSec / totalSec) * 100 : 0;

  // ── Language switch: load video at same playback position ────────────────
  const handleLangSwitch = (langCode) => {
    const p = ytPlayer.current;
    if (!p || langCode === lang) {
      setLangAnchor(null);
      return;
    }
    const target = availableLangs.find((l) => l.code === langCode);
    if (!target) return;
    const currentSec = playedSec;
    try {
      if (typeof p.loadVideoById === "function") {
        p.loadVideoById({
          videoId: target.videoId,
          startSeconds: currentSec,
        });
      }
      setLang(langCode);
      localStorage.setItem("training_lang", langCode);
      setIsPlaying(true);
      setLangAnchor(null);
    } catch (_) {}
  };

  // ────────────────────────────────────────────────────────────────────────
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{ bgcolor: "#ffffff", minHeight: "100vh", py: { xs: 2, md: 4 } }}
      >
        <Container
          sx={{
            maxWidth: {
              xs: "100%",
              sm: "100%",
              md: "1200px",
              lg: "1600px",
              xl: "1600px",
            },
            margin: "0 auto",
          }}
        >
          <Box sx={{ mb: 2 }}>
            <Button
              startIcon={<ArrowBackIcon fontSize="small" />}
              onClick={() => navigate(-1)}
              sx={{
                color: "#6B7280",
                textTransform: "none",
                borderRadius: 8,
                px: 2,
                "&:hover": { bgcolor: "#F3F4F6" },
              }}
            >
              Back
            </Button>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: { xs: 3, md: 4 },
              alignItems: "flex-start",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            {/* ── LEFT: Video + Recs + Bento ── */}
            <Box
              sx={{
                flexGrow: 1,
                minWidth: 0,
                pb: 8,
                width: { xs: "100%", md: "calc(100% - 340px)" },
              }}
            >
              <Box sx={{ mb: 4 }}>
                <Typography variant="h4" gutterBottom>
                  {pageTitle}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {pageDesc}
                </Typography>
              </Box>

              {/* ── Custom Player ── */}
              <Box
                onMouseEnter={() => !showLangPrompt && setIsHovered(true)}
                onMouseLeave={() => !showLangPrompt && setIsHovered(false)}
                sx={{
                  width: "100%",
                  aspectRatio: "16/9",
                  bgcolor: "#111827",
                  borderRadius: 4,
                  overflow: "hidden",
                  mb: 5,
                  position: "relative",
                  cursor: showLangPrompt ? "default" : "pointer",
                  boxShadow:
                    "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
                  "& iframe": { pointerEvents: "auto" },
                }}
              >
                {/* YT mounts into this iframe */}
                {!showLangPrompt && (
                  <iframe
                    ref={iframeRef}
                    src={`https://www.youtube.com/embed/${activeVideoId}?enablejsapi=1&controls=0&rel=0&modestbranding=1&disablekb=1&iv_load_policy=3&fs=0&playsinline=1${window.location.origin ? `&origin=${encodeURIComponent(window.location.origin)}` : ""}`}
                    title={pageTitle}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      border: 0,
                      pointerEvents: "auto",
                    }}
                  />
                )}

                {/* ── Language Prompt Overlay ── */}
                {showLangPrompt && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      zIndex: 20,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: "rgba(0, 0, 0, 0.4)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: "#fff",
                        p: 4,
                        borderRadius: 4,
                        boxShadow:
                          "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                        border: "1px solid #F3F4F6",
                        textAlign: "center",
                        maxWidth: 360,
                        width: "90%",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ color: "#111827", mb: 3, fontWeight: 800 }}
                      >
                        Select Video Language
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 2,
                          justifyContent: "center",
                        }}
                      >
                        {availableLangs.map((l) => (
                          <Button
                            key={l.code}
                            onClick={(e) => {
                              e.stopPropagation();
                              setLang(l.code);
                              localStorage.setItem("training_lang", l.code);
                              setShowLangPrompt(false);
                            }}
                            variant="outlined"
                            sx={{
                              flex: 1,
                              py: 1.5,
                              borderRadius: 2,
                              borderColor: "#E5E7EB",
                              color: "#374151",
                              textTransform: "none",
                              fontWeight: 600,
                              fontSize: "0.95rem",
                              "&:hover": {
                                bgcolor: "#F3F4F6",
                                borderColor: "#D1D5DB",
                              },
                            }}
                          >
                            {l.label}
                          </Button>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                )}

                {/* ── Center overlay: big play/pause button ── */}
                {!showLangPrompt && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      zIndex: 9,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: !isPlaying || isHovered ? 1 : 0,
                      transition: "opacity 0.25s ease",
                      background: isHovered
                        ? "rgba(0,0,0,0.18)"
                        : "transparent",
                      pointerEvents: "none",
                    }}
                  >
                    <Box
                      onClick={togglePlay}
                      sx={{
                        width: 72,
                        height: 72,
                        bgcolor: "rgba(255,255,255,0.15)",
                        backdropFilter: "blur(6px)",
                        borderRadius: "50%",
                        border: "2px solid rgba(255,255,255,0.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "transform 0.15s, background 0.15s",
                        pointerEvents: "none",
                        cursor: "pointer",
                        "&:hover": {
                          bgcolor: "rgba(255,255,255,0.28)",
                          transform: "scale(1.1)",
                        },
                      }}
                    >
                      {isPlaying ? (
                        <PauseRoundedIcon
                          sx={{ fontSize: 55, color: "#fff" }}
                        />
                      ) : (
                        <PlayArrowRoundedIcon
                          sx={{ fontSize: 55, color: "#fff" }}
                        />
                      )}
                    </Box>
                  </Box>
                )}
                {!showLangPrompt && (
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      zIndex: 10,
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.88) 0%, transparent 100%)",
                      pt: 5,
                      pb: 1.5,
                      px: 2,
                      opacity: !isPlaying || isHovered ? 1 : 0,
                      transform:
                        !isPlaying || isHovered
                          ? "translateY(0)"
                          : "translateY(6px)",
                      transition: "opacity 0.25s ease, transform 0.25s ease",
                    }}
                  >
                    {/* Seek slider */}
                    <Slider
                      value={sliderValue}
                      onChange={handleSliderChange}
                      sx={{
                        color: "#8B5CF6",
                        p: "0 !important",
                        height: 4,
                        "& .MuiSlider-rail": {
                          bgcolor: "rgba(255,255,255,0.25)",
                        },
                        "& .MuiSlider-thumb": {
                          width: 14,
                          height: 14,
                          opacity: 0,
                          transition: "opacity 0.2s",
                          "&:hover": {
                            boxShadow: "0 0 0 8px rgba(139,92,246,0.2)",
                          },
                        },
                        "&:hover .MuiSlider-thumb": { opacity: 1 },
                      }}
                    />

                    {/* Buttons row */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mt: 0.5,
                        gap: 0.5,
                      }}
                    >
                      <IconButton
                        onClick={togglePlay}
                        size="small"
                        sx={{
                          color: "#fff",
                          bgcolor: "rgba(255,255,255,0.12)",
                          borderRadius: "50%",
                          "&:hover": { bgcolor: "rgba(255,255,255,0.25)" },
                        }}
                      >
                        {isPlaying ? (
                          <PauseRoundedIcon fontSize="small" />
                        ) : (
                          <PlayArrowRoundedIcon fontSize="small" />
                        )}
                      </IconButton>

                      <IconButton
                        onClick={handlePrevChapter}
                        size="small"
                        sx={{
                          color: "#fff",
                          borderRadius: "50%",
                          "&:hover": { bgcolor: "rgba(255,255,255,0.18)" },
                        }}
                      >
                        <SkipPreviousIcon fontSize="small" />
                      </IconButton>

                      <IconButton
                        onClick={handleNextChapter}
                        size="small"
                        sx={{
                          color: "#fff",
                          borderRadius: "50%",
                          "&:hover": { bgcolor: "rgba(255,255,255,0.18)" },
                        }}
                      >
                        <SkipNextIcon fontSize="small" />
                      </IconButton>

                      <Typography
                        variant="caption"
                        sx={{
                          color: "#fff",
                          ml: 1,
                          opacity: 0.85,
                          fontWeight: 500,
                          letterSpacing: 0.3,
                        }}
                      >
                        {formatTime(playedSec)} / {formatTime(totalSec)}
                      </Typography>

                      {/* Spacer */}
                      <Box sx={{ flexGrow: 1 }} />

                      {/* Language switch glass chip → opens popover */}
                      <Box
                        onClick={(e) => setLangAnchor(e.currentTarget)}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.6,
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 999,
                          bgcolor: langAnchor
                            ? "rgba(255,255,255,0.28)"
                            : "rgba(255,255,255,0.12)",
                          backdropFilter: "blur(10px)",
                          border: "1px solid rgba(255,255,255,0.35)",
                          cursor: "pointer",
                          userSelect: "none",
                          transition: "all 0.2s",
                          "&:hover": {
                            bgcolor: "rgba(255,255,255,0.22)",
                            borderColor: "rgba(255,255,255,0.55)",
                            transform: "scale(1.04)",
                          },
                        }}
                      >
                        <Typography sx={{ fontSize: "0.85rem", lineHeight: 1 }}>
                          {availableLangs.find((l) => l.code === lang)?.flag}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#fff",
                            fontWeight: 700,
                            fontSize: "0.72rem",
                            letterSpacing: 0.4,
                          }}
                        >
                          {availableLangs.find((l) => l.code === lang)?.label}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "rgba(255,255,255,0.55)",
                            fontSize: "0.6rem",
                            ml: 0.2,
                          }}
                        >
                          ▾
                        </Typography>
                      </Box>

                      {/* Language Popover */}
                      <Popover
                        open={Boolean(langAnchor)}
                        anchorEl={langAnchor}
                        onClose={() => setLangAnchor(null)}
                        anchorOrigin={{ vertical: "top", horizontal: "right" }}
                        transformOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        slotProps={{
                          paper: {
                            sx: {
                              mt: -1,
                              borderRadius: 3,
                              boxShadow: "0 12px 40px rgba(0,0,0,0.18)",
                              overflow: "hidden",
                              minWidth: 200,
                              border: "1px solid #F3F4F6",
                            },
                          },
                        }}
                      >
                        <Box sx={{ py: 1 }}>
                          {availableLangs.map((l) => {
                            const isActive = l.code === lang;
                            return (
                              <Box
                                key={l.code}
                                onClick={() => handleLangSwitch(l.code)}
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1.5,
                                  px: 2,
                                  py: 1.1,
                                  cursor: "pointer",
                                  bgcolor: isActive ? "#FFF4ED" : "transparent",
                                  transition: "background 0.15s",
                                  "&:hover": {
                                    bgcolor: isActive ? "#FFE8D6" : "#F9FAFB",
                                  },
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontSize: "1.1rem",
                                    lineHeight: 1,
                                    minWidth: 24,
                                  }}
                                >
                                  {l.flag}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    fontWeight: isActive ? 700 : 500,
                                    color: isActive ? "#D97706" : "#374151",
                                    flexGrow: 1,
                                    fontSize: "0.875rem",
                                  }}
                                >
                                  {l.label}
                                </Typography>
                                {isActive && (
                                  <Box
                                    sx={{
                                      width: 8,
                                      height: 8,
                                      borderRadius: "50%",
                                      bgcolor: "#F59E0B",
                                      flexShrink: 0,
                                    }}
                                  />
                                )}
                              </Box>
                            );
                          })}
                        </Box>
                      </Popover>
                    </Box>
                  </Box>
                )}
              </Box>

              <Divider sx={{ mb: 5 }} />

              {/* ── Related FAQs ── */}
              {relatedFaqs.length > 0 && (
                <Box sx={{ mb: 6 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <QuizRoundedIcon sx={{ color: "#F59E0B", mr: 1.5 }} />
                    <Typography variant="h5">
                      Frequently Asked Questions
                    </Typography>
                  </Box>
                  <Box sx={{ width: "100%" }} onClick={handleFaqClick}>
                    {relatedFaqs.map((faq, index) => (
                      <Accordion
                        key={index}
                        expanded={faqExpanded === index}
                        onChange={handleFaqChange(index)}
                        sx={{
                          boxShadow: "none",
                          border: "none",
                          borderBottom: "1px solid #e5e5e5",
                          borderRadius: "0 !important",
                          "&:before": { display: "none" },
                          "&.Mui-expanded": { margin: 0 },
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
                              {faqExpanded === index ? (
                                <RemoveIcon sx={{ fontSize: 16 }} />
                              ) : (
                                <AddIcon sx={{ fontSize: 16 }} />
                              )}
                            </Box>
                          }
                          sx={{
                            minHeight: "auto",
                            "& .MuiAccordionSummary-content": {
                              margin: "8px 0",
                              "&.Mui-expanded": { margin: "8px 0" },
                            },
                            "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded":
                              {
                                transform: "none",
                              },
                            px: 0,
                          }}
                        >
                          <Typography
                            sx={{
                              fontWeight: 500,
                              color: "#1a1a1a",
                              fontSize: { xs: 16, md: 17 },
                            }}
                          >
                            {faq.question}
                          </Typography>
                        </AccordionSummary>
                        {faq.answer && (
                          <AccordionDetails sx={{ px: 0, pt: 0, pb: 2 }}>
                            <Box
                              sx={{
                                color: "#878787",
                                lineHeight: 1.6,
                                fontSize: { xs: 15, md: 16 },
                                "& img": {
                                  cursor: "zoom-in",
                                  maxWidth: "100%",
                                  height: "auto",
                                  display: "block",
                                  mt: 2,
                                  mb: 2,
                                  borderRadius: 2,
                                },
                              }}
                              dangerouslySetInnerHTML={{ __html: faq.answer }}
                            />
                          </AccordionDetails>
                        )}
                      </Accordion>
                    ))}
                  </Box>
                </Box>
              )}

              {/* Recommended Videos */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 3,
                }}
              >
                <Typography variant="h5">
                  {lang === "hi" ? "अनुशंसित वीडियो" : "Recommended Videos"}
                </Typography>
                <Button
                  size="small"
                  sx={{
                    color: "#8B5CF6",
                    textTransform: "none",
                    fontWeight: 600,
                    "&:hover": { bgcolor: "#F5F3FF" },
                  }}
                >
                  {lang === "hi" ? "सभी देखें →" : "View all →"}
                </Button>
              </Box>
              <Grid container spacing={2.5} sx={{ mb: 6 }}>
                {recommended?.map((video, idx) => {
                  const vId =
                    video.youtubeIdEnglish ||
                    video.youtubeIdHindi ||
                    video.youtubeId;
                  return (
                    <Grid item xs={12} sm={6} key={idx}>
                      <Card
                        onClick={() => navigate(`/help/${video.slug}`)}
                        sx={{
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          transition: "all 0.22s",
                          overflow: "hidden",
                          "&:hover": {
                            borderColor: "#8B5CF6",
                            transform: "translateY(-3px)",
                            boxShadow: "0 8px 24px rgba(139,92,246,0.12)",
                          },
                        }}
                      >
                        {/* Thumbnail */}
                        <Box sx={{ position: "relative", overflow: "hidden" }}>
                          <Box
                            component="img"
                            src={`https://img.youtube.com/vi/${vId}/mqdefault.jpg`}
                            alt={
                              lang === "hi" && video.titleHindi
                                ? video.titleHindi
                                : video.title
                            }
                            sx={{
                              width: "100%",
                              height: 150,
                              objectFit: "cover",
                              display: "block",
                            }}
                          />
                          {/* Duration badge */}
                          <Box
                            sx={{
                              position: "absolute",
                              bottom: 8,
                              right: 8,
                              bgcolor: "rgba(0,0,0,0.75)",
                              color: "#fff",
                              px: 0.8,
                              py: 0.2,
                              borderRadius: 1,
                              fontSize: "0.7rem",
                              fontWeight: 700,
                              fontFamily: "inherit",
                              letterSpacing: 0.3,
                            }}
                          >
                            {video.duration || "5:00"}
                          </Box>
                          {/* Category badge */}
                          <Box
                            sx={{
                              position: "absolute",
                              top: 8,
                              left: 8,
                              bgcolor: "#8B5CF6",
                              color: "#fff",
                              px: 1,
                              py: 0.25,
                              borderRadius: 1,
                              fontSize: "0.65rem",
                              fontWeight: 700,
                              fontFamily: "inherit",
                              letterSpacing: 0.5,
                              textTransform: "uppercase",
                            }}
                          >
                            {lang === "hi" && video.sectionHindi
                              ? video.sectionHindi
                              : video.section}
                          </Box>
                        </Box>
                        <CardContent sx={{ p: 2, flexGrow: 1 }}>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 700,
                              mb: 0.75,
                              color: "#111827",
                              lineHeight: 1.4,
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {lang === "hi" && video.titleHindi
                              ? video.titleHindi
                              : video.title}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1.5,
                              color: "#9CA3AF",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 0.4,
                              }}
                            >
                              <AccessTimeIcon sx={{ fontSize: 13 }} />
                              <Typography
                                variant="caption"
                                sx={{ fontSize: "0.72rem" }}
                              >
                                {video.duration || "5:00"}
                              </Typography>
                            </Box>
                            <Typography
                              variant="caption"
                              sx={{ fontSize: "0.72rem" }}
                            >
                              ·
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{ fontSize: "0.72rem" }}
                            >
                              {video.views || "1K"}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{ fontSize: "0.72rem" }}
                            >
                              ·
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{ fontSize: "0.72rem" }}
                            >
                              {video.author || "Optigo Support"}
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>

            {/* ── RIGHT: Sticky Sidebar ── */}
            <Box
              sx={{
                width: { xs: "100%", md: 320 },
                minWidth: { md: 320 },
                position: { md: "sticky" },
                top: 80,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              {/* Chapters */}
              <Box
                sx={{
                  borderRadius: 4,
                  border: "1px solid #E5E7EB",
                  bgcolor: "#fff",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05)",
                  p: 2.5,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <BookmarkBorderIcon
                    fontSize="small"
                    sx={{ color: "#4B5563", mr: 1 }}
                  />
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 700,
                      color: "#111827",
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                    }}
                  >
                    {lang === "hi" ? "अध्याय" : "Chapters"}
                  </Typography>
                </Box>
                <List disablePadding>
                  {chapters.map((ts, idx) => {
                    const sel = activeChapter === idx;
                    return (
                      <ListItem key={idx} disablePadding sx={{ mb: 0.25 }}>
                        <ListItemButton
                          onClick={() => handleChapterClick(idx, ts.seconds)}
                          selected={sel}
                          sx={{
                            borderRadius: 2,
                            py: 0.5,
                            px: 1,
                            "&.Mui-selected": {
                              bgcolor: "#F5F3FF",
                              color: "#6D28D9",
                            },
                            "&.Mui-selected:hover": { bgcolor: "#EDE9FE" },
                            "&:hover": { bgcolor: "#F9FAFB" },
                          }}
                        >
                          <Box sx={{ width: 45, flexShrink: 0 }}>
                            <Typography
                              variant="caption"
                              sx={{
                                color: sel ? "#fff" : "#8B5CF6",
                                fontWeight: 700,
                                bgcolor: sel ? "#8B5CF6" : "#8B5CF61A",
                                px: 1,
                                py: 0.25,
                                borderRadius: 1,
                              }}
                            >
                              {ts.time}
                            </Typography>
                          </Box>
                          <ListItemText
                            primary={ts.label}
                            primaryTypographyProps={{
                              variant: "caption",
                              sx: {
                                pl: 0.5,
                                fontWeight: sel ? 700 : 500,
                                color: sel ? "#6D28D9" : "#4B5563",
                                lineHeight: 1.2,
                              },
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              </Box>

              {/* Helpful Links */}
              <Box
                sx={{
                  borderRadius: 4,
                  border: "1px solid #E5E7EB",
                  bgcolor: "#fff",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05)",
                  p: 2.5,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <LinkIcon fontSize="small" sx={{ color: "#4B5563", mr: 1 }} />
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 700,
                      color: "#111827",
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                    }}
                  >
                    Helpful Links
                  </Typography>
                </Box>
                <List disablePadding>
                  {[
                    "Getting Started Guide",
                    "Support & FAQ",
                    "Community Forums",
                    "Submit a Ticket",
                  ].map((link, idx) => {
                    const sel = activeLink === idx;
                    return (
                      <ListItem key={idx} disablePadding sx={{ mb: 0.25 }}>
                        <ListItemButton
                          onClick={() => setActiveLink(idx)}
                          selected={sel}
                          sx={{
                            borderRadius: 2,
                            py: 0.5,
                            px: 1,
                            "&.Mui-selected": {
                              bgcolor: "#FFF1F2",
                              color: "#E11D48",
                            },
                            "&.Mui-selected:hover": { bgcolor: "#FFE4E6" },
                            "&:hover": { bgcolor: "#F9FAFB", color: "#E11D48" },
                          }}
                        >
                          <ListItemText
                            primary={link}
                            primaryTypographyProps={{
                              variant: "caption",
                              sx: {
                                fontWeight: sel ? 700 : 500,
                                color: "inherit",
                                lineHeight: 1.2,
                              },
                            }}
                          />
                          <OpenInNewIcon
                            sx={{
                              fontSize: 14,
                              color: sel ? "#E11D48" : "#9CA3AF",
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={lightboxImages}
        index={lightboxIndex}
        zoom={{ maxZoomPixelRatio: 4 }}
        plugins={[Zoom, Captions]}
      />
    </ThemeProvider>
  );
}

{
  /* Bento Articles */
}
{
  /* <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                                <Typography variant="h5">Related Articles & Guides</Typography>
                                <Button size="small" sx={{ color: '#6D28D9', textTransform: 'none', fontWeight: 600, '&:hover': { bgcolor: '#F5F3FF' } }}>Browse all →</Button>
                            </Box>
                            <Grid container spacing={2}>
                                {bentoArticles.map((article, idx) => (
                                    <Grid item xs={12} md={article.span} key={idx}>
                                        <Card sx={{
                                            height: '100%', minHeight: 160,
                                            bgcolor: `${article.color}08`,
                                            borderColor: `${article.color}20`,
                                            cursor: 'pointer',
                                            '&:hover': { borderColor: article.color, transform: 'translateY(-3px)', boxShadow: `0 8px 24px ${article.color}20` },
                                            transition: 'all 0.22s',
                                        }}>
                                            <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 2.5 }}>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                                                    <Chip
                                                        label={article.type}
                                                        size="small"
                                                        sx={{ bgcolor: '#fff', fontSize: '0.68rem', fontWeight: 700, color: article.color, border: `1px solid ${article.color}30`, letterSpacing: 0.3 }}
                                                    />
                                                    <Typography sx={{ fontSize: '1.25rem', lineHeight: 1 }}>{article.icon}</Typography>
                                                </Box>
                                                <Typography variant="body1" sx={{ fontWeight: 700, color: '#111827', mb: 0.75, lineHeight: 1.3 }}>
                                                    {article.title}
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: '#6B7280', fontSize: '0.8rem', lineHeight: 1.55, flexGrow: 1 }}>
                                                    {article.description}
                                                </Typography>
                                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                                                    <Typography variant="caption" sx={{ color: article.color, fontWeight: 600, fontSize: '0.72rem' }}>
                                                        {article.readTime}
                                                    </Typography>
                                                    <Box sx={{
                                                        width: 28, height: 28, borderRadius: '50%',
                                                        bgcolor: `${article.color}18`,
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    }}>
                                                        <OpenInNewIcon sx={{ fontSize: 14, color: article.color }} />
                                                    </Box>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid> */
}
