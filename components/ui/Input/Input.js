"use client"

import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import './Input.css';

const Input = ({ className = '', type = 'text', label = 'Enter', name = 'input-default-name', required = false, value = '', onChange, disabled = false, togglePassword = false, fixedLabel = false }) => {

    const [passwordType, setPasswordType] = useState(togglePassword || type === 'password');

    return (
        <div className={`input-field ${className} ${togglePassword && !disabled ? 'password' : ''} ${fixedLabel ? 'fixed-label' : ''}`}>
            <input className={`input ${value !== '' ? `valid` : ''}`} disabled={disabled} value={value} type={passwordType === true ? 'password' : passwordType === false && type === 'password' ? 'text' : type} name={name} required={required} onChange={(e) => onChange(e)} />
            {togglePassword && !disabled &&
                <>
                    {
                        passwordType ?
                            <FiEye className='eye-icon' onClick={() => setPasswordType(false)} />
                            :
                            <FiEyeOff className='eye-icon' onClick={() => setPasswordType(true)} />
                    }
                </>
            }
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>{label}</label>
        </div>
    )
}

export default Input;