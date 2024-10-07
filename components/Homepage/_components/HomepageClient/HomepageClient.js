import Link from 'next/link';
import { MdAttachMoney, MdBookmarkAdded, MdOutlineMiscellaneousServices, MdSecurity, MdThumbUp, MdTour } from "react-icons/md";
import { FaArrowAltCircleRight, FaArrowCircleRight, FaArrowRight, FaClipboardCheck, FaImages, FaMotorcycle, FaRegClock, FaSearch, FaShoppingCart, FaSmile, FaThumbsUp } from "react-icons/fa";
import { RiMotorbikeFill } from "react-icons/ri";
import { BsPeopleFill } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import { PiPersonSimpleBikeBold } from "react-icons/pi";
import { HiClock } from "react-icons/hi";
import { TiArrowRightThick } from "react-icons/ti";
import Image from 'next/image'
import './HomepageClient.css';
import HeroForm from '../HeroForm/HeroForm';

const HomepageClient = () => {
    return (
        <>
            <section className="hero home-section">
                <div className="left hero-item">
                    <h1 className="hero-title">
                        <span className="highlight-yellow">Looking </span>to rent a <span className="highlight-yellow">motorbike </span> in Pokhara
                    </h1>
                    <p className="hero-subtitle">
                        We have the best motorbikes in town. Choose from a wide range of bikes, including sport bikes, cruisers, and dirt bikes. Whether you&apos;re seeking speed, comfort, or adventure, we have the perfect bike for you.
                    </p>
                    <div className="hero-link-group">
                        <Link href='services' className="hero-link btn btn-blue link-rd flex-center">
                            <div className="icon flex-center">
                                <MdOutlineMiscellaneousServices />
                            </div>
                            <div className="texts">
                                <div className="link-description">explore</div>
                                <div className="link-title">Services</div>
                            </div>
                        </Link>
                        <Link href='gallery' className="hero-link btn btn-blue btn-outline link-rd flex-center">
                            <div className="icon flex-center">
                                <FaImages />
                            </div>
                            <div className="texts">
                                <div className="link-description">visit</div>
                                <div className="link-title">Gallery</div>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="right hero-item">
                    <Image className='hero-image image-fit' width={500} height={300} src='/png/motorbike-vector-3.png' alt='Motorbike' />
                </div>
                <HeroForm />
            </section>
            <section className="why-vehicle-rs home-section">
                <h1 className="why-title title home-title">Why Vehicle-RS ?</h1>
                <div className="why-items">
                    <div className="why-item">
                        <MdAttachMoney className="why-icon" />
                        <h3 className="why-item-title">Affordable Prices</h3>
                        <p className="why-item-description">We offer the best prices in town for renting motorbikes.</p>
                    </div>
                    <div className="why-item">
                        <MdOutlineMiscellaneousServices className="why-icon" />
                        <h3 className="why-item-title">Top-notch Services</h3>
                        <p className="why-item-description">Our services are designed to provide you with the best experience.</p>
                    </div>
                    <div className="why-item">
                        <MdSecurity className="why-icon" />
                        <h3 className="why-item-title">Safety First</h3>
                        <p className="why-item-description">Your safety is our priority. We ensure all our bikes are well-maintained.</p>
                    </div>
                    <div className="why-item">
                        <MdThumbUp className="why-icon" />
                        <h3 className="why-item-title">Customer Satisfaction</h3>
                        <p className="why-item-description">We strive to provide the best customer service.</p>
                    </div>
                    <div className="why-item">
                        <HiClock className="why-icon" />
                        <h3 className="why-item-title">24/7 Availability</h3>
                        <p className="why-item-description">We are available round the clock to serve you.</p>
                    </div>
                </div>
                <div className="overview-items">
                    <div className="overview-item font-montserrat">
                        {/* <RiMotorbikeFill className="icon" /> */}
                        <div className="count">
                            100<span className="highlight-yellow">+</span>
                        </div>
                        <div className="description">
                            <div className="text">Bikes Available</div>
                        </div>
                    </div>
                    <div className="line line-vertical"></div>
                    <div className="overview-item font-montserrat">
                        {/* <MdTour className="icon" /> */}
                        <div className="count">
                            500<span className="highlight-yellow">+</span>
                        </div>
                        <div className="description">
                            <div className="text">Tours</div>
                        </div>
                    </div>
                    <div className="line line-vertical"></div>
                    <div className="overview-item font-montserrat">
                        {/* <BsPeopleFill className="icon" /> */}
                        <div className="count">
                            700<span className="highlight-yellow">+</span>
                        </div>
                        <div className="description">
                            <div className="text">Happy Customers</div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="how-it-works-section">
                <h1 className="how-it-works-title title home-title">How It Works ?</h1>
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
            </section>
        </>
    )
}

export default HomepageClient;