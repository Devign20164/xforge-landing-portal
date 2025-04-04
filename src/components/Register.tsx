
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Upload, Check, X } from "lucide-react";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ text: "", type: "" });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [registrationStep, setRegistrationStep] = useState("form"); // form, upload, verifying, verified, rejected
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const { toast } = useToast();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsAuthenticated(isLoggedIn);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms";
    }
    
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    setSubmitMessage({ text: "", type: "" });
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage({
        text: "Account created successfully! Please proceed with ID verification.",
        type: "success"
      });
      
      // Move to ID upload step
      setRegistrationStep("upload");
    }, 1500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      toast({
        title: "Error",
        description: "Please select a file to upload",
        variant: "destructive"
      });
      return;
    }

    setIsVerifying(true);
    setRegistrationStep("verifying");

    // Simulate verification process
    setTimeout(() => {
      setIsVerifying(false);
      
      // Simulate 80% chance of success (for demo purposes)
      const isVerified = Math.random() < 0.8;
      
      if (isVerified) {
        setRegistrationStep("verified");
        toast({
          title: "Verification Successful",
          description: "Your ID has been verified successfully.",
        });
        
        // Simulate setting the user as logged in after verification
        localStorage.setItem("isLoggedIn", "true");
        
        // This will trigger a re-render and redirect in the parent component
        setTimeout(() => {
          setIsAuthenticated(true);
        }, 2000);
      } else {
        setRegistrationStep("rejected");
        toast({
          title: "Verification Failed",
          description: "We couldn't verify your ID. Please try again with a clearer image.",
          variant: "destructive"
        });
      }
    }, 3000);
  };

  const renderIdUploadStep = () => {
    return (
      <div className="py-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center rounded-full bg-xforge-teal bg-opacity-20">
            <Upload size={32} className="text-xforge-teal" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Government ID Verification</h3>
          <p className="text-xforge-lightgray">
            Please upload a clear photo of your government-issued ID to complete your registration.
          </p>
        </div>
        
        <div className="border-2 border-dashed border-xforge-lightgray border-opacity-30 rounded-lg p-8 mb-6 text-center cursor-pointer hover:border-xforge-teal hover:border-opacity-50 transition-colors" onClick={triggerFileInput}>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          
          {selectedFile ? (
            <div>
              <div className="mb-4 text-xforge-teal">
                <Check size={40} className="mx-auto mb-2" />
                <p className="font-medium">File selected</p>
              </div>
              <p className="text-xforge-gray text-sm truncate max-w-xs mx-auto">
                {selectedFile.name}
              </p>
              <p className="text-xforge-gray text-xs mt-1">
                {(selectedFile.size / 1024).toFixed(2)} KB
              </p>
            </div>
          ) : (
            <div>
              <Upload size={40} className="mx-auto mb-2 text-xforge-gray" />
              <p className="text-xforge-gray mb-2">
                Drag & drop your ID here or 
                <span className="text-xforge-teal font-medium ml-1">browse files</span>
              </p>
              <p className="text-xforge-gray text-xs">
                Supported formats: JPG, PNG, PDF (Max 5MB)
              </p>
            </div>
          )}
        </div>
        
        <div className="flex flex-col space-y-4">
          <Button 
            onClick={handleUpload}
            className="w-full btn btn-primary"
            disabled={!selectedFile}
          >
            Upload & Verify ID
          </Button>
          
          <p className="text-center text-xs text-xforge-gray mt-4">
            We use industry-standard encryption to protect your data. 
            Your ID will only be used for verification purposes and will not be stored permanently.
          </p>
        </div>
      </div>
    );
  };

  const renderVerifyingStep = () => {
    return (
      <div className="py-8 text-center">
        <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-xforge-teal bg-opacity-20">
          <Loader2 size={32} className="text-xforge-teal animate-spin" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">Verifying Your ID</h3>
        <p className="text-xforge-lightgray mb-6">
          Please wait while our system verifies your government ID.
          This usually takes less than a minute.
        </p>
        <div className="w-full bg-xforge-dark rounded-full h-2 mb-6">
          <div className="bg-xforge-teal h-2 rounded-full animate-pulse"></div>
        </div>
        <p className="text-sm text-xforge-gray">
          Do not close or refresh this page during verification.
        </p>
      </div>
    );
  };

  const renderVerifiedStep = () => {
    return (
      <div className="py-8 text-center">
        <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-green-600 bg-opacity-20">
          <Check size={32} className="text-green-500" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Verification Successful!</h3>
        <p className="text-xforge-lightgray mb-6">
          Your ID has been verified and your account is now active. 
          You will be redirected to the dashboard in a moment.
        </p>
        <div className="w-full flex justify-center">
          <div className="w-8 h-8 border-4 border-t-xforge-teal border-r-xforge-teal border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  };

  const renderRejectedStep = () => {
    return (
      <div className="py-8 text-center">
        <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-red-600 bg-opacity-20">
          <X size={32} className="text-red-500" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Verification Failed</h3>
        <p className="text-xforge-lightgray mb-6">
          We couldn't verify your ID. This may be due to poor image quality or an unsupported ID type.
        </p>
        <div className="space-y-4">
          <Button
            onClick={() => setRegistrationStep("upload")}
            className="w-full btn btn-primary"
          >
            Try Again
          </Button>
          <p className="text-sm text-xforge-gray">
            If you continue to have issues, please contact support at support@xforge.com
          </p>
        </div>
      </div>
    );
  };

  // If user is already logged in, don't show the registration form
  if (isAuthenticated) {
    return (
      <section id="register" className="section bg-gradient-to-b from-xforge-dark to-black relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-xforge-teal blur-[120px] animate-pulse-light"></div>
        </div>
        
        <div className="container relative z-10 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold tracking-wider uppercase rounded-full bg-xforge-teal bg-opacity-20 text-xforge-teal">
              Already a Member
            </span>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl text-white">
              Welcome to <span className="text-xforge-teal">XForge</span>
            </h2>
            <p className="max-w-2xl mx-auto text-xforge-lightgray mb-8">
              You're already logged in to your XForge account. Explore our products and enjoy the exclusive benefits.
            </p>
            <Link to="/products" className="btn btn-primary">
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // Regular registration flow with multiple steps
  return (
    <section id="register" className="section bg-gradient-to-b from-xforge-dark to-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-xforge-teal blur-[120px] animate-pulse-light"></div>
      </div>
      
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold tracking-wider uppercase rounded-full bg-xforge-teal bg-opacity-20 text-xforge-teal">
              Join XForge
            </span>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl text-white">
              Create Your <span className="text-xforge-teal">Account</span>
            </h2>
            <p className="max-w-2xl mx-auto text-xforge-lightgray">
              Register for an XForge account to access exclusive benefits, track your orders, and receive personalized offers.
            </p>
          </div>

          <div className="p-8 border border-xforge-teal border-opacity-30 rounded-lg bg-black bg-opacity-40 backdrop-blur shadow-[0_0_30px_rgba(2,236,207,0.1)] animate-scale-in">
            {registrationStep === "form" && (
              <>
                {submitMessage.text && submitMessage.type === "success" ? (
                  <div className="py-8 text-center">
                    <svg className="w-16 h-16 mx-auto mb-4 text-xforge-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <h3 className="mb-4 text-2xl font-bold text-white">{submitMessage.text}</h3>
                    <p className="mb-6 text-xforge-lightgray">
                      You can now log in to your account to explore all the features and benefits.
                    </p>
                    <a href="#login" className="btn btn-primary">
                      Log In
                    </a>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-xforge-gray">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className={`input-field ${errors.name ? "border-red-500" : ""}`}
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                        {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
                      </div>
                      <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-xforge-gray">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className={`input-field ${errors.email ? "border-red-500" : ""}`}
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                      </div>
                      <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-xforge-gray">
                          Password
                        </label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          className={`input-field ${errors.password ? "border-red-500" : ""}`}
                          placeholder="Create a password"
                          value={formData.password}
                          onChange={handleChange}
                        />
                        {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password}</p>}
                      </div>
                      <div>
                        <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-xforge-gray">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          className={`input-field ${errors.confirmPassword ? "border-red-500" : ""}`}
                          placeholder="Confirm your password"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                        />
                        {errors.confirmPassword && <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>}
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="agreeTerms"
                            name="agreeTerms"
                            type="checkbox"
                            className="w-4 h-4 border border-xforge-lightgray rounded bg-xforge-dark focus:ring-xforge-teal"
                            checked={formData.agreeTerms}
                            onChange={handleChange}
                          />
                        </div>
                        <label htmlFor="agreeTerms" className="ml-2 text-sm font-medium text-xforge-gray">
                          I agree to the{" "}
                          <a href="#" className="text-xforge-teal hover:underline">
                            Terms of Service
                          </a>{" "}
                          and{" "}
                          <a href="#" className="text-xforge-teal hover:underline">
                            Privacy Policy
                          </a>
                        </label>
                      </div>
                      {errors.agreeTerms && <p className="mt-1 text-sm text-red-400">{errors.agreeTerms}</p>}
                    </div>

                    {submitMessage.text && submitMessage.type === "error" && (
                      <div className="p-3 mb-4 bg-red-900 bg-opacity-20 text-red-400 border border-red-500 border-opacity-30 rounded-md">
                        {submitMessage.text}
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full btn btn-primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg className="w-5 h-5 mr-2 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Creating Account...
                        </span>
                      ) : (
                        "Create Account"
                      )}
                    </button>

                    <div className="mt-6 text-center">
                      <p className="text-xforge-lightgray">
                        Already have an account?{" "}
                        <a href="#login" className="text-xforge-teal hover:underline">
                          Log In
                        </a>
                      </p>
                    </div>
                  </form>
                )}
              </>
            )}

            {registrationStep === "upload" && renderIdUploadStep()}
            {registrationStep === "verifying" && renderVerifyingStep()}
            {registrationStep === "verified" && renderVerifiedStep()}
            {registrationStep === "rejected" && renderRejectedStep()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
