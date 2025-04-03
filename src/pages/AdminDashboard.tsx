
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Award, 
  Gift, 
  Users, 
  Gamepad, 
  LogOut, 
  Plus, 
  Check, 
  Trash, 
  Calendar,
  BarChart3,
  ChevronUp,
  ChevronDown,
  Search,
  RefreshCw,
  Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

// Mock data for the dashboard
const mockRetailers = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Retailer ${i + 1}`,
  points: Math.floor(Math.random() * 10000),
  registrationDate: new Date(
    Date.now() - Math.floor(Math.random() * 90 * 24 * 60 * 60 * 1000)
  ).toISOString().split('T')[0]
})).sort((a, b) => b.points - a.points);

const mockWinners = [
  { id: 1, name: "John Doe", prize: "Gaming Console", date: "2023-09-15" },
  { id: 2, name: "Jane Smith", prize: "$500 Gift Card", date: "2023-09-20" },
  { id: 3, name: "Alex Johnson", prize: "Smart Watch", date: "2023-09-25" },
  { id: 4, name: "Sarah Williams", prize: "Weekend Getaway", date: "2023-10-01" },
  { id: 5, name: "Michael Brown", prize: "Premium Headphones", date: "2023-10-05" },
];

const mockGames = [
  { id: 1, name: "Slot Machine", type: "Luck", description: "Try your luck with our slot machine and win amazing prizes!" },
  { id: 2, name: "Spin Wheel", type: "Luck", description: "Spin the wheel of fortune and see where it lands to claim your reward." },
  { id: 3, name: "Memory Game", type: "Skill", description: "Test your memory skills by matching pairs of cards in this classic game." },
  { id: 4, name: "Quiz Challenge", type: "Knowledge", description: "Answer questions correctly to earn points in this knowledge quiz." },
  { id: 5, name: "Daily Challenge", type: "Mixed", description: "A new challenge every day! Complete tasks to earn bonus points." },
];

const mockRewards = [
  { id: 1, name: "Premium Membership", points: 5000, stock: 10 },
  { id: 2, name: "$50 Gift Card", points: 2500, stock: 25 },
  { id: 3, name: "XForge Merchandise Pack", points: 1000, stock: 50 },
  { id: 4, name: "Free Month Subscription", points: 750, stock: 100 },
];

// Dashboard stats
const dashboardStats = [
  { label: "Total Users", value: "2,845", icon: <Users className="text-purple-500" /> },
  { label: "Active Games", value: "5", icon: <Gamepad className="text-blue-500" /> },
  { label: "Rewards Claimed", value: "1,293", icon: <Gift className="text-pink-500" /> },
  { label: "Winners Today", value: "12", icon: <Award className="text-amber-500" /> },
];

const AdminDashboard: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [featuredGame, setFeaturedGame] = useState<number | null>(null);
  const [newReward, setNewReward] = useState({ name: "", points: 0, stock: 0 });
  const [rewards, setRewards] = useState(mockRewards);
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    toast({
      title: "Logged Out",
      description: "You have been logged out of the admin panel",
    });
    navigate("/admin");
  };

  const handleFeatureGame = (gameId: number) => {
    setFeaturedGame(gameId);
    toast({
      title: "Game Featured",
      description: `${mockGames.find(g => g.id === gameId)?.name} is now featured!`,
    });
  };

  const addReward = () => {
    if (!newReward.name || newReward.points <= 0 || newReward.stock <= 0) {
      toast({
        title: "Invalid Reward",
        description: "Please fill all fields with valid values",
        variant: "destructive",
      });
      return;
    }
    
    const reward = {
      id: rewards.length + 1,
      ...newReward
    };
    
    setRewards([...rewards, reward]);
    setNewReward({ name: "", points: 0, stock: 0 });
    
    toast({
      title: "Reward Added",
      description: `${reward.name} has been added to rewards`,
    });
  };

  const deleteReward = (id: number) => {
    setRewards(rewards.filter(r => r.id !== id));
    toast({
      title: "Reward Deleted",
      description: "The reward has been removed",
    });
  };

  const refreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Data Refreshed",
        description: "Dashboard data has been updated",
      });
    }, 1000);
  };

  const filteredRetailers = searchQuery 
    ? mockRetailers.filter(retailer => 
        retailer.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : mockRetailers;

  return (
    <div className="min-h-screen bg-gradient-to-br from-xforge-darkgray to-xforge-dark">
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 glass-dark backdrop-blur-md border-b border-xforge-teal/20 shadow-lg">
        <div className="container mx-auto flex justify-between items-center py-3 px-4">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-xforge-teal to-cyan-500 flex items-center justify-center shadow-glow mr-3">
              <BarChart3 size={20} className="text-xforge-dark" />
            </div>
            <h1 className="text-xl font-bold text-white">
              <span className="text-xforge-teal">X</span>Forge Admin
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="sm"
              className="text-xforge-gray border-xforge-darkgray hover:bg-xforge-teal hover:text-xforge-dark"
              onClick={refreshData}
            >
              <RefreshCw size={16} className={`mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <div className="bg-xforge-darkgray/60 px-3 py-1 rounded-full flex items-center text-xforge-gray text-sm">
              <Clock size={14} className="mr-2 text-xforge-teal" />
              Last update: {new Date().toLocaleTimeString()}
            </div>
            <Button 
              variant="outline" 
              className="text-xforge-teal border-xforge-teal hover:bg-xforge-teal hover:text-xforge-dark"
              onClick={handleLogout}
            >
              <LogOut size={16} className="mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto pt-24 pb-10 px-4">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {dashboardStats.map((stat, index) => (
            <Card key={index} className="bg-xforge-darkgray/60 border-xforge-teal/10 shadow-md hover:shadow-xl transition-all duration-300 hover:border-xforge-teal/30">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-xforge-gray text-sm mb-1">{stat.label}</p>
                  <p className="text-white text-2xl font-bold">{stat.value}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-xforge-dark/50 flex items-center justify-center">
                  {stat.icon}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="retailers" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8 bg-xforge-darkgray/40 p-1">
            <TabsTrigger value="retailers" className="data-[state=active]:bg-xforge-teal data-[state=active]:text-xforge-dark">
              <Users size={16} className="mr-2" />
              Top Retailers
            </TabsTrigger>
            <TabsTrigger value="rewards" className="data-[state=active]:bg-xforge-teal data-[state=active]:text-xforge-dark">
              <Gift size={16} className="mr-2" />
              Rewards
            </TabsTrigger>
            <TabsTrigger value="winners" className="data-[state=active]:bg-xforge-teal data-[state=active]:text-xforge-dark">
              <Award size={16} className="mr-2" />
              Winners
            </TabsTrigger>
            <TabsTrigger value="games" className="data-[state=active]:bg-xforge-teal data-[state=active]:text-xforge-dark">
              <Gamepad size={16} className="mr-2" />
              Featured Games
            </TabsTrigger>
          </TabsList>

          <TabsContent value="retailers" className="glass-dark p-6 rounded-lg border border-xforge-teal/10 shadow-lg animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Top 50 Retailers by Points</h2>
              <div className="relative w-72">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xforge-gray" size={16} />
                <Input 
                  placeholder="Search retailers..." 
                  className="pl-10 bg-xforge-darkgray/30 border-xforge-gray/20 focus:border-xforge-teal"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-xforge-darkgray/30">
                  <TableRow>
                    <TableHead className="text-xforge-teal font-bold">Rank</TableHead>
                    <TableHead className="text-xforge-teal font-bold">Name</TableHead>
                    <TableHead className="text-xforge-teal font-bold">
                      <div className="flex items-center cursor-pointer">
                        Points
                        <ChevronDown size={16} className="ml-1" />
                      </div>
                    </TableHead>
                    <TableHead className="text-xforge-teal font-bold">Registration Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRetailers.map((retailer, index) => (
                    <TableRow key={retailer.id} className="hover:bg-xforge-teal/5 border-b border-xforge-darkgray/50">
                      <TableCell className="font-medium">
                        {index < 3 ? (
                          <span className={`flex items-center justify-center h-6 w-6 rounded-full text-xs ${
                            index === 0 ? 'bg-amber-400' : 
                            index === 1 ? 'bg-slate-300' : 
                            'bg-amber-700'
                          } text-xforge-dark font-bold`}>
                            {index + 1}
                          </span>
                        ) : (
                          index + 1
                        )}
                      </TableCell>
                      <TableCell>{retailer.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span className="text-xforge-teal font-bold">{retailer.points.toLocaleString()}</span>
                          <div className="ml-2 h-2 bg-xforge-darkgray/50 rounded-full w-24">
                            <div 
                              className="h-full bg-gradient-to-r from-xforge-teal to-cyan-500 rounded-full" 
                              style={{ width: `${Math.min(100, (retailer.points / 10000) * 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{retailer.registrationDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="rewards" className="space-y-6 animate-fade-in">
            <Card className="glass-dark border border-xforge-teal/10 shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-xl">Create New Reward</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="reward-name" className="text-xforge-gray">Reward Name</Label>
                    <Input 
                      id="reward-name" 
                      placeholder="Enter reward name" 
                      value={newReward.name}
                      onChange={(e) => setNewReward({...newReward, name: e.target.value})}
                      className="input-field bg-xforge-darkgray/30 border-xforge-gray/20 focus:border-xforge-teal"
                    />
                  </div>
                  <div>
                    <Label htmlFor="reward-points" className="text-xforge-gray">Points Required</Label>
                    <Input 
                      id="reward-points" 
                      type="number" 
                      placeholder="Points required" 
                      value={newReward.points || ''}
                      onChange={(e) => setNewReward({...newReward, points: parseInt(e.target.value) || 0})}
                      className="input-field bg-xforge-darkgray/30 border-xforge-gray/20 focus:border-xforge-teal"
                      min="1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="reward-stock" className="text-xforge-gray">Stock Available</Label>
                    <Input 
                      id="reward-stock" 
                      type="number" 
                      placeholder="Available stock" 
                      value={newReward.stock || ''}
                      onChange={(e) => setNewReward({...newReward, stock: parseInt(e.target.value) || 0})}
                      className="input-field bg-xforge-darkgray/30 border-xforge-gray/20 focus:border-xforge-teal"
                      min="1"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button 
                      onClick={addReward}
                      className="bg-gradient-to-r from-xforge-teal to-cyan-500 text-xforge-dark hover:brightness-110 w-full shadow-glow"
                    >
                      <Plus size={16} className="mr-2" />
                      Add Reward
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-dark border border-xforge-teal/10 shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-xl">Manage Rewards</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-xforge-darkgray/30">
                      <TableRow>
                        <TableHead className="text-xforge-teal font-bold">ID</TableHead>
                        <TableHead className="text-xforge-teal font-bold">Name</TableHead>
                        <TableHead className="text-xforge-teal font-bold">Points</TableHead>
                        <TableHead className="text-xforge-teal font-bold">Stock</TableHead>
                        <TableHead className="text-xforge-teal font-bold">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rewards.map((reward) => (
                        <TableRow key={reward.id} className="hover:bg-xforge-teal/5 border-b border-xforge-darkgray/50">
                          <TableCell className="font-medium">{reward.id}</TableCell>
                          <TableCell>{reward.name}</TableCell>
                          <TableCell>
                            <span className="px-2 py-1 rounded-full bg-xforge-teal/10 border border-xforge-teal/20 text-xforge-teal font-bold">
                              {reward.points.toLocaleString()}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full ${
                              reward.stock > 20 ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                              reward.stock > 5 ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                              'bg-red-500/10 text-red-400 border border-red-500/20'
                            }`}>
                              {reward.stock}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => deleteReward(reward.id)}
                              className="hover:bg-red-700 transition-colors"
                            >
                              <Trash size={16} />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="winners" className="glass-dark p-6 rounded-lg border border-xforge-teal/10 shadow-lg animate-fade-in">
            <h2 className="text-xl font-bold mb-6 text-white flex items-center">
              <Award className="text-amber-400 mr-2" size={24} />
              Prize Winners
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {mockWinners.slice(0, 2).map((winner) => (
                <Card key={winner.id} className="bg-gradient-to-br from-amber-500/20 to-amber-700/10 border border-amber-500/30 shadow-lg overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
                    <Award size={96} />
                  </div>
                  <CardContent className="p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-center md:text-left">
                      <p className="text-amber-400 font-bold text-lg">{winner.name}</p>
                      <p className="text-xforge-gray text-sm">{winner.date}</p>
                    </div>
                    <div className="text-center px-4 py-2 bg-amber-500/20 rounded-lg border border-amber-500/30">
                      <p className="text-white">Won</p>
                      <p className="text-amber-300 font-bold">{winner.prize}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-xforge-darkgray/30">
                  <TableRow>
                    <TableHead className="text-xforge-teal font-bold">ID</TableHead>
                    <TableHead className="text-xforge-teal font-bold">Winner</TableHead>
                    <TableHead className="text-xforge-teal font-bold">Prize</TableHead>
                    <TableHead className="text-xforge-teal font-bold">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockWinners.map((winner) => (
                    <TableRow key={winner.id} className="hover:bg-xforge-teal/5 border-b border-xforge-darkgray/50">
                      <TableCell className="font-medium">{winner.id}</TableCell>
                      <TableCell>{winner.name}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center gap-1 text-amber-300 font-bold">
                          <Award size={14} className="text-amber-400" />
                          {winner.prize}
                        </span>
                      </TableCell>
                      <TableCell>{winner.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="games" className="glass-dark p-6 rounded-lg border border-xforge-teal/10 shadow-lg animate-fade-in">
            <h2 className="text-xl font-bold mb-6 text-white flex items-center">
              <Gamepad className="text-xforge-teal mr-2" size={24} />
              Feature Game Selection
            </h2>
            <p className="text-xforge-gray mb-6">Select which game to feature on the Rewards page today</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockGames.map((game) => (
                <Card 
                  key={game.id} 
                  className={`overflow-hidden card-3d cursor-pointer bg-xforge-darkgray/40 border-2 transition-all duration-300 ${
                    featuredGame === game.id ? 'border-xforge-teal shadow-glow' : 'border-transparent'
                  }`}
                  onClick={() => handleFeatureGame(game.id)}
                >
                  <div className="absolute top-0 right-0 w-20 h-20 opacity-5">
                    <Gamepad size={80} />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-xforge-teal/20 flex items-center justify-center mr-2">
                          <Gamepad className="text-xforge-teal" size={18} />
                        </div>
                        <CardTitle className="text-white text-lg">{game.name}</CardTitle>
                      </div>
                      {featuredGame === game.id && (
                        <div className="bg-xforge-teal text-xforge-dark font-bold text-xs p-1 rounded flex items-center animate-pulse-light">
                          <Check size={12} className="mr-1" />
                          Featured
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-xforge-lightgray text-xs mb-2 inline-block px-2 py-1 bg-xforge-darkgray/40 rounded">Type: {game.type}</p>
                    <p className="text-xforge-gray text-sm line-clamp-2">{game.description}</p>
                  </CardContent>
                  <CardFooter className="bg-xforge-darkgray/30 border-t border-xforge-darkgray/50 pt-3 pb-3 flex justify-end">
                    <Button 
                      variant={featuredGame === game.id ? "default" : "outline"}
                      size="sm"
                      className={
                        featuredGame === game.id
                          ? "bg-xforge-teal text-xforge-dark hover:brightness-110"
                          : "text-xforge-teal border-xforge-teal hover:bg-xforge-teal hover:text-xforge-dark"
                      }
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFeatureGame(game.id);
                      }}
                    >
                      {featuredGame === game.id ? (
                        <>
                          <Calendar size={14} className="mr-2" />
                          Featured Today
                        </>
                      ) : (
                        "Set as Featured"
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
