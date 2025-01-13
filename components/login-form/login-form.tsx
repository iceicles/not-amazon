import Link from 'next/link';
import { Path, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FC, FormEventHandler, RefObject } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { IFormValues } from '@/interfaces/form';

interface LoginForm {
  onSubmit():
    | FormEventHandler<HTMLFormElement>
    | undefined
    | void
    | Promise<void>;
  ref?: RefObject<HTMLFormElement>;
  register: UseFormRegister<IFormValues>;
  email: Path<IFormValues>;
  password: Path<IFormValues>;
}

export const LoginForm: FC<LoginForm> = ({
  onSubmit,
  ref,
  register,
  email,
  password,
}) => {
  return (
    <form onSubmit={onSubmit} ref={ref}>
      <Card className='mx-auto max-w-sm'>
        <CardHeader>
          <CardTitle className='text-2xl'>Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                {...register(email)}
                name={email}
                id='email'
                type='email'
                placeholder='jj@example.com'
                required
              />
            </div>
            <div className='grid gap-2'>
              <div className='flex items-center'>
                <Label htmlFor='password'>Password</Label>
              </div>
              <Input
                {...register(password)}
                name={password}
                id='password'
                type='password'
                required
              />
            </div>
            <Button type='submit' className='w-full'>
              Login
            </Button>
          </div>
          <div className='mt-4 text-center text-sm'>
            Don&apos;t have an account?{' '}
            <Link href='/register' className='underline'>
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};
