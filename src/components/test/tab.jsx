import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Paper,
  Container
} from '@mui/material';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function TabsSection({ title, description, activeTab, onTabChange, tabs }) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h4"
        component="h2"
        sx={{
          mb: 1,
          fontWeight: 400,
          color: '#5f6368',
          fontSize: '28px'
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          mb: 2,
          color: '#5f6368',
          fontSize: '13px',
          fontStyle: 'italic'
        }}
      >
        {description}
      </Typography>

      <Paper
        elevation={0}
        sx={{
          // border: '1px solid #dadce0',
          borderRadius: '8px',
          overflow: 'hidden'
        }}
      >
        <Tabs
          value={activeTab}
          onChange={onTabChange}
          sx={{
            minHeight: '48px',
            '& .MuiTabs-indicator': {
              display: 'none'
            },
            '& .MuiTab-root': {
              minHeight: '48px',
              textTransform: 'none',
              fontSize: '14px',
              color: '#5f6368',
              backgroundColor: '#f8f9fa',
              border: 'none',
              borderRight: '1px solid rgba(85, 85, 85, 0.19)',
              borderBottom: '1px solid rgba(85, 85, 85, 0.19)',
              borderRadius: 0,
              '&:last-child': {
                borderRight: 'none'
              },
              '&.Mui-selected': {
                backgroundColor: '#ffffff',
                color: '#1976d2',
                fontWeight: 500,
                borderBottom: 'none',
                borderTop: '1px solid rgba(85, 85, 85, 0.19)',
              },
              '&:hover': {
                backgroundColor: activeTab === tabs.findIndex(tab => tab.label === tabs.find((t, i) => i === activeTab)?.label) ? '#ffffff' : '#f1f3f4'
              }
            }
          }}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={tab.label}
              sx={{
                flex: 1,
                maxWidth: 'none'
              }}
            />
          ))}
        </Tabs>

        {tabs.map((tab, index) => (
          <TabPanel key={index} value={activeTab} index={index}>
            <Typography variant="body1" sx={{ color: '#5f6368' }}>
              {tab.content}
            </Typography>
          </TabPanel>
        ))}
      </Paper>
    </Box>
  );
}

export default function BootstrapTabsExample() {
  const [activeTab1, setActiveTab1] = useState(0);
  const [activeTab2, setActiveTab2] = useState(1);
  const [activeTab3, setActiveTab3] = useState(2);

  const handleTabChange1 = (event, newValue) => {
    setActiveTab1(newValue);
  };

  const handleTabChange2 = (event, newValue) => {
    setActiveTab2(newValue);
  };

  const handleTabChange3 = (event, newValue) => {
    setActiveTab3(newValue);
  };

  const tabsData = [
    {
      label: "Usage",
      content: "This tab contains usage information and examples for implementing tabs in your application."
    },
    {
      label: "Style",
      content: "This tab covers styling options, customization techniques, and design patterns for tabs."
    },
    {
      label: "CSS",
      content: "This tab provides CSS code examples, classes, and styling specifications for tabs."
    }
  ];

  return (
    <Container maxWidth="md" sx={{ py: 4, minHeight: '100vh' }}>
      <TabsSection
        title="Tabs"
        description="Tabs are used to separate information into logical sections and to quickly navigate between them."
        activeTab={activeTab1}
        onTabChange={handleTabChange1}
        tabs={tabsData}
      />

      <Box>


      </Box>



    </Container>
  );
}