// Default version - Generic topics and URLs for standard use
export const topics = [
  {
    id: 'productivity',
    name: 'Productivity',
    icon: '⚡',
    color: '#E68369',      // Coral Pink
    chromeColor: 'orange',
    urls: [
      { id: 1, title: 'Gmail', url: 'https://mail.google.com' },
      { id: 2, title: 'Google Calendar', url: 'https://calendar.google.com' },
      { id: 3, title: 'Google Drive', url: 'https://drive.google.com' },
      { id: 4, title: 'Notion', url: 'https://www.notion.so' },
      { id: 5, title: 'Todoist', url: 'https://todoist.com' }
    ]
  },
  {
    id: 'development',
    name: 'Development',
    icon: '💻',
    color: '#CBD99B',      // Sage Green
    chromeColor: 'green',
    urls: [
      { id: 1, title: 'GitHub', url: 'https://github.com' },
      { id: 2, title: 'Stack Overflow', url: 'https://stackoverflow.com' },
      { id: 3, title: 'MDN Web Docs', url: 'https://developer.mozilla.org' },
      { id: 4, title: 'npm', url: 'https://www.npmjs.com' },
      { id: 5, title: 'CodePen', url: 'https://codepen.io' }
    ]
  },
  {
    id: 'news',
    name: 'News',
    icon: '📰',
    color: '#9E1C60',      // Dark Magenta
    chromeColor: 'pink',
    urls: [
      { id: 1, title: 'BBC News', url: 'https://www.bbc.com/news' },
      { id: 2, title: 'The Guardian', url: 'https://www.theguardian.com' },
      { id: 3, title: 'Reuters', url: 'https://www.reuters.com' },
      { id: 4, title: 'CNN', url: 'https://www.cnn.com' },
      { id: 5, title: 'Hacker News', url: 'https://news.ycombinator.com' }
    ]
  },
  {
    id: 'social-media',
    name: 'Social Media',
    icon: '💬',
    color: '#F5AD18',      // Gold/Yellow
    chromeColor: 'yellow',
    urls: [
      { id: 1, title: 'Twitter/X', url: 'https://twitter.com' },
      { id: 2, title: 'Instagram', url: 'https://www.instagram.com' },
      { id: 3, title: 'Facebook', url: 'https://www.facebook.com' },
      { id: 4, title: 'LinkedIn', url: 'https://www.linkedin.com' },
      { id: 5, title: 'Reddit', url: 'https://www.reddit.com' }
    ]
  },
  {
    id: 'miscellaneous',
    name: 'Miscellaneous',
    icon: '📦',
    color: '#006989',      // Deep Teal
    chromeColor: 'cyan',
    urls: []
  }
];

export default topics;
