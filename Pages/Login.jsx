import { useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [mode, setMode] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (mode === "Sign Up") {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        await res.user.updateProfile({ displayName: name }); // Optional: update name
        alert("User registered successfully!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful!");
      }
      navigate("/"); // ✅ Redirect to home
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center w-[90%] sm:max-w-md mx-auto mt-14 gap-4 text-gray-800"
    >
      <div className="text-3xl font-bold mb-4">{mode}</div>

      {mode === "Sign Up" && (
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-full p-2 border rounded"
          required
        />
      )}

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full p-2 border rounded"
        required
      />

      {error && <p className="text-red-500">{error}</p>}

      <div className="flex justify-between w-full text-sm">
        <p className="cursor-pointer">Forgot Password?</p>
        <p
          className="cursor-pointer underline"
          onClick={() => setMode(mode === "Login" ? "Sign Up" : "Login")}
        >
          {mode === "Login" ? "Create Account" : "Login Instead"}
        </p>
      </div>

      <button className="bg-black text-white px-6 py-2 rounded">
        {mode === "Login" ? "Login" : "Register"}
      </button>
    </form>
  );
};

export default Login;
