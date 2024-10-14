import { MdAttachMoney, MdOutlineMiscellaneousServices, MdSecurity, MdThumbUp } from 'react-icons/md';
import './WhySection.css';
import { HiClock } from 'react-icons/hi';

const WhySection = () => {
    return (
        <>
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
        </>
    )
}

export default WhySection