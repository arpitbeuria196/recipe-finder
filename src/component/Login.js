import React, { useRef, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import { useDispatch } from 'react-redux';
import { validation } from '../utils/validation';
import { addLoginData } from '../utils/userSlice';
import Header from './Header';

const Login = () => {
  const nameRef = useRef('');
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loggedInStatus, setLoggedInStatus] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = nameRef?.current?.value;
    const email = emailRef?.current?.value;
    const password = passwordRef?.current?.value;

    const validations = validation(email, password);

    if (validations) {
      setErrorMessage(validations);
      return;
    }

    if (!email || !password || (!loggedInStatus && !name)) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    // Sign Up Logic
    if (!loggedInStatus) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await updateProfile(user, { displayName: name });
        dispatch(addLoginData({ uid: user.uid, email: user.email, displayName: name }));
      } catch (error) {
        setErrorMessage(error.message);
      }
    } else {
      // Sign In Logic
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          dispatch(addLoginData({ uid: user.uid, email: user.email, displayName: name }));
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    }
  };

  const handleLoggedIn = () => {
    setLoggedInStatus(!loggedInStatus);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <Header />
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
        <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
        <h1 className="text-2xl font-bold text-center mb-6">
          {loggedInStatus ? "Sign In" : "Sign Up"}
        </h1>
        {!loggedInStatus && (
          <input
            ref={nameRef}
            type="text"
            placeholder="Please Enter Your Name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}
        <input
          ref={emailRef}
          type="text"
          placeholder="Please Enter Your Email"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          ref={passwordRef}
          type="password"
          placeholder="Please Enter Your Password"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {loggedInStatus ? "Sign In" : "Sign Up"}
        </button>
      </form>
      <p
        onClick={handleLoggedIn}
        className="text-blue-500 hover:underline cursor-pointer mt-4"
      >
        {loggedInStatus
          ? "If you are a member please Sign In"
          : "If You are not a member please sign up first"}
      </p>
    </div>
  );
};

export default Login;
