'use client';

import { generateUniqueID } from '@/utils/generateUniqueId';
import { useEffect } from 'react';

export const PageInit = () => {
  useEffect(() => {
    // create guest UUID if it doesn't exist in local storage
    if (!localStorage.getItem('anonymous_id')) {
      const anonymousId = generateUniqueID();
      localStorage.setItem('anonymous_id', anonymousId);
    }
  }, []);

  return null;
};
