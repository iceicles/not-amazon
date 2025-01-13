'use client';
import React, { FC, useEffect, useState } from 'react';
import Link from 'next/link';

export const Header: FC<{}> = ({}) => {
  // const [cartAmount, setCartAmount] = useState<number>();

  // useEffect(() => {
  //   const getNumberOfCartItems = localStorage.getItem('cart') as string;
  //   const numberOfCartItems = JSON.parse(getNumberOfCartItems).amount;
  //   setCartAmount(numberOfCartItems);
  // }, []);

  // const [user, setUser] = useState<string | null>('');
  // useEffect(() => {
  //   const signedInUser = localStorage.getItem('user');
  //   console.log('signedInUser - ', signedInUser);
  //   setUser(signedInUser);
  // }, [user]);
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
            <li>
              <Link href='/login'>Sign In</Link>
            </li>
            <li>
              <Link href='/register'>Create an account</Link>
            </li>
            {/* {!!user && <span>{user}</span>} */}
          </span>
        </ul>
      </nav>
    </div>
  );
};
