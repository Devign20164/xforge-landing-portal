
import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 border-t border-xforge-teal border-opacity-20 bg-xforge-dark">
      <div className="container">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1 md:col-span-1">
            <div className="mb-6">
              <a href="#" className="text-2xl font-bold text-white">
                <span className="text-xforge-teal">X</span>Forge
              </a>
            </div>
            <p className="mb-6 text-xforge-lightgray">
              Experience the future of vaping with our premium devices and flavors.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-xforge-gray hover:text-xforge-teal transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </a>
              <a href="#" className="text-xforge-gray hover:text-xforge-teal transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="#" className="text-xforge-gray hover:text-xforge-teal transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.016 10.016 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
                </svg>
              </a>
              <a href="#" className="text-xforge-gray hover:text-xforge-teal transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="mb-6 text-lg font-bold text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#home" className="text-xforge-lightgray hover:text-xforge-teal transition-colors">Home</a></li>
              <li><a href="#features" className="text-xforge-lightgray hover:text-xforge-teal transition-colors">Features</a></li>
              <li><a href="#campaign" className="text-xforge-lightgray hover:text-xforge-teal transition-colors">Campaign</a></li>
              <li><a href="#register" className="text-xforge-lightgray hover:text-xforge-teal transition-colors">Register</a></li>
              <li><a href="#" className="text-xforge-lightgray hover:text-xforge-teal transition-colors">Shop</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-6 text-lg font-bold text-white">Support</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-xforge-lightgray hover:text-xforge-teal transition-colors">FAQ</a></li>
              <li><a href="#" className="text-xforge-lightgray hover:text-xforge-teal transition-colors">Shipping</a></li>
              <li><a href="#" className="text-xforge-lightgray hover:text-xforge-teal transition-colors">Returns</a></li>
              <li><a href="#" className="text-xforge-lightgray hover:text-xforge-teal transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-xforge-lightgray hover:text-xforge-teal transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-6 text-lg font-bold text-white">Newsletter</h3>
            <p className="mb-4 text-xforge-lightgray">Subscribe to receive updates and exclusive offers.</p>
            <form className="mb-4">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-2 bg-opacity-20 border-t border-b border-l rounded-l-md outline-none bg-xforge-dark border-xforge-lightgray focus:border-xforge-teal transition-all duration-300"
                />
                <button type="submit" className="px-4 py-2 rounded-r-md bg-xforge-teal text-xforge-dark font-medium hover:brightness-110 transition-all duration-300">
                  Subscribe
                </button>
              </div>
            </form>
            <p className="text-sm text-xforge-lightgray">
              We'll never share your email with anyone else.
            </p>
          </div>
        </div>
        
        <div className="pt-8 mt-8 text-center border-t border-xforge-teal border-opacity-20">
          <p className="text-sm text-xforge-lightgray">
            &copy; {currentYear} XForge. All rights reserved. For adults 21+ only. 
          </p>
          <p className="mt-2 text-xs text-xforge-gray">
            WARNING: This product contains nicotine. Nicotine is an addictive chemical.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
