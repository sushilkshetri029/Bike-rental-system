"use client"

import { Suspense } from 'react';
import BikesCore from './_components/BikesCore/BikesCore';

const Bikes = () => {
    return (
        <Suspense fallback={null}>
            <BikesCore />
        </Suspense>
    )
};

export default Bikes;