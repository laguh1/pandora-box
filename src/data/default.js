// Default version - Brand-free starter topics for Chrome Web Store distribution
// Users add their own links after installation
export const topics = [
  {
    id: 'productivity',
    name: 'Productivity',
    icon: '⚡',
    color: '#547792',      // Medium Blue
    chromeColor: 'blue',
    urls: [
      { id: 1, title: 'Add your email service', url: 'https://example.com' },
      { id: 2, title: 'Add your calendar', url: 'https://example.com' },
      { id: 3, title: 'Add your cloud storage', url: 'https://example.com' }
    ]
  },
  {
    id: 'development',
    name: 'Development',
    icon: '💻',
    color: '#94B4C1',      // Light Blue
    chromeColor: 'cyan',
    urls: [
      { id: 1, title: 'Add your code repository', url: 'https://example.com' },
      { id: 2, title: 'Add your dev forum', url: 'https://example.com' },
      { id: 3, title: 'Add your documentation site', url: 'https://example.com' }
    ]
  },
  {
    id: 'news',
    name: 'News',
    icon: '📰',
    color: '#EAE0CF',      // Cream/Beige
    chromeColor: 'grey',
    urls: [
      { id: 1, title: 'Add your news site', url: 'https://example.com' },
      { id: 2, title: 'Add another news source', url: 'https://example.com' }
    ]
  },
  {
    id: 'social',
    name: 'Social',
    icon: '💬',
    color: '#547792',      // Medium Blue
    chromeColor: 'blue',
    urls: [
      { id: 1, title: 'Add your social network', url: 'https://example.com' },
      { id: 2, title: 'Add another social site', url: 'https://example.com' }
    ]
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    icon: '🎬',
    color: '#94B4C1',      // Light Blue
    chromeColor: 'cyan',
    urls: [
      { id: 1, title: 'Add your streaming service', url: 'https://example.com' },
      { id: 2, title: 'Add your music platform', url: 'https://example.com' }
    ]
  }
];

export default topics;
