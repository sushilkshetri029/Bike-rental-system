import { Suspense } from "react";
import ScrollToCore from "./_components/ScrollToCore";

const ScrollTo = () => {
    return (
        <Suspense fallback={null}>
            <ScrollToCore />
        </Suspense>
    )
}

export default ScrollTo;