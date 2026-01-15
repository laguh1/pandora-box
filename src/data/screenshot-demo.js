// SCREENSHOT DEMO DATA - FOR CHROME WEB STORE SCREENSHOTS ONLY
// This file contains NO real brand names or trademarks
// Use this data when taking screenshots for Chrome Web Store listing
// DO NOT use this for production builds

export const topics = [
  {
    id: 'productivity',
    name: 'Productivity',
    icon: '⚡',
    color: '#547792',      // Medium Blue
    chromeColor: 'blue',
    urls: [
      { id: 1, title: 'Email Service', url: 'https://example-email.com' },
      { id: 2, title: 'Calendar App', url: 'https://example-calendar.com' },
      { id: 3, title: 'Cloud Storage', url: 'https://example-drive.com' },
      { id: 4, title: 'Task Manager', url: 'https://example-tasks.com' }
    ]
  },
  {
    id: 'development',
    name: 'Development',
    icon: '💻',
    color: '#94B4C1',      // Light Blue
    chromeColor: 'cyan',
    urls: [
      { id: 1, title: 'Code Repository', url: 'https://example-code.com' },
      { id: 2, title: 'Dev Forum', url: 'https://example-forum.com' },
      { id: 3, title: 'API Docs', url: 'https://example-docs.com' },
      { id: 4, title: 'Package Manager', url: 'https://example-packages.com' }
    ]
  },
  {
    id: 'news',
    name: 'News',
    icon: '📰',
    color: '#EAE0CF',      // Cream/Beige
    chromeColor: 'grey',
    urls: [
      { id: 1, title: 'News Site A', url: 'https://news-example-1.com' },
      { id: 2, title: 'News Portal', url: 'https://news-example-2.com' },
      { id: 3, title: 'World News', url: 'https://news-example-3.com' },
      { id: 4, title: 'Daily News', url: 'https://news-example-4.com' }
    ]
  },
  {
    id: 'social',
    name: 'Social Media',
    icon: '💬',
    color: '#547792',      // Medium Blue
    chromeColor: 'blue',
    urls: [
      { id: 1, title: 'Social Network', url: 'https://example-social-1.com' },
      { id: 2, title: 'Photo Sharing', url: 'https://example-photos.com' },
      { id: 3, title: 'Professional Network', url: 'https://example-career.com' },
      { id: 4, title: 'Microblog', url: 'https://example-posts.com' }
    ]
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    icon: '🎬',
    color: '#94B4C1',      // Light Blue
    chromeColor: 'cyan',
    urls: [
      { id: 1, title: 'Video Platform', url: 'https://example-video.com' },
      { id: 2, title: 'Music Streaming', url: 'https://example-music.com' },
      { id: 3, title: 'Podcast Hub', url: 'https://example-podcasts.com' }
    ]
  }
];

export default topics;

/*
USAGE INSTRUCTIONS FOR TAKING SCREENSHOTS:

1. Temporarily modify your import in App.jsx or main data file:
   Change: import { topics } from './data/topics.js'
   To:     import { topics } from './data/screenshot-demo.js'

2. Build the extension:
   npm run build

3. Load the extension in Chrome (Developer mode > Load unpacked)

4. Take screenshots showing:
   - Main popup with topic cards
   - Topic modal open with link selection
   - Settings panel
   - Different theme applied

5. VERIFY: No real brand names appear in any screenshot

6. Upload screenshots to Chrome Web Store

7. REVERT the import back to regular topics.js before publishing

8. Build again with real data file:
   npm run build

9. Submit the properly built extension with the safe screenshots

IMPORTANT: The screenshots show placeholder names, but users will add their own real links when they use the extension. This is compliant with Chrome Web Store policy.
*/
