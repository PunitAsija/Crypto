import React from "react";
import MainComponent from "../components/coin/common/LandingPage/MainComponent";
import Header from "../components/coin/common/Header";
import Footer from "../components/coin/common/Footer";

function HomePage(){
    return(
        <div>
            <Header />
            <MainComponent />
            <Footer />
        </div>
    )
}

export default HomePage;