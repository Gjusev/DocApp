"use client";
import React, { useState } from "react";
import signIn from "../../firebase/signIn";
import { useRouter } from "next/navigation";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    const { result, error } = signIn(email, password);

    if (error) {
      return console.log(error);
    }
    return console.log(result);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-slate-800">
      <div className="w-full max-w-md p-8 rounded bg-slate-600">
        <h2 className="mb-6 text-3xl font-bold text-white underline">
          Log In{" "}
        </h2>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
            Log In
          </button>
        </form>
        <button
          className="justify-center block mt-4 underline"
          onClick={() => props.onFormSwitch("register")}
        >
          Don't have an account? Register here.
        </button>
      </div>
    </div>
  );
}
export default Login;
