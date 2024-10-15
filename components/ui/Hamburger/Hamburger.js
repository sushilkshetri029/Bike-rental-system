"use client"

import { forwardRef, useEffect, useRef, useState } from "react";
import './Hamburger.css';

const Hamburger = forwardRef(({className='', open, onClick }, ref) => {

    return (
        <>
            <div className={`menu-icon-wrapper ${className} ${open ? `open` : ``}`} onClick={onClick} ref={ref}>
                <div className="menu-icon">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </>
    )
});

export default Hamburger