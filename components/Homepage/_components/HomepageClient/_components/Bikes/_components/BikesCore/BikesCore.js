"use client"

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import './BikesCore.css';
import { Rating } from 'react-simple-star-rating';
import { FaExternalLinkAlt, FaCaretLeft, FaCaretRight } from 'react-icons/fa';

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
    const [currentIndex, setCurrentIndex] = useState(0);
    const [startPosition, setStartPosition] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [windowWidth, setWindowWidth] = useState(0);
    const bikesContainerRef = useRef(null);

    useEffect(() => {
        setWindowWidth(window.innerWidth);

        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleTouchStart = (e) => {
        setStartPosition(e.touches[0].clientX);
        setIsDragging(true);
    };

    const handleTouchMove = (e) => {
        if (!isDragging) return;
        const currentPosition = e.touches[0].clientX;
        const difference = startPosition - currentPosition;

        if (difference > 50) {
            goToNext();
            setIsDragging(false);
        } else if (difference < -50) {
            goToPrevious();
            setIsDragging(false);
        }
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    const handleMouseDown = (e) => {
        setStartPosition(e.clientX);
        setIsDragging(true);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const currentPosition = e.clientX;
        const difference = startPosition - currentPosition;

        if (difference > 50) {
            goToNext();
            setIsDragging(false);
        } else if (difference < -50) {
            goToPrevious();
            setIsDragging(false);
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        const container = bikesContainerRef.current;

        if (container) {
            container.addEventListener('touchstart', handleTouchStart);
            container.addEventListener('touchmove', handleTouchMove);
            container.addEventListener('touchend', handleTouchEnd);
            container.addEventListener('mousedown', handleMouseDown);
            container.addEventListener('mousemove', handleMouseMove);
            container.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            if (container) {
                container.removeEventListener('touchstart', handleTouchStart);
                container.removeEventListener('touchmove', handleTouchMove);
                container.removeEventListener('touchend', handleTouchEnd);
                container.removeEventListener('mousedown', handleMouseDown);
                container.removeEventListener('mousemove', handleMouseMove);
                container.removeEventListener('mouseup', handleMouseUp);
            }
        };
    }, [isDragging, startPosition]);

    const goToPrevious = () => {
        let currentBike = (currentIndex - 1 + bikes.length) % bikes.length;
        setCurrentIndex(currentBike);
    }

    const goToNext = () => {
        let currentBike = (currentIndex + 1) % bikes.length;
        setCurrentIndex(currentBike);
    }

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    }

    return (
        <>
            <>
                <div className="bikes-slider-wrapper bikes-mobile">
                    <div className={`bikes-slider ${isDragging ? `dragging` : ``}`} ref={bikesContainerRef}>
                        <div className="bikes-container" style={{ transform: windowWidth > 1100 ? `translateX(${(currentIndex - 1) * -30}%)` : `translateX(${(currentIndex) * - 100}%)` }}>
                            {bikes.map((bike, bikeIndex) => (
                                <div key={bikeIndex} className={`bike-card-wrapper ${currentIndex === bikeIndex ? 'slide-active' : ''}`}>
                                    <div className="bike-card mobile">
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
                                </div>
                            ))}
                        </div>
                        <div className="left-arrow primary" onClick={goToPrevious}><FaCaretLeft /></div>
                        <div className="right-arrow primary" onClick={goToNext}><FaCaretRight /></div>
                    </div>
                    <div className="dots-container">
                        <div className="left-arrow dots" onClick={goToPrevious}><FaCaretLeft /></div>
                        {bikes.map((bike, bikeIndex) => (
                            <div
                                key={bikeIndex}
                                className={`dots-item ${currentIndex === bikeIndex ? 'active' : ''}`}
                                onClick={() => goToSlide(bikeIndex)}
                            >
                            </div>
                        ))}
                        <div className="right-arrow dots" onClick={goToNext}><FaCaretRight /></div>
                    </div>
                </div>
                <Link href="/bikes" className="show-more-btn link-rd margin-center btn btn-blue flex-center gap-10 bikes-mobile">
                    Show More Bikes <FaExternalLinkAlt />
                </Link>
            </>
            <>
                <div className="bikes-grid-wrapper bikes-desktop">
                    <div className="bikes-grid">
                        {bikes.map((bike) => (
                            <div key={bike.id} className="bike-card desktop">
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
                </div>
                <Link href="/bikes" className="show-more-btn link-rd margin-center btn btn-blue flex-center gap-10 bikes-desktop">
                    Show More Bikes <FaExternalLinkAlt />
                </Link>
            </>
        </>
    );
};

export default BikesCore;