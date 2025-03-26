
import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Percent, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PromoCodes: React.FC = () => {
  const [promoCode, setPromoCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const { toast } = useToast();

  // Mock active promo codes
  const validPromoCodes = ["XFORGE10", "SUMMER25", "WELCOME15"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!promoCode.trim()) {
      toast({
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
        toast({
          title: "Success!",
          description: "Promo code applied successfully!",
        });
      } else {
        setStatus("error");
        toast({
          title: "Invalid Code",
          description: "The promo code you entered is invalid or expired.",
          variant: "destructive",
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

  return (
    <div className="min-h-screen flex flex-col bg-xforge-dark">
      <Header />
      <main className="flex-grow container mx-auto px-4 pt-32 pb-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-xforge-teal bg-opacity-20 rounded-full mb-2">
            <Percent className="h-6 w-6 text-xforge-teal" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Promo <span className="text-xforge-teal">Codes</span>
          </h1>
          <p className="text-xforge-gray max-w-2xl mx-auto">
            Redeem your XForge promo codes to earn reward points and unlock special offers.
            Enter your code below to start earning!
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-16">
          <div className="bg-xforge-darkgray rounded-xl shadow-xl overflow-hidden">
            {status === "idle" && (
              <form onSubmit={handleSubmit} className="p-8">
                <div className="mb-6">
                  <label htmlFor="promoCode" className="block text-white font-bold mb-2">
                    Enter Your Promo Code
                  </label>
                  <input
                    type="text"
                    id="promoCode"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="e.g. XFORGE10"
                    className="w-full px-4 py-3 bg-xforge-dark border border-xforge-lightgray rounded-lg text-white focus:border-xforge-teal focus:outline-none focus:ring-1 focus:ring-xforge-teal transition-colors"
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-primary w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Validating..." : "Redeem Code"}
                </button>
                
                <p className="text-center text-xforge-gray mt-4 text-sm">
                  Find promo codes on our product packaging, social media, or during special events.
                </p>
              </form>
            )}
            
            {status === "success" && (
              <div className="p-8 text-center">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">
                  Code Successfully Redeemed!
                </h3>
                <p className="text-xforge-gray mb-6">
                  You've earned reward points with your promo code. 
                  Check your rewards page to see your updated balance.
                </p>
                <button 
                  onClick={resetForm}
                  className="btn btn-primary"
                >
                  Redeem Another Code
                </button>
              </div>
            )}
            
            {status === "error" && (
              <div className="p-8 text-center">
                <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">
                  Invalid Promo Code
                </h3>
                <p className="text-xforge-gray mb-6">
                  The promo code you entered is invalid or has expired.
                  Please check the code and try again.
                </p>
                <button 
                  onClick={resetForm}
                  className="btn btn-primary"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Recent Redemptions Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">
            Recent Redemptions
          </h2>
          
          {recentRedemptions.length > 0 ? (
            <div className="bg-xforge-darkgray rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-xforge-lightgray">
                      <th className="px-6 py-4 text-left text-xforge-gray">Code</th>
                      <th className="px-6 py-4 text-left text-xforge-gray">Points Earned</th>
                      <th className="px-6 py-4 text-left text-xforge-gray">Date Redeemed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentRedemptions.map(redemption => (
                      <tr key={redemption.id} className="border-b border-xforge-lightgray hover:bg-xforge-dark transition-colors">
                        <td className="px-6 py-4 text-white font-mono">{redemption.code}</td>
                        <td className="px-6 py-4">
                          <span className="text-xforge-teal font-bold">{redemption.points}</span> points
                        </td>
                        <td className="px-6 py-4 text-xforge-gray">
                          {new Date(redemption.date).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-xforge-darkgray rounded-xl p-8 text-center">
              <p className="text-xforge-gray">
                You haven't redeemed any promo codes yet.
              </p>
            </div>
          )}
        </div>
        
        {/* How It Works Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-bold text-white mb-8">
            How It Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-xforge-darkgray rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-xforge-teal bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xforge-teal font-bold text-xl">1</span>
              </div>
              <h3 className="text-white font-bold mb-2">Find a Promo Code</h3>
              <p className="text-xforge-gray">
                Locate promo codes on product packaging, social media, or during XForge events.
              </p>
            </div>
            
            <div className="bg-xforge-darkgray rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-xforge-teal bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xforge-teal font-bold text-xl">2</span>
              </div>
              <h3 className="text-white font-bold mb-2">Enter Your Code</h3>
              <p className="text-xforge-gray">
                Submit your promo code in the form above to validate it.
              </p>
            </div>
            
            <div className="bg-xforge-darkgray rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-xforge-teal bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xforge-teal font-bold text-xl">3</span>
              </div>
              <h3 className="text-white font-bold mb-2">Earn Rewards</h3>
              <p className="text-xforge-gray">
                Successfully redeemed codes add points to your account which can be used for rewards.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PromoCodes;
