import React, { useEffect, useState } from "react";
import Header from "../components/coin/common/Header";
import SelectCoins from "../components/Compare/SelectCoins";
import SelectDays from "../components/coin/SelectDays";
import List from "../components/coin/common/Dashboard/List";
import { coinObject } from "../functions/convertObject";
import { getCoinPrices } from "../functions/getCoinPrices";
import { getCoinData } from "../functions/getCoinData";
import Loader from "../components/coin/common/Loader";
import CoinInfo from "../components/coin/CoinInfo";
import { settingChartData } from "../functions/settingChartData";
import LineChart from "../components/coin/LineChart";
import TogglePriceType from "../components/coin/PriceType";
import Footer from "../components/coin/common/Footer";
import PriceToggle from "../components/coin/PriceToggle/pricetoggle";


function ComparePage() {

    const [crypto1, setCrypto1] = useState("bitcoin");
    const [crypto2, setCrypto2] = useState("ethereum")
    const [isLoading, setIsLoading] = useState(true);

    const [crypto1Data, setCrypto1Data] = useState({});
    const [crypto2Data, setCrypto2Data] = useState({});


    const [days, setDays] = useState(30);

    const [priceType, setPriceType] = useState("prices");
    const [chartData,setChartData]=useState({});


    async function handleDaysChange(event) {
        setIsLoading(true);
        setDays(event.target.value);
        const prices1 = await getCoinPrices(crypto1, event.target.value, priceType);
        const prices2 = await getCoinPrices(crypto2, event.target.value, priceType);

        settingChartData(setChartData,prices1,prices2);

        setIsLoading(false);
    }

    const handlePriceTypeChange = async (event, newType) => {
        setIsLoading(true);
        setPriceType(newType);
        const prices1 = await getCoinPrices(crypto1,days, newType);
        const prices2 = await getCoinPrices(crypto2, days, newType);

        settingChartData(setChartData,prices1,prices2);

        setIsLoading(false);
        
    };

    useEffect(() => {
        getData();

    }, []);

    async function getData() {

        setIsLoading(true);

        const data1 = await getCoinData(crypto1);
        if (data1) {
            const data2 = await getCoinData(crypto2);
            coinObject(setCrypto1Data, data1);

            if (data2) {
                coinObject(setCrypto2Data, data2);
                const prices1 = await getCoinPrices(crypto1, days, priceType);
                const prices2 = await getCoinPrices(crypto2, days, priceType);

                settingChartData(setChartData,prices1,prices2);

                console.log("Both prices fetch", prices1, prices2);
                setIsLoading(false);
            }
        }
    }


    const handleCoinChange = async (event, isCoin2) => {

        setIsLoading(true);
        if (isCoin2) {
            setCrypto2(event.target.value);
            const data = await getCoinData(event.target.value);
            coinObject(setCrypto2Data, data);
            const prices1 = await getCoinPrices(crypto1, days, priceType);
            const prices2 = await getCoinPrices(crypto2, days, priceType);
    
            if (prices1.length > 0 && prices2.length > 0) {
                console.log("Both prices fetch", prices1, prices2);
                setIsLoading(false);
            }
        }
        else {
            setCrypto1(event.target.value);
            const data = await getCoinData(event.target.value);
            coinObject(setCrypto1Data, data);

        }
    };
    return (
        <div>

          
        <Header />
      {isLoading || !crypto1Data?.id || !crypto2Data?.id ? (
        <Loader />
      ) : (
        <>
        <div className="coins-days-flex">
          <SelectCoins
            
            crypto1={crypto1}
            crypto2={crypto2}
            days={days}
            handleCoinChange={handleCoinChange}
            handleDaysChange={handleDaysChange}
          />
          <SelectDays days={days}  handleDaysChange={handleDaysChange} noPTag={true} />
          </div>
          <div className="grey-wrapper">
            <List coin={crypto1Data} delay={0.1} />
          </div>
          <div className="grey-wrapper">
            <List coin={crypto2Data} delay={0.2} />
          </div>
          <div className="grey-wrapper">
            <PriceToggle
              handlePriceTypeChange={handlePriceTypeChange}
              priceType={priceType}
            />
            <LineChart
              chartData={chartData}
              multiAxis={true}
              priceType={priceType}
            /> 
          </div>
          <CoinInfo name={crypto1Data.name} desc={crypto1Data.desc} />
          <CoinInfo name={crypto2Data.name} desc={crypto2Data.desc} />
        </>
      )}
      <Footer />
        </div>
    );
}

export default ComparePage;