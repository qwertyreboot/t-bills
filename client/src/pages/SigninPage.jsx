import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SigninPage() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { signin } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex h-[100vh] flex-col items-center justify-center gap-3 -mt-16">
      <h2 className="text-2xl font-bold text-gray-700 my-4">
        Signin to continue...
      </h2>
      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone"
        type="number"
        className="border border-gray-400 rounded shadow-sm px-4 py-2"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
        className="border border-gray-400 rounded shadow-sm px-4 py-2"
      />

      <button
        onClick={async () => {
          const isSignedIn = signin(phone, password);
          if (isSignedIn) {
            navigate("/bills");
          }
        }}
        className="bg-blue-400 text-white px-4 py-2 rounded shadow-sm w-48"
      >
        Signin
      </button>
    </div>
  );
}
