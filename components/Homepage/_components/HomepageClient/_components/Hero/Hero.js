import Link from 'next/link';
import HeroForm from './_components/HeroForm/HeroForm';
import './Hero.css';
import Image from 'next/image';
import { MdOutlineMiscellaneousServices } from 'react-icons/md';
import { FaImages } from 'react-icons/fa';

const Hero = () => {
    return (
        <>
            <div className="left hero-item">
                <div className="hero-title-wrapper">
                    <h1 className="hero-title">
                        <span className="highlight-yellow">Looking </span>to rent a <span className="highlight-yellow">motorbike </span> in Pokhara
                    </h1>
                </div>
                <div className="line hero-line"></div>
                <p className="hero-subtitle">
                    We have the best motorbikes in town. Choose from a wide range of bikes, including sport bikes, cruisers, and dirt bikes. Whether you&apos;re seeking speed, comfort, or adventure, we have the perfect bike for you.
                </p>
                <div className="hero-link-group">
                    <Image className='hero-banner-mobile image-fit shadow-bottom-right' width={800} height={300} src='/homepage_banner_1.jpg' alt='Vehicle-RS' />
                    <div className="hero-links">
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
            </div>
            <div className="right hero-item">
                <Image className='hero-image image-fit' width={500} height={300} src='/png/motorbike-vector-3.png' alt='Motorbike' />
            </div>
            <HeroForm />
        </>
    )
}

export default Hero;