'use client';

import { generateUniqueID } from '@/utils/generateUniqueId';
import { useAuth } from '@/utils/hooks/useAuth';
import { useEffect } from 'react';

export const PageInit = () => {
  const { user } = useAuth();
  useEffect(() => {
    // create guest UUID if it doesn't exist in local storage
    if (!localStorage.getItem('anonymous_id') && !user) {
      const anonymousId = generateUniqueID();
      localStorage.setItem('anonymous_id', anonymousId);
    }
  }, []);

  // remove anonymous id from local storage if user is authenticated
  if (user) {
    console.log('here?');
    localStorage.removeItem('anonymous_id');
  }

  return null;
};
