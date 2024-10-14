import ScrollTo from '@/components/utils/ScrollTo/ScrollTo';
import Image from 'next/image';
import Link from 'next/link';
import { FaImages, FaMotorcycle, FaSearch } from "react-icons/fa";
import { HiClock } from "react-icons/hi";
import { MdAttachMoney, MdBookmarkAdded, MdOutlineMiscellaneousServices, MdSecurity, MdThumbUp } from "react-icons/md";
import { PiPersonSimpleBikeBold } from "react-icons/pi";
import { TiArrowRightThick } from "react-icons/ti";
import Bikes from '../Bikes/Bikes';
import Faqs from '../Faqs/Faqs';
import HeroForm from '../HeroForm/HeroForm';
import Testimonials from '../Testimonials/Testimonials';
import './HomepageClient.css';
import Hero from '../Hero/Hero';
import WhySection from '../WhySection/WhySection';
import HowItWorksSection from '../HowItWorksSection/HowItWorksSection';
import { Suspense } from 'react';

const HomepageClient = () => {

    return (
        <>
            <Suspense>
                <ScrollTo />
            </Suspense>
            <section className="hero home-section">
                <Hero />
            </section>
            <section className="why-vehicle-rs home-section">
                <h1 className="why-title title home-title">Why Vehicle-RS ?</h1>
                <WhySection />
            </section>
            <section className="how-it-works-section home-section bg-gray-light">
                <h1 className="how-it-works-title title home-title">How It Works ?</h1>
                <HowItWorksSection />
            </section>
            <section className="bikes-section home-section">
                <h1 className="bikes-title title home-title">Our Bikes</h1>
                <Bikes />
            </section>
            <section className="testimonial-section home-section bg-gray-light">
                <h2 className="faq-title title home-title">Testimonials</h2>
                <Testimonials />
            </section>
            <section className="faq-section home-section">
                <h2 className="faq-title title home-title">Frequently Asked Questions</h2>
                <Faqs />
            </section>
        </>
    )
}

export default HomepageClient;