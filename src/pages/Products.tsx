
import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Package } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Products: React.FC = () => {
  const flavors = [
    { id: 1, name: "Tropical Breeze", color: "#FF9A8B", description: "A refreshing blend of pineapple, mango, and passion fruit." },
    { id: 2, name: "Arctic Mint", color: "#8BD8FF", description: "Cool menthol with a hint of spearmint for a refreshing experience." },
    { id: 3, name: "Berry Blast", color: "#C58BFF", description: "Rich mix of strawberry, blueberry, and raspberry flavors." },
    { id: 4, name: "Classic Tobacco", color: "#D2A76C", description: "Traditional tobacco taste with a smooth finish." },
    { id: 5, name: "Vanilla Dream", color: "#F5E6CA", description: "Creamy vanilla with subtle caramel undertones." },
    { id: 6, name: "Citrus Splash", color: "#FFD28B", description: "Tangy blend of orange, lemon, and lime." },
    { id: 7, name: "Coffee Rush", color: "#A6816C", description: "Rich espresso flavor with a hint of hazelnut." },
    { id: 8, name: "Watermelon Chill", color: "#FF8BAB", description: "Sweet watermelon with a cooling sensation." },
    { id: 9, name: "Grape Escape", color: "#BF8BFF", description: "Sweet and tangy grape flavor for a fruity experience." },
    { id: 10, name: "Cinnamon Fire", color: "#FF8B8B", description: "Spicy cinnamon with a warm, lasting finish." }
  ];
  
  const [selectedFlavor, setSelectedFlavor] = useState(flavors[0]);

  return (
    <div className="min-h-screen flex flex-col bg-xforge-dark">
      <Header />
      <main className="flex-grow container mx-auto px-4 pt-32 pb-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-xforge-teal bg-opacity-20 rounded-full mb-2">
            <Package className="h-6 w-6 text-xforge-teal" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-xforge-teal">X</span>Forge Products
          </h1>
          <p className="text-xforge-gray max-w-2xl mx-auto">
            Discover our premium vape lineup with innovative technology and exceptional flavors.
            Experience vaping redefined with XForge.
          </p>
        </div>

        <div className="bg-xforge-darkgray rounded-xl shadow-xl p-6 md:p-10 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            <span className="text-xforge-teal">X</span>Forge Device
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-xforge-darkgray to-xforge-lightgray rounded-xl p-8 h-64 flex items-center justify-center">
                <div className="w-24 h-64 bg-xforge-teal bg-opacity-20 rounded-3xl relative">
                  <div className="absolute top-3 left-0 right-0 mx-auto w-16 h-3 bg-xforge-darkgray rounded-full"></div>
                  <div className="absolute bottom-6 left-0 right-0 mx-auto w-10 h-10 rounded-full border-2 border-xforge-teal flex items-center justify-center">
                    <span className="text-xforge-teal text-xl font-bold">X</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-xforge-dark p-3 rounded-lg text-center">
                  <p className="text-xforge-teal text-xl font-bold">2500</p>
                  <p className="text-xforge-gray text-sm">Puffs</p>
                </div>
                <div className="bg-xforge-dark p-3 rounded-lg text-center">
                  <p className="text-xforge-teal text-xl font-bold">850</p>
                  <p className="text-xforge-gray text-sm">mAh</p>
                </div>
                <div className="bg-xforge-dark p-3 rounded-lg text-center">
                  <p className="text-xforge-teal text-xl font-bold">6ml</p>
                  <p className="text-xforge-gray text-sm">Capacity</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Features</h3>
              <ul className="space-y-3 text-xforge-gray">
                <li className="flex items-start">
                  <span className="text-xforge-teal mr-2">•</span>
                  <span>Advanced mesh coil technology for pure flavor</span>
                </li>
                <li className="flex items-start">
                  <span className="text-xforge-teal mr-2">•</span>
                  <span>Adjustable airflow for customized experience</span>
                </li>
                <li className="flex items-start">
                  <span className="text-xforge-teal mr-2">•</span>
                  <span>Intelligent temperature control system</span>
                </li>
                <li className="flex items-start">
                  <span className="text-xforge-teal mr-2">•</span>
                  <span>Quick-charge USB-C port</span>
                </li>
                <li className="flex items-start">
                  <span className="text-xforge-teal mr-2">•</span>
                  <span>Sleek and ergonomic design</span>
                </li>
              </ul>
              <button className="btn btn-primary mt-4">
                Learn More
              </button>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-8">
            <span className="text-xforge-teal">10</span> Premium Flavors
          </h2>
          
          <div className="mb-8">
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
                      className="h-48 rounded-xl p-6 cursor-pointer transition-all hover:scale-105"
                      style={{ backgroundColor: `${flavor.color}20` }}
                      onClick={() => setSelectedFlavor(flavor)}
                    >
                      <div 
                        className="w-16 h-16 rounded-full mb-4 mx-auto"
                        style={{ backgroundColor: flavor.color }}
                      />
                      <h3 className="text-white text-center font-bold">{flavor.name}</h3>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-4">
                <CarouselPrevious className="relative static -left-0 mr-2" />
                <CarouselNext className="relative static -right-0" />
              </div>
            </Carousel>
          </div>
          
          <div 
            className="rounded-xl p-8 transition-all duration-500"
            style={{ backgroundColor: `${selectedFlavor.color}20` }}
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div 
                className="w-32 h-32 rounded-full shrink-0"
                style={{ backgroundColor: selectedFlavor.color }}
              />
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {selectedFlavor.name}
                </h3>
                <p className="text-xforge-gray mb-4">
                  {selectedFlavor.description}
                </p>
                <button className="btn btn-primary">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
