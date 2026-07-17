import React from 'react';
import {
    Container,
    Box,
    Typography,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ListSubheader,
    TextField,
    InputAdornment,
    Grid,
    Card,
    Button,
    Chip,
    Divider,
    IconButton,
    GlobalStyles,
    Drawer
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import ArrowBackIcon from '@mui/icons-material/ArrowBackRounded';
import MicIcon from '@mui/icons-material/Mic';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SchoolIcon from '@mui/icons-material/School';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import '@fontsource-variable/manrope';
import { useNavigate, Link } from 'react-router-dom';
import { useQueryState } from 'nuqs';
import SelectTrainingPath from './SelectTrainingPath';
import { ROLES } from './TrainingData';
import ThemeWrapper from './ThemeWrapper';
import MetaWrapper from '../../meta/MetaWrapper';
import { HELP_VIDEOS, HELP_CATEGORIES } from './HelpVideosData';
import CardContent from '@mui/material/CardContent';

const PlayIcon = (props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" {...props} width="1em" height="1em" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path fill="currentColor" d="M21.409 9.353a2.998 2.998 0 0 1 0 5.294L8.597 21.614C6.534 22.737 4 21.277 4 18.968V5.033c0-2.31 2.534-3.769 4.597-2.648z" />
        </svg>
    );
};

// ─── HelpCenter ───────────────────────────────────────────────────────────────
export default function HelpCenter() {
    const navigate = useNavigate();
    const [role, setRole] = useQueryState('role');
    const [activeVideoSlug, setActiveVideoSlug] = useQueryState('video');
    const [tab] = useQueryState('tab');
    const [selectedCategory, setSelectedCategory] = React.useState('All');

    const [searchQuery, setSearchQuery] = React.useState('');
    const [lang, setLang] = React.useState(() => localStorage.getItem('training_lang') || 'en');

    const [isListening, setIsListening] = React.useState(false);
    const [voiceText, setVoiceText] = React.useState('');
    const recognitionRef = React.useRef(null);

    React.useEffect(() => {
        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.abort();
            }
        };
    }, []);

    React.useEffect(() => {
        if (activeVideoSlug) {
            const timer = setTimeout(() => {
                const el = document.getElementById(`item-${activeVideoSlug}`);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 600);
            return () => clearTimeout(timer);
        }
    }, [activeVideoSlug]);

    const startListening = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert(lang === 'hi' ? "इस ब्राउज़र में स्पीच रिकग्निशन समर्थित नहीं है। कृपया क्रोम या एज का उपयोग करें।" : "Speech recognition is not supported in this browser. Please use Chrome or Edge.");
            return;
        }

        const rec = new SpeechRecognition();
        rec.continuous = false;
        rec.interimResults = false;
        rec.lang = lang === 'hi' ? 'hi-IN' : 'en-US';

        rec.onstart = () => {
            setIsListening(true);
            setVoiceText(lang === 'hi' ? 'सुन रहा हूँ...' : 'Listening...');
        };

        rec.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setSearchQuery(transcript);
            setVoiceText(transcript);
            setTimeout(() => {
                setIsListening(false);
            }, 1000);
        };

        rec.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            setVoiceText(lang === 'hi' ? 'त्रुटि! कृपया फिर से प्रयास करें।' : 'Error! Please try again.');
            setTimeout(() => {
                setIsListening(false);
            }, 1500);
        };

        recognitionRef.current = rec;
        rec.start();
    };

    const stopListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.abort();
        }
        setIsListening(false);
    };

    // ── Derived data from TrainingData ────────────────────────────────────────
    const roleData = ROLES.find((r) => r.key === role) || null;

    const filteredMenuData = React.useMemo(() => {
        if (!roleData) return [];
        if (!searchQuery.trim()) return roleData.menuData;
        const query = searchQuery.toLowerCase();
        return roleData.menuData.map(section => ({
            ...section,
            items: section.items.filter(item => {
                const titleMatch = item.title.toLowerCase().includes(query) || (item.titleHindi && item.titleHindi.toLowerCase().includes(query));
                const descMatch = (item.desc && item.desc.toLowerCase().includes(query)) || (item.descHindi && item.descHindi.toLowerCase().includes(query));
                const sectionMatch = section.section.toLowerCase().includes(query) || (section.sectionHindi && section.sectionHindi.toLowerCase().includes(query));
                return titleMatch || descMatch || sectionMatch;
            })
        })).filter(section => section.items.length > 0);
    }, [roleData, searchQuery]);

    const allItems = React.useMemo(() => {
        if (!roleData) return [];
        return roleData.menuData.flatMap((s) => s.items);
    }, [roleData]);

    const activeItem = React.useMemo(() => {
        if (!allItems.length) return null;
        return allItems.find((item) => item.slug === activeVideoSlug) || allItems[0];
    }, [allItems, activeVideoSlug]);

    const metaTitle = React.useMemo(() => {
        let title = "Help Center | Optigo Support";
        if (roleData) {
            if (activeVideoSlug && activeItem) {
                const displayVideoTitle = (lang === 'hi' && activeItem.titleHindi) ? activeItem.titleHindi : activeItem.title;
                title = `${displayVideoTitle} - ${roleData.label} Training | Optigo Support`;
            } else {
                title = `${roleData.label} Training | Optigo Support`;
            }
        }
        return title;
    }, [roleData, activeVideoSlug, activeItem, lang]);

    const metaDescription = React.useMemo(() => {
        let description = "Access Optigo ERP training videos, FAQs, and live support to master the platform.";
        if (roleData) {
            if (activeVideoSlug && activeItem) {
                const displayVideoTitle = (lang === 'hi' && activeItem.titleHindi) ? activeItem.titleHindi : activeItem.title;
                description = `Learn how to use ${displayVideoTitle} in the ${roleData.label} section of Optigo ERP.`;
            } else {
                description = `Master the ${roleData.label} workflows and features of Optigo ERP.`;
            }
        }
        return description;
    }, [roleData, activeVideoSlug, activeItem, lang]);

    const filteredHelpVideos = React.useMemo(() => {
        return HELP_VIDEOS.filter(video => {
            const matchesCategory = selectedCategory === 'All' || video.category === selectedCategory;
            const matchesSearch = !searchQuery.trim() ||
                video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                video.desc.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [selectedCategory, searchQuery]);

    const renderSidebarItem = (item) => {
        const isSelected = activeItem?.slug === item.slug;
        const displayTitle = (lang === 'hi' && item.titleHindi) ? item.titleHindi : item.title;
        return (
            <ListItem key={item.slug} disablePadding>
                <ListItemButton
                    selected={isSelected}
                    onClick={() => setActiveVideoSlug(item.slug)}
                    sx={{
                        py: 0.55,
                        px: 1.2,
                        borderRadius: 2,
                        mb: 0.5,
                        '&.Mui-selected': {
                            background: `linear-gradient(135deg, #6D28D9 0%, #8B5CF6 40%, #EC4899 100%)`,
                            '&:hover': {
                                background: `linear-gradient(135deg, #6D28D9 0%, #8B5CF6 40%, #EC4899 100%)`,
                            }
                        }
                    }}
                >
                    <ListItemText
                        primary={displayTitle}
                        primaryTypographyProps={{
                            fontSize: '0.875rem',
                            fontWeight: isSelected ? 600 : 500,
                            color: isSelected ? "#fff !important" : "#4B5563",
                        }}
                    />
                </ListItemButton>
            </ListItem>
        );
    };

    if (!tab) {
        return (
            <ThemeWrapper>
                <MetaWrapper page="Help" title="Video Help | Optigo Support" description="Choose between training videos and quick help videos." />
                <Box sx={{ bgcolor: '#F9FAFB', minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', py: { xs: 6, md: 10 } }}>
                    <Box sx={{ textAlign: 'center', mb: 6 }}>
                        <Typography variant="h6" sx={{ color: '#4B5563', maxWidth: 550, mx: 'auto', px: 2 }}>
                            Select a path below to get started with step-by-step training or find quick solutions.
                        </Typography>
                    </Box>

                    {/* Expandable Glass Selection Container */}
                    <Box
                        sx={{
                            width: '90%',
                            maxWidth: '750px',
                            aspectRatio: { xs: 'auto', sm: '16/9' },
                            background: 'rgba(255, 255, 255, 0.7)',
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)',
                            border: '1px solid rgba(0, 0, 0, 0.08)',
                            borderRadius: '38px',
                            p: 1.5,
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            gap: 1.5,
                            position: 'relative',
                            overflow: 'hidden',
                            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.06)',
                            outline: 'none',
                            '&:hover > a': {
                                flex: { xs: 1, sm: 0.75 },
                            },
                        }}
                    >
                        {/* Card 1: Training Videos */}
                        <Box
                            component={Link}
                            to="/help?tab=training-videos"
                            sx={{
                                flex: 1,
                                textDecoration: 'none',
                                borderRadius: '28px',
                                overflow: 'hidden',
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                p: 3.5,
                                minHeight: { xs: '160px', sm: 'auto' },
                                background: 'linear-gradient(135deg, rgba(124, 77, 255, 0.12) 0%, rgba(124, 77, 255, 0.03) 100%)',
                                border: '1px solid rgba(124, 77, 255, 0.15)',
                                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                                cursor: 'pointer',
                                '&:hover': {
                                    flex: { xs: 1, sm: 1.25 },
                                    background: 'linear-gradient(135deg, rgba(124, 77, 255, 0.2) 0%, rgba(124, 77, 255, 0.08) 100%)',
                                    borderColor: 'rgba(124, 77, 255, 0.35)',
                                    boxShadow: '0 12px 30px rgba(124, 77, 255, 0.15)',
                                    '& .card-icon-1': {
                                        transform: 'scale(1.1) rotate(-8deg)',
                                        background: 'rgba(124, 77, 255, 0.25)',
                                    }
                                }
                            }}
                        >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                <Box
                                    className="card-icon-1"
                                    sx={{
                                        p: 1.5,
                                        borderRadius: '16px',
                                        bgcolor: 'rgba(124, 77, 255, 0.12)',
                                        color: '#7c4dff',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    <LibraryBooksIcon sx={{ fontSize: 26 }} />
                                </Box>
                            </Box>
                            <Box>
                                <Typography variant="h5" sx={{ fontWeight: 800, color: '#1a0e42', fontSize: { xs: '18px', md: '22px' }, mb: 1, letterSpacing: '-0.02em' }}>
                                    Training Videos
                                </Typography>
                                <Typography sx={{ color: 'rgba(26, 14, 66, 0.75)', fontSize: '13px', lineHeight: 1.4, fontWeight: 500 }}>
                                    Master the platform with step-by-step tutorials and interactive guides.
                                </Typography>
                            </Box>
                        </Box>

                        {/* Card 2: Help Videos */}
                        <Box
                            component={Link}
                            to="/help?tab=help-videos"
                            sx={{
                                flex: 1,
                                textDecoration: 'none',
                                borderRadius: '28px',
                                overflow: 'hidden',
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                p: 3.5,
                                minHeight: { xs: '160px', sm: 'auto' },
                                background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.12) 0%, rgba(0, 229, 255, 0.03) 100%)',
                                border: '1px solid rgba(0, 229, 255, 0.15)',
                                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                                cursor: 'pointer',
                                '&:hover': {
                                    flex: { xs: 1, sm: 1.25 },
                                    background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.2) 0%, rgba(0, 229, 255, 0.08) 100%)',
                                    borderColor: 'rgba(0, 229, 255, 0.35)',
                                    boxShadow: '0 12px 30px rgba(0, 229, 255, 0.15)',
                                    '& .card-icon-2': {
                                        transform: 'scale(1.1) rotate(8deg)',
                                        background: 'rgba(0, 229, 255, 0.25)',
                                    }
                                }
                            }}
                        >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                <Box
                                    className="card-icon-2"
                                    sx={{
                                        p: 1.5,
                                        borderRadius: '16px',
                                        bgcolor: 'rgba(0, 229, 255, 0.12)',
                                        color: '#00bcd4',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    <PlayIcon style={{ fontSize: 26 }} />
                                </Box>
                            </Box>
                            <Box>
                                <Typography variant="h5" sx={{ fontWeight: 800, color: '#004854', fontSize: { xs: '18px', md: '22px' }, mb: 1, letterSpacing: '-0.02em' }}>
                                    Help Videos
                                </Typography>
                                <Typography sx={{ color: 'rgba(0, 72, 84, 0.75)', fontSize: '13px', lineHeight: 1.4, fontWeight: 500 }}>
                                    Quick visual answers to frequently asked questions and troubleshooting.
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </ThemeWrapper>
        );
    }

    if (tab !== 'help-videos' && !role) {
        return (
            <ThemeWrapper>
                <MetaWrapper page="Help" title="Training Center | Optigo Support" description="Access Optigo ERP training videos and guides." />
                <SelectTrainingPath />
            </ThemeWrapper>
        );
    }

    return (
        <ThemeWrapper>
            <MetaWrapper page="Help" title={tab === 'help-videos' ? "Help Videos | Optigo Support" : metaTitle} description={tab === 'help-videos' ? "Browse quick help videos and solutions for Optigo ERP." : metaDescription} />
            <GlobalStyles styles={{ html: { scrollBehavior: 'smooth' } }} />
            <Box sx={{ bgcolor: '#ffffff', minHeight: '100vh', py: { xs: 2, md: 4 } }}>
                <Container maxWidth="xl">
                    <Box sx={{ display: 'flex', gap: { xs: 3, md: 4 }, alignItems: 'flex-start' }}>
                        <Box
                            sx={{
                                position: 'sticky',
                                top: 88,
                                maxHeight: '90vh',
                                borderRadius: 4,
                                border: '1px solid #E5E7EB',
                                bgcolor: '#fff',
                                display: 'flex',
                                flexDirection: 'column',
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)',
                                minWidth: '320px',
                                maxWidth: '480px',
                            }}
                        >
                            {tab === 'help-videos' ? (
                                <>
                                    {/* Sidebar Header */}
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 2.5, borderBottom: '1px solid #F3F4F6' }}>
                                        <Typography sx={{ fontWeight: 700, color: '#111827', fontSize: '1.1rem', lineHeight: 1.2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <PlayCircleOutlineIcon sx={{ color: '#8B5CF6' }} /> Help Categories
                                        </Typography>
                                    </Box>

                                    {/* Sidebar Scrollable List — categories */}
                                    <List
                                        sx={{
                                            flexGrow: 1,
                                            overflowY: 'auto',
                                            px: 1,
                                            '&::-webkit-scrollbar': { width: 4 },
                                            '&::-webkit-scrollbar-track': { bgcolor: 'transparent' },
                                            '&::-webkit-scrollbar-thumb': { bgcolor: '#E5E7EB', borderRadius: 4 },
                                        }}
                                    >

                                        {HELP_CATEGORIES.map((cat) => {
                                            const isSelected = selectedCategory === cat;
                                            return (
                                                <ListItem key={cat} disablePadding>
                                                    <ListItemButton
                                                        selected={isSelected}
                                                        onClick={() => setSelectedCategory(cat)}
                                                        sx={{
                                                            py: 1.1,
                                                            px: 2,
                                                            borderRadius: 2.5,
                                                            mb: 0.5,
                                                            '&.Mui-selected': {
                                                                background: `linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)`,
                                                                color: '#fff',
                                                                '&:hover': {
                                                                    background: `linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)`,
                                                                }
                                                            }
                                                        }}
                                                    >
                                                        <ListItemText
                                                            primary={cat}
                                                            primaryTypographyProps={{
                                                                fontSize: '0.9rem',
                                                                fontWeight: isSelected ? 700 : 500,
                                                                color: isSelected ? "#fff !important" : "#4B5563",
                                                                lineHeight: 1.3,
                                                            }}
                                                        />
                                                    </ListItemButton>
                                                </ListItem>
                                            );
                                        })}
                                    </List>
                                </>
                            ) : (
                                <>
                                    {/* Sidebar Header */}
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 2.5, borderBottom: '1px solid #F3F4F6' }}>
                                        <IconButton
                                            onClick={() => setRole(null)}
                                            size="small"
                                            sx={{
                                                color: '#4B5563',
                                                bgcolor: '#F3F4F6',
                                                '&:hover': { bgcolor: '#E5E7EB' }
                                            }}
                                        >
                                            <ArrowBackIcon fontSize="small" />
                                        </IconButton>
                                        <Typography sx={{ fontWeight: 700, color: '#111827', fontSize: '1.1rem', lineHeight: 1.2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                            {roleData ? <>{roleData.icon} {roleData.label} Training</> : 'Learning Center'}
                                        </Typography>
                                    </Box>

                                    {/* Sidebar Scrollable List — sections from TrainingData based on role */}
                                    <List
                                        sx={{
                                            flexGrow: 1,
                                            overflowY: 'auto',
                                            px: 1,
                                            '&::-webkit-scrollbar': { width: 4 },
                                            '&::-webkit-scrollbar-track': { bgcolor: 'transparent' },
                                            '&::-webkit-scrollbar-thumb': { bgcolor: '#E5E7EB', borderRadius: 4 },
                                        }}
                                    >
                                        {roleData?.menuData.map((section) => {
                                            const hasSections = roleData.hasSections !== false;
                                            const displaySectionName = (lang === 'hi' && section.sectionHindi) ? section.sectionHindi : section.section;
                                            return (
                                                <React.Fragment key={section.section}>
                                                    {hasSections && (
                                                        <ListSubheader
                                                            component="a"
                                                            href={`#section-${section.section.replace(/\s+/g, '-')}`}
                                                            sx={{
                                                                position: 'relative',
                                                                bgcolor: 'transparent',
                                                                lineHeight: 'normal',
                                                                mt: 3,
                                                                mb: 1,
                                                                fontSize: '0.9rem',
                                                                fontWeight: 700,
                                                                letterSpacing: 1,
                                                                color: '#6B7280',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: 1,
                                                                textDecoration: 'none',
                                                                cursor: 'pointer',
                                                                '&:hover': { color: '#8B5CF6' }
                                                            }}
                                                        >
                                                            <Box sx={{ display: 'flex' }}>{section.icon}</Box>
                                                            {displaySectionName.toUpperCase()}
                                                        </ListSubheader>
                                                    )}
                                                    {section.items.map((item) => renderSidebarItem(item))}
                                                </React.Fragment>
                                            );
                                        })}
                                    </List>
                                </>
                            )}
                        </Box>

                        {/* ── RIGHT CONTENT AREA ── */}
                        <Box sx={{ flexGrow: 1, minWidth: 0, pt: { xs: 0, md: 1 }, pb: 8 }}>
                            {/* Top Search Bar & Language Selector */}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 5, gap: 2, flexWrap: 'wrap' }}>
                                <Box sx={{ maxWidth: 600, flexGrow: 1 }}>
                                    <TextField
                                        fullWidth
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder={tab === 'help-videos' ? "Search help videos..." : (lang === 'hi' ? "ट्यूटोरियल, सहायता फ़ाइलें और अक्सर पूछे जाने वाले प्रश्न खोजें" : "Search for tutorials, help files and frequently asked questions")}
                                        variant="outlined"
                                        size="small"
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start"><SearchIcon color="action" /></InputAdornment>,
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={startListening}
                                                        size="small"
                                                        sx={{
                                                            color: '#8B5CF6',
                                                            bgcolor: '#F5F3FF',
                                                            '&:hover': {
                                                                bgcolor: '#EDE9FE',
                                                            }
                                                        }}
                                                    >
                                                        <MicIcon fontSize="small" />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                            sx: { borderRadius: 20, bgcolor: '#fff', '& fieldset': { borderColor: '#E5E7EB' }, pr: 0.5 }
                                        }}
                                    />
                                </Box>
                                {tab !== 'help-videos' && (
                                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                        <Chip
                                            label="English"
                                            onClick={() => {
                                                setLang('en');
                                                localStorage.setItem('training_lang', 'en');
                                            }}
                                            variant={lang === 'en' ? 'filled' : 'outlined'}
                                            sx={{
                                                fontWeight: 600,
                                                cursor: 'pointer',
                                                bgcolor: lang === 'en' ? '#8B5CF6' : 'transparent',
                                                color: lang === 'en' ? '#fff' : '#6B7280',
                                                borderColor: '#E5E7EB',
                                                '&:hover': {
                                                    bgcolor: lang === 'en' ? '#7C3AED' : '#F3F4F6',
                                                }
                                            }}
                                        />
                                        <Chip
                                            label="हिंदी"
                                            onClick={() => {
                                                setLang('hi');
                                                localStorage.setItem('training_lang', 'hi');
                                            }}
                                            variant={lang === 'hi' ? 'filled' : 'outlined'}
                                            sx={{
                                                fontWeight: 600,
                                                cursor: 'pointer',
                                                bgcolor: lang === 'hi' ? '#8B5CF6' : 'transparent',
                                                color: lang === 'hi' ? '#fff' : '#6B7280',
                                                borderColor: '#E5E7EB',
                                                '&:hover': {
                                                    bgcolor: lang === 'hi' ? '#7C3AED' : '#F3F4F6',
                                                }
                                            }}
                                        />
                                    </Box>
                                )}
                            </Box>

                            {tab === 'help-videos' ? (
                                <>
                                    {/* Page Header */}
                                    <Box sx={{ mb: 4 }}>
                                        <Typography variant="h4" sx={{ fontWeight: 800, color: '#111827', mb: 1 }}>
                                            {selectedCategory === 'All' ? 'All Help Topics' : `${selectedCategory} Help`}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#4B5563' }}>
                                            {selectedCategory === 'All'
                                                ? 'Browse all short troubleshooting and help videos for your ERP software.'
                                                : `Quick visual solutions and answers for ${selectedCategory} issues.`}
                                        </Typography>
                                    </Box>

                                    {/* Grid of Help Videos */}
                                    {filteredHelpVideos.length === 0 ? (
                                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 10, textAlign: 'center' }}>
                                            <PlayCircleOutlineIcon sx={{ fontSize: 70, color: '#D1D5DB', mb: 2 }} />
                                            <Typography variant="h6" sx={{ color: '#4B5563', fontWeight: 700 }}>
                                                No help videos found
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: '#9CA3AF', mt: 1 }}>
                                                Try adjusting your search query or selecting a different category.
                                            </Typography>
                                        </Box>
                                    ) : (
                                        <Grid container spacing={3}>
                                            {filteredHelpVideos.map((video) => (
                                                <Grid item xs={12} sm={6} md={4} key={video.id}>
                                                    <Card
                                                        onClick={() => navigate(`/help/${video.slug}`)}
                                                        sx={{
                                                            height: '100%',
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            borderRadius: 4,
                                                            border: '1px solid #E5E7EB',
                                                            boxShadow: 'none',
                                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                            cursor: 'pointer',
                                                            '&:hover': {
                                                                transform: 'translateY(-4px)',
                                                                boxShadow: '0 12px 20px rgba(0,0,0,0.08)',
                                                                borderColor: '#8B5CF6',
                                                                '& .play-overlay': { opacity: 1 }
                                                            }
                                                        }}
                                                    >
                                                        <Box sx={{ position: 'relative', pt: '56.25%', overflow: 'hidden', bgcolor: '#000', borderTopLeftRadius: 15, borderTopRightRadius: 15 }}>
                                                            <Box
                                                                component="img"
                                                                src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                                                                alt={video.title}
                                                                sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                                                            />
                                                            <Box
                                                                className="play-overlay"
                                                                sx={{
                                                                    position: 'absolute',
                                                                    inset: 0,
                                                                    bgcolor: 'rgba(0,0,0,0.4)',
                                                                    opacity: 0,
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    transition: 'opacity 0.3s ease'
                                                                }}
                                                            >
                                                                <Box sx={{ width: 44, height: 44, borderRadius: '50%', bgcolor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                    <PlayArrowRoundedIcon sx={{ fontSize: 28, color: '#8B5CF6' }} />
                                                                </Box>
                                                            </Box>
                                                        </Box>
                                                        <CardContent sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                                            <Box>
                                                                <Typography variant="h6" sx={{ fontWeight: 800, color: '#111827', mb: 0.5, fontSize: '0.95rem', lineHeight: 1.3 }}>
                                                                    {video.title}
                                                                </Typography>
                                                                <Typography variant="body2" sx={{ color: '#6B7280', fontSize: '0.825rem', lineClamp: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.4 }}>
                                                                    {video.desc}
                                                                </Typography>
                                                            </Box>
                                                        </CardContent>
                                                    </Card>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    )}
                                </>
                            ) : (
                                <>
                                    {/* Page Header */}
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
                                        <Box>
                                            <Typography variant="h4" gutterBottom>
                                                {(lang === 'hi' && activeItem?.titleHindi) ? activeItem.titleHindi : (activeItem?.title || roleData?.label || 'Training')}
                                            </Typography>
                                            <Typography variant="body2">
                                                {(lang === 'hi' && activeItem?.descHindi) ? activeItem.descHindi : (activeItem?.desc || `Explore ${roleData?.label} training resources.`)}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    {/* ── Video cards grid — sections from TrainingData ── */}
                                    {filteredMenuData.length === 0 ? (
                                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 15, px: 2, textAlign: 'center' }}>
                                            <PlayCircleOutlineIcon sx={{ fontSize: 80, color: '#E5E7EB', mb: 2 }} />
                                            <Typography variant="h6" sx={{ color: '#4B5563', fontWeight: 700 }}>
                                                {lang === 'hi' ? "कोई वीडियो नहीं मिला" : "No videos found"}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: '#6B7280', mt: 1, maxWidth: 300 }}>
                                                {lang === 'hi' ? `हमें "${searchQuery}" से मेल खाता हुआ कोई वीडियो नहीं मिला। कृपया पुनः प्रयास करें।` : `We couldn't find any videos matching "${searchQuery}". Try adjusting your search terms.`}
                                            </Typography>
                                            <Button
                                                onClick={() => setSearchQuery('')}
                                                sx={{ mt: 3, color: '#8B5CF6', fontWeight: 600, textTransform: 'none', bgcolor: '#F5F3FF', px: 3, borderRadius: 8, '&:hover': { bgcolor: '#EDE9FE' } }}
                                            >
                                                {lang === 'hi' ? "खोज साफ़ करें" : "Clear Search"}
                                            </Button>
                                        </Box>
                                    ) : (
                                        filteredMenuData.map((section) => {
                                            const hasSections = roleData?.hasSections !== false;
                                            const displaySectionName = (lang === 'hi' && section.sectionHindi) ? section.sectionHindi : section.section;
                                            return (
                                                <Box
                                                    key={section.section}
                                                    id={`section-${section.section.replace(/\s+/g, '-')}`}
                                                    sx={{ mb: 5, scrollMarginTop: '120px' }}
                                                >
                                                    {/* Section heading */}
                                                    {hasSections && (
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                                            <Box sx={{ display: 'flex', color: '#6B7280' }}>{section.icon}</Box>
                                                            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#374151' }}>
                                                                {displaySectionName}
                                                            </Typography>
                                                            <Chip
                                                                label={section.items.length}
                                                                size="small"
                                                                sx={{ height: 18, fontSize: '0.65rem', bgcolor: '#F3F4F6', color: '#6B7280', fontWeight: 700 }}
                                                            />
                                                        </Box>
                                                    )}

                                                    <Grid container spacing={2.5}>
                                                        {section?.items.map((item) => {
                                                            const isActive = activeItem?.slug === item.slug;
                                                            return (
                                                                <Grid item xs={12} sm={6} md={4} key={item.id}
                                                                    id={`item-${item.slug}`}
                                                                    sx={{
                                                                        position: 'relative',
                                                                        cursor: 'pointer',
                                                                        scrollMarginTop: '120px'
                                                                    }}
                                                                >
                                                                    <Card
                                                                        onClick={() => {
                                                                            setActiveVideoSlug(item.slug);
                                                                            navigate(`/help/${item.slug}`);
                                                                        }}
                                                                        sx={{
                                                                            height: 250, // fixed height for wide layout
                                                                            display: 'flex',
                                                                            flexDirection: 'column',
                                                                            position: 'relative',
                                                                            cursor: 'pointer',
                                                                            overflow: 'hidden',
                                                                            borderRadius: 3,
                                                                            borderColor: isActive ? '#8B5CF6' : '#E5E7EB',
                                                                            transition: 'all 0.3s ease',
                                                                            '&:hover': {
                                                                                borderColor: '#8B5CF6',
                                                                                boxShadow: '0 12px 28px rgba(139,92,246,0.2)',
                                                                                // Hover states for children
                                                                                '& .hover-overlay': { opacity: 1 },
                                                                                '& .hover-play': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
                                                                                '& .default-panel': { transform: 'translateY(100%)' },
                                                                            },
                                                                        }}
                                                                    >
                                                                        {/* Base Image filling the whole card */}
                                                                        <Box
                                                                            component="img"
                                                                            src={`https://img.youtube.com/vi/${item.youtubeId}/mqdefault.jpg`}
                                                                            alt={item.title}
                                                                            sx={{
                                                                                position: 'absolute',
                                                                                top: 0,
                                                                                left: 0,
                                                                                right: 0,
                                                                                bottom: 0,
                                                                                width: '100%',
                                                                                height: '100%',
                                                                                objectFit: 'cover',
                                                                                display: 'block',
                                                                                transition: 'transform 0.5s ease',
                                                                                '.MuiCard-root:hover &': {
                                                                                    transform: 'scale(1.05)',
                                                                                }
                                                                            }}
                                                                        />

                                                                        {/* Hover Overlay Gradient */}
                                                                        <Box
                                                                            className="hover-overlay"
                                                                            sx={{
                                                                                position: 'absolute',
                                                                                inset: 0,
                                                                                background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
                                                                                opacity: isActive ? 1 : 0,
                                                                                transition: 'opacity 0.3s ease',
                                                                                display: 'flex',
                                                                                flexDirection: 'column',
                                                                                justifyContent: 'flex-end',
                                                                                p: 2,
                                                                                zIndex: 2,
                                                                            }}
                                                                        >
                                                                            <Typography variant="body1" sx={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem', lineHeight: 1.3, mb: 0.5 }}>
                                                                                {(lang === 'hi' && item.titleHindi) ? item.titleHindi : item.title}
                                                                            </Typography>
                                                                        </Box>

                                                                        {/* Center Play Button for Hover */}
                                                                        <Box
                                                                            className="hover-play"
                                                                            sx={{
                                                                                position: 'absolute',
                                                                                top: '50%',
                                                                                left: '50%',
                                                                                transform: 'translate(-50%, -50%) scale(0.5)',
                                                                                opacity: isActive ? 1 : 0,
                                                                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                                                width: 56,
                                                                                height: 56,
                                                                                borderRadius: '50%',
                                                                                bgcolor: '#fff',
                                                                                display: 'flex',
                                                                                alignItems: 'center',
                                                                                justifyContent: 'center',
                                                                                boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                                                                                zIndex: 3,
                                                                            }}
                                                                        >
                                                                            <PlayArrowRoundedIcon sx={{ fontSize: 36, color: '#8B5CF6' }} />
                                                                        </Box>

                                                                        {/* Default White Panel at Bottom */}
                                                                        <Box
                                                                            className="default-panel"
                                                                            sx={{
                                                                                position: 'absolute',
                                                                                bottom: 0,
                                                                                left: 0,
                                                                                right: 0,
                                                                                bgcolor: '#fff',
                                                                                p: 2,
                                                                                pt: 2.5,
                                                                                transition: 'transform 0.3s ease',
                                                                                transform: isActive ? 'translateY(100%)' : 'translateY(0)',
                                                                                minHeight: '84px',
                                                                                zIndex: 1,
                                                                            }}
                                                                        >
                                                                            {/* Floating Play Button */}
                                                                            <Box
                                                                                sx={{
                                                                                    position: 'absolute',
                                                                                    top: -24,
                                                                                    right: 20,
                                                                                    width: 48,
                                                                                    height: 48,
                                                                                    borderRadius: '50%',
                                                                                    bgcolor: '#fff',
                                                                                    display: 'flex',
                                                                                    alignItems: 'center',
                                                                                    justifyContent: 'center',
                                                                                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                                                                }}
                                                                            >
                                                                                <PlayArrowRoundedIcon sx={{ fontSize: 30, color: '#8B5CF6' }} />
                                                                            </Box>

                                                                            <Typography variant="body1" sx={{ fontWeight: 700, color: '#111827', fontSize: '0.9rem', lineHeight: 1.3, pr: 5 }}>
                                                                                {(lang === 'hi' && item.titleHindi) ? item.titleHindi : item.title}
                                                                            </Typography>
                                                                        </Box>
                                                                    </Card>
                                                                </Grid>
                                                            );
                                                        })}
                                                    </Grid>
                                                    {hasSections && <Divider sx={{ mt: 4 }} />}
                                                </Box>
                                            );
                                        })
                                    )}
                                </>
                            )}
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* Bottom Drawer for Voice Recognition */}
            <Drawer
                anchor="bottom"
                open={isListening}
                onClose={stopListening}
                PaperProps={{
                    sx: {
                        borderTopLeftRadius: 28,
                        borderTopRightRadius: 28,
                        bgcolor: '#ffffff',
                        boxShadow: '0 -10px 40px rgba(0,0,0,0.1)',
                        maxHeight: '60vh',
                        padding: 3,
                        pb: 5,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden'
                    }
                }}
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 9999
                }}
            >
                {/* Drag Handle Bar */}
                <Box
                    sx={{
                        width: 44,
                        height: 5,
                        bgcolor: '#E5E7EB',
                        borderRadius: 2.5,
                        position: 'absolute',
                        top: 14,
                        left: '50%',
                        transform: 'translateX(-50%)'
                    }}
                />

                {/* Close Button */}
                <IconButton
                    onClick={stopListening}
                    sx={{
                        position: 'absolute',
                        top: 12,
                        right: 16,
                        color: '#6B7280',
                        bgcolor: '#F3F4F6',
                        '&:hover': {
                            bgcolor: '#E5E7EB'
                        }
                    }}
                >
                    <CloseRoundedIcon />
                </IconButton>

                {/* Listening/Status Header */}
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 700,
                        color: '#111827',
                        mb: 3,
                        letterSpacing: 0.3,
                        mt: 1
                    }}
                >
                    {lang === 'hi' ? 'सुन रहा हूँ...' : 'Listening...'}
                </Typography>

                {/* Voice Search Illustration */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        my: 2,
                        width: 130,
                        height: 90
                    }}
                >
                    <svg width="120" height="90" viewBox="0 0 120 90" fill="none" stroke="#4285F4" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        {/* Sound waves on the left of the face */}
                        <path d="M35 30 C28 38, 28 52, 35 60" />
                        <path d="M27 22 C16 34, 16 56, 27 68" />
                        <path d="M19 14 C5 30, 5 60, 19 76" />

                        {/* Face outline / profile */}
                        <path d="M51 49 C49 68, 58 82, 85 82" />
                        <path d="M56 36 C60 34, 66 35, 70 38" />
                        <path d="M86 34 C90 32, 96 33, 100 36" />
                        <circle cx="61" cy="46" r="2.5" fill="#4285F4" stroke="none" />
                        <circle cx="91" cy="44" r="2.5" fill="#4285F4" stroke="none" />
                        <path d="M78 52 L78 61 L73 63" />
                        <path d="M71 74 C78 75, 87 72, 92 69" />
                    </svg>
                </Box>

                {/* Four Colorful Animated Sound Wave Lines */}
                <Box
                    sx={{
                        display: 'flex',
                        gap: 1.5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 50,
                        my: 3
                    }}
                >
                    <Box sx={{ width: 6, height: 16, bgcolor: '#4285F4', borderRadius: 3, transformOrigin: 'center', animation: 'sound-wave 1s ease-in-out infinite' }} />
                    <Box sx={{ width: 6, height: 16, bgcolor: '#EA4335', borderRadius: 3, transformOrigin: 'center', animation: 'sound-wave 0.8s ease-in-out infinite 0.15s' }} />
                    <Box sx={{ width: 6, height: 16, bgcolor: '#FBBC05', borderRadius: 3, transformOrigin: 'center', animation: 'sound-wave 1.1s ease-in-out infinite 0.3s' }} />
                    <Box sx={{ width: 6, height: 16, bgcolor: '#34A853', borderRadius: 3, transformOrigin: 'center', animation: 'sound-wave 0.7s ease-in-out infinite 0.05s' }} />
                </Box>

                {/* Live Transcription / Instructions */}
                <Box sx={{ textAlign: 'center', maxWidth: 450, px: 3 }}>
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 800,
                            color: '#111827',
                            minHeight: '32px',
                            mb: 1.5
                        }}
                    >
                        {voiceText}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#9CA3AF', fontWeight: 500 }}>
                        {lang === 'hi'
                            ? 'आवाज खोज का उपयोग करने के लिए कुछ कहें (जैसे "ग्राहक" या "धातु")'
                            : 'Say something to search (e.g., "Customer" or "Metal")'
                        }
                    </Typography>
                </Box>
            </Drawer>
        </ThemeWrapper>
    );
}
