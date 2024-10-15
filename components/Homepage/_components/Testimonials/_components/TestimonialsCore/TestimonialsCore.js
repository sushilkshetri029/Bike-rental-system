"use client"

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import './TestimonialsCore.css';
import { FaCaretLeft, FaCaretRight, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

const slides = [
    {
        name: "Dikshyanta Chhetri",
        address: "Bharatpur-8, Chitwan",
        profileurl: "/testimonials/dikshyanta.jpg",
        comment: "My laptop works perfectly fine now after the repair by SMS technicians. Good communication, delivery on time, skillful technician, and reasonable price for the repair is what I found after getting the SMS service. Thank you guys for the wonderful work and keep it up. You guys are doing great.",
        date: "January 1, 2024"
    },
    {
        name: "Kiran Dhakal",
        address: "Bharatpur-16, Chitwan",
        profileurl: "/testimonials/kiran.jpg",
        comment: "There was great communication in regards to what happened to my computer and what could be done. I was informed of everything before hand in regards to the price. My computer got fixed in a reasonable price. Would highly recommend for any electronic problems.",
        date: "October 25, 2022"
    },
    {
        name: "Narayan Dahal",
        address: "Bharatpur-1, Chitwan",
        profileurl: "/testimonials/narayan.jpg",
        comment: "This week I truly experienced the 'Gharsewa' in Gharsewa Marmat Sewa. I had my laptop served by them. Everything, from the possible servicing options I had to the pick/delivery of laptop and the servicing itself, was seamless. Thank you to the computer expert and the entire team.",
        date: "May 12, 2023"
    },
    {
        name: "Pradip Subedi",
        address: "Bharatpur-10, Chitwan",
        profileurl: "/testimonials/pradip.jpg",
        comment: "Getting household repair work done is becoming very hard these days. I find Gharsewa as a blessing to Chitwan. This young and energetic group of entrepreneurs react quickly to calls and perform quality work at a reasonable price. Kudos to you guys, keep up with the good work.",
        date: "August 4, 2022"
    },
    {
        name: "Yogesh Ghimire",
        address: "Bharatpur-5, Chitwan",
        profileurl: "/testimonials/yogesh.jpg",
        comment: "I had our solar water heating system completely serviced by SMS and now it's running very smoothly. Can have hot water 2 floors down within minutes. It's made our winter very comfortable. Highly recommended!",
        date: "June 7, 2023",
    },
];

const TestimonialsCore = () => {

    const [currentIndex, setCurrentIndex] = useState(2);
    const [startPosition, setStartPosition] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [windowWidth, setWindowWidth] = useState(0);
    const testimonialContainerRef = useRef(null);

    useEffect(() => {
        const container = testimonialContainerRef.current;

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

        if (container) {
            // Attach event listeners
            container.addEventListener('touchstart', handleTouchStart);
            container.addEventListener('touchmove', handleTouchMove);
            container.addEventListener('touchend', handleTouchEnd);
            container.addEventListener('mousedown', handleMouseDown);
            container.addEventListener('mousemove', handleMouseMove);
            container.addEventListener('mouseup', handleMouseUp);
        }

        // Cleanup event listeners on unmount
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

    // Automatic sliding effect for testimonials
    useEffect(() => {
        const interval = setInterval(() => {
            goToNext();
        }, 10000); // Slide every 10 seconds

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, [currentIndex]);

    useEffect(() => {
        setWindowWidth(window.innerWidth);

        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const goToPrevious = () => {
        let currentTestimonial = (currentIndex - 1 + slides.length) % slides.length;
        setCurrentIndex(currentTestimonial);
    }

    const goToNext = () => {
        let currentTestimonial = (currentIndex + 1) % slides.length;
        setCurrentIndex(currentTestimonial);
    }

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    }

    return (
        <>
            <div className="testimonial-slider-wrapper">
                <div className={`testimonial-slider ${isDragging ? `dragging` : ``}`} ref={testimonialContainerRef}>
                    <div className="testimonial-container" style={{ transform: windowWidth > 1100 ? `translateX(${(currentIndex - 1) * -30}%)` : `translateX(${(currentIndex) * - 100}%)` }}>
                        {slides.map((slide, slideIndex) => (
                            <div key={slideIndex} className={`testimonial-card-wrapper ${currentIndex === slideIndex ? 'slide-active' : ''}`}>
                                <div className="testimonial-card">
                                    <div className="testimonial-card-top">
                                        <Image className='testimonial-card-profile' src={slide.profileurl} width={70} height={70} alt="" />
                                        <div className="testimonial-card-infos">
                                            <h3 className="card-infos-name">{slide.name}</h3>
                                            <p className='card-infos-about'>{slide.address}</p>
                                        </div>
                                    </div>
                                    <div className="testimonial-card-bottom">
                                        <div className="testimonial-card-iconleft"><FaQuoteLeft /></div>
                                        <div className="testimonial-card-message">{slide.comment}</div>
                                        <div className="testimonial-card-iconright"><FaQuoteRight /></div>
                                    </div>
                                    <div className="testimonial-date">{slide.date && slide.date}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="left-arrow primary" onClick={goToPrevious}><FaCaretLeft /></div>
                    <div className="right-arrow primary" onClick={goToNext}><FaCaretRight /></div>
                </div>
                <div className="dots-container">
                    <div className="left-arrow dots" onClick={goToPrevious}><FaCaretLeft /></div>
                    {slides.map((slide, slideIndex) => (
                        <div
                            key={slideIndex}
                            className={`dots-item ${currentIndex === slideIndex ? 'active' : ''}`}
                            onClick={() => goToSlide(slideIndex)}
                        >
                        </div>
                    ))}
                    <div className="right-arrow dots" onClick={goToNext}><FaCaretRight /></div>
                </div>
            </div>
        </>
    );
};

export default TestimonialsCore;