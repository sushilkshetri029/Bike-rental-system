import ScrollTo from '@/components/utils/ScrollTo/ScrollTo';
import Bikes from './_components/Bikes/Bikes';
import Faqs from './_components/Faqs/Faqs';
import Hero from './_components/Hero/Hero';
import HowItWorksSection from './_components/HowItWorksSection/HowItWorksSection';
import Testimonials from './_components/Testimonials/Testimonials';
import WhySection from './_components/WhySection/WhySection';
import './HomepageClient.css';

const HomepageClient = () => {

    return (
        <>
            {/* <Suspense> */}
                <ScrollTo />
            {/* </Suspense> */}
            <section className="hero home-section">
                <Hero />
            </section>
            <section className="why-vehicle-rs home-section" id='why-vehicle-rs-section'>
                <h1 className="why-title title home-title">Why Vehicle-RS ?</h1>
                <WhySection />
            </section>
            <section className="how-it-works-section home-section bg-gray-light" id='how-it-works-section'>
                <h1 className="how-it-works-title title home-title">How It Works ?</h1>
                <HowItWorksSection />
            </section>
            <section className="bikes-section home-section" id='bikes-section'>
                <h1 className="bikes-title title home-title">Our Bikes</h1>
                <Bikes />
            </section>
            <section className="testimonial-section home-section bg-gray-light" id='testimonials-section'>
                <h2 className="faq-title title home-title">Testimonials</h2>
                <Testimonials />
            </section>
            <section className="faq-section home-section bottom" id='faq-section'>
                <h2 className="faq-title title home-title">Frequently Asked Questions</h2>
                <Faqs />
            </section>
        </>
    )
}

export default HomepageClient;