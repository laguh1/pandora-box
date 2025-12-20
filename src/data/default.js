// Default version - Generic topics and URLs for standard use
export const topics = [
  {
    id: 'productivity',
    name: 'Productivity',
    icon: '⚡',
    color: '#547792',      // Medium Blue
    chromeColor: 'blue',
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
    color: '#94B4C1',      // Light Blue
    chromeColor: 'cyan',
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
    color: '#EAE0CF',      // Cream/Beige
    chromeColor: 'grey',
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
    color: '#547792',      // Medium Blue
    chromeColor: 'blue',
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
    color: '#94B4C1',      // Light Blue
    chromeColor: 'cyan',
    urls: []
  }
];

export default topics;
