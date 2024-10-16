import Link from 'next/link';
import '../components/NotFound/NotFound.css';

const NotFound = () => {
    return (
        <main className="not-found">
            {
                // Fix Later: Remove title from here when metadata is supported in not-found.js
                // No support for metadata in not-found.js yet
                // https://github.com/vercel/next.js/pull/47328#issuecomment-1488891093
            }
            <title>404 Not Found</title>
            <div className="not-found-container">
                <h1 className="not-found-title">404</h1>
                <p className="not-found-message">Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
                <Link className='not-found-link' href="/">
                    Go to Home
                </Link>
            </div>
        </main>
    )
}

export default NotFound;
// Fix Later: Uncomment when metadata is supported in not-found.js
// export const metadata = {
//     title: 'Not Found',
//     description: 'The page you are looking for does not exist',
// };