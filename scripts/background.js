const URL = 'https://4tg9dbc6q8.execute-api.ap-south-1.amazonaws.com/production/prices';
const REFRESH_INTERVAL = 30 * 1000;
const VIEW_REFRESH_INTERVAL = 5 * 1000;

// let messageSender = null;

const fetchData = function() {
  fetch(URL)
    .then(response => response.json())
    .then(data => {
      // console.log(data);
      if (data && data !== 'null') {
        chrome.storage.local.set({ prices: data });
      }
      setTimeout(fetchData, REFRESH_INTERVAL);
    });
};

setTimeout(fetchData, 0);

// chrome.extension.onConnect.addListener(popup => {
//   console.log('Popup connected', popup);
//   if (popup.name === 'PricesCommunicator') {
//     popup.onMessage.addListener(data => {
//       console.log('Popup oonmessage', data);
//       popup.postMessage(latestData);
//     });
//     console.log('Sending data', latestData);

//     console.log('Message sent');
//     messageSender = setInterval(() => popup.postMessage(latestData), VIEW_REFRESH_INTERVAL);
//   }
//   popup.onDisconnect.addListener(() => {
//     clearInterval(messageSender);
//     console.log('Popup disconnected', popup);
//   });
// });
