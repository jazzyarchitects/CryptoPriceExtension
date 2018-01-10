const equalBuySellExchanges = ['koinex'];

function refreshData() {
  chrome.storage.local.get('prices', function(data) {
    if (!chrome.runtime.error) {
      // console.log('Storage items', data);
      updateLayout(data.prices);

      // setTimeout(refreshData, VIEW_REFRESH_INTERVAL);
    }
  });
}

chrome.storage.onChanged.addListener(function(changes, namespace) {
  for (key in changes) {
    var storageChange = changes[key];

    if (key === 'prices') {
      updateLayout(storageChange.newValue);
    }
  }
});

refreshData();

function updateLayout(prices) {
  const exchangesNames = Object.keys(prices);

  const lastUpdatedField = document.getElementById('last-updated-at');
  if (lastUpdatedField) {
    lastUpdatedField.innerHTML = `${new Date(prices.timestamp).toLocaleDateString()} ${new Date(
      prices.timestamp,
    ).toLocaleTimeString()}`;
  } else {
    return;
  }

  exchangesNames.forEach(exchangeName => {
    const exchange = prices[exchangeName];

    Object.keys(prices[exchangeName]).forEach(currencyName => {
      const currency = exchange[currencyName];

      const buyPrice = currency.buy;
      const sellPrice = currency.sell;

      const priceField = document.getElementById(`${exchangeName.toLowerCase()}-${currencyName.toLowerCase()}`);
      if (priceField) {
        if (equalBuySellExchanges.includes(exchangeName)) {
          priceField.innerHTML = `<b>₹</b> ${buyPrice}`;
        } else {
          priceField.innerHTML = `Buy: <b>₹</b> ${buyPrice}<br />Sell: <b>₹</b> ${sellPrice}`;
        }
      } else {
        console.log('Price field ', `${exchangeName.toLowerCase()}-${currencyName.toLowerCase()}`, 'does not exists');
      }
    });
  });
}
