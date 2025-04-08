
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { BadgePercent, CheckCircle, AlertCircle, Copy, Gift, Clock, Calendar, Tag, BadgeCheck, Zap, Sparkles, Award, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { toast } from "sonner";
import { useNotifications } from "@/context/NotificationsContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-xforge-dark to-black overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-64 h-64 rounded-full bg-xforge-teal/5 blur-3xl animate-float" style={{ animationDelay: "0s" }}></div>
        <div className="absolute top-2/3 right-1/5 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-80 h-80 rounded-full bg-pink-500/5 blur-3xl animate-float" style={{ animationDelay: "4s" }}></div>
      </div>
      
      <Header />
      <main className="flex-grow py-32">
        <div className="container px-4 mx-auto">
          {/* Hero Section with Improved Typography and Visual Hierarchy */}
          <div className="max-w-3xl mx-auto text-center mb-20">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 animate-pulse bg-xforge-teal/20 rounded-full blur-xl"></div>
                <div className="relative p-5 rounded-full bg-gradient-to-br from-xforge-teal/20 to-transparent backdrop-blur-sm border border-xforge-teal/30">
                  <Sparkles className="h-8 w-8 text-xforge-teal" />
                </div>
              </div>
            </div>
            
            <h1 className="text-5xl font-bold mb-6 relative">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/80">Exclusive</span>{" "}
              <span className="relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-xforge-teal to-cyan-400">Promo Codes</span>
                <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-xforge-teal/0 via-xforge-teal to-xforge-teal/0"></span>
              </span>
            </h1>
            
            <p className="text-xforge-gray/90 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              Unlock special rewards, earn points, and access exclusive offers with our promo codes.
              Get started today and maximize your XForge experience!
            </p>
          </div>

          {/* Featured Codes Section - Now with a premium card design */}
          <div className="max-w-7xl mx-auto mb-24">
            <div className="flex items-center mb-12">
              <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500/20 to-transparent border border-amber-500/20 mr-4">
                <Award className="h-6 w-6 text-amber-400" />
              </div>
              <h2 className="text-3xl font-bold">
                <span className="text-white">Featured</span>{" "}
                <span className="text-amber-400">Offers</span>
              </h2>
            </div>
            
            {/* Premium card design with hover effects and glassmorphism */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredCodes.map((promo, index) => (
                <div key={index} className="group h-[280px] perspective-1000">
                  <div className="relative h-full w-full transition-all duration-700 transform-style-3d group-hover:rotate-y-180 rounded-2xl">
                    {/* Card Front */}
                    <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden glass-dark backdrop-blur-md border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-6 flex flex-col justify-between bg-gradient-to-br from-[rgba(30,30,30,0.9)] to-[rgba(20,20,20,0.8)]">
                      <div>
                        <div className="mb-6 p-3 rounded-lg bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20">
                          <h3 className="text-amber-400 font-bold text-2xl">{promo.discount}</h3>
                        </div>
                        <p className="text-xforge-gray mb-4">{promo.description}</p>
                      </div>
                      
                      <div className="mt-auto">
                        <div className="flex items-center text-xs text-xforge-gray/70 justify-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>Expires: {promo.expiry}</span>
                        </div>
                        <p className="mt-4 text-white/60 text-sm">
                          <span className="inline-flex items-center">
                            <BookOpen className="h-3 w-3 mr-1" />
                            Hover to reveal code
                          </span>
                        </p>
                      </div>
                    </div>
                    
                    {/* Card Back */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl overflow-hidden bg-gradient-to-br from-xforge-teal/30 to-[rgba(20,20,20,0.9)] backdrop-blur-lg border border-xforge-teal/30 p-6 flex flex-col items-center justify-center">
                      <div className="text-center space-y-6">
                        <div className="mx-auto p-3 rounded-full bg-xforge-teal/20 border border-xforge-teal/30">
                          <BadgeCheck className="h-8 w-8 text-xforge-teal" />
                        </div>
                        
                        <div>
                          <h3 className="text-white text-xl font-bold mb-2">Your Promo Code</h3>
                          <div className="bg-xforge-dark/80 p-4 rounded-lg border border-xforge-teal/30 w-52 mx-auto mb-6">
                            <code className="text-xforge-teal font-mono font-bold text-xl tracking-widest">{promo.code}</code>
                          </div>
                        </div>
                        
                        <Button 
                          className="bg-gradient-to-r from-xforge-teal to-teal-500 text-xforge-dark hover:brightness-110 shadow-glow"
                          onClick={() => {
                            navigator.clipboard.writeText(promo.code);
                            toast.success("Code copied to clipboard!");
                          }}
                        >
                          <Copy size={16} className="mr-2" />
                          Copy Code
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Redeem Code Section - Redesigned with modern UI */}
          <div className="max-w-3xl mx-auto mb-24 relative">
            {/* Decorative lighting effects */}
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-xforge-teal/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-xforge-teal/10 rounded-full blur-3xl"></div>
            
            <Card className="backdrop-blur-lg border-white/10 bg-gradient-to-br from-[rgba(30,30,30,0.8)] to-[rgba(20,20,20,0.7)] shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-xforge-teal/0 via-xforge-teal to-xforge-teal/0"></div>
              
              {status === "idle" && (
                <form onSubmit={handleSubmit} className="p-8">
                  <CardHeader className="px-0 pt-0">
                    <div className="flex items-center mb-2">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-xforge-teal/20 to-transparent border border-xforge-teal/20 mr-4">
                        <Tag className="h-6 w-6 text-xforge-teal" />
                      </div>
                      <CardTitle className="text-2xl font-bold text-white">Redeem Your Code</CardTitle>
                    </div>
                    <CardDescription className="text-xforge-gray/80">
                      Enter your promo code below to receive exclusive rewards and bonuses
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="px-0 py-6">
                    <div className="relative">
                      <Input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Enter your promo code here..."
                        className="bg-xforge-dark/60 border-xforge-lightgray/20 focus:border-xforge-teal text-white placeholder:text-xforge-gray/60 py-6 pr-32"
                      />
                      <Button 
                        type="submit" 
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-xforge-teal to-teal-500 text-xforge-dark hover:brightness-110 transition-all shadow-glow"
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
                      </Button>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="p-0">
                    <div className="w-full flex items-center p-4 rounded-lg bg-gradient-to-r from-xforge-teal/10 to-transparent border border-xforge-teal/10">
                      <div className="bg-xforge-teal/10 rounded-full p-2 mr-3">
                        <Gift className="h-5 w-5 text-xforge-teal" />
                      </div>
                      <p className="text-xforge-gray text-sm">
                        Find exclusive promo codes on our product packaging, social media, or during special XForge events.
                      </p>
                    </div>
                  </CardFooter>
                </form>
              )}
              
              {status === "success" && (
                <div className="p-8 text-center">
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
                  <Button 
                    onClick={resetForm}
                    className="bg-gradient-to-r from-xforge-teal to-teal-500 text-xforge-dark font-bold hover:brightness-110 transition-all shadow-glow px-8 py-6"
                  >
                    Redeem Another Code
                  </Button>
                </div>
              )}
              
              {status === "error" && (
                <div className="p-8 text-center">
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
                  <Button 
                    onClick={resetForm}
                    className="bg-gradient-to-r from-xforge-teal to-teal-500 text-xforge-dark font-bold hover:brightness-110 transition-all shadow-glow px-8 py-6"
                  >
                    Try Again
                  </Button>
                </div>
              )}
            </Card>
          </div>

          {/* Recent Redemptions Section */}
          <div className="max-w-4xl mx-auto mb-24">
            <div className="flex items-center mb-12">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-transparent border border-purple-500/20 mr-4">
                <Gift className="h-6 w-6 text-purple-400" />
              </div>
              <h2 className="text-3xl font-bold">
                <span className="text-white">Recent</span>{" "}
                <span className="text-purple-400">Redemptions</span>
              </h2>
            </div>
            
            {recentRedemptions.length > 0 ? (
              <Card className="backdrop-blur-lg border-white/10 bg-gradient-to-br from-[rgba(30,30,30,0.8)] to-[rgba(20,20,20,0.7)] shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="px-6 py-4 text-left text-purple-400 font-medium">Code</th>
                        <th className="px-6 py-4 text-left text-purple-400 font-medium">Points Earned</th>
                        <th className="px-6 py-4 text-left text-purple-400 font-medium">Date Redeemed</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentRedemptions.map(redemption => (
                        <tr key={redemption.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4">
                            <span className="font-mono text-white bg-xforge-dark/60 px-3 py-1 rounded-md border border-purple-500/10">{redemption.code}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="h-6 w-6 rounded-full bg-purple-500/20 flex items-center justify-center mr-2">
                                <Gift className="h-3 w-3 text-purple-400" />
                              </div>
                              <span className="text-purple-400 font-bold">{redemption.points}</span>
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
              </Card>
            ) : (
              <Card className="backdrop-blur-lg border-white/10 bg-gradient-to-br from-[rgba(30,30,30,0.8)] to-[rgba(20,20,20,0.7)] shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-8 text-center">
                <p className="text-xforge-gray">
                  You haven't redeemed any promo codes yet.
                </p>
              </Card>
            )}
          </div>
          
          {/* How It Works Section - Visual flow with steps */}
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center mb-12">
              <div className="p-3 rounded-xl bg-gradient-to-br from-xforge-teal/20 to-transparent border border-xforge-teal/20 mr-4">
                <BadgePercent className="h-6 w-6 text-xforge-teal" />
              </div>
              <h2 className="text-3xl font-bold">
                <span className="text-white">How It</span>{" "}
                <span className="text-xforge-teal">Works</span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: 1,
                  title: "Find a Promo Code",
                  description: "Locate promo codes on product packaging, social media, or during XForge events.",
                  icon: <BookOpen className="h-6 w-6" />,
                  color: "from-purple-500/20 to-purple-500/5",
                  iconColor: "text-purple-400",
                  borderColor: "border-purple-500/20",
                  delay: "0s"
                },
                {
                  step: 2,
                  title: "Enter Your Code",
                  description: "Submit your promo code in the form above to validate it and claim your reward.",
                  icon: <Tag className="h-6 w-6" />,
                  color: "from-xforge-teal/20 to-xforge-teal/5",
                  iconColor: "text-xforge-teal",
                  borderColor: "border-xforge-teal/20",
                  delay: "0.2s"
                },
                {
                  step: 3,
                  title: "Earn Rewards",
                  description: "Successfully redeemed codes add points to your account which can be used for exclusive rewards.",
                  icon: <Gift className="h-6 w-6" />,
                  color: "from-amber-500/20 to-amber-500/5",
                  iconColor: "text-amber-400",
                  borderColor: "border-amber-500/20",
                  delay: "0.4s"
                }
              ].map((item, index) => (
                <Card 
                  key={index}
                  className={`backdrop-blur-lg bg-gradient-to-br from-[rgba(30,30,30,0.8)] to-[rgba(20,20,20,0.7)] border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-8 hover:translate-y-[-5px] transition-all duration-300 animate-float`}
                  style={{ animationDelay: item.delay }}
                >
                  <div className="text-center">
                    <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br ${item.color} ${item.borderColor} border flex items-center justify-center`}>
                      <span className={`${item.iconColor} font-bold text-2xl`}>{item.step}</span>
                    </div>
                    <h3 className="text-white font-bold text-xl mb-3">{item.title}</h3>
                    <p className="text-xforge-gray">
                      {item.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PromoCodes;
