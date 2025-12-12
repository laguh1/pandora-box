export async function openURLsInGroup(urls, groupName, chromeColor) {
  try {
    const tabIds = [];

    // Create tabs for each URL
    for (const urlObj of urls) {
      const tab = await chrome.tabs.create({
        url: urlObj.url,
        active: false
      });
      tabIds.push(tab.id);
    }

    // Group the tabs
    const groupId = await chrome.tabs.group({ tabIds });

    // Update group properties
    await chrome.tabGroups.update(groupId, {
      title: groupName,
      color: chromeColor
    });

    return { success: true, groupId };
  } catch (error) {
    console.error('Error opening URLs in group:', error);
    return { success: false, error: error.message };
  }
}

export async function openSelectedURLs(selectedUrls, groupName, chromeColor) {
  if (selectedUrls.length === 0) {
    return { success: false, error: 'No URLs selected' };
  }

  return openURLsInGroup(selectedUrls, groupName, chromeColor);
}
