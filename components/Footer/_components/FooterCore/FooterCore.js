"use client"

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaFacebookF, FaInstagram, FaMailBulk, FaWhatsapp, FaWhatsappSquare } from "react-icons/fa";
import { FaPhoneVolume } from "react-icons/fa6";
import './FooterCore.css';

const FooterCore = () => {

  const pathname = usePathname();
  const pathClass = pathname.replace('/', '') || 'home';

  return (
    <footer className={`footer-wrapper ${pathClass}`}>
      <div className="footer-top">
        <div className="footer-top-left">
          <h4 className="footer-top-left-title footer-titles line-title">More On Vehicle-RS</h4>
          <ul className="more-on-company footer-lists">
            <Link href={"/about-us"}><li className="more-on-item">About Us</li></Link>
            <Link href={"/privacy-policy"}><li className="more-on-item">Privacy Policy</li></Link>
            <Link href={"/terms-and-conditions"}><li className="more-on-item">Terms & Conditions</li></Link>
          </ul>
        </div>
        <div className="footer-top-middle">
          <h4 className="footer-top-mid-title footer-titles line-title">Locations</h4>
          <ul className="company-locations footer-lists">
            <li className="more-on-item">Pokhara</li>
          </ul>
        </div>
        <ul className="footer-top-right">
          <li className="company-details">
            <div className="company-details-icon"><FaPhoneVolume /></div>
            <div className="company-infos">
              <h5 className="company-infos-title">Contact Number</h5>
              <div className="company-infos-desc flex flex-center gap-10">
                <Link href={"tel:9844310032"} className="link-rd link-hover">9844310032</Link>
                <div className="line line-vertical"></div>
                <Link href={"tel:9865005257"} className="link-rd link-hover">9865005257</Link>
              </div>
            </div>
          </li>
          <li className="company-details">
            <div className="company-details-icon"><FaMailBulk /></div>
            <div className="company-infos">
              <h5 className="company-infos-title">Email Address</h5>
              <Link href={"mailto: gharsewaservices@gmail.com"} className="company-infos-desc link-hover">vehicle-rs@gmail.com</Link>
            </div>
          </li>
        </ul>
      </div>
      <div className="footer-separator"></div>
      <div className="footer-bottom">
          <Link href="/" className="footer-bottom-logo">
            <Image src="/logo.png" className='footer-logo' width={45} height={45} priority alt="Gharsewa footer" />
            <div className="footer-bottom-logo-text">Vehicle-RS</div>
          </Link>
          <div className="footer-bottom-text">Copyright &copy; | www.vehicle-rs.com - {new Date().getFullYear()} | All Right Reserved</div>
        <ul className="footer-bottom-platforms">
          <Link href={"https://www.facebook.com/profile.php?id=gharsewa"} target='_blank'><li className="footer-platform-item"><FaFacebookF /></li></Link>
          <Link href={"https://www.instagram.com/gharsewa"} target='_blank'><li className="footer-platform-item"><FaInstagram /></li></Link>
          <Link href={"https://wa.me/9844310032"} target='_blank'><li className="footer-platform-item"><FaWhatsapp /></li></Link>
        </ul>
      </div>
    </footer>
  )
}

export default FooterCore;
