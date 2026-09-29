import React from 'react';
import { 
  Popover, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Typography 
} from '@mui/material';
import { 
  DescriptionOutlined, 
  AlternateEmailOutlined, 
  ImageOutlined, 
  MoreHorizOutlined 
} from '@mui/icons-material';

const AttachmentMenu = ({ anchorEl, isOpen, onClose, onSelectOption }) => {
  const menuItems = [
    { id: 'attachments', label: 'Attachments', icon: <DescriptionOutlined fontSize="small" color="primary" />, hint: 'Docs & PDFs' },
    { id: 'mentions', label: 'Mentions', icon: <AlternateEmailOutlined fontSize="small" color="secondary" />, hint: '@member' },
    { id: 'images', label: 'Images', icon: <ImageOutlined fontSize="small" color="info" />, hint: 'Photos' },
    { id: 'others', label: 'Others', icon: <MoreHorizOutlined fontSize="small" color="action" />, hint: 'Code & links' },
  ];

  return (
    <Popover
      open={isOpen}
      anchorEl={anchorEl}
      onClose={onClose}
      sx={{ zIndex: 100000 }}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      PaperProps={{
        elevation: 8,
        sx: {
          borderRadius: 3,
          backgroundColor: '#FFFFFF',
          color: '#0F172A',
          border: '1px solid #E2E8F0',
          boxShadow: '0 12px 36px rgba(15, 23, 42, 0.15)',
          minWidth: 220,
          p: 0.5,
        }
      }}
    >
      <List dense disablePadding>
        {menuItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              onClick={() => {
                onSelectOption(item.id);
                onClose();
              }}
              sx={{
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: '#F8FAFC',
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 34 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#0F172A' }}>
                    {item.label}
                  </Typography>
                }
                secondary={
                  <Typography variant="caption" sx={{ color: '#64748B' }}>
                    {item.hint}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Popover>
  );
};

export default AttachmentMenu;
