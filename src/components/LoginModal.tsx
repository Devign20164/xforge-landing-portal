
import React from "react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, X } from "lucide-react";
import { useState } from "react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!email.trim() || !password.trim()) {
      toast({
        title: "Error",
        description: "Please enter both email and password",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Login successful",
        description: "Welcome back to XForge!",
      });
      onClose();
      // Reset form
      setEmail("");
      setPassword("");
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md p-6 mx-4 bg-xforge-dark border border-xforge-lightgray rounded-lg shadow-xl animate-scale-in">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-xforge-gray hover:text-xforge-teal transition-colors"
        >
          <X size={24} />
        </button>
        
        <h2 className="text-2xl font-bold mb-6 text-white">
          <span className="text-xforge-teal">X</span>Forge Login
        </h2>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-2 text-xforge-gray">Email</label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
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
              placeholder="Enter your password"
              className="input-field"
              required
            />
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="remember" 
                className="mr-2 accent-xforge-teal"
              />
              <label htmlFor="remember" className="text-xforge-gray">Remember me</label>
            </div>
            <a href="#" className="text-xforge-teal hover:underline">Forgot password?</a>
          </div>
          
          <Button 
            type="submit" 
            className="w-full btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>
          
          <p className="text-center text-xforge-gray">
            Don't have an account?{" "}
            <a href="#register" className="text-xforge-teal hover:underline" onClick={onClose}>
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
