'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Loading() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Set loading to true when navigation starts
    setLoading(true);
    setProgress(0);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prevProgress + 10;
      });
    }, 100);

    // Set loading to false when navigation is complete
    const timeout = setTimeout(() => {
      setLoading(false);
      clearInterval(progressInterval);
    }, 1000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timeout);
    };
  }, [pathname, searchParams]); // Reset loading state on route change

  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 w-full z-[9999]">
      <div 
        className="h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600"
        style={{
          width: `${progress}%`,
          transition: 'width 100ms ease-in-out',
        }}
      />
    </div>
  );
}