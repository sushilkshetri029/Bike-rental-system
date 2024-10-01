"use client"

import Link from 'next/link';
import './Navbar.css';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();
  const firstPathSegment = pathname.split('?')[0].split('#')[0].split('/')[1];

  return (
    <nav className='navbar-wrapper'>
      <div className="nav-left">
        <Link href='/' className="logo nav-left-item link-rd">
          <Image className='logo-image image-fit' src="/logo.png" width={50} height={50} priority alt="VehicleRS" />
          <div className="logo-text">Vehicle-RS</div>
        </Link>
      </div>
      <div className="nav-middle">
        <Link href='#' className={`nav-middle-item link-rd ${firstPathSegment === 'ride' ? 'active' : ''}`}>Ride</Link>
        <Link href='#' className={`nav-middle-item link-rd ${firstPathSegment === 'gallery' ? 'active' : ''}`}>Gallery</Link>
        <Link href='#' className={`nav-middle-item link-rd ${firstPathSegment === 'services' ? 'active' : ''}`}>Services</Link>
        <Link href='#' className={`nav-middle-item link-rd ${firstPathSegment === 'about-us' ? 'active' : ''}`}>About</Link>
      </div>
      <div className="nav-right">
        <Link href='#' className="nav-right-item link-rd sign-in-link">Sign In</Link>
      </div>
    </nav>
  )
}

export default Navbar;