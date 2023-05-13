const axios = require("axios");
const PAGE_SIZE = 250;

async function fetchCryptoData(page) {
    const offset = (page - 1) * PAGE_SIZE;
  
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          order: "market_cap_desc",
          vs_currency: "usd",
          per_page: PAGE_SIZE,
          page: page,
          offset: offset,
        },
      }
    );

    const filteredData = response.data.map((item) => ({
        name: item.name,
        symbol: item.symbol,
        current_price: item.current_price,
        high_24h: item.high_24h,
        low_24h: item.low_24h,
        price_change_percentage_24h: item.price_change_percentage_24h,
    }));
    
    return filteredData;
}

async function searchCryptoById(id) {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}`
    );
        
    return {
      current_price: response.data.market_data.current_price.usd,
      name: response.data.name,
      description: response.data.description.en,
      price_change_24h: response.data.market_data.price_change_24h,
      price_change_percentage_7d:
        response.data.market_data.price_change_percentage_7d,
      price_change_percentage_14d:
        response.data.market_data.price_change_percentage_14d,
      price_change_percentage_1m:
        response.data.market_data.price_change_percentage_30d,
      price_change_percentage_2m:
        response.data.market_data.price_change_percentage_60d,
      price_change_percentage_200d:
        response.data.market_data.price_change_percentage_200d,
      price_change_percentage_1y:
        response.data.market_data.price_change_percentage_1y,
      high_24h: response.data.market_data.high_24h.usd,
      low_24h: response.data.market_data.low_24h.usd,
    };
}
      
module.exports = { fetchCryptoData, searchCryptoById };
