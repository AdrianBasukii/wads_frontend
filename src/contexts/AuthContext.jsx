/* eslint-disable react/prop-types */
import { useMutation } from "@tanstack/react-query";
import { createContext, useContext, useState, useEffect } from "react";
import {
  login,
  register,
  googleLogin,
  logout,
  getAccessTokenFromRefresh,
} from "../api/auth";
import toast from "react-hot-toast";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState("");

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setUser(data);
      toast.success("Login successful!", {
        duration: 4000,
        position: "top-right",
        style: {
          background: "#4CAF50",
          color: "#fff",
        },
      });
    },
    onError: (error) => {
      toast.error("Login failed!", {
        duration: 4000,
        position: "top-right",
        style: {
          background: "#F44336",
          color: "#fff",
        },
      });
      console.error(`Login error: ${error.message}`);
    },
  });

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      setUser(data);
      toast.success("Registration successful!", {
        duration: 4000,
        position: "top-right",
        style: {
          background: "#4CAF50",
          color: "#fff",
        },
      });
    },
    onError: (error) => {
      toast.error("Registration failed!", {
        duration: 4000,
        position: "top-right",
        style: {
          background: "#F44336",
          color: "#fff",
        },
      });
      console.error(`Registration error: ${error.message}`);
    },
  });

  const googleLoginMutation = useMutation({
    mutationFn: () => {
      googleLogin();
      return Promise.resolve(); // Return a resolved promise since we're redirecting
    },
    onError: (error) => console.error(`Google Login error: ${error.message}`),
  });

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: (data) => {
      setUser("");
      toast.success("Logout successful!", {
        duration: 4000,
        position: "top-right",
        style: {
          background: "#4CAF50",
          color: "#fff",
        },
      });
    },
    onError: (error) => {
      toast.error("Logout failed!", {
        duration: 4000,
        position: "top-right",
        style: {
          background: "#F44336",
          color: "#fff",
        },
      });
      console.error(`Error: ${error.message}`);
    },
  });

  // AUTO LOGIN
  useEffect(() => {
    const tryRefreshToken = async () => {
      try {
        const userData = await getAccessTokenFromRefresh();
        console.log("Auto login successful, setting user data:", {
          userId: userData._id,
          role: userData.role,
          hasToken: !!userData.accessToken,
        });
        setUser(userData);
      } catch (err) {
        console.error("Auto login failed:", err.message);
      }
    };

    tryRefreshToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,

        login: loginMutation.mutate,
        loginLoading: loginMutation.isLoading,
        loginError: loginMutation.error,
        loginMutation,

        register: registerMutation.mutate,
        registerLoading: registerMutation.isLoading,
        registerError: registerMutation.error,
        registerMutation,

        logoutFunc: logoutMutation.mutate,
        logoutLoading: logoutMutation.isLoading,
        logoutError: logoutMutation.error,
        logoutMutation,

        googleLogin: googleLoginMutation.mutate,
        googleLoginLoading: googleLoginMutation.isLoading,
        googleLoginError: googleLoginMutation.error,
        googleLoginMutation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuthContext() {
  const context = useContext(AuthContext);
  if (!AuthContext) throw new Error("Context is used outside of provider");
  return context;
}

export { useAuthContext, AuthProvider };
