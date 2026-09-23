import * as SecureStore from "expo-secure-store";
import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
  
  type User = {
    email: string;
    name: string;
    studentId: string;
  };
  
  type AuthContextType = {
    user: User | null;
    token: string | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
  };
  
  const AuthContext = createContext<AuthContextType | undefined>(undefined);
  
  const TOKEN_KEY = "student_token";
  const USER_KEY = "student_user";
  
  export function AuthProvider({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
  
    // Restore session when app starts
    useEffect(() => {
      restoreSession();
    }, []);
  
    async function restoreSession() {
      try {
        const savedToken = await SecureStore.getItemAsync(TOKEN_KEY);
        const savedUser = await SecureStore.getItemAsync(USER_KEY);
  
        if (savedToken && savedUser) {
          setToken(savedToken);
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.log("Session restore error:", error);
      } finally {
        setLoading(false);
      }
    }
  
    async function login(email: string, password: string) {
      // Demo authentication.
      // Replace this section with your real API request later.
  
      if (!email || !password) {
        throw new Error("Email and password are required.");
      }
  
      if (!email.includes("@")) {
        throw new Error("Please enter a valid email address.");
      }
  
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters.");
      }
  
      // Demo token
      const demoToken = "student-demo-token-12345";
  
      const demoUser: User = {
        email,
        name: "Student User",
        studentId: "STU-2026-001",
      };
  
      // Save token securely
      await SecureStore.setItemAsync(TOKEN_KEY, demoToken);
  
      // Save user securely
      await SecureStore.setItemAsync(
        USER_KEY,
        JSON.stringify(demoUser)
      );
  
      setToken(demoToken);
      setUser(demoUser);
    }
  
    async function logout() {
      try {
        // Clear SecureStore
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        await SecureStore.deleteItemAsync(USER_KEY);
  
        // Clear React state
        setToken(null);
        setUser(null);
      } catch (error) {
        console.log("Logout error:", error);
      }
    }
  
    return (
      <AuthContext.Provider
        value={{
          user,
          token,
          loading,
          login,
          logout,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
  
  export function useAuth() {
    const context = useContext(AuthContext);
  
    if (!context) {
      throw new Error("useAuth must be used inside AuthProvider");
    }
  
    return context;
  }
  