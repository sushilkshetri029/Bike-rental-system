import React from 'react';
import './HowItWorksSection.css';
import { FaMotorcycle, FaSearch } from 'react-icons/fa';
import { TiArrowRightThick } from 'react-icons/ti';
import { MdBookmarkAdded } from 'react-icons/md';
import { PiPersonSimpleBikeBold } from 'react-icons/pi';

const HowItWorksSection = () => {
    return (
        <>
        <div className="how-it-works-steps">
            <div className="how-it-works-step">
                <FaSearch className='icon' />
                <h3 className="how-it-works-step-title"><span className="highlight-yellow">1.</span> Find Your Bike</h3>
                <p className="how-it-works-step-description">Browse through our wide range of motorbikes and choose the one that suits your needs.</p>
            </div>
            <TiArrowRightThick className='step-icon' />
            <div className="how-it-works-step">
                <MdBookmarkAdded className='icon' />
                <h3 className="how-it-works-step-title"><span className="highlight-yellow">2.</span> Book Online</h3>
                <p className="how-it-works-step-description">Reserve your chosen bike online with our easy-to-use booking system.</p>
            </div>
            <TiArrowRightThick className='step-icon' />
            <div className="how-it-works-step">
                <FaMotorcycle className='icon' />
                <h3 className="how-it-works-step-title"><span className="highlight-yellow">3.</span> Pick Up</h3>
                <p className="how-it-works-step-description">Visit our location to pick up your bike and complete the rental process.</p>
            </div>
            <TiArrowRightThick className='step-icon' />
            <div className="how-it-works-step">
                <PiPersonSimpleBikeBold className='icon' />
                <h3 className="how-it-works-step-title"><span className="highlight-yellow">4.</span> Enjoy Your Ride</h3>
                <p className="how-it-works-step-description">Hit the road and enjoy your ride with our top-quality motorbikes.</p>
            </div>
        </div>
        </>
    )
}

export default HowItWorksSection