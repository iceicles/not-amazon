'use client';
import { LoginForm } from '@/components/login-form/login-form';
// import { LocalStorage } from '@/enum/localStorage';
import { IFormValues } from '@/interfaces/form';
import { useAuth } from '@/utils/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export default function Login() {
  const { setAuthUser } = useAuth();

  const { register, handleSubmit } = useForm<IFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const router = useRouter();

  const sendFormData = async (userData: IFormValues) => {
    try {
      const data = await fetch('http://localhost:4000/api/v1/auth/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ userData }),
        credentials: 'include', // allows cookies to be sent with the request and subsequent ones
      });

      if (data.ok) {
        const res = await data.json();
        // console.log('res - ', res);
        // localStorage.setItem('user', res.user.name);
        setAuthUser(res.user.name); // set user data in context after successful login
        router.push('/');
      }
    } catch (error) {
      console.log('error -> ', error);
    }
  };

  const onSubmit = (data: IFormValues) => {
    sendFormData(data);
  };

  return (
    <div className='flex h-screen w-full items-center justify-center px-4'>
      <LoginForm
        register={register}
        onSubmit={handleSubmit(onSubmit)}
        email={'email'}
        password={'password'}
      />
    </div>
  );
}
