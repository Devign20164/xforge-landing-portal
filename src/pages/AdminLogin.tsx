
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, ShieldAlert } from "lucide-react";

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // This would normally connect to a backend, but for demo purposes
  // we'll use a simple check with a hardcoded admin credential
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // In a real app, this would be a backend API call
    setTimeout(() => {
      if (username === "admin" && password === "admin123") {
        // Store admin status in localStorage (in a real app, use a secure token)
        localStorage.setItem("isAdmin", "true");
        
        toast({
          title: "Admin Login Successful",
          description: "Welcome to the XForge Admin Dashboard",
        });
        
        navigate("/admin/dashboard");
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid admin credentials",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-xforge-dark p-4">
      <div className="w-full max-w-md p-8 glass-dark rounded-lg shadow-xl animate-fade-in">
        <div className="flex items-center justify-center mb-6">
          <ShieldAlert className="text-xforge-teal mr-2" size={28} />
          <h2 className="text-xl font-bold text-white">
            <span className="text-xforge-teal">X</span>Forge Admin
          </h2>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="username" className="block mb-2 text-xforge-gray">Username</label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Admin username"
              className="input-field"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block mb-2 text-xforge-gray">Password</label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
              className="input-field"
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-xforge-teal text-xforge-dark hover:brightness-110"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Authenticating...
              </>
            ) : (
              "Login to Admin Panel"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
