import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { coinObject } from "../functions/convertObject";
import Header from "../components/coin/common/Header";
import Loader from "../components/coin/common/Loader";
import List from "../components/coin/common/Dashboard/List";
import CoinInfo from "../components/coin/CoinInfo";
import { getCoinPrices } from "../functions/getCoinPrices";
import { getCoinData } from "../functions/getCoinData";
import LineChart from "../components/coin/LineChart";
import { convertDate } from "../functions/convertDate";
import SelectDays from "../components/coin/SelectDays";
import { settingChartData } from "../functions/settingChartData";
import TogglePriceType from "../components/coin/PriceType";
import Footer from "../components/coin/common/Footer";

function CoinPage() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [coinData, setCoinData] = useState();
    const [days, setDays] = useState(30);
    const [chartData, setChartData] = useState({ labels: [], datasets: [{}] });
    const [priceType, setPriceType] = useState("prices");

    useEffect(() => {
        if (id) {
            getData();
        }
    }, [id]);

    async function getData() {
        setIsLoading(true);
        const data = await getCoinData(id);
        if (data) {
            coinObject(setCoinData, data);
            const prices = await getCoinPrices(id, days, priceType);
            if (prices.length > 0) {
                settingChartData(setChartData, prices);
                setIsLoading(false);
            }
        }

    }

    const handleDaysChange = async (event) => {
        setIsLoading(true);
        setDays(event.target.value);
        const prices = await getCoinPrices(id, event.target.value, priceType);
        if (prices.length > 0) {

            settingChartData(setChartData, prices);
            setIsLoading(false);
        }
    };



    const handlePriceTypeChange = async (event, newType) => {
        setIsLoading(true);
        setPriceType(newType);
        const prices = await getCoinPrices(id, days, newType);
        if (prices.length > 0) {

            settingChartData(setChartData, prices);
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Header />
            {isLoading ? (
                <Loader />) : (
                <>
                    <div className="grey-wrapper" style={{ padding: "0rem 1rem" }}>
                        <List coin={coinData} />
                    </div>
                    <div className="grey-wrapper">
                        <SelectDays days={days} handleDaysChange={handleDaysChange} />
                        <TogglePriceType priceType={priceType} handlePriceTypeChange={handlePriceTypeChange} />
                        <LineChart chartData={chartData}  priceType={priceType}/>
                    </div>
                    <CoinInfo heading={coinData.name} desc={coinData.desc} />

                </>)}
                <Footer />
        </div>
    )
};
export default CoinPage;