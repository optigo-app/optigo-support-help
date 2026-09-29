import React, { useState, useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function ProgressStep() {
    // Generate 100 steps with random heights to simulate the bar chart variations
    const stepsData = useMemo(() => {
        const data = [];
        for (let i = 1; i <= 50; i++) {
            data.push({
                level: i,
                height: Math.floor(Math.random() * 60) + 40, // Height between 40% and 100%
            });
        }
        return data;
    }, []);

    // State to track the current progress level
    const [currentStep, setCurrentStep] = useState(15);

    // Update progress when a user clicks on a bar
    const handleStepClick = (level) => {
        setCurrentStep(level);
    };

    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <Box
                sx={{
                    maxWidth: '100%',

                }}
            >
                <Typography
                    sx={{
                        textAlign: 'center',
                        mb: 2,
                        fontWeight: 600,
                        letterSpacing: '1px',
                        fontSize: 16,
                        mt: 5
                    }}
                >
                    Track your learning journey and see how far you’ve come.
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        gap: 0.5,
                        overflowX: 'auto',
                        pt: 6, // Extra space at top for check icons
                        px: 1,
                        height: 150, // Fixed height for the chart area
                        '&::-webkit-scrollbar': { height: 8 },
                        '&::-webkit-scrollbar-track': { bgcolor: '#f1f5f9', borderRadius: 4 },
                        '&::-webkit-scrollbar-thumb': { backgroundColor: '#cbd5e1', borderRadius: 4 },
                    }}
                >
                    {stepsData.map((step) => {
                        const isCompleted = step.level <= currentStep;

                        return (
                            <Box
                                key={step.level}
                                onClick={() => handleStepClick(step.level)}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'flex-end',
                                    cursor: 'pointer',
                                    minWidth: 18,
                                    height: '100%',
                                    '&:hover .bar': {
                                        opacity: 0.85,
                                    }
                                }}
                            >
                                <Box sx={{ width: '100%', flexGrow: 1, position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center' }}>
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            bottom: `${step.height}%`,
                                            mb: 0.5,
                                            opacity: isCompleted ? 1 : 0,
                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                            transform: isCompleted ? 'scale(1) translateY(0)' : 'scale(0.5) translateY(10px)',
                                            zIndex: 2,
                                        }}
                                    >
                                        <CheckCircleIcon sx={{ color: '#10B981', fontSize: 15, bgcolor: '#fff', borderRadius: '50%' }} />
                                    </Box>

                                    {/* Custom Box Component for the Bar */}
                                    <Box
                                        className="bar"
                                        sx={{
                                            width: '100%',
                                            height: `${step.height}%`,
                                            bgcolor: isCompleted ? '#6EE7B7' : '#E5E7EB', // Mint green if completed, light gray if not
                                            borderRadius: '4px 4px 0 0',
                                            transition: 'all 0.3s ease',
                                        }}
                                    />
                                </Box>

                                {/* Level Text Below */}
                                <Typography
                                    sx={{
                                        mt: 1.5,
                                        fontSize: '11px',
                                        fontWeight: 700,
                                        color: isCompleted ? '#10B981' : '#9CA3AF',
                                        whiteSpace: 'nowrap',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px'
                                    }}
                                >
                                    {step.level}
                                </Typography>
                            </Box>
                        );
                    })}
                </Box>
            </Box>
        </Box>
    );
}