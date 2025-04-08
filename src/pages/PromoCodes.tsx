
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { BadgePercent, CheckCircle, AlertCircle, Copy, Gift, Clock, Calendar, Tag, BadgeCheck, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { toast } from "sonner";
import { useNotifications } from "@/context/NotificationsContext";

const PromoCodes: React.FC = () => {
  const [promoCode, setPromoCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const { toast: uiToast } = useToast();
  const { addNotification } = useNotifications();

  useEffect(() => {
    // Add a notification when visiting the promo codes page for the first time
    const hasVisitedPromos = localStorage.getItem('visited-promos');
    if (!hasVisitedPromos) {
      setTimeout(() => {
        addNotification({
          title: "New Promo Code Available!",
          message: "Use XFORGE25 for 25% off your next purchase!",
          type: "promotion"
        });
        localStorage.setItem('visited-promos', 'true');
      }, 2000);
    }
  }, [addNotification]);

  // Mock active promo codes
  const validPromoCodes = ["XFORGE10", "SUMMER25", "WELCOME15", "XFORGE25"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!promoCode.trim()) {
      uiToast({
        title: "Error",
        description: "Please enter a promo code",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      if (validPromoCodes.includes(promoCode.toUpperCase())) {
        setStatus("success");
        
        // Show toast
        toast.success("Promo code applied successfully!", {
          description: "Points have been added to your account!",
          position: "top-center",
        });
        
        // Add notification
        addNotification({
          title: "Promo Code Redeemed",
          message: `You've successfully redeemed ${promoCode.toUpperCase()} for 250 points!`,
          type: "points"
        });
      } else {
        setStatus("error");
        toast.error("Invalid code", {
          description: "The promo code you entered is invalid or expired.",
          position: "top-center",
        });
      }
      setIsSubmitting(false);
    }, 1500);
  };

  // Reset form when changing status back to idle
  const resetForm = () => {
    setPromoCode("");
    setStatus("idle");
  };

  // Recent promo redemptions
  const recentRedemptions = [
    { id: 1, code: "SUMMER25", points: 250, date: "2023-06-10" },
    { id: 2, code: "XFORGE10", points: 100, date: "2023-05-22" }
  ];

  // Featured promo codes
  const featuredCodes = [
    { code: "XFORGE25", discount: "25% OFF", expiry: "July 30, 2023", description: "25% off your next purchase" },
    { code: "POINTS100", discount: "100 POINTS", expiry: "August 15, 2023", description: "Get 100 bonus points with any purchase" },
    { code: "FREESHIP", discount: "FREE SHIPPING", expiry: "Limited time", description: "Free shipping on orders over $50" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-xforge-dark overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-xforge-teal/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 right-0 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -z-10"></div>
      
      <Header />
      <main className="flex-grow container mx-auto px-4 pt-32 pb-16 relative">
        {/* Hero Section */}
        <div className="text-center mb-16 relative">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-xforge-teal/30 to-xforge-teal/10 backdrop-blur-md rounded-full mb-6 shadow-xl border border-xforge-teal/20 animate-pulse-light">
            <BadgePercent className="h-8 w-8 text-xforge-teal" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-xforge-teal to-cyan-400 animate-fade-in">
            Exclusive Promo Codes
          </h1>
          <p className="text-xforge-gray max-w-2xl mx-auto text-lg leading-relaxed mb-8 animate-fade-in">
            Unlock special rewards, earn points, and access exclusive offers with our promo codes.
            Get started today and maximize your XForge experience!
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-xforge-teal via-teal-400 to-xforge-teal mx-auto rounded-full"></div>
        </div>

        {/* Featured Promo Cards - Updated with card flip design */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="flex items-center mb-8">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-xforge-teal to-cyan-400 flex items-center justify-center shadow-glow mr-3">
              <Zap className="h-5 w-5 text-xforge-dark" />
            </div>
            <h2 className="text-3xl font-bold text-white">
              Featured <span className="text-xforge-teal">Offers</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCodes.map((promo, index) => (
              <div key={index} className="perspective-1000 h-64 group">
                <div className="relative h-full w-full transform-style-3d transition-all duration-500 group-hover:rotate-y-180">
                  {/* Front of card */}
                  <div className="absolute h-full w-full backface-hidden rounded-xl overflow-hidden glass-dark border border-xforge-teal/30 shadow-xl bg-gradient-to-br from-xforge-darkgray/90 to-xforge-dark/95 p-6 flex flex-col justify-between">
                    <div className="bg-xforge-teal/20 rounded-lg p-4 text-center mb-4">
                      <h3 className="text-xforge-teal font-bold text-2xl mb-1">{promo.discount}</h3>
                      <div className="inline-flex items-center justify-center bg-xforge-dark/40 px-3 py-1 rounded-full">
                        <Calendar className="h-3 w-3 text-xforge-gray mr-1" />
                        <span className="text-xforge-gray text-xs">Expires: {promo.expiry}</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-xforge-gray mb-4">{promo.description}</p>
                      <div className="text-sm text-xforge-gray">Hover to reveal code</div>
                    </div>
                  </div>
                  
                  {/* Back of card */}
                  <div className="absolute h-full w-full backface-hidden rotate-y-180 rounded-xl glass-teal border border-xforge-teal shadow-glow flex flex-col items-center justify-center">
                    <div className="text-center mb-4">
                      <BadgeCheck className="h-10 w-10 text-xforge-teal mx-auto mb-2" />
                      <h3 className="text-white text-xl font-bold">Your Promo Code</h3>
                    </div>
                    <div className="bg-xforge-dark/80 p-3 rounded-lg border border-xforge-teal/30 w-3/4 text-center mb-4">
                      <code className="text-xforge-teal font-mono font-bold text-xl">{promo.code}</code>
                    </div>
                    <button 
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-xforge-teal to-teal-500 rounded-full text-xforge-dark font-bold hover:brightness-110 transition-all shadow-glow"
                      onClick={() => {
                        navigator.clipboard.writeText(promo.code);
                        toast.success("Code copied to clipboard!");
                      }}
                    >
                      <Copy size={16} />
                      Copy Code
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Redeem Code Section */}
        <div className="max-w-3xl mx-auto mb-20">
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-20 h-20 bg-gradient-to-br from-xforge-teal/20 to-transparent rounded-full blur-xl"></div>
            <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-gradient-to-br from-xforge-teal/20 to-transparent rounded-full blur-xl"></div>
            
            <div className="relative glass-dark border border-xforge-teal/20 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-lg">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-xforge-teal via-teal-400 to-xforge-teal"></div>
              
              {status === "idle" && (
                <form onSubmit={handleSubmit} className="p-10">
                  <div className="flex items-center mb-8">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-xforge-teal/20 to-transparent flex items-center justify-center mr-3">
                      <Tag className="h-6 w-6 text-xforge-teal" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Redeem Your Code</h3>
                  </div>
                  
                  <div className="mb-8">
                    <div className="relative">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Enter your promo code here..."
                        className="w-full px-5 py-4 bg-xforge-dark/80 border-2 border-xforge-lightgray/20 focus:border-xforge-teal rounded-xl text-white text-lg focus:outline-none transition-colors placeholder:text-xforge-gray/60"
                      />
                      <button 
                        type="submit" 
                        className={`absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-xforge-teal to-teal-500 text-xforge-dark font-bold rounded-lg hover:brightness-110 transition-all shadow-glow ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-xforge-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Validating
                          </span>
                        ) : "Redeem"}
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center bg-xforge-teal/5 border border-xforge-teal/10 rounded-lg p-4">
                    <div className="bg-xforge-teal/10 rounded-full p-2 mr-3">
                      <Gift className="h-5 w-5 text-xforge-teal" />
                    </div>
                    <p className="text-xforge-gray text-sm">
                      Find exclusive promo codes on our product packaging, social media, or during special XForge events.
                    </p>
                  </div>
                </form>
              )}
              
              {status === "success" && (
                <div className="p-10 text-center">
                  <div className="w-24 h-24 mx-auto mb-6 relative">
                    <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping"></div>
                    <div className="relative w-full h-full bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-12 w-12 text-green-500" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">
                    Code Successfully Redeemed!
                  </h3>
                  <p className="text-xforge-gray mb-8 max-w-md mx-auto">
                    You've earned 250 reward points with your promo code. 
                    Check your rewards page to see your updated balance.
                  </p>
                  <button 
                    onClick={resetForm}
                    className="px-8 py-3 bg-gradient-to-r from-xforge-teal to-teal-500 text-xforge-dark font-bold rounded-lg hover:brightness-110 transition-all duration-300 shadow-glow"
                  >
                    Redeem Another Code
                  </button>
                </div>
              )}
              
              {status === "error" && (
                <div className="p-10 text-center">
                  <div className="w-24 h-24 mx-auto mb-6 relative">
                    <div className="absolute inset-0 bg-red-500/20 rounded-full animate-pulse"></div>
                    <div className="relative w-full h-full bg-gradient-to-br from-red-500/20 to-red-500/10 rounded-full flex items-center justify-center">
                      <AlertCircle className="h-12 w-12 text-red-500" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">
                    Invalid Promo Code
                  </h3>
                  <p className="text-xforge-gray mb-8 max-w-md mx-auto">
                    The promo code you entered is invalid or has expired.
                    Please check the code and try again.
                  </p>
                  <button 
                    onClick={resetForm}
                    className="px-8 py-3 bg-gradient-to-r from-xforge-teal to-teal-500 text-xforge-dark font-bold rounded-lg hover:brightness-110 transition-all duration-300 shadow-glow"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recent Redemptions Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="flex items-center mb-8">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-md mr-3">
              <Gift className="h-5 w-5 text-xforge-dark" />
            </div>
            <h2 className="text-3xl font-bold text-white">
              Recent <span className="text-amber-400">Redemptions</span>
            </h2>
          </div>
          
          {recentRedemptions.length > 0 ? (
            <div className="glass-dark backdrop-blur-md rounded-xl overflow-hidden shadow-2xl border border-xforge-teal/10">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-xforge-lightgray/20">
                      <th className="px-6 py-4 text-left text-xforge-teal">Code</th>
                      <th className="px-6 py-4 text-left text-xforge-teal">Points Earned</th>
                      <th className="px-6 py-4 text-left text-xforge-teal">Date Redeemed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentRedemptions.map(redemption => (
                      <tr key={redemption.id} className="border-b border-xforge-lightgray/10 hover:bg-xforge-dark/50 transition-colors">
                        <td className="px-6 py-4">
                          <span className="font-mono text-white bg-xforge-dark/80 px-3 py-1 rounded-md border border-xforge-teal/10">{redemption.code}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="h-6 w-6 rounded-full bg-amber-500/20 flex items-center justify-center mr-2">
                              <Gift className="h-3 w-3 text-amber-400" />
                            </div>
                            <span className="text-amber-400 font-bold">{redemption.points}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center text-xforge-gray">
                            <Clock className="h-4 w-4 mr-2" />
                            {new Date(redemption.date).toLocaleDateString()}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="glass-dark rounded-xl p-8 text-center border border-xforge-teal/10 shadow-lg">
              <p className="text-xforge-gray">
                You haven't redeemed any promo codes yet.
              </p>
            </div>
          )}
        </div>
        
        {/* How It Works Section */}
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center mb-10">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500/50 to-pink-500/50 flex items-center justify-center shadow-md mr-3">
              <BadgePercent className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white">
              How It <span className="text-purple-400">Works</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: "Find a Promo Code",
                description: "Locate promo codes on product packaging, social media, or during XForge events.",
                color: "from-purple-500/20 to-purple-600/5",
                textColor: "text-purple-400"
              },
              {
                step: 2,
                title: "Enter Your Code",
                description: "Submit your promo code in the form above to validate it and claim your reward.",
                color: "from-xforge-teal/20 to-teal-600/5",
                textColor: "text-xforge-teal"
              },
              {
                step: 3,
                title: "Earn Rewards",
                description: "Successfully redeemed codes add points to your account which can be used for exclusive rewards.",
                color: "from-amber-500/20 to-amber-600/5",
                textColor: "text-amber-400"
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className="glass-dark rounded-xl p-8 text-center shadow-lg border border-xforge-teal/10 hover:border-xforge-teal/30 transition-all duration-300 group card-3d animate-float"
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-glow transition-all duration-500`}>
                  <span className={`${item.textColor} font-bold text-2xl`}>{item.step}</span>
                </div>
                <h3 className="text-white font-bold text-xl mb-3">{item.title}</h3>
                <p className="text-xforge-gray">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PromoCodes;
