"use client"

import { useState } from 'react';
import './HeroForm.css';
import Input from '@/components/ui/Input/Input';

const HeroForm = () => {
  const [name, setName] = useState('asdf');

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    switch (field) {
        case 'name':
            setName(value);
            break;
        // case 'loginPassword':
        //     setLoginPassword(value);
        //     break;
        // case 'name':
        //     setName(value);
        //     break;
        // case 'registerEmail':
        //     setRegisterEmail(value);
        //     break;
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
      <Input
      label='Name'
      required
      value={name}
      onChange={(e) => handleInputChange(e, 'name')}
      // type='password'
      // togglePassword
      // disabled
      />
      <button className='btn btn-blue'>submit</button>
    </form>
  )
}

export default HeroForm