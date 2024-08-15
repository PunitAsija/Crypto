import React, { useEffect, useState } from "react";
import Header from "../components/coin/common/Header";
import Search from "../components/coin/common/Dashboard/Search";
import axios from "axios";
import TabsComponent from "../components/coin/common/Dashboard/Tabs";
import PaginationComponent from "../components/pagination";
import Loader from "../components/coin/common/Loader";
import BackToTop from "../components/coin/common/BackToTop";
import { get100Coins } from "../functions/get100Coins";
import Footer from "../components/coin/common/Footer";

function DashboardPage() {
    const [coins, setCoins] = useState([]);
    const [paginatedCoins, setPaginatedCoins] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);


    const handlePageChange = (event, value) => {
        setPage(value);
        var previousIndex = (value - 1) * 10;
        setPaginatedCoins(coins.slice(previousIndex, previousIndex + 10));
    };

    const onSearchChange = (e) => {
        setSearch(e.target.value);
    };

    var filteredCoins = coins.filter(
        (item) =>
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.symbol.toLowerCase().includes(search.toLowerCase())
    );




    useEffect(() => {
     getData();
    }, []);
     
    const getData = async () =>{
        const myCoins = await get100Coins();
        if(myCoins){
            setCoins(myCoins);
            setPaginatedCoins(myCoins.slice(0,10));
            setIsLoading(false);
        }
       
    };



    return (
        <>
        <Header />
        {isLoading ? (<Loader />) : (<div>
            
            <Search search={search} onSearchChange={onSearchChange} />
            <TabsComponent
                coins={search ? filteredCoins : paginatedCoins}
                setSearch={setSearch}
            />
            {!search && (
                <PaginationComponent
                    page={page}
                    handlePageChange={handlePageChange}
                />
            )}

            <Footer />
            <BackToTop />

        </div>)}
        </>
    )
};
export default DashboardPage;