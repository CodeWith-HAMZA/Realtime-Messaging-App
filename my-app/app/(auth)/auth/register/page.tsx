'use client'
import { Button } from '@/components/ui/button';
import { setCookie } from '@/lib/utils';
import UserService from '@/services/userServices';
import { TaskAbortError } from '@reduxjs/toolkit';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Toaster, toast } from 'sonner';
import { useCookies } from "react-cookie"
import { useUser } from '@/app/context/UserProvider';
const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [Loading, setLoading] = useState(false)
  const router = useRouter()
  const [cookies, setCookie, removeCookie] = useCookies(['Authorization']);

  const user = useUser()
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create FormData object from the form element
    const formData = new FormData(e.target);

    // Extract form field values from the formData object
    const firstName = formData.get('firstName')?.toString();
    const lastName = formData.get('lastName')?.toString();
    const email = formData.get('email')?.toString();
    const password = formData.get('password')?.toString();
    const confirmPassword = formData.get('confirmPassword')?.toString();
    const dob = formData.get('dob')?.toString();
    const gender = formData.get('gender')?.toString();
    const termsAccepted = formData.get('termsAccepted')?.toString();


    // Perform form validation
    if (!firstName || !lastName || !email || !password || !confirmPassword || !dob || !gender || !termsAccepted) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    // Validate password length
    if (password.length < 8) {
      toast.error('Password should be at least 8 characters long');
      return;
    }

    // Validate password and confirmPassword match
    if (password !== confirmPassword) {
      toast.error('Password and Confirm Password do not match');
      return;
    }

    const userServices = new UserService(cookies?.Authorization);

    setLoading(true)

    try {
      // Call the registerUser function from the service
      const data = await userServices.register(`${firstName} ${lastName}`, email, password);

      toast.success(data.message ?? "Successfully account created");


      setCookie("Authorization", data?.token, { path: "/" });
      user.login(data.user.name, data.user.email)


      router.push("/chat");


    } catch (error) {
      console.error(error)
      toast.error("Error while registering")
    } finally {
      setLoading(false)
    }
  };



  return (
    <div className="mx-auto max-w-sm space-y-6">
      <button onClick={() => { toast("first") }}>Shaikh</button>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <p className="text-gray-500 dark:text-gray-400">Enter your information to create an account</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="first-name" className="text-sm font-medium leading-none">
              First name
            </label>
            <input
              type="text"
              id="first-name"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              name='firstName'
              placeholder="Lee"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="last-name" className="text-sm font-medium leading-none">
              Last name
            </label>
            <input
              type="text"
              id="last-name"
              name='lastName'
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Robinson"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium leading-none">
            Email
          </label>
          <input
            type="email"
            id="email"
            name='email'
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="m@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium leading-none">
            Password
          </label>
          <input
            type="password"
            id="password"
            name='password'
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="confirm-password" className="text-sm font-medium leading-none">
            Confirm Password
          </label>
          <input
            type="password"
            name='confirmPassword'
            id="confirm-password"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="dob" className="text-sm font-medium leading-none">
            Date of Birth
          </label>
          <input
            type="date"
            id="dob"
            name='dob'
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            required
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="gender" className="text-sm font-medium leading-none">
            Gender
          </label>
          <select
            id="gender"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            name='gender'
            onChange={(e) => setGender(e.target.value)}
            value={gender}
          >
            <option value="" disabled>Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="terms" className="text-sm font-medium leading-none flex items-center">
            <input
              type="checkbox"
              name='termsAccepted'
              aria-required={termsAccepted}


              className="h-4 w-4 text-black bg-black"
              id="terms"
              onClick={() => setTermsAccepted(!termsAccepted)}
            />
            <span className="ml-2">I accept the terms and conditions</span>
          </label>
        </div>
        <Button
          className='w-full'
          type="submit"
          disabled={Loading}
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
