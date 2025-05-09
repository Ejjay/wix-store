'use client';

import { useEffect } from 'react';

export default function DisableContextMenu() {
  useEffect(() => {
    window.oncontextmenu = (e) => {
      e.preventDefault();
      return false;
    };
  }, []);
  
  return null;
}