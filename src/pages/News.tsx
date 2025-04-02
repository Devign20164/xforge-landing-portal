
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Star, Calendar, ArrowRight, Clock, User, Tag, ChevronLeft, ChevronRight, ExternalLink, Bookmark, Share2 } from "lucide-react";
import { useNotifications } from "@/context/NotificationsContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const News: React.FC = () => {
  const { addNotification } = useNotifications();
  const [showAllArticles, setShowAllArticles] = useState(false);

  useEffect(() => {
    // Add a notification when the news page is visited
    const hasVisitedNews = localStorage.getItem('visited-news');
    if (!hasVisitedNews) {
      setTimeout(() => {
        addNotification({
          title: "New Content Available",
          message: "Check out our latest news and upcoming events!",
          type: "system"
        });
        localStorage.setItem('visited-news', 'true');
      }, 2000);
    }
  }, [addNotification]);

  // News items
  const newsItems = [
    {
      id: 1,
      title: "XForge Partners with Leading Music Festival",
      date: "June 15, 2023",
      author: "XForge Team",
      category: "Events",
      image: "https://placehold.co/600x400/292929/02ECCF?text=XForge+Festival",
      excerpt: "XForge is proud to announce our partnership with Soundwave, one of the biggest music festivals in the country.",
      hasVideo: true,
      content: "XForge is proud to announce our partnership with Soundwave, one of the biggest music festivals in the country. This collaboration will bring our innovative vaping products to festival-goers across the nation. Look for our branded tents and exclusive festival editions of our most popular products. We'll be offering special discounts and limited-edition flavors only available at Soundwave events."
    },
    {
      id: 2,
      title: "New XForge Pro Model Coming Soon",
      date: "May 28, 2023",
      author: "Product Team",
      category: "Product Update",
      image: "https://placehold.co/600x400/292929/02ECCF?text=XForge+Pro",
      excerpt: "We're excited to announce our upcoming XForge Pro model, featuring longer battery life and enhanced flavor technology.",
      hasVideo: false,
      content: "We're excited to announce our upcoming XForge Pro model, featuring longer battery life and enhanced flavor technology. Our engineering team has been working tirelessly to bring you the most advanced vaping experience yet. The XForge Pro will offer up to 30% more battery life, improved flavor delivery systems, and a sleeker design that fits comfortably in your hand. Look for pre-orders starting next month!"
    },
    {
      id: 3,
      title: "XForge Community Spotlight: User Stories",
      date: "May 10, 2023",
      author: "Community Manager",
      category: "Community",
      image: "https://placehold.co/600x400/292929/02ECCF?text=XForge+Community",
      excerpt: "Hear from real XForge users about how our products have enhanced their vaping experience.",
      hasVideo: true,
      content: "Hear from real XForge users about how our products have enhanced their vaping experience. In this month's community spotlight, we feature stories from five long-time XForge enthusiasts who share their journey with our products. From first-time vapers to seasoned connoisseurs, discover the diverse ways our community uses XForge to elevate their lifestyle."
    }
  ];
  
  // Additional news items (only shown when View All is clicked)
  const additionalNewsItems = [
    {
      id: 4,
      title: "XForge Flavor Lab: Behind the Scenes",
      date: "April 25, 2023",
      author: "Flavor Development Team",
      category: "Product Development",
      image: "https://placehold.co/600x400/292929/02ECCF?text=XForge+Flavor+Lab",
      excerpt: "Take a peek inside our flavor development laboratory and learn how we create our signature tastes.",
      hasVideo: false,
      content: "Take a peek inside our flavor development laboratory and learn how we create our signature tastes. Our team of flavor scientists combines the art and science of taste to develop unique profiles that delight our customers. This article explores the rigorous testing, quality control, and creative processes that go into every XForge flavor."
    },
    {
      id: 5,
      title: "XForge Introduces Sustainable Packaging",
      date: "April 12, 2023",
      author: "Sustainability Team",
      category: "Environment",
      image: "https://placehold.co/600x400/292929/02ECCF?text=XForge+Sustainable",
      excerpt: "Our commitment to the environment continues with our new eco-friendly packaging initiative.",
      hasVideo: false,
      content: "Our commitment to the environment continues with our new eco-friendly packaging initiative. Starting next month, all XForge products will ship in 100% recyclable packaging made from sustainable materials. This change is part of our broader sustainability goals for reducing our carbon footprint and minimizing waste across our entire supply chain."
    },
    {
      id: 6,
      title: "Vaping Regulations: What You Need to Know",
      date: "March 30, 2023",
      author: "Legal Team",
      category: "Regulations",
      image: "https://placehold.co/600x400/292929/02ECCF?text=XForge+Regulations",
      excerpt: "Stay informed about the latest regulatory changes affecting the vaping industry and what they mean for you.",
      hasVideo: false,
      content: "Stay informed about the latest regulatory changes affecting the vaping industry and what they mean for you. This comprehensive guide breaks down recent legislation, upcoming regulatory changes, and how XForge is adapting to ensure full compliance while continuing to deliver the quality products you expect."
    }
  ];

  // Display all news items if showAllArticles is true
  const displayedNews = showAllArticles ? [...newsItems, ...additionalNewsItems] : newsItems;

  // Upcoming events
  const events = [
    {
      id: 1,
      title: "XForge Tasting Event",
      date: "July 12, 2023",
      location: "San Francisco, CA",
      description: "Join us for an exclusive tasting of our newest flavors before they hit the market."
    },
    {
      id: 2,
      title: "Vape Expo 2023",
      date: "August 5-7, 2023",
      location: "Las Vegas, NV",
      description: "Visit our booth at the biggest vape industry event of the year and try our products."
    },
    {
      id: 3,
      title: "XForge Pro Launch Party",
      date: "September 20, 2023",
      location: "Miami, FL",
      description: "Be the first to experience our new XForge Pro model with special promotions and giveaways."
    }
  ];

  const [currentArticle, setCurrentArticle] = useState<typeof newsItems[0] | null>(null);

  const handleReadMore = (article: typeof newsItems[0]) => {
    setCurrentArticle(article);
    window.scrollTo(0, 0);
  };

  const handleCloseArticle = () => {
    setCurrentArticle(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-xforge-dark bg-[radial-gradient(circle_at_top_right,rgba(2,236,207,0.1),transparent_70%)]">
      <Header />
      <main className="flex-grow container mx-auto px-4 pt-32 pb-16">
        {currentArticle ? (
          // Article Detail View - Enhanced with better spacing, visual elements and animations
          <div className="animate-fade-in max-w-4xl mx-auto">
            <button 
              onClick={handleCloseArticle}
              className="flex items-center text-xforge-teal mb-8 hover:brightness-110 transition-all group"
            >
              <ChevronLeft className="mr-2 h-5 w-5 group-hover:transform group-hover:-translate-x-1 transition-transform" /> 
              Back to News
            </button>
            
            <div className="bg-gradient-to-b from-xforge-dark/90 to-xforge-dark rounded-xl overflow-hidden shadow-[0_10px_50px_rgba(2,236,207,0.15)] border border-xforge-teal/20 transform transition-all duration-500 hover:shadow-[0_15px_60px_rgba(2,236,207,0.25)]">
              <div className="relative">
                <img 
                  src={currentArticle.image} 
                  alt={currentArticle.title} 
                  className="w-full h-[450px] object-cover brightness-90 hover:brightness-100 transition-all duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-xforge-dark to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 w-full p-8">
                  <div className="inline-block bg-xforge-teal text-xforge-dark text-xs font-bold px-3 py-1 rounded-full mb-4 shadow-lg">
                    {currentArticle.category}
                  </div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                    {currentArticle.title}
                  </h1>
                </div>
              </div>
              
              <div className="p-8 md:p-12">
                <div className="flex flex-wrap items-center gap-4 text-sm text-xforge-gray mb-6">
                  <div className="flex items-center bg-xforge-dark/50 px-3 py-1.5 rounded-full backdrop-blur-sm">
                    <Clock className="h-4 w-4 mr-2 text-xforge-teal" />
                    <span>{currentArticle.date}</span>
                  </div>
                  <div className="flex items-center bg-xforge-dark/50 px-3 py-1.5 rounded-full backdrop-blur-sm">
                    <User className="h-4 w-4 mr-2 text-xforge-teal" />
                    <span>{currentArticle.author}</span>
                  </div>
                </div>
                
                <div className="text-white text-opacity-90 leading-relaxed space-y-6 text-lg">
                  <p className="first-letter:text-3xl first-letter:font-bold first-letter:text-xforge-teal first-letter:mr-1 first-letter:float-left">{currentArticle.content}</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nunc eget ultricies sodales, nisl metus vulputate nisi, eget vehicula felis massa at nisi. Proin sagittis nisi vel dui faucibus, nec iaculis eros faucibus.</p>
                  
                  <div className="py-6 px-8 my-8 bg-xforge-teal/5 border-l-4 border-xforge-teal rounded-r-lg">
                    <p className="italic text-xforge-teal">"Our goal is to constantly push the boundaries of what's possible in vaping technology while maintaining our commitment to quality and user experience."</p>
                    <p className="text-right text-sm mt-2">— XForge CEO</p>
                  </div>
                  
                  <p>Sed ut erat non sem cursus tempus. Donec quis lorem vitae libero elementum posuere. Quisque at justo non dui interdum semper. Integer vel erat vel sapien semper ultrices at eu turpis.</p>
                </div>
                
                <div className="mt-12 pt-6 border-t border-xforge-teal/10">
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                    <div className="flex space-x-4">
                      <Button variant="outline" className="relative overflow-hidden group bg-transparent border-xforge-teal text-xforge-teal hover:bg-xforge-teal hover:text-xforge-dark">
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-xforge-teal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        <Share2 className="mr-2 h-4 w-4" /> Share
                      </Button>
                      <Button variant="outline" className="relative overflow-hidden group bg-transparent border-xforge-teal text-xforge-teal hover:bg-xforge-teal hover:text-xforge-dark">
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-xforge-teal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        <Bookmark className="mr-2 h-4 w-4" /> Save
                      </Button>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        className="bg-transparent border-xforge-teal text-xforge-teal hover:bg-xforge-teal hover:text-xforge-dark group"
                        onClick={() => {
                          const prevIndex = displayedNews.findIndex(item => item.id === currentArticle.id) - 1;
                          if (prevIndex >= 0) {
                            setCurrentArticle(displayedNews[prevIndex]);
                            window.scrollTo(0, 0);
                          }
                        }}
                        disabled={displayedNews.findIndex(item => item.id === currentArticle.id) === 0}
                      >
                        <ChevronLeft className="h-5 w-5 group-hover:transform group-hover:-translate-x-1 transition-transform" /> Previous
                      </Button>
                      <Button 
                        variant="outline"
                        className="bg-transparent border-xforge-teal text-xforge-teal hover:bg-xforge-teal hover:text-xforge-dark group"
                        onClick={() => {
                          const nextIndex = displayedNews.findIndex(item => item.id === currentArticle.id) + 1;
                          if (nextIndex < displayedNews.length) {
                            setCurrentArticle(displayedNews[nextIndex]);
                            window.scrollTo(0, 0);
                          }
                        }}
                        disabled={displayedNews.findIndex(item => item.id === currentArticle.id) === displayedNews.length - 1}
                      >
                        Next <ChevronRight className="h-5 w-5 group-hover:transform group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-white mb-8 inline-block border-b-2 border-xforge-teal pb-2">
                Related <span className="text-xforge-teal">Articles</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {displayedNews.filter(item => item.id !== currentArticle.id).slice(0, 3).map(item => (
                  <Card 
                    key={`related-${item.id}`}
                    className="group bg-gradient-to-b from-xforge-dark/80 to-xforge-dark rounded-xl overflow-hidden shadow-lg border border-xforge-teal/10 hover:border-xforge-teal/30 transition-all duration-300 hover:shadow-[0_10px_25px_rgba(2,236,207,0.15)] hover:-translate-y-1"
                    onClick={() => handleReadMore(item)}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-xforge-dark to-transparent"></div>
                      <div className="absolute top-3 right-3 bg-xforge-dark/80 backdrop-blur-sm text-xforge-teal text-xs font-bold px-3 py-1 rounded-full">
                        {item.category}
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-white font-bold text-lg mb-2 group-hover:text-xforge-teal transition-colors">{item.title}</h3>
                      <Button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReadMore(item);
                        }}
                        variant="ghost"
                        className="inline-flex items-center text-xforge-teal hover:text-white p-0 bg-transparent mt-2"
                      >
                        Read More <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        ) : (
          // News List View - Completely redesigned with more visual appeal
          <>
            <div className="relative text-center mb-20">
              {/* Background decorative elements */}
              <div className="absolute -top-20 right-20 w-64 h-64 rounded-full bg-xforge-teal/20 filter blur-[100px] animate-pulse-light"></div>
              <div className="absolute -bottom-40 left-20 w-80 h-80 rounded-full bg-xforge-teal/10 filter blur-[100px] animate-pulse-light" style={{ animationDelay: '1.5s' }}></div>
              
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center p-3 bg-xforge-teal bg-opacity-20 rounded-full mb-6 backdrop-blur-sm border border-xforge-teal/30 shadow-[0_0_20px_rgba(2,236,207,0.3)]">
                  <Star className="h-7 w-7 text-xforge-teal animate-pulse-light" />
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                  <span className="bg-gradient-to-r from-white via-white to-xforge-teal bg-clip-text text-transparent">XForge News & Events</span>
                </h1>
                <p className="text-xforge-gray max-w-2xl mx-auto text-lg leading-relaxed">
                  Stay up to date with the latest news, product updates, and exclusive events.
                  Join our community and elevate your experience.
                </p>
              </div>
            </div>

            {/* Featured Article - Redesigned with more visual impact */}
            <div className="mb-20 relative overflow-hidden rounded-2xl group">
              <div className="absolute inset-0 bg-gradient-to-br from-xforge-dark/95 via-xforge-dark/80 to-transparent z-10"></div>
              <img 
                src="https://placehold.co/1200x600/292929/02ECCF?text=XForge+Featured+News" 
                alt="Featured News" 
                className="w-full h-[600px] object-cover transition-transform duration-700 group-hover:scale-105 brightness-75"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(2,236,207,0.15),transparent_70%)]"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-20">
                <div className="inline-block bg-xforge-teal text-xforge-dark text-xs font-bold px-4 py-2 rounded-full mb-6 shadow-lg transform group-hover:scale-105 transition-transform">
                  FEATURED
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 group-hover:text-xforge-teal transition-colors leading-tight">
                  XForge Introduces Revolutionary New <br />Flavor Technology
                </h2>
                <p className="text-white text-opacity-90 mb-8 max-w-2xl text-lg leading-relaxed">
                  Our new proprietary flavor extraction process delivers the most authentic taste experience yet. 
                  Learn how our engineers are pushing the boundaries of vaping technology.
                </p>
                <div className="flex flex-wrap items-center text-xforge-gray space-x-6 mb-6">
                  <div className="flex items-center bg-xforge-dark/70 backdrop-blur-sm px-4 py-2 rounded-full">
                    <Clock className="h-4 w-4 mr-2 text-xforge-teal" />
                    <span>July 2, 2023</span>
                  </div>
                  <div className="flex items-center bg-xforge-dark/70 backdrop-blur-sm px-4 py-2 rounded-full">
                    <User className="h-4 w-4 mr-2 text-xforge-teal" />
                    <span>XForge Research Team</span>
                  </div>
                </div>
                <Button 
                  onClick={() => handleReadMore({
                    id: 7,
                    title: "XForge Introduces Revolutionary New Flavor Technology",
                    date: "July 2, 2023",
                    author: "XForge Research Team",
                    category: "Technology",
                    image: "https://placehold.co/1200x600/292929/02ECCF?text=XForge+Featured+News",
                    excerpt: "Our new proprietary flavor extraction process delivers the most authentic taste experience yet.",
                    hasVideo: false,
                    content: "Our new proprietary flavor extraction process delivers the most authentic taste experience yet. Learn how our engineers are pushing the boundaries of vaping technology. This breakthrough comes after years of research and development, combining cutting-edge molecular gastronomy techniques with advanced vaping hardware. The result is a flavor profile that's indistinguishable from the real thing, whether you're enjoying fruits, desserts, or specialty blends."
                  })}
                  className="relative overflow-hidden group px-8 py-3 bg-gradient-to-r from-xforge-teal to-teal-400 text-xforge-dark font-bold rounded-lg hover:shadow-[0_0_30px_rgba(2,236,207,0.5)] transition-all duration-300 transform hover:translate-y-[-2px]"
                >
                  <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-[150%] transition-transform duration-700"></span>
                  Read Article <ArrowRight className="ml-2 h-4 w-4 inline-block animate-pulse-light" />
                </Button>
              </div>
            </div>

            {/* Latest News Section - Redesigned grid with improved cards */}
            <section className="mb-24 relative">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-bold text-white inline-block relative">
                  Latest <span className="text-xforge-teal">News</span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-xforge-teal to-transparent"></span>
                </h2>
                <Button
                  onClick={() => setShowAllArticles(!showAllArticles)}
                  variant="outline"
                  className="border-xforge-teal text-xforge-teal hover:bg-xforge-teal hover:text-xforge-dark"
                >
                  {showAllArticles ? "Show Less" : "View All"}
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedNews.map((item, index) => (
                  <Card
                    key={item.id}
                    className={`group bg-gradient-to-b from-xforge-dark/80 to-xforge-dark rounded-xl overflow-hidden shadow-lg border border-xforge-teal/10 hover:border-xforge-teal/30 transition-all duration-500 hover:shadow-[0_10px_30px_rgba(2,236,207,0.2)] hover:-translate-y-2 animate-fade-in`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-500 brightness-90 group-hover:brightness-100" 
                      />
                      {item.hasVideo && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 bg-xforge-teal bg-opacity-80 backdrop-blur-sm rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(2,236,207,0.5)]">
                            <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-transparent border-l-white ml-1"></div>
                          </div>
                        </div>
                      )}
                      <div className="absolute top-3 right-3 bg-xforge-dark/80 backdrop-blur-sm text-xforge-teal text-xs font-bold px-3 py-1 rounded-full">
                        {item.category}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-xforge-dark to-transparent opacity-60"></div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center text-xs text-xforge-gray mb-3">
                        <Clock className="h-3 w-3 mr-1 text-xforge-teal/70" />
                        <span className="mr-3">{item.date}</span>
                        <User className="h-3 w-3 mr-1 text-xforge-teal/70" />
                        <span>{item.author}</span>
                      </div>
                      <h3 className="text-white font-bold text-xl mb-3 group-hover:text-xforge-teal transition-colors leading-tight min-h-[4rem]">{item.title}</h3>
                      <p className="text-xforge-gray mb-4 line-clamp-3">{item.excerpt}</p>
                      <Button 
                        onClick={() => handleReadMore(item)}
                        variant="ghost"
                        className="inline-flex items-center text-xforge-teal hover:text-white p-0 bg-transparent group/btn"
                      >
                        Read More <ArrowRight className="ml-2 h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {!showAllArticles && (
                <div className="text-center mt-12">
                  <Button
                    onClick={() => setShowAllArticles(true)}
                    className="relative overflow-hidden group px-8 py-3 bg-gradient-to-r from-xforge-teal to-teal-400 text-xforge-dark font-bold rounded-lg hover:shadow-[0_0_30px_rgba(2,236,207,0.5)] transition-all duration-300 transform hover:translate-y-[-2px]"
                  >
                    <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-[150%] transition-transform duration-700"></span>
                    View All Articles <ArrowRight className="ml-2 h-4 w-4 inline-block" />
                  </Button>
                </div>
              )}
            </section>
            
            {/* Events Section - Redesigned with 3D card effects */}
            <section className="mb-24 relative">
              <h2 className="text-3xl font-bold text-white mb-10 inline-block relative">
                Upcoming <span className="text-xforge-teal">Events</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-xforge-teal to-transparent"></span>
              </h2>
              
              <div className="space-y-8">
                {events.map((event, index) => (
                  <div 
                    key={event.id} 
                    className="group bg-gradient-to-r from-xforge-dark/80 to-xforge-dark/60 rounded-xl p-6 shadow-lg border border-xforge-teal/10 hover:border-xforge-teal/30 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(2,236,207,0.15)] transform hover:-translate-y-1 backdrop-blur-sm animate-fade-in"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                      <div className="bg-gradient-to-br from-xforge-dark/90 to-xforge-dark/70 rounded-xl p-6 text-center w-full md:w-32 border border-xforge-teal/20 shadow-lg group-hover:shadow-[0_0_20px_rgba(2,236,207,0.2)] transition-all">
                        <Calendar className="h-8 w-8 text-xforge-teal mx-auto mb-2" />
                        <p className="text-white font-bold">{event.date.split(',')[0]}</p>
                      </div>
                      
                      <div className="flex-grow">
                        <h3 className="text-white font-bold text-xl mb-2 group-hover:text-xforge-teal transition-colors">{event.title}</h3>
                        <div className="flex items-center mb-3">
                          <Tag className="h-4 w-4 text-xforge-teal mr-2" />
                          <p className="text-xforge-teal">{event.location}</p>
                        </div>
                        <p className="text-xforge-gray">{event.description}</p>
                      </div>
                      
                      <div className="mt-4 md:mt-0">
                        <Button className="relative overflow-hidden group bg-xforge-dark/80 backdrop-blur-sm border border-xforge-teal text-xforge-teal hover:bg-xforge-teal hover:text-xforge-dark transition-all duration-300 rounded-lg font-medium">
                          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-xforge-teal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                          RSVP <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Newsletter subscription - Redesigned with better visual appeal */}
              <div className="relative mt-16 rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-xforge-dark via-xforge-dark/90 to-xforge-dark/50"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(2,236,207,0.15),transparent_70%)]"></div>
                <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-xforge-teal/10 filter blur-[80px]"></div>
                
                <div className="relative z-10 p-10 md:p-12">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                      <h3 className="text-white font-bold text-2xl md:text-3xl mb-3 tracking-tight">Never Miss an Event</h3>
                      <p className="text-xforge-gray max-w-md text-lg">
                        Subscribe to our newsletter to receive updates about upcoming events, product launches, and exclusive promotions.
                      </p>
                    </div>
                    
                    <div className="w-full md:w-auto">
                      <div className="flex flex-col sm:flex-row gap-3">
                        <input 
                          type="email" 
                          placeholder="Your email address" 
                          className="bg-xforge-dark/50 backdrop-blur-sm border border-xforge-lightgray text-white px-4 py-3 rounded-lg focus:border-xforge-teal focus:outline-none transition-colors"
                        />
                        <Button className="relative overflow-hidden group px-6 py-3 bg-gradient-to-r from-xforge-teal to-teal-400 text-xforge-dark font-bold rounded-lg hover:shadow-[0_0_20px_rgba(2,236,207,0.4)] transition-all duration-300 whitespace-nowrap">
                          <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-[150%] transition-transform duration-700"></span>
                          Subscribe
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default News;
