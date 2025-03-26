
import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Award, ChevronDown, ChevronUp, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Rewards: React.FC = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>("all");
  const { toast } = useToast();
  
  // User's current points (would come from a user context/state in a real app)
  const currentPoints = 325;
  
  const handleRedeemReward = (rewardName: string, pointsCost: number) => {
    if (currentPoints >= pointsCost) {
      toast({
        title: "Reward Redeemed!",
        description: `You've successfully redeemed ${rewardName}`,
      });
    } else {
      toast({
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
  
  // Rewards data organized by category
  const rewardCategories = [
    {
      id: "products",
      name: "XForge Products",
      rewards: [
        { id: 1, name: "XForge Device", pointsCost: 2000, image: "https://placehold.co/400x300/292929/02ECCF?text=XForge+Device" },
        { id: 2, name: "XForge Flavor Pack", pointsCost: 500, image: "https://placehold.co/400x300/292929/02ECCF?text=Flavor+Pack" },
        { id: 3, name: "Exclusive XForge Case", pointsCost: 350, image: "https://placehold.co/400x300/292929/02ECCF?text=XForge+Case" }
      ]
    },
    {
      id: "discounts",
      name: "Discounts & Vouchers",
      rewards: [
        { id: 4, name: "15% Off Next Purchase", pointsCost: 200, image: "https://placehold.co/400x300/292929/02ECCF?text=15%+Off" },
        { id: 5, name: "Free Shipping Voucher", pointsCost: 100, image: "https://placehold.co/400x300/292929/02ECCF?text=Free+Shipping" },
        { id: 6, name: "BOGO Offer Code", pointsCost: 450, image: "https://placehold.co/400x300/292929/02ECCF?text=BOGO+Offer" }
      ]
    },
    {
      id: "merch",
      name: "XForge Merchandise",
      rewards: [
        { id: 7, name: "XForge T-Shirt", pointsCost: 300, image: "https://placehold.co/400x300/292929/02ECCF?text=XForge+Shirt" },
        { id: 8, name: "XForge Cap", pointsCost: 250, image: "https://placehold.co/400x300/292929/02ECCF?text=XForge+Cap" },
        { id: 9, name: "XForge Sticker Pack", pointsCost: 75, image: "https://placehold.co/400x300/292929/02ECCF?text=Sticker+Pack" }
      ]
    }
  ];
  
  // All rewards for the "All Rewards" view
  const allRewards = rewardCategories.flatMap(category => category.rewards);

  return (
    <div className="min-h-screen flex flex-col bg-xforge-dark">
      <Header />
      <main className="flex-grow container mx-auto px-4 pt-32 pb-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-xforge-teal bg-opacity-20 rounded-full mb-2">
            <Award className="h-6 w-6 text-xforge-teal" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-xforge-teal">X</span>Forge Rewards
          </h1>
          <p className="text-xforge-gray max-w-2xl mx-auto">
            Redeem your points for exclusive XForge products, discounts, and merchandise.
            The more you engage, the more you earn!
          </p>
        </div>

        {/* Points Display */}
        <div className="bg-gradient-to-r from-xforge-darkgray to-xforge-dark rounded-xl p-6 md:p-8 max-w-4xl mx-auto mb-12 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-white font-bold text-xl mb-2">Your Current Balance</h2>
              <p className="text-xforge-gray">Redeem points for exclusive rewards and discounts</p>
            </div>
            <div className="bg-xforge-dark rounded-xl p-6 text-center">
              <span className="text-4xl font-bold text-xforge-teal">{currentPoints}</span>
              <span className="text-white ml-2">Points</span>
            </div>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="mb-8 max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button 
              className={`px-4 py-2 rounded-full ${expandedCategory === 'all' ? 'bg-xforge-teal text-xforge-dark font-bold' : 'bg-xforge-darkgray text-xforge-gray'}`}
              onClick={() => setExpandedCategory('all')}
            >
              All Rewards
            </button>
            {rewardCategories.map(category => (
              <button 
                key={category.id}
                className={`px-4 py-2 rounded-full ${expandedCategory === category.id ? 'bg-xforge-teal text-xforge-dark font-bold' : 'bg-xforge-darkgray text-xforge-gray'}`}
                onClick={() => setExpandedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Rewards Display */}
        <div className="max-w-4xl mx-auto">
          {expandedCategory === 'all' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allRewards.map(reward => (
                <div key={reward.id} className="bg-xforge-darkgray rounded-xl overflow-hidden shadow-lg">
                  <img 
                    src={reward.image}
                    alt={reward.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-white font-bold text-xl mb-2">{reward.name}</h3>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xforge-teal font-bold">{reward.pointsCost} Points</span>
                      {currentPoints >= reward.pointsCost && (
                        <span className="bg-green-800 bg-opacity-30 text-green-400 text-xs px-2 py-1 rounded-full flex items-center">
                          <Check className="h-3 w-3 mr-1" /> Available
                        </span>
                      )}
                    </div>
                    <button 
                      className={`w-full py-2 rounded-lg font-bold ${
                        currentPoints >= reward.pointsCost 
                          ? 'bg-xforge-teal text-xforge-dark hover:bg-opacity-90'
                          : 'bg-xforge-dark text-xforge-gray cursor-not-allowed'
                      }`}
                      onClick={() => handleRedeemReward(reward.name, reward.pointsCost)}
                    >
                      Redeem Reward
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {category.rewards.map(reward => (
                        <div key={reward.id} className="bg-xforge-darkgray rounded-xl overflow-hidden shadow-lg">
                          <img 
                            src={reward.image}
                            alt={reward.name}
                            className="w-full h-48 object-cover"
                          />
                          <div className="p-6">
                            <h3 className="text-white font-bold text-xl mb-2">{reward.name}</h3>
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-xforge-teal font-bold">{reward.pointsCost} Points</span>
                              {currentPoints >= reward.pointsCost && (
                                <span className="bg-green-800 bg-opacity-30 text-green-400 text-xs px-2 py-1 rounded-full flex items-center">
                                  <Check className="h-3 w-3 mr-1" /> Available
                                </span>
                              )}
                            </div>
                            <button 
                              className={`w-full py-2 rounded-lg font-bold ${
                                currentPoints >= reward.pointsCost 
                                  ? 'bg-xforge-teal text-xforge-dark hover:bg-opacity-90'
                                  : 'bg-xforge-dark text-xforge-gray cursor-not-allowed'
                              }`}
                              onClick={() => handleRedeemReward(reward.name, reward.pointsCost)}
                            >
                              Redeem Reward
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

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mt-16">
          <h2 className="text-2xl font-bold text-white mb-8">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4">
            {[
              {
                question: "How do I earn reward points?",
                answer: "You can earn points by redeeming promo codes, making purchases, referring friends, and participating in XForge events and social media campaigns."
              },
              {
                question: "When do my points expire?",
                answer: "XForge reward points are valid for 12 months from the date they were earned. Make sure to use them before they expire!"
              },
              {
                question: "How long does it take to receive my reward?",
                answer: "Digital rewards like discount codes are delivered instantly. Physical rewards typically ship within 5-7 business days."
              },
              {
                question: "Can I transfer my points to someone else?",
                answer: "Currently, points cannot be transferred between accounts. Each account's points can only be redeemed by that account holder."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-xforge-darkgray rounded-xl overflow-hidden">
                <button
                  className="w-full p-6 flex items-center justify-between text-left"
                  onClick={() => toggleCategory(`faq-${index}`)}
                >
                  <span className="text-white font-bold">{faq.question}</span>
                  {expandedCategory === `faq-${index}` ? (
                    <ChevronUp className="h-5 w-5 text-xforge-teal flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-xforge-teal flex-shrink-0" />
                  )}
                </button>
                
                {expandedCategory === `faq-${index}` && (
                  <div className="px-6 pb-6">
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
