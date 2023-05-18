import { createContext } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const signin = async (username, password) => {
    const response = await (
      await fetch("http://localhost:4000/api/auth/signin", {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();

    if (response._id) {
      const user = response;
      localStorage.setItem("user", JSON.stringify(user));
      setCurrentUser(user);
      return true;
    }

    return false;
  };

  const signout = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ currentUser, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};
