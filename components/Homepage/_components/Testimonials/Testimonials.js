import { Suspense } from 'react';
import TestimonialsCore from './_components/TestimonialsCore/TestimonialsCore';

const Testimonials = () => {
    return (
        <Suspense fallback={null}>
            <TestimonialsCore />
        </Suspense>
    )
};

export default Testimonials;