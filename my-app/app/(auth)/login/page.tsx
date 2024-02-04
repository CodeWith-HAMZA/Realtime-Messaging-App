'use client'
import { loginUser } from '@/app/actions/user.action';
import { useUser } from '@/app/context/UserProvider';
import { Button } from '@/components/ui/button';
import { removeCookie, setCookie } from '@/lib/utils';
import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useUser()

  const handleLogin = async () => {
    // Perform login logic with email and password
    console.log('Logging in with:', { email, password });
    const url = 'http://localhost:4000/api/user/login';

    // const res = await loginUser(email, password)
    // console.log(res)
    removeCookie("token");
  };

  return (
    <div className="flex justify-center">
      <div className="w-96 bg-white p-8 rounded-md shadow-md mt-10">
        <h1 className="text-3xl font-bold mb-4">Login</h1>
        <div className="mb-4">
          <label htmlFor="email" className="text-sm font-medium leading-none">
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="text-sm font-medium leading-none">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button
          className='w-full '
          onClick={handleLogin}
        >
          Login
        </Button>
        or
        <Button variant={"link"}>
          Signup
        </Button>
      </div>
    </div>
  );
};

export default Login;
