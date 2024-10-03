"use client"

import { useState } from 'react';
import './HeroForm.css';
import Input from '@/components/ui/Input/Input';
import { FaRegCalendarAlt } from 'react-icons/fa';

const HeroForm = () => {
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [pickupDate, setPickupDate] = useState('');

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    switch (field) {
      case 'email':
        setEmail(value);
        break;
      case 'contact':
        setContact(value);
        break;
      case 'pickupDate':
        setPickupDate(value);
        break;
      // case 'registerPassword':
      //     setRegisterPassword(value);
      //     break;
      // case 'confirmPassword':
      //     setConfirmPassword(value);
      //     break;
      default:
        break;
    }
    // validateField(field, value);
  };

  return (
    <form action="" className="hero-form">
      <div className="hero-form-title">
        <h3 className="text">
        <FaRegCalendarAlt className='hero-title-icon' /> Request a Ride
        </h3>
        <div className="line"></div>
      </div>
      <div className="form-inputs">
        <Input
          label='Email'
          required
          type='email'
          value={email}
          onChange={(e) => handleInputChange(e, 'email')}
        />
        <Input
          label='Contact'
          required
          value={contact}
          onChange={(e) => handleInputChange(e, 'contact')}
        />
        <Input
          label='Pickup Date'
          required
          fixedLabel
          value={pickupDate}
          type='date'
          onChange={(e) => handleInputChange(e, 'pickupDate')}
        />
        <button type='submit' className='btn btn-blue'>submit</button>
      </div>
    </form>
  )
}

export default HeroForm