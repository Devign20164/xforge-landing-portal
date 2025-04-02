
import React, { useState, useEffect } from "react";
import { Bell, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNotifications } from "@/context/NotificationsContext";
import NotificationsDropdown from "./NotificationsDropdown";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [points, setPoints] = useState(325);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const { unreadCount } = useNotifications();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsAuthenticated(isLoggedIn);
    };

    window.addEventListener("scroll", handleScroll);
    checkAuth();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openLoginModal = (e) => {
    e.preventDefault();
    setIsLoginModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsAuthenticated(false);
  };

  const toggleNotifications = (e) => {
    e.stopPropagation();
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  useEffect(() => {
    const handleClickOutside = () => {
      if (isNotificationsOpen) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isNotificationsOpen]);

  const getNavItems = () => {
    if (isAuthenticated) {
      return [
        { name: "Home", href: "/" },
        { name: "Products", href: "/products" },
        { name: "News", href: "/news" },
        { name: "Promo Codes", href: "/promocodes" },
        { name: "Rewards", href: "/rewards" },
      ];
    } else {
      return [
        { name: "Home", href: "/" },
        { name: "Features", href: "/#features" },
        { name: "Campaign", href: "/#campaign" },
        { name: "Register", href: "/#register" },
      ];
    }
  };

  const navItems = getNavItems();

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "py-3 bg-xforge-dark bg-opacity-80 backdrop-blur shadow-md" 
            : "py-5 bg-transparent"
        }`}
      >
        <div className="container flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-white">
              <span className="text-xforge-teal">X</span>Forge
            </Link>
          </div>

          <nav className="hidden space-x-8 md:flex">
            {navItems.map((item) => (
              <Link key={item.name} to={item.href} className="nav-link">
                {item.name}
              </Link>
            ))}
            
            {isAuthenticated && (
              <span className="nav-link">
                <span className="text-xforge-teal">{points}</span> Points
              </span>
            )}
          </nav>

          <div className="hidden space-x-4 md:flex items-center">
            {isAuthenticated ? (
              <>
                <div className="relative" onClick={toggleNotifications}>
                  <button 
                    className="p-2 text-xforge-gray hover:text-xforge-teal transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Bell size={20} />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-xforge-teal text-xforge-dark text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                  <NotificationsDropdown 
                    isOpen={isNotificationsOpen}
                    onClose={() => setIsNotificationsOpen(false)}
                  />
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger className="btn btn-outline flex items-center">
                    My Account <ChevronDown size={16} className="ml-1" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-xforge-dark border border-xforge-lightgray text-xforge-gray">
                    <DropdownMenuItem className="cursor-pointer hover:text-xforge-teal">
                      <Link to="/account" className="w-full">Account Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer hover:text-xforge-teal">
                      <Link to="#rewards-history" className="w-full">Rewards History</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer hover:text-xforge-teal">
                      <Link to="#points-history" className="w-full">Points History</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-xforge-lightgray" />
                    <DropdownMenuItem 
                      className="cursor-pointer text-destructive hover:text-destructive/90"
                      onClick={handleLogout}
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <a href="#login" className="btn btn-outline" onClick={openLoginModal}>Login</a>
                <Link to="/#register" className="btn btn-primary">Sign Up</Link>
              </>
            )}
          </div>

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

        <div 
          className={`fixed inset-0 z-40 flex flex-col pt-24 pb-8 md:hidden bg-xforge-dark bg-opacity-95 backdrop-blur transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <nav className="flex flex-col items-center space-y-6 text-lg">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="nav-link" 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            {isAuthenticated && (
              <span className="nav-link">
                <span className="text-xforge-teal">{points}</span> Points
              </span>
            )}
          </nav>
          
          <div className="flex flex-col items-center mt-10 space-y-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-4">
                  <button 
                    className="relative p-2 text-xforge-gray hover:text-xforge-teal transition-colors"
                    onClick={toggleNotifications}
                  >
                    <Bell size={24} />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-xforge-teal text-xforge-dark text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                  
                  <Link to="/account" className="btn btn-outline w-44 text-center">
                    Account Settings
                  </Link>
                </div>
                <button 
                  onClick={handleLogout}
                  className="btn btn-primary w-44 text-center"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <a href="#login" className="btn btn-outline w-44 text-center" onClick={openLoginModal}>Login</a>
                <Link to="/#register" className="btn btn-primary w-44 text-center" onClick={() => setIsMobileMenuOpen(false)}>Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </header>

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={() => setIsAuthenticated(true)}
      />
    </>
  );
};

export default Header;
