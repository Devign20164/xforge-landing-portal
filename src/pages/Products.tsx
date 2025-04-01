
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Package, ChevronLeft, ChevronRight, Check, Star } from "lucide-react";
import { useNotifications } from "@/context/NotificationsContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Products: React.FC = () => {
  const { addNotification } = useNotifications();
  const [activeTab, setActiveTab] = useState<'device' | 'flavors' | 'accessories'>('device');
  
  useEffect(() => {
    // Add a notification when visiting the products page for the first time
    const hasVisitedProducts = localStorage.getItem('visited-products');
    if (!hasVisitedProducts) {
      setTimeout(() => {
        addNotification({
          title: "New Products Available!",
          message: "Check out our latest XForge devices and flavors.",
          type: "promotion"
        });
        localStorage.setItem('visited-products', 'true');
      }, 2000);
    }
  }, [addNotification]);
  
  const flavors = [
    { id: 1, name: "Tropical Breeze", color: "#FF9A8B", description: "A refreshing blend of pineapple, mango, and passion fruit.", rating: 4.8 },
    { id: 2, name: "Arctic Mint", color: "#8BD8FF", description: "Cool menthol with a hint of spearmint for a refreshing experience.", rating: 4.9 },
    { id: 3, name: "Berry Blast", color: "#C58BFF", description: "Rich mix of strawberry, blueberry, and raspberry flavors.", rating: 4.7 },
    { id: 4, name: "Classic Tobacco", color: "#D2A76C", description: "Traditional tobacco taste with a smooth finish.", rating: 4.5 },
    { id: 5, name: "Vanilla Dream", color: "#F5E6CA", description: "Creamy vanilla with subtle caramel undertones.", rating: 4.6 },
    { id: 6, name: "Citrus Splash", color: "#FFD28B", description: "Tangy blend of orange, lemon, and lime.", rating: 4.4 },
    { id: 7, name: "Coffee Rush", color: "#A6816C", description: "Rich espresso flavor with a hint of hazelnut.", rating: 4.7 },
    { id: 8, name: "Watermelon Chill", color: "#FF8BAB", description: "Sweet watermelon with a cooling sensation.", rating: 4.8 },
    { id: 9, name: "Grape Escape", color: "#BF8BFF", description: "Sweet and tangy grape flavor for a fruity experience.", rating: 4.5 },
    { id: 10, name: "Cinnamon Fire", color: "#FF8B8B", description: "Spicy cinnamon with a warm, lasting finish.", rating: 4.6 }
  ];
  
  const accessories = [
    { id: 1, name: "XForge Carrying Case", price: 24.99, image: "https://placehold.co/400x300/292929/02ECCF?text=XForge+Case", description: "Premium protective case for your XForge device." },
    { id: 2, name: "XForge Lanyard", price: 12.99, image: "https://placehold.co/400x300/292929/02ECCF?text=XForge+Lanyard", description: "Stylish lanyard to keep your device handy at all times." },
    { id: 3, name: "USB-C Charging Cable", price: 9.99, image: "https://placehold.co/400x300/292929/02ECCF?text=XForge+Cable", description: "Fast-charging cable designed specifically for XForge devices." },
    { id: 4, name: "XForge Skin", price: 14.99, image: "https://placehold.co/400x300/292929/02ECCF?text=XForge+Skin", description: "Customizable skins to personalize your XForge device." }
  ];
  
  const [selectedFlavor, setSelectedFlavor] = useState(flavors[0]);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="h-4 w-4 text-xforge-teal fill-xforge-teal" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} className="h-4 w-4 text-xforge-teal fill-xforge-teal/50" />);
      } else {
        stars.push(<Star key={i} className="h-4 w-4 text-xforge-gray" />);
      }
    }
    
    return stars;
  };

  return (
    <div className="min-h-screen flex flex-col bg-xforge-dark">
      <Header />
      <main className="flex-grow container mx-auto px-4 pt-32 pb-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-xforge-teal bg-opacity-20 rounded-full mb-4">
            <Package className="h-6 w-6 text-xforge-teal" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 bg-gradient-to-r from-white to-xforge-teal bg-clip-text text-transparent">
            XForge Products
          </h1>
          <p className="text-xforge-gray max-w-2xl mx-auto">
            Discover our premium line of vaping products engineered for exceptional flavor and performance.
            Experience innovation in every puff.
          </p>
        </div>

        {/* Product Navigation Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-xforge-darkgray rounded-lg p-1">
            <button 
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${activeTab === 'device' ? 'bg-xforge-teal text-xforge-dark' : 'text-xforge-gray hover:text-white'}`}
              onClick={() => setActiveTab('device')}
            >
              Device
            </button>
            <button 
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${activeTab === 'flavors' ? 'bg-xforge-teal text-xforge-dark' : 'text-xforge-gray hover:text-white'}`}
              onClick={() => setActiveTab('flavors')}
            >
              Flavors
            </button>
            <button 
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${activeTab === 'accessories' ? 'bg-xforge-teal text-xforge-dark' : 'text-xforge-gray hover:text-white'}`}
              onClick={() => setActiveTab('accessories')}
            >
              Accessories
            </button>
          </div>
        </div>

        {activeTab === 'device' && (
          <div className="bg-gradient-to-b from-xforge-darkgray to-xforge-dark rounded-2xl shadow-2xl p-8 md:p-12 mb-16 border border-xforge-teal/10">
            <h2 className="text-3xl font-bold text-white mb-8 inline-block border-b-2 border-xforge-teal pb-2">
              XForge <span className="text-xforge-teal">Pro</span> Device
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-xforge-dark to-xforge-darkgray rounded-2xl p-10 h-80 flex items-center justify-center shadow-inner border border-xforge-teal/5">
                  <div className="w-24 h-64 bg-gradient-to-b from-xforge-teal/20 to-xforge-teal/10 rounded-3xl relative shadow-lg">
                    <div className="absolute top-3 left-0 right-0 mx-auto w-16 h-3 bg-xforge-darkgray rounded-full"></div>
                    <div className="absolute bottom-6 left-0 right-0 mx-auto w-14 h-14 rounded-full border-2 border-xforge-teal flex items-center justify-center glow">
                      <span className="text-xforge-teal text-2xl font-bold">X</span>
                    </div>
                    <div className="absolute top-12 left-0 right-0 mx-auto w-16 h-24 bg-black/20 rounded-lg"></div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-xforge-dark p-4 rounded-xl text-center border border-xforge-teal/10 hover:border-xforge-teal/30 transition-colors">
                    <p className="text-xforge-teal text-2xl font-bold">3000+</p>
                    <p className="text-xforge-gray text-sm">Puffs</p>
                  </div>
                  <div className="bg-xforge-dark p-4 rounded-xl text-center border border-xforge-teal/10 hover:border-xforge-teal/30 transition-colors">
                    <p className="text-xforge-teal text-2xl font-bold">950</p>
                    <p className="text-xforge-gray text-sm">mAh</p>
                  </div>
                  <div className="bg-xforge-dark p-4 rounded-xl text-center border border-xforge-teal/10 hover:border-xforge-teal/30 transition-colors">
                    <p className="text-xforge-teal text-2xl font-bold">8ml</p>
                    <p className="text-xforge-gray text-sm">Capacity</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Premium Features</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="mt-1 mr-3 flex-shrink-0 h-5 w-5 rounded-full bg-xforge-teal/20 flex items-center justify-center">
                        <Check className="h-3 w-3 text-xforge-teal" />
                      </div>
                      <span className="text-xforge-gray">Next-gen mesh coil technology for unparalleled flavor purity</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mt-1 mr-3 flex-shrink-0 h-5 w-5 rounded-full bg-xforge-teal/20 flex items-center justify-center">
                        <Check className="h-3 w-3 text-xforge-teal" />
                      </div>
                      <span className="text-xforge-gray">Precision airflow control system for a customized experience</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mt-1 mr-3 flex-shrink-0 h-5 w-5 rounded-full bg-xforge-teal/20 flex items-center justify-center">
                        <Check className="h-3 w-3 text-xforge-teal" />
                      </div>
                      <span className="text-xforge-gray">Smart temperature regulation for consistent delivery</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mt-1 mr-3 flex-shrink-0 h-5 w-5 rounded-full bg-xforge-teal/20 flex items-center justify-center">
                        <Check className="h-3 w-3 text-xforge-teal" />
                      </div>
                      <span className="text-xforge-gray">Ultra-fast USB-C charging with battery life indicator</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mt-1 mr-3 flex-shrink-0 h-5 w-5 rounded-full bg-xforge-teal/20 flex items-center justify-center">
                        <Check className="h-3 w-3 text-xforge-teal" />
                      </div>
                      <span className="text-xforge-gray">Ergonomic design with premium soft-touch finish</span>
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="px-8 py-3 bg-gradient-to-r from-xforge-teal to-teal-500 text-xforge-dark font-bold rounded-lg hover:brightness-110 transition-all duration-300 transform hover:scale-105">
                    Pre-Order Now
                  </button>
                  <button className="px-8 py-3 bg-xforge-dark border border-xforge-teal text-xforge-teal hover:bg-xforge-teal/10 transition-all duration-300 rounded-lg font-medium">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'flavors' && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 inline-block border-b-2 border-xforge-teal pb-2">
              Premium <span className="text-xforge-teal">Flavors</span>
            </h2>
            
            <div className="mb-12">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent>
                  {flavors.map((flavor) => (
                    <CarouselItem key={flavor.id} className="md:basis-1/3 lg:basis-1/4">
                      <div 
                        className="h-56 rounded-xl p-6 cursor-pointer transition-all hover:scale-105 border border-transparent hover:border-xforge-teal/20 bg-gradient-to-br from-xforge-darkgray to-xforge-dark"
                        style={{ backgroundColor: `${flavor.color}10` }}
                        onClick={() => setSelectedFlavor(flavor)}
                      >
                        <div 
                          className="w-20 h-20 rounded-full mb-4 mx-auto shadow-lg"
                          style={{ backgroundColor: flavor.color }}
                        />
                        <h3 className="text-white text-center font-bold mb-2">{flavor.name}</h3>
                        <div className="flex justify-center">
                          {renderStars(flavor.rating)}
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-center mt-6">
                  <CarouselPrevious className="relative static -left-0 mr-2 bg-xforge-darkgray border-xforge-teal/30 text-xforge-teal hover:bg-xforge-teal hover:text-xforge-dark" />
                  <CarouselNext className="relative static -right-0 bg-xforge-darkgray border-xforge-teal/30 text-xforge-teal hover:bg-xforge-teal hover:text-xforge-dark" />
                </div>
              </Carousel>
            </div>
            
            <div 
              className="rounded-2xl p-10 transition-all duration-500 bg-gradient-to-br from-xforge-darkgray to-xforge-dark shadow-xl border border-xforge-teal/10"
              style={{ backgroundColor: `${selectedFlavor.color}05` }}
            >
              <div className="flex flex-col md:flex-row items-center gap-10">
                <div 
                  className="w-40 h-40 rounded-full shrink-0 shadow-xl glow"
                  style={{ backgroundColor: selectedFlavor.color, boxShadow: `0 0 30px ${selectedFlavor.color}40` }}
                />
                <div>
                  <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
                    <h3 className="text-3xl font-bold text-white">
                      {selectedFlavor.name}
                    </h3>
                    <div className="flex">
                      {renderStars(selectedFlavor.rating)}
                      <span className="ml-2 text-xforge-gray">{selectedFlavor.rating}/5</span>
                    </div>
                  </div>
                  <p className="text-xforge-gray text-lg mb-6">
                    {selectedFlavor.description}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button className="px-6 py-3 bg-gradient-to-r from-xforge-teal to-teal-500 text-xforge-dark font-bold rounded-lg hover:brightness-110 transition-all duration-300">
                      Add to Cart
                    </button>
                    <button className="px-6 py-3 bg-xforge-dark border border-xforge-teal text-xforge-teal hover:bg-xforge-teal/10 transition-all duration-300 rounded-lg font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'accessories' && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 inline-block border-b-2 border-xforge-teal pb-2">
              XForge <span className="text-xforge-teal">Accessories</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {accessories.map(accessory => (
                <div key={accessory.id} className="bg-gradient-to-br from-xforge-darkgray to-xforge-dark rounded-xl overflow-hidden shadow-xl hover:shadow-xforge-teal/10 transition-all duration-300 border border-xforge-teal/10 hover:border-xforge-teal/30">
                  <div className="relative">
                    <img src={accessory.image} alt={accessory.name} className="w-full h-64 object-cover" />
                    <div className="absolute top-4 right-4 bg-xforge-teal text-xforge-dark text-sm font-bold px-3 py-1 rounded-full">
                      ${accessory.price}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{accessory.name}</h3>
                    <p className="text-xforge-gray mb-4">{accessory.description}</p>
                    <button className="w-full py-3 bg-gradient-to-r from-xforge-teal to-teal-500 text-xforge-dark font-bold rounded-lg hover:brightness-110 transition-all duration-300">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-xforge-darkgray via-xforge-dark to-xforge-darkgray rounded-2xl p-10 shadow-xl border border-xforge-teal/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="col-span-2">
              <h3 className="text-2xl font-bold text-white mb-3">Sign Up for Product Alerts</h3>
              <p className="text-xforge-gray">
                Be the first to know about new product releases, limited edition flavors, and exclusive deals.
              </p>
            </div>
            <div>
              <button className="w-full py-3 bg-gradient-to-r from-xforge-teal to-teal-500 text-xforge-dark font-bold rounded-lg hover:brightness-110 transition-all duration-300">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
