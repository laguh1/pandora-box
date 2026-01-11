# How to Publish Pandora Box to Chrome Web Store

This guide walks you through publishing your Pandora Box extension to the Chrome Web Store.

## Prerequisites

- [ ] A Google account
- [ ] $5 USD one-time developer registration fee
- [ ] Built extension files (`npm run build` creates the `dist` folder)
- [ ] Extension icons (128x128, 48x48, 16x16) - ✅ Already included
- [ ] Screenshots for the store listing (1280x800 or 640x400 recommended)
- [ ] Promotional images (optional but recommended)

---

## Step 1: Create a Developer Account

1. Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
2. Sign in with your Google account
3. Accept the Developer Agreement
4. Pay the one-time $5 registration fee
5. Complete your developer profile

---

## Step 2: Prepare Your Extension Package

### Build the Extension

```bash
# Navigate to your project folder
cd pandora-box

# Install dependencies (if not already done)
npm install

# Build for production
npm run build
```

This creates a `dist/` folder with all necessary files.

### Create a ZIP File

**Option 1: Command Line (Mac/Linux)**
```bash
cd dist
zip -r pandora-box.zip .
```

**Option 2: Finder (Mac)**
1. Open the `dist` folder
2. Select all files (Cmd+A)
3. Right-click → Compress
4. Rename to `pandora-box.zip`

**Option 3: File Explorer (Windows)**
1. Open the `dist` folder
2. Select all files (Ctrl+A)
3. Right-click → Send to → Compressed (zipped) folder
4. Rename to `pandora-box.zip`

> ⚠️ **Important**: Zip the CONTENTS of the dist folder, not the dist folder itself. When Chrome extracts it, `manifest.json` should be at the root level.

---

## Step 3: Prepare Store Listing Assets

### Required Information

Use the content from `CHROME_STORE_DESCRIPTION.md`:

1. **Extension Name**: Pandora Box
2. **Short Description** (132 characters max):
   ```
   Quick access to your favorite websites organized by topic. Open links individually or all at once in color-coded tab groups.
   ```
3. **Detailed Description**: Copy from `CHROME_STORE_DESCRIPTION.md`
4. **Category**: Productivity
5. **Language**: English (add more as needed)

### Screenshots (Required - at least 1)

Take screenshots showing:
1. **Main popup view** - Topic cards displayed (1280x800 recommended)
2. **Topic modal open** - Showing link selection (1280x800)
3. **Chrome tab groups** - Demonstrating the feature (1280x800)
4. **Settings modal** - Theme selection (1280x800)
5. **Different themes** - Show palette variety (optional)

**How to capture:**
1. Load the extension in Chrome
2. Click the extension icon
3. Use Mac: Cmd+Shift+4, Windows: Win+Shift+S
4. Capture the popup window
5. Resize images to 1280x800 or 640x400

### Promotional Images (Optional but Recommended)

- **Small tile**: 440x280 pixels
- **Large tile**: 920x680 pixels
- **Marquee**: 1400x560 pixels

These appear in the Chrome Web Store search results and extension page.

### Icon Verification

Ensure these exist in your `dist/` folder:
- ✅ `icon16.png` (16x16)
- ✅ `icon48.png` (48x48)
- ✅ `icon128.png` (128x128)

---

## Step 4: Upload to Chrome Web Store

### Initial Upload

1. Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
2. Click **"New Item"**
3. Click **"Choose file"** and select your `pandora-box.zip`
4. Click **"Upload"**

The system will validate your package. If there are errors, fix them and re-upload.

### Fill in Store Listing

#### Account Tab
- **Email**: Your support email
- **Website**: Your website or GitHub repo (optional)
- **Support URL**: GitHub issues page or support email

#### Listing Tab

**Product Details:**
- **Name**: Pandora Box
- **Summary**: (Short description - 132 char max)
- **Description**: (Detailed description from `CHROME_STORE_DESCRIPTION.md`)
- **Category**: Productivity
- **Language**: English

**Graphic Assets:**
- Upload at least 1 screenshot
- Upload promotional images (if created)
- Icon is auto-detected from your manifest

**Store Listing Fields:**
- **Single purpose description**: "Organize and quickly access favorite websites by topic with Chrome tab groups"
- **Permission justification**:
  - `tabs`: Required to open URLs and create tab groups
  - `tabGroups`: Required to organize opened links in color-coded groups
  - `storage`: Required to save user's topics and preferences

#### Privacy Tab

**Privacy Policy** (Important!):

You can host this on GitHub or create a simple webpage:

```markdown
# Privacy Policy for Pandora Box

**Effective Date**: January 2026

## Data Collection
Pandora Box does NOT collect, transmit, or sell any user data.

## Data Storage
- All data is stored locally on your device using Chrome's storage API
- Your topics, links, and preferences stay on your computer
- No data is sent to external servers

## Permissions
- **tabs**: Used to open websites and create tab groups
- **tabGroups**: Used to organize tabs by color and topic
- **storage**: Used to save your preferences locally

## Third Parties
We do not share any data with third parties.

## Contact
For questions: [your-email@example.com]
```

Host this file and provide the URL in the Privacy Policy field.

**Single Purpose**: "Organize bookmarks and quickly open websites in Chrome tab groups"

#### Distribution Tab

**Visibility Options:**
- **Public**: Anyone can find and install
- **Unlisted**: Only people with the link can install
- **Private**: Only specific Google accounts/domains

**Geographic Distribution:**
- Select all countries or specific regions

---

## Step 5: Submit for Review

1. Review all tabs (Account, Listing, Privacy, Distribution)
2. Click **"Submit for Review"**
3. Google will review your extension (typically 1-3 business days)
4. You'll receive an email when review is complete

### What Google Reviews

- **Manifest compliance**: Proper permissions, descriptions
- **Privacy compliance**: Clear privacy policy, no data misuse
- **Single purpose**: Extension does what it claims
- **User experience**: Works as described, no spam/abuse
- **Security**: No malicious code, proper content security policy

---

## Step 6: Post-Approval

### When Approved

1. Your extension will be live on the Chrome Web Store
2. Share the store URL (it looks like: `https://chrome.google.com/webstore/detail/[extension-id]`)
3. Users can install with one click

### If Rejected

1. Read the rejection email carefully
2. Fix the issues mentioned
3. Update your ZIP file
4. Re-upload and resubmit
5. Common reasons: Missing privacy policy, unclear permissions, manifest errors

---

## Step 7: Updates

### Publishing Updates

When you make changes to your extension:

1. Update version in `public/manifest.json`:
   ```json
   "version": "1.0.1"  // Increment version number
   ```

2. Rebuild:
   ```bash
   npm run build
   ```

3. Create new ZIP from `dist/` folder

4. Go to your [Developer Dashboard](https://chrome.google.com/webstore/devconsole)

5. Click on your extension

6. Click **"Package"** → **"Upload new package"**

7. Select your new ZIP file

8. Update release notes in the **"Store listing"** tab if needed

9. Click **"Submit for Review"**

Updates typically review faster (within 24 hours).

---

## Tips for Success

### Do's ✅
- ✅ Write clear, accurate descriptions
- ✅ Provide high-quality screenshots
- ✅ Include a proper privacy policy
- ✅ Test thoroughly before submitting
- ✅ Request only necessary permissions
- ✅ Respond to user reviews
- ✅ Keep extension updated

### Don'ts ❌
- ❌ Use misleading descriptions
- ❌ Request unnecessary permissions
- ❌ Copy other extensions' descriptions
- ❌ Include affiliate links in descriptions
- ❌ Use copyrighted materials without permission
- ❌ Spam keywords in description
- ❌ Violate Chrome Web Store policies

---

## Useful Links

- **Chrome Web Store Developer Dashboard**: https://chrome.google.com/webstore/devconsole
- **Developer Program Policies**: https://developer.chrome.com/docs/webstore/program-policies/
- **Best Practices**: https://developer.chrome.com/docs/webstore/best-practices/
- **Branding Guidelines**: https://developer.chrome.com/docs/webstore/branding/
- **Extension Quality Guidelines**: https://developer.chrome.com/docs/webstore/quality-guidelines/

---

## Checklist Before Submission

- [ ] Extension built with `npm run build`
- [ ] ZIP file created from `dist/` contents
- [ ] All required icons present (16, 48, 128px)
- [ ] At least 1 screenshot (1280x800 recommended)
- [ ] Privacy policy hosted and URL ready
- [ ] Short description (under 132 characters)
- [ ] Detailed description written
- [ ] Support email/website added
- [ ] Permissions justified
- [ ] Category selected (Productivity)
- [ ] Tested in Chrome browser
- [ ] Version number correct in manifest
- [ ] Developer account registered ($5 paid)

---

## Estimated Timeline

- **Developer Registration**: 5-10 minutes + payment processing
- **Package Preparation**: 30-60 minutes (screenshots, descriptions)
- **Initial Upload**: 5-10 minutes
- **First Review**: 1-3 business days
- **Updates Review**: 1-24 hours

---

## Support

If you encounter issues:
1. Check [Chrome Web Store Help](https://support.google.com/chrome_webstore/)
2. Review [Developer Documentation](https://developer.chrome.com/docs/webstore/)
3. Contact Chrome Web Store Support from your dashboard

Good luck with your publication! 🚀
