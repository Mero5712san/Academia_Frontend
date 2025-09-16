import React, { useState } from "react";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // login logic here
    console.log("Login submitted", email, password, rememberMe);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-5xl font-bold">Welcome</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md mt-20">
        <div className="form-control">
          <label className="label">
            Email
          </label>
          <input
            type="email"
            placeholder="email"
            className="input input-bordered"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label className="label">
            Password
          </label>
          <input
            type="password"
            placeholder="password"
            className="input input-bordered"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center mb-4">
          <div className="form-control">
            <label className="cursor-pointer label">
              <input type="checkbox" className="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
              <span className="label-text">Remember me</span>
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <p className="text-center mt-4">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};
