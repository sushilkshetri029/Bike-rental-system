import FooterCore from "./_components/FooterCore/FooterCore";
import { Suspense } from "react";

const Footer = () => {
  return (
    <Suspense fallback={null}>
      <FooterCore />
    </Suspense>
  )
}

export default Footer;