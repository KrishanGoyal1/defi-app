"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import styles from "../styles/HomeComnponent.module.css"
import { FaSearch } from "react-icons/fa"
import { AiFillDollarCircle, AiOutlineStar, AiFillDelete } from "react-icons/ai"
import { RxCrossCircled, RxCross1 } from "react-icons/rx"
import { FiTrendingDown } from "react-icons/fi"
import { FiTrendingUp } from "react-icons/fi"
import { AiFillCaretDown } from "react-icons/ai"
import { AiOutlineDollarCircle, AiFillStar } from "react-icons/ai"
import { BiRupee } from "react-icons/bi"
import { HiOutlineArrowsUpDown } from "react-icons/hi2"
import { Tooltip } from '@chakra-ui/react'
import Link from 'next/link';

type topCoinObj = {
    coinName: string,
    image: string,
    percentChange: number,
    current_price: number,
    id: string,
    symbol: string,
    price_change_percentage_24h: number,
    market_cap: number,
    total_volume: number
}


type CryptoCoin = {
    id: string;
    price: number;
    image: string;
    name: string;
};

const HomeComnponent = () => {

    const [cryptoData, setCryptoData] = useState<topCoinObj[]>([]); 
    const [filteredArray, setFilteredArray] = useState<topCoinObj[]>([]); 
    const [seacrhTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState<number>(1);
    const [active, setActive] = useState(1);
    const [currencyModal, setCurrecnyModal] = useState(false);
    const [currency, setCurrency] = useState("usd");

    const [originalARR, setOriginalARR] = useState([]);
    const [tabState, setTabState] = useState("all coins");


    const pages = [1, 2, 3, 4];


    useEffect(() => {
        fetch(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.toLowerCase()}&order=market_cap_desc&per_page=80&page=1&sparkline=false`
        )
            .then((response) => response.json())
            .then((data) => {
                setCryptoData(data)
                setOriginalARR(data);
                setFilteredArray(data);
            })
            .catch((error) => {
                throw new Error('Error fetching all coins: ' + error);
            });

    }, [currency]);




    const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value;
        setSearchTerm(searchTerm);

        if (tabState === "all coins") {

            if (filteredArray.length > 0) {
                const mutateArr = filteredArray.filter((item) => {
                    const coinName = item.id.toLowerCase().includes(searchTerm.toLowerCase());
                    const coinSymbol = item.symbol.toLowerCase().includes(searchTerm.toLowerCase());

                    return coinName || coinSymbol
                });

                setCryptoData(mutateArr);

                setActive(1);
                setPage(1);
            }
        }
    };



    // currecny modal
    const currencyModalToggle = () => {
        setCurrecnyModal(!currencyModal)
    }



    const lowTOhighHanler = () => {

        const sortedData = [...cryptoData].sort((a, b) => a.current_price - b.current_price);
        setCryptoData(sortedData);
    }

    const highTOlowHandler = () => {
        const sortedData = [...cryptoData].sort((a, b) => b.current_price - a.current_price);
        setCryptoData(sortedData);
    }


    return (

        <div>
            <div className={"flex flex-wrap items-center justify-center"}>

                <div className='flex items-center gap-8 tableHeaderChild1 md:justify-center'>

                    <div className='mt-3'>
                        <input
                            type="text"
                            placeholder="Search"
                            value={seacrhTerm}
                            onChange={searchHandler}
                            className="px-4 py-2 pl-7 boxsh rounded-md relative z-50 bg-transparent border-2 border-gray-200 text-gray-600 focus:outline-none"
                        />
                        <FaSearch className="search-icon relative -top-7 ml-2 text-gray-400 text-sm w-3 -z-1" />
                    </div>

                    <div onClick={currencyModalToggle} className=" items-center gap-2 hidden lg:flex cursor-pointer border rounded w-64 justify-center h-10">
                        <p>Currency</p>
                        <AiFillCaretDown className='' />
                    </div>

                    {  /* CUURRECYY */}

                    <div className={"  w38rem hidden lg:block"}>
                        {currencyModal && <div className={styles.currencyModalHold}>
                            <div>

                                <div className=' flex font-semibold gap-3 items-center cursor-pointer mb-7'>
                                    <AiOutlineDollarCircle className='text-xl font-semibold' />
                                    <p onClick={() => setCurrency("usd")}> USD </p>
                                </div>

                                <div className=' flex font-semibold gap-3 items-center cursor-pointer'>
                                    <BiRupee className='text-xl font-semibold' />
                                    <p onClick={() => setCurrency("inr")}> INR </p>
                                </div>
                            </div>

                        </div>

                        }
                    </div>
                </div>

            </div>

            <br />



            <div className="overflow-x-auto w-auto">
                {cryptoData.length === 0 ?
                    <p className=' font-semibold flex justify-center items-center mb-4 gap-2'>
                        No Results Found  <RxCrossCircled className=' font-bold align-middle text-2xl text-red-600' />
                    </p>
                    :
                    <table className="table cryptoDataMainTable mx-auto w-full">
                        <thead>
                            <tr>
                                <th></th>
                                <th className='metaverse-table'>Coin</th>
                                <th>
                                    <Tooltip label='Low To High' className='md:mr-20'>
                                        <span id='lowTOhigh' className='flex items-center gap-1 cursor-pointer' onClick={lowTOhighHanler}>Price
                                            <HiOutlineArrowsUpDown className='text-xl' />
                                        </span>
                                    </Tooltip>
                                </th>

                                <th>total volume</th>

                                <th>
                                    <Tooltip label='High To Low' className='md:mr-28'>
                                        <span id='highTOlow' className='flex items-center gap-1 cursor-pointer' onClick={highTOlowHandler}>Market Cap
                                            <HiOutlineArrowsUpDown className='text-xl rotate-180' />
                                        </span>
                                    </Tooltip>
                                </th>
                                <th>Price Change</th>
                            </tr>
                        </thead>

                        <tbody>
                            {/* rows */}
                            {cryptoData.slice(page * 20 - 20, page * 20).map((coin, index) => (
                                <tr key={coin.id}>
                                    <td>
                                        <div className='w-8 h-8 mx-auto cursor-pointer'>
                                            <AiOutlineStar className='sm:text-xl text-xl text-gray-500 hover:text-yellow-500 transition-all ease-in'
                                            />
                                        </div>
                                    </td>
                                    <td className='py-6 cursor-pointer'>
                                        <Link href={`/${coin.id}`}>
                                            <img src={coin.image} className="sm:w-12 sm:h-12 w-9 h-9 inline-block mr-2" alt="ada" />
                                            <span className='font-semibold inline-block align-middle uppercase sm:text-base text-sm mr-4'>{coin.id.substring(0, 18)}</span>
                                        </Link>
                                    </td>
                                    <td className=' font-semibold py-6 sm:text-base text-sm'> {currency == "usd" ? "$" : <BiRupee className=' inline-block'></BiRupee>} {coin.current_price.toLocaleString()}</td>
                                    <td className=' font-semibold pl-6 sm:text-base text-sm'>{coin.total_volume.toLocaleString()}</td>
                                    <td className=' font-semibold text-gray-500 py-6 sm:text-base text-sm'> {currency == "usd" ? "$" : <BiRupee className=' inline-block'></BiRupee>} {coin.market_cap.toLocaleString()}</td>
                                    <td className={coin.price_change_percentage_24h > 0 ? "text-green-600 sm:text-base text-sm font-semibold py-6 inline-block align-middle" : "text-red-600 font-semibold py-6 inline-block align-middle"}> <span className=' inline-block align-middle'> {coin.price_change_percentage_24h > 0 ? <FiTrendingUp className='text-semibold text-xl text-green-600' /> : <FiTrendingDown className='text-semibold text-xl text-red-600' />} </span>  {coin.price_change_percentage_24h.toFixed(2)}%</td>
                                </tr>
                            ))}
                        </tbody>

                    </table>

                }
            </div>

            <div className="w80 mx-auto bg-gray-100 mt-4"></div>
            <br />
            <br />
            <br />

            <div className='flex gap-4 flex-wrap justify-center'>
                {pages.map((item) => {

                    return (
                        <p key={item} className={active == item ? "bg-black text-white indivitualPage2 font-semibold cursor-pointer" : "indivitualPage font-semibold cursor-pointer"} onClick={(e) => {
                            if (e.target instanceof HTMLParagraphElement) {
                                setPage(parseInt(e.target.innerText) || 0);
                                setActive(parseInt(e.target.innerText) || 0);

                            }

                        }}>
                            {item}
                        </p>
                    )

                })}
            </div>


            <br />
            <br />
            <br />





        </div>
    )
}

export default HomeComnponent