import React from "react";
import Tooltip from "@mui/material/Tooltip";

import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { convertNumber } from "../../../../../functions/convertNumber";
import { Link } from "react-router-dom";
import "./styles.css";


function List({ coin }) {
    return (
        <Link to={`/coin/${coin.id}`}>

        <tr className="List-row">
            <Tooltip title="Coin Logo" placement="bottom-start">
                <td className="td-image">
                    <img src={coin.image} className="coin-logo" />
                </td>
            </Tooltip>
            <Tooltip title="Coin-Info" placement="bottom-start">
                <td>
                    <div className="name-col">
                        <p className="coin-symbol">{coin.symbol}</p>
                        <p className="coin-name">{coin.name}</p>
                    </div>

                </td>
            </Tooltip>
            <Tooltip title="Price change in 24Hrs" placement="bottom-start">
                {
                    coin.price_change_percentage_24h > 0 ? (<td className="chip-flex">
                        <div className="price-chip">
                            {coin.price_change_percentage_24h.toFixed(2)}%
                        </div>
                        <div className="icon-chip td-icon">
                            <TrendingUpIcon />
                        </div>
                    </td>) : (<td className="chip-flex">
                        <div className="price-chip chip-red">
                            {coin.price_change_percentage_24h.toFixed(2)}%
                        </div>
                        <div className="icon-chip chip-red td-icon">
                            <TrendingDownIcon />
                        </div>
                    </td>)
                }
            </Tooltip>
            <Tooltip title="Current Price" placement="bottom-start">
                <td>
                    <h3 className="coin-price td-center-align" style={{
                        color: coin.price_change_percentage_24h < 0
                            ? "var(--red)"
                            : "var(--green)",
                    }}>${coin.current_price.toLocaleString()}</h3>
                </td>
            </Tooltip>
            <Tooltip title="Total Volume" placement="bottom-start">

                <td >
                    <p className="total_volume td-right-align td-vol">
                        {coin.total_volume.toLocaleString()}
                    </p>
                </td>
            </Tooltip>
            <Tooltip title="Market Cap" placement="bottom-start">

                <td className="desk-tb">
                    <p className="total_volume td-right-align">
                        ${coin.market_cap.toLocaleString()}
                    </p>
                </td>
            </Tooltip>
            <Tooltip title="Market Cap" placement="bottom-start">

                <td className="mobile-tb">
                    <p className="total_volume td-right-align">
                        ${convertNumber(coin.market_cap)}
                    </p>
                </td>
            </Tooltip>


        </tr>
        </Link>
    )
};

export default List;