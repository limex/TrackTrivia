import maps from "./maps";
const { isMatchingAMap } = maps;

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  // Only process complete loads (not iframes or other partial loads)
  if (changeInfo.status === "complete") {
    if (isMatchingAMap(tab.url)) {
      // Using action.enable instead of pageAction.show
      chrome.action.enable(tabId);
    } else {
      // Using action.disable instead of pageAction.hide
      chrome.action.disable(tabId);
    }
  }
});
