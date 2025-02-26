'use client';
import React, { FC } from 'react';
import Link from 'next/link';
import { useAuth } from '@/utils/hooks/useAuth';

export const Header: FC<{}> = ({}) => {
  const { user } = useAuth();

  const renderUserOrSignIn = () => {
    console.log('user - ', user);
    if (user) {
      return <p>{user}</p>;
    } else {
      return (
        <li>
          <Link href='/login'>Sign In</Link>
        </li>
      );
    }
  };

  return (
    <div>
      <nav>
        <ul className='flex justify-between items-center list-none'>
          <li>
            <Link href='/'>Home</Link>
          </li>
          <span className='flex gap-2'>
            <li>
              <Link href='/cart'>cart</Link>
            </li>
            <li>
              <Link href='/wishlist'>wishlist</Link>
              <span>1</span>
            </li>
            {renderUserOrSignIn()}
          </span>
        </ul>
      </nav>
    </div>
  );
};
