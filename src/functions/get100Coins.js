import axios from "axios";

export const get100Coins = () => {
    const myCoins = axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd").then((response) => {

        console.log("RESPONSE>>>", response);
        return response.data;
    })
        .catch((error) => {
            console.log("ERROR>>>", error);
        });

    return myCoins;
};