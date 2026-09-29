export const INITIAL_MESSAGES = [
  {
    id: 'msg-1',
    sender: 'agent',
    senderName: 'Sam Lee',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    text: 'Hi Alex! How have you been? 😊',
    timestamp: '3:12 AM',
    dateDivider: '3:12 AM',
    hasLeftAccent: true,
  },
  {
    id: 'msg-2',
    sender: 'user',
    senderName: 'Alex',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    text: 'Hey Sam! Woah it’s been awhile!\nI’ve been doing good, how about you?',
    timestamp: '3:14 AM',
    pinnedNotice: 'Sam Lee pinned a message. View all pinned',
  },
  {
    id: 'msg-3',
    sender: 'agent',
    senderName: 'Sam Lee',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    text: 'I’ve been doing pretty well. I went to Baker Beach today and it reminded me of you haha',
    timestamp: '3:16 AM',
    hasLeftAccent: true,
    replyQuote: {
      author: 'Alex',
      time: '3.15 AM',
      text: 'I’ve been doing good, how about you?',
    }
  },
  {
    id: 'msg-4',
    sender: 'agent',
    senderName: 'Sam Lee',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    text: 'It was so nice today',
    timestamp: '3:38 AM',
    dateDivider: '3:38 AM',
    hasLeftAccent: true,
    readReceipt: true,
    attachments: [
      {
        type: 'image',
        name: 'baker_beach.jpg',
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
        size: '2.8 MB'
      }
    ]
  }
];

export const ELVEE_SUPPORT_TEAM = [
  {
    id: 'agent-1',
    name: 'Sarah Jenkins',
    role: 'Lead Support Specialist',
    status: 'online',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    email: 'sarah.j@elvee.com',
  },
  {
    id: 'agent-2',
    name: 'Alex Rivera',
    role: 'Technical Integration Eng.',
    status: 'online',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    email: 'alex.r@elvee.com',
  },
  {
    id: 'agent-3',
    name: 'Elena Rostova',
    role: 'Customer Success Manager',
    status: 'away',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    email: 'elena.r@elvee.com',
  },
  {
    id: 'agent-4',
    name: 'David Chen',
    role: 'Tier 2 Systems Architect',
    status: 'offline',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    email: 'david.c@elvee.com',
  }
];

export const ATTACHMENT_OPTIONS = [
  { id: 'attachments', label: 'Attachments', icon: 'file-text', count: 'Documents & PDFs' },
  { id: 'mentions', label: 'Mentions', icon: 'at-sign', count: '@team member' },
  { id: 'images', label: 'Images', icon: 'image', count: 'Photos & screenshots' },
  { id: 'others', label: 'Others', icon: 'grid', count: 'Code snippets & links' },
];
