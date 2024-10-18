"use client"

import { Suspense } from 'react';
import NavbarCore from './_components/NavbarCore/NavbarCore';

const Navbar = () => {

  return (
    <Suspense fallback={null}>
      <NavbarCore />
    </Suspense>
  )
}

export default Navbar;