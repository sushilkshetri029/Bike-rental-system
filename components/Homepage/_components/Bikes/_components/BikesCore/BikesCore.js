"use client"

import Image from 'next/image';
import Link from 'next/link';
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import './BikesCore.css';
import { Rating } from 'react-simple-star-rating';
import { FaExternalLinkAlt } from 'react-icons/fa';

const bikes = [
    {
        id: 1,
        name: 'Bajaj Pulsar 150',
        rateUSD: 50,
        rateNPR: 6000,
        ridesCount: 120,
        isNew: true,
        rating: 90,
        imageUrl: '/png/bajaj-pulsar-150.png',
    },
    {
        id: 2,
        name: 'Bajaj Pulsar 220',
        rateUSD: 40,
        rateNPR: 4800,
        ridesCount: 200,
        isNew: true,
        rating: 100,
        imageUrl: '/png/bajaj-pulsar-220.png',
    },
    {
        id: 3,
        name: 'Yamaha FZS V2',
        rateUSD: 30,
        rateNPR: 3600,
        ridesCount: 200,
        isNew: false,
        rating: 100,
        imageUrl: '/png/yamaha-fzs-v2.png',
    },
];

const BikesCore = () => {
    return (
        <>
            <div className="bikes-grid">
                {bikes.map((bike) => (
                    <div key={bike.id} className="bike-card">
                        {bike.isNew && <span className="new-label">New</span>}
                        <div className="bike-image-wrapper">
                            <Image className='bike-image' src={bike.imageUrl} width={300} height={200} alt='Motorbike' />
                        </div>
                        <div className="line"></div>
                        <h3 className="bike-name">{bike.name}</h3>
                        <div className="line"></div>
                        <div className="bike-rates">
                            <div className="rate-title">
                                <span className="rate-text highlight-blue"><RiMoneyDollarCircleLine className='title-icon' />Rate</span> (perday)
                            </div>
                            <div className="bike-rate">
                                <span className="rate-usd highlight-yellow">${bike.rateUSD}</span>
                                <div className="line line-vertical rate-line"></div>
                                NPR {bike.rateNPR}
                            </div>
                        </div>
                        <div className="line"></div>
                        <div className="bike-ratings">
                            {/* <div className="bike-ratings-title highlight-blue">
                                Overall Ratings
                            </div> */}
                            <Rating
                                className='bike-rating'
                                initialValue={(bike.rating * 5) / 100}
                                allowFraction
                                iconsCount={5}
                                size={30}
                                readonly
                            />
                        </div>
                        <div className="line"></div>
                        <div className="bike-buttons">
                            <button className="btn btn-blue">Hire Now</button>
                            <button className="more-info-btn btn btn-gray-light">More Info</button>
                        </div>
                    </div>
                ))}
            </div>
            <Link href="/bikes" className="show-more-btn link-rd margin-center btn btn-blue flex-center gap-10">
                Show More Bikes <FaExternalLinkAlt />
            </Link>
        </>
    );
};

export default BikesCore;