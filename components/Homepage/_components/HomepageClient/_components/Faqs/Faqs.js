import { Suspense } from 'react';
import FaqsCore from './_components/FaqsCore/FaqsCore';

const Faqs = () => {
  return (
    <Suspense fallback={null}>
      <FaqsCore />
    </Suspense>
  )
};

export default Faqs;