
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Award, ChevronDown, ChevronUp, Check, Gift, Star, Sparkles, Tag, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { toast } from "sonner";
import { useNotifications } from "@/context/NotificationsContext";

const Rewards: React.FC = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>("all");
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const { toast: uiToast } = useToast();
  const { addNotification } = useNotifications();
  
  useEffect(() => {
    // Add a notification when visiting the rewards page for the first time
    const hasVisitedRewards = localStorage.getItem('visited-rewards');
    if (!hasVisitedRewards) {
      setTimeout(() => {
        addNotification({
          title: "Points Added!",
          message: "You've earned 25 points for visiting our Rewards page!",
          type: "points"
        });
        localStorage.setItem('visited-rewards', 'true');
      }, 2000);
    }
  }, [addNotification]);
  
  // User's current points (would come from a user context/state in a real app)
  const currentPoints = 325;
  
  const handleRedeemReward = (rewardName: string, pointsCost: number) => {
    if (currentPoints >= pointsCost) {
      // Success toast
      toast.success("Reward Redeemed!", {
        description: `You've successfully redeemed ${rewardName}`,
        position: "top-center"
      });
      
      // Add notification
      addNotification({
        title: "Reward Redeemed",
        message: `You've successfully redeemed ${rewardName} for ${pointsCost} points!`,
        type: "points"
      });
    } else {
      uiToast({
        title: "Not Enough Points",
        description: `You need ${pointsCost - currentPoints} more points to redeem this reward.`,
        variant: "destructive",
      });
    }
  };
  
  const toggleCategory = (category: string) => {
    if (expandedCategory === category) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(category);
    }
  };
  
  const toggleFaq = (faqId: string) => {
    if (expandedFaq === faqId) {
      setExpandedFaq(null);
    } else {
      setExpandedFaq(faqId);
    }
  };
  
  // Rewards data organized by category
  const rewardCategories = [
    {
      id: "products",
      name: "XForge Products",
      rewards: [
        { id: 1, name: "XForge Pro Device", pointsCost: 2000, image: "https://placehold.co/400x300/292929/02ECCF?text=XForge+Pro", popular: true },
        { id: 2, name: "XForge Flavor Pack", pointsCost: 500, image: "https://placehold.co/400x300/292929/02ECCF?text=Flavor+Pack", popular: false },
        { id: 3, name: "Exclusive XForge Case", pointsCost: 350, image: "https://placehold.co/400x300/292929/02ECCF?text=XForge+Case", popular: true }
      ]
    },
    {
      id: "discounts",
      name: "Discounts & Vouchers",
      rewards: [
        { id: 4, name: "15% Off Next Purchase", pointsCost: 200, image: "https://placehold.co/400x300/292929/02ECCF?text=15%+Off", popular: true },
        { id: 5, name: "Free Shipping Voucher", pointsCost: 100, image: "https://placehold.co/400x300/292929/02ECCF?text=Free+Shipping", popular: false },
        { id: 6, name: "BOGO Offer Code", pointsCost: 450, image: "https://placehold.co/400x300/292929/02ECCF?text=BOGO+Offer", popular: false }
      ]
    },
    {
      id: "merch",
      name: "XForge Merchandise",
      rewards: [
        { id: 7, name: "XForge T-Shirt", pointsCost: 300, image: "https://placehold.co/400x300/292929/02ECCF?text=XForge+Shirt", popular: false },
        { id: 8, name: "XForge Cap", pointsCost: 250, image: "https://placehold.co/400x300/292929/02ECCF?text=XForge+Cap", popular: false },
        { id: 9, name: "XForge Sticker Pack", pointsCost: 75, image: "https://placehold.co/400x300/292929/02ECCF?text=Sticker+Pack", popular: true }
      ]
    }
  ];
  
  // All rewards for the "All Rewards" view
  const allRewards = rewardCategories.flatMap(category => category.rewards);

  // Rewards history
  const rewardsHistory = [
    { id: 1, name: "XForge Sticker Pack", pointsCost: 75, date: "2023-06-05" },
    { id: 2, name: "Free Shipping Voucher", pointsCost: 100, date: "2023-05-12" }
  ];

  // FAQ items
  const faqItems = [
    {
      id: "faq-1",
      question: "How do I earn reward points?",
      answer: "You can earn points by redeeming promo codes, making purchases, referring friends, and participating in XForge events and social media campaigns."
    },
    {
      id: "faq-2",
      question: "When do my points expire?",
      answer: "XForge reward points are valid for 12 months from the date they were earned. Make sure to use them before they expire!"
    },
    {
      id: "faq-3",
      question: "How long does it take to receive my reward?",
      answer: "Digital rewards like discount codes are delivered instantly. Physical rewards typically ship within 5-7 business days."
    },
    {
      id: "faq-4",
      question: "Can I transfer my points to someone else?",
      answer: "Currently, points cannot be transferred between accounts. Each account's points can only be redeemed by that account holder."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-xforge-dark">
      <Header />
      <main className="flex-grow container mx-auto px-4 pt-32 pb-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-xforge-teal bg-opacity-20 rounded-full mb-4">
            <Award className="h-6 w-6 text-xforge-teal" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 bg-gradient-to-r from-white to-xforge-teal bg-clip-text text-transparent">
            XForge Rewards
          </h1>
          <p className="text-xforge-gray max-w-2xl mx-auto">
            Redeem your points for exclusive XForge products, discounts, and merchandise.
            The more you engage, the more you earn!
          </p>
        </div>

        {/* Points Display */}
        <div className="bg-gradient-to-r from-xforge-darkgray to-[#1e2c35] rounded-2xl p-8 max-w-4xl mx-auto mb-16 shadow-2xl border border-xforge-teal/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-white font-bold text-2xl mb-3">Your Rewards Balance</h2>
              <p className="text-xforge-gray max-w-md">
                Redeem your points for exclusive rewards and enjoy special perks as you level up your membership.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-xforge-teal/10 blur-xl rounded-full"></div>
              <div className="relative bg-gradient-to-br from-xforge-darkgray to-xforge-dark rounded-2xl p-8 text-center border border-xforge-teal/20">
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-bold text-xforge-teal">{currentPoints}</span>
                  <span className="text-white ml-2 text-xl">Points</span>
                </div>
                <div className="flex items-center justify-center mt-3 text-xforge-gray">
                  <Sparkles className="h-4 w-4 text-xforge-teal mr-2" />
                  <span>Silver Member</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Points Earning Methods */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-xforge-dark/50 p-4 rounded-xl text-center border border-xforge-teal/10 hover:border-xforge-teal/30 transition-colors">
              <div className="w-10 h-10 bg-xforge-teal/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Tag className="h-5 w-5 text-xforge-teal" />
              </div>
              <p className="text-white font-medium">Shop Products</p>
              <p className="text-xforge-gray text-sm">1 Point per $1</p>
            </div>
            <div className="bg-xforge-dark/50 p-4 rounded-xl text-center border border-xforge-teal/10 hover:border-xforge-teal/30 transition-colors">
              <div className="w-10 h-10 bg-xforge-teal/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Gift className="h-5 w-5 text-xforge-teal" />
              </div>
              <p className="text-white font-medium">Use Promo Codes</p>
              <p className="text-xforge-gray text-sm">25-100 Points</p>
            </div>
            <div className="bg-xforge-dark/50 p-4 rounded-xl text-center border border-xforge-teal/10 hover:border-xforge-teal/30 transition-colors">
              <div className="w-10 h-10 bg-xforge-teal/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Star className="h-5 w-5 text-xforge-teal" />
              </div>
              <p className="text-white font-medium">Write Reviews</p>
              <p className="text-xforge-gray text-sm">50 Points Each</p>
            </div>
            <div className="bg-xforge-dark/50 p-4 rounded-xl text-center border border-xforge-teal/10 hover:border-xforge-teal/30 transition-colors">
              <div className="w-10 h-10 bg-xforge-teal/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Clock className="h-5 w-5 text-xforge-teal" />
              </div>
              <p className="text-white font-medium">Daily Login</p>
              <p className="text-xforge-gray text-sm">5 Points/Day</p>
            </div>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="mb-10 max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button 
              className={`px-5 py-2.5 rounded-full transition-all duration-300 ${
                expandedCategory === 'all' 
                  ? 'bg-gradient-to-r from-xforge-teal to-teal-500 text-xforge-dark font-bold' 
                  : 'bg-xforge-darkgray text-xforge-gray hover:text-white'
              }`}
              onClick={() => setExpandedCategory('all')}
            >
              All Rewards
            </button>
            {rewardCategories.map(category => (
              <button 
                key={category.id}
                className={`px-5 py-2.5 rounded-full transition-all duration-300 ${
                  expandedCategory === category.id 
                    ? 'bg-gradient-to-r from-xforge-teal to-teal-500 text-xforge-dark font-bold' 
                    : 'bg-xforge-darkgray text-xforge-gray hover:text-white'
                }`}
                onClick={() => setExpandedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Rewards Display */}
        <div className="max-w-4xl mx-auto mb-16">
          {expandedCategory === 'all' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {allRewards.map(reward => (
                <div 
                  key={reward.id} 
                  className="group bg-gradient-to-br from-xforge-darkgray to-xforge-dark rounded-xl overflow-hidden shadow-xl hover:shadow-xforge-teal/20 transition-all duration-300 hover:translate-y-[-5px] border border-xforge-teal/10 hover:border-xforge-teal/30"
                >
                  <div className="relative">
                    <img 
                      src={reward.image}
                      alt={reward.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {reward.popular && (
                      <div className="absolute top-3 left-3 bg-xforge-teal text-xforge-dark text-xs font-bold px-3 py-1 rounded-full flex items-center">
                        <Sparkles className="h-3 w-3 mr-1" /> Popular
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-white font-bold text-xl mb-3 group-hover:text-xforge-teal transition-colors">{reward.name}</h3>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Gift className="h-4 w-4 text-xforge-teal mr-2" />
                        <span className="text-xforge-teal font-bold">{reward.pointsCost} Points</span>
                      </div>
                      {currentPoints >= reward.pointsCost && (
                        <span className="bg-green-800 bg-opacity-30 text-green-400 text-xs px-2 py-1 rounded-full flex items-center">
                          <Check className="h-3 w-3 mr-1" /> Available
                        </span>
                      )}
                    </div>
                    <button 
                      className={`w-full py-3 rounded-lg font-bold transition-all duration-300 ${
                        currentPoints >= reward.pointsCost 
                          ? 'bg-gradient-to-r from-xforge-teal to-teal-500 text-xforge-dark hover:brightness-110' 
                          : 'bg-xforge-dark text-xforge-gray cursor-not-allowed border border-xforge-gray/30'
                      }`}
                      onClick={() => handleRedeemReward(reward.name, reward.pointsCost)}
                    >
                      {currentPoints >= reward.pointsCost ? 'Redeem Reward' : `Need ${reward.pointsCost - currentPoints} more points`}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {rewardCategories
                .filter(category => category.id === expandedCategory)
                .map(category => (
                  <div key={category.id}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                      {category.rewards.map(reward => (
                        <div 
                          key={reward.id} 
                          className="group bg-gradient-to-br from-xforge-darkgray to-xforge-dark rounded-xl overflow-hidden shadow-xl hover:shadow-xforge-teal/20 transition-all duration-300 hover:translate-y-[-5px] border border-xforge-teal/10 hover:border-xforge-teal/30"
                        >
                          <div className="relative">
                            <img 
                              src={reward.image}
                              alt={reward.name}
                              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            {reward.popular && (
                              <div className="absolute top-3 left-3 bg-xforge-teal text-xforge-dark text-xs font-bold px-3 py-1 rounded-full flex items-center">
                                <Sparkles className="h-3 w-3 mr-1" /> Popular
                              </div>
                            )}
                          </div>
                          <div className="p-6">
                            <h3 className="text-white font-bold text-xl mb-3 group-hover:text-xforge-teal transition-colors">{reward.name}</h3>
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center">
                                <Gift className="h-4 w-4 text-xforge-teal mr-2" />
                                <span className="text-xforge-teal font-bold">{reward.pointsCost} Points</span>
                              </div>
                              {currentPoints >= reward.pointsCost && (
                                <span className="bg-green-800 bg-opacity-30 text-green-400 text-xs px-2 py-1 rounded-full flex items-center">
                                  <Check className="h-3 w-3 mr-1" /> Available
                                </span>
                              )}
                            </div>
                            <button 
                              className={`w-full py-3 rounded-lg font-bold transition-all duration-300 ${
                                currentPoints >= reward.pointsCost 
                                  ? 'bg-gradient-to-r from-xforge-teal to-teal-500 text-xforge-dark hover:brightness-110' 
                                  : 'bg-xforge-dark text-xforge-gray cursor-not-allowed border border-xforge-gray/30'
                              }`}
                              onClick={() => handleRedeemReward(reward.name, reward.pointsCost)}
                            >
                              {currentPoints >= reward.pointsCost ? 'Redeem Reward' : `Need ${reward.pointsCost - currentPoints} more points`}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>

        {/* Reward History */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 inline-block border-b-2 border-xforge-teal pb-2">
            Reward <span className="text-xforge-teal">History</span>
          </h2>
          
          {rewardsHistory.length > 0 ? (
            <div className="bg-gradient-to-br from-xforge-darkgray to-xforge-dark rounded-xl overflow-hidden shadow-lg border border-xforge-teal/10">
              <div className="p-6 border-b border-xforge-lightgray">
                <h3 className="text-white font-semibold">Recently Redeemed Rewards</h3>
              </div>
              <div className="divide-y divide-xforge-lightgray">
                {rewardsHistory.map(reward => (
                  <div key={reward.id} className="p-6 hover:bg-xforge-dark/50 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h4 className="text-white font-medium">{reward.name}</h4>
                        <div className="flex items-center text-xforge-gray text-sm mt-1">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{new Date(reward.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center bg-xforge-dark px-4 py-2 rounded-lg border border-xforge-lightgray">
                        <Gift className="h-4 w-4 text-xforge-teal mr-2" />
                        <span className="text-xforge-teal font-bold">{reward.pointsCost} Points</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-xforge-darkgray rounded-xl p-8 text-center border border-xforge-teal/10">
              <p className="text-xforge-gray">
                You haven't redeemed any rewards yet. Start using your points today!
              </p>
            </div>
          )}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mt-16">
          <h2 className="text-3xl font-bold text-white mb-8 inline-block border-b-2 border-xforge-teal pb-2">
            Frequently Asked <span className="text-xforge-teal">Questions</span>
          </h2>
          
          <div className="space-y-4">
            {faqItems.map((faq) => (
              <div key={faq.id} className="bg-gradient-to-br from-xforge-darkgray to-xforge-dark rounded-xl overflow-hidden shadow-lg border border-xforge-teal/10">
                <button
                  className="w-full p-6 flex items-center justify-between text-left transition-colors hover:bg-xforge-dark/50"
                  onClick={() => toggleFaq(faq.id)}
                >
                  <span className="text-white font-bold">{faq.question}</span>
                  {expandedFaq === faq.id ? (
                    <ChevronUp className="h-5 w-5 text-xforge-teal flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-xforge-teal flex-shrink-0" />
                  )}
                </button>
                
                {expandedFaq === faq.id && (
                  <div className="px-6 pb-6 animate-fade-in">
                    <p className="text-xforge-gray">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Rewards;
