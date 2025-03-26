
import React, { useState, useEffect } from "react";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "py-3 bg-xforge-dark bg-opacity-80 backdrop-blur shadow-md" 
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between">
        <div className="flex items-center">
          <a href="#" className="text-2xl font-bold text-white">
            <span className="text-xforge-teal">X</span>Forge
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden space-x-8 md:flex">
          <a href="#home" className="nav-link">Home</a>
          <a href="#features" className="nav-link">Features</a>
          <a href="#campaign" className="nav-link">Campaign</a>
          <a href="#register" className="nav-link">Register</a>
        </nav>

        {/* Login/Sign Up Buttons */}
        <div className="hidden space-x-4 md:flex">
          <a href="#login" className="btn btn-outline">Login</a>
          <a href="#register" className="btn btn-primary">Sign Up</a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="p-2 md:hidden" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className="space-y-2">
            <span className={`block w-8 h-0.5 bg-xforge-teal transition-all duration-300 ${isMobileMenuOpen ? 'translate-y-2.5 rotate-45' : ''}`}></span>
            <span className={`block w-8 h-0.5 bg-xforge-teal transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-8 h-0.5 bg-xforge-teal transition-all duration-300 ${isMobileMenuOpen ? '-translate-y-2.5 -rotate-45' : ''}`}></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-40 flex flex-col pt-24 pb-8 md:hidden bg-xforge-dark bg-opacity-95 backdrop-blur transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col items-center space-y-6 text-lg">
          <a href="#home" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
          <a href="#features" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Features</a>
          <a href="#campaign" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Campaign</a>
          <a href="#register" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Register</a>
        </nav>
        <div className="flex flex-col items-center mt-10 space-y-4">
          <a href="#login" className="btn btn-outline w-44 text-center" onClick={() => setIsMobileMenuOpen(false)}>Login</a>
          <a href="#register" className="btn btn-primary w-44 text-center" onClick={() => setIsMobileMenuOpen(false)}>Sign Up</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
