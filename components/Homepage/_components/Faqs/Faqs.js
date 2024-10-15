import { Suspense } from 'react';
import FaqsCore from './_components/FaqsCore/FaqsCore';

const Faq = () => {
  return (
    <Suspense fallback={null}>
      <FaqsCore />
    </Suspense>
  )
};

export default Faq;