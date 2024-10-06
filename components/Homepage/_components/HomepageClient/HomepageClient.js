import Link from 'next/link';
import { MdAttachMoney, MdOutlineMiscellaneousServices, MdSecurity, MdThumbUp } from "react-icons/md";
import { FaImages, FaRegClock, FaShoppingCart, FaThumbsUp } from "react-icons/fa";
import { HiClock } from "react-icons/hi";
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
                <h1 className="why-title title home-title">Why Vehicle-RS?</h1>
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
            </section>
            hello
        </>
    )
}

export default HomepageClient;