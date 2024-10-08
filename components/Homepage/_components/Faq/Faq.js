"use client"

import { useState, useRef, useEffect } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './Faq.css';

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const faqRefs = useRef([]);

  const faqs = [
    {
      question: "What are the documents required for renting a motorbike?",
      answer: "You need to provide a valid driving license and a valid ID proof to rent a motorbike."
    },
    {
      question: "Do I need to pay a security deposit?",
      answer: "Yes, you need to pay a security deposit of NPR 5,000 which will be refunded after the rental period ends."
    },
    {
      question: "What is the minimum rental period?",
      answer: "The minimum rental period is 24 hours."
    },
    {
      question: "What happens in case of an accident?",
      answer: "In case of an accident, please contact us immediately. We will assist you with the necessary steps."
    },
    {
      question: "Can I extend my rental period?",
      answer: "Yes, you can extend your rental period by contacting us before your current rental period ends."
    }
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleClickOutside = (event) => {
    if (faqRefs.current.every(ref => ref && !ref.contains(event.target))) {
      setOpenIndex(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="faq-items">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className={`faq-item ${openIndex === index ? 'open' : ''}`}
          onClick={() => toggleFaq(index)}
          ref={el => faqRefs.current[index] = el}
        >
          <div className="faq-question-wrapper">
            <h3 className="faq-question">{faq.question}</h3>
            {/* {openIndex === index ? <FaChevronUp className="faq-icon" /> : <FaChevronDown className="faq-icon" />} */}
            <FaChevronDown className="faq-icon" />
          </div>
          <div className="faq-answer-wrapper" onClick={(e) => e.stopPropagation()}>
            <p className="faq-answer">{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Faq;