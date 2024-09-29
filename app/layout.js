import localFont from "next/font/local";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import './utilities.css';

// Open Sans variable font
const openSans = localFont({
  src: "./fonts/OpenSans-VariableFont_wdth,wght.ttf",
  variable: "--font-open-sans",
  weight: "100 900", // Variable font supports a range of weights
  style: "normal",
});

// Open Sans Italic
const openSansItalic = localFont({
  src: "./fonts/OpenSans-Italic-VariableFont_wdth,wght.ttf",
  variable: "--font-open-sans-italic",
  weight: "100 900",
  style: "italic",
});

// Montserrat variable font
const montserrat = localFont({
  src: "./fonts/Montserrat-VariableFont_wght.ttf",
  variable: "--font-montserrat",
  weight: "100 900",
  style: "normal",
});

// Montserrat Italic
const montserratItalic = localFont({
  src: "./fonts/Montserrat-Italic-VariableFont_wght.ttf",
  variable: "--font-montserrat-italic",
  weight: "100 900",
  style: "italic",
});


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${openSans.variable} ${montserrat.variable} ${openSansItalic.variable} ${montserratItalic.variable}`}
      >
        <Navbar />
        <NextTopLoader color="#EE7214" showSpinner={false} zIndex={1800} />
        {children}
        <Footer />
      </body>
    </html>
  );
}