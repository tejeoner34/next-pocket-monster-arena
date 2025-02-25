import { usePathname } from 'next/navigation';
import { useRef, useEffect } from 'react';

export default function useOnLeavePage(onLeave: () => void) {
  const pathname = usePathname();
  const hasMounted = useRef(false);
  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    return () => {
      console.log(`User is leaving ${pathname}`);
      onLeave();
    };
  }, [pathname, onLeave]);
}
