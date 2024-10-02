import Link from 'next/link';
import { MdAttachMoney, MdOutlineMiscellaneousServices } from "react-icons/md";
import { FaImages, FaShoppingCart } from "react-icons/fa";
import './HomepageClient.css';
import Image from 'next/image'

const HomepageClient = () => {
    return (
        <>
            <section className="hero">
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
                    <div className="background"></div>
                    <div className="background-items-wrapper">
                        <Image className='hero-image image-fit' width={500} height={300} src='/png/motorbike-vector-4.png' alt='Motorbike' />
                        <Link href='/ride' className="right-info-item link-rd btn btn-blue-light">
                            <div className="icon flex-center">
                                <FaShoppingCart />
                            </div>
                            <div className="text">
                                Book now
                            </div>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}

export default HomepageClient;