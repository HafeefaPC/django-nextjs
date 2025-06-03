'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import { FormEvent } from 'react';

export default function Page() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password2, setPassword2] = useState("");
  const [password1, setPassword1] = useState("");
  const router = useRouter();

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password1 !== password2) {
      alert("Passwords do not match");
      return;
    }
    axios.post("http://localhost:8000/api/auth/registration/", {
      email,
      username,
      password1,
      password2,
    }).then((response) => {
      localStorage.setItem("token", response.data.key);
      router.push('/login');
    }).catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else {
        console.log(error.message);
      }
    });
  };

  return (
    <div className='flex items-center justify-center h-screen bg-red-500'>
      <div className='w-full max-w-lg'>
        <form className='bg-white shadow-lg rounded-2xl px-8 pt-6 pb-16 mb-4' onSubmit={handleRegister}>
          <a href="/" className="flex justify-center mb-4">
            <Image
              className='mx-auto w-auto'
              src="/logo.png"
              alt="Logo"
              width={100}
              height={100}
            />
          </a>
          <div className='text-center text-3xl my-5 font-semibold'>Register</div>

          <div className='mb-4'>
            <label htmlFor="username" className='block text-gray-700 text-sm font-bold mb-2'>Username</label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-sky-500 focus:ring-1'
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className='mb-4'>
            <label htmlFor="password1" className='block text-gray-700 text-sm font-bold mb-2'>Password</label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-sky-500 focus:ring-1'
              id="password1"
              type="password"
              placeholder="Password"
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
              required
            />
          </div>

          <div className='mb-4'>
            <label htmlFor="password2" className='block text-gray-700 text-sm font-bold mb-2'>Confirm Password</label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-sky-500 focus:ring-1'
              id="password2"
              type="password"
              placeholder="Confirm Password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
            />
          </div>

          <div className='mb-4'>
            <label htmlFor="email" className='block text-gray-700 text-sm font-bold mb-2'>Email</label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-sky-500 focus:ring-1'
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
          >
            Register
          </button>
            <div className='mt-4 text-center'>
                <span className='text-gray-600'>Already have an account? </span>
                <a href="/login" className='text-red-500 hover:text-red-700 font-bold'>Login</a>
            </div>
        </form>
      </div>
    </div>
  );
}
