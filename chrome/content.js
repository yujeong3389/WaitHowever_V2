chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "GET_URL") {
      sendResponse({ url: window.location.href });
    }
  });
  