
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Campaign from "../components/Campaign";
import Register from "../components/Register";
import Footer from "../components/Footer";

const Index: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsAuthenticated(isLoggedIn);
    };

    checkAuth();
    
    // Add event listener to detect authentication changes
    window.addEventListener("storage", checkAuth);

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href')?.substring(1);
        if (!targetId) return;
        
        const targetElement = document.getElementById(targetId);
        if (!targetElement) return;
        
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for header height
          behavior: 'smooth'
        });
      });
    });
    
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', function() {});
      });
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  return (
    <div className="relative overflow-x-hidden">
      <Header />
      <Hero />
      <Features />
      <Campaign />
      {!isAuthenticated && <Register />}
      <Footer />
    </div>
  );
};

export default Index;
