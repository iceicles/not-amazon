'use client';

import { RegisterForm } from '@/components/register-form/register-form';
import { IFormValues } from '@/interfaces/form';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

export default function Register() {
  const { register, handleSubmit } = useForm<IFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const router = useRouter();

  const sendFormData = async (userData: IFormValues) => {
    try {
      const data = await fetch('http://localhost:4000/api/v1/auth/register', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        credentials: 'include', // allows cookies to be sent with the request and subsequent ones and allows the browser to respect any set-cookie response headers from the server
        body: JSON.stringify({
          userData,
        }),
      });

      if (data.ok) router.push('/');
    } catch (error) {
      console.log('error - ', error);
    }
  };

  const onSubmit = (data: IFormValues) => {
    sendFormData(data);
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <RegisterForm
        register={register}
        onSubmit={handleSubmit(onSubmit)}
        name={'name'}
        email={'email'}
        password={'password'}
      />
    </div>
  );
}
