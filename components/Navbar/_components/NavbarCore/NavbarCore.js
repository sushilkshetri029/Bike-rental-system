"use client"

import Link from 'next/link';
import './NavbarCore.css';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Hamburger from '@/components/ui/Hamburger/Hamburger';
import { useScroll } from '@/contexts/ScrollContext/ScrollContext';
import { MdOutlineArrowCircleRight } from 'react-icons/md';
import { FaAngleRight, FaChevronRight } from 'react-icons/fa6';

const NavbarCore = () => {

  const { isScrollDisabled, disableScroll, enableScroll } = useScroll();

  const pathname = usePathname();

  const [navMenuOpen, setNavMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navMenuRef = useRef(null);
  const menuIconRef = useRef(null);

  const firstPathSegment = pathname.split('?')[0].split('#')[0].split('/')[1] || 'home';

  // Disable scroll when the nav menu is open
  useEffect(() => {
    if (navMenuOpen) {
      disableScroll();
    } else {
      enableScroll();
    }
  }, [navMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {

      if (navMenuRef.current && !navMenuRef.current.contains(event.target) && !menuIconRef.current.contains(event.target)) {
        setNavMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsScrolled(false);
      } else {
        setIsScrolled(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMenuClick = () => {
    setNavMenuOpen(!navMenuOpen);
  }

  return (

    <>
      <nav className={`navbar-wrapper ${firstPathSegment} ${isScrolled ? 'scrolled' : ''}`}>

        {/* Background for when the navbar is open */}
        <div className={`nav-overlay ${navMenuOpen ? `open` : ``}`}></div>

        {/* Background for when the navbar is open */}
        <div className="nav-inner-overlay"></div>

        <div className="nav-left">
          <Link href='/' className="logo nav-left-item link-rd">
            <Image className='logo-image image-fit' src="/logo.png" width={50} height={50} priority alt="VehicleRS" />
            <div className="logo-text no-wrap">Vehicle-RS</div>
          </Link>
        </div>
        <div className="nav-middle nav-desktop">
          <Link href='#' className={`nav-middle-item link-rd ${firstPathSegment === 'ride' ? 'active' : ''}`}>Ride</Link>
          <Link href='#' className={`nav-middle-item link-rd ${firstPathSegment === 'gallery' ? 'active' : ''}`}>Gallery</Link>
          <Link href='#' className={`nav-middle-item link-rd ${firstPathSegment === 'services' ? 'active' : ''}`}>Services</Link>
          <Link href='#' className={`nav-middle-item link-rd ${firstPathSegment === 'about-us' ? 'active' : ''}`}>About</Link>
        </div>
        <div className="nav-right nav-desktop">
          <Link href='#' className="nav-right-item link-rd sign-in-link no-wrap">Sign In</Link>
        </div>
        <div className={`nav-right-wrapper nav-mobile ${navMenuOpen ? `open` : ``}`} ref={navMenuRef}>
          <FaAngleRight strokeWidth={20} className='nav-close-icon flex-center' onClick={handleMenuClick} />
          <div className="nav-right-wrapper-inner">
            <div className="nav-middle">
              <Link href='#' className={`nav-middle-item link-rd ${firstPathSegment === 'ride' ? 'active' : ''}`}>Ride</Link>
              <Link href='#' className={`nav-middle-item link-rd ${firstPathSegment === 'gallery' ? 'active' : ''}`}>Gallery</Link>
              <Link href='#' className={`nav-middle-item link-rd ${firstPathSegment === 'services' ? 'active' : ''}`}>Services</Link>
              <Link href='#' className={`nav-middle-item link-rd ${firstPathSegment === 'about-us' ? 'active' : ''}`}>About</Link>
            </div>
            <div className="nav-right">
              <Link href='#' className="nav-right-item link-rd sign-in-link no-wrap">Sign In</Link>
            </div>
          </div>
        </div>
        <Hamburger
          open={navMenuOpen}
          onClick={handleMenuClick}
          ref={menuIconRef}
          className='menu-icon-navbar'
        />
      </nav>
    </>
  )
}

export default NavbarCore;