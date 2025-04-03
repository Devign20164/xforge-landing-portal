
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
  Calendar
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
  { id: 1, name: "Slot Machine", type: "Luck" },
  { id: 2, name: "Spin Wheel", type: "Luck" },
  { id: 3, name: "Memory Game", type: "Skill" },
  { id: 4, name: "Quiz Challenge", type: "Knowledge" },
  { id: 5, name: "Daily Challenge", type: "Mixed" },
];

const mockRewards = [
  { id: 1, name: "Premium Membership", points: 5000, stock: 10 },
  { id: 2, name: "$50 Gift Card", points: 2500, stock: 25 },
  { id: 3, name: "XForge Merchandise Pack", points: 1000, stock: 50 },
  { id: 4, name: "Free Month Subscription", points: 750, stock: 100 },
];

const AdminDashboard: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [featuredGame, setFeaturedGame] = useState<number | null>(null);
  const [newReward, setNewReward] = useState({ name: "", points: 0, stock: 0 });
  const [rewards, setRewards] = useState(mockRewards);

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

  return (
    <div className="min-h-screen bg-xforge-dark">
      <div className="fixed top-0 left-0 right-0 z-50 p-4 bg-xforge-dark bg-opacity-95 backdrop-blur shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">
            <span className="text-xforge-teal">X</span>Forge Admin Dashboard
          </h1>
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

      <div className="container mx-auto pt-20 pb-10 px-4">
        <Tabs defaultValue="retailers" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
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

          <TabsContent value="retailers" className="glass-dark p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-white">Top 50 Retailers by Points</h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xforge-teal">Rank</TableHead>
                    <TableHead className="text-xforge-teal">Name</TableHead>
                    <TableHead className="text-xforge-teal">Points</TableHead>
                    <TableHead className="text-xforge-teal">Registration Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockRetailers.map((retailer, index) => (
                    <TableRow key={retailer.id} className="hover:bg-xforge-teal/10">
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>{retailer.name}</TableCell>
                      <TableCell className="text-xforge-teal font-bold">{retailer.points.toLocaleString()}</TableCell>
                      <TableCell>{retailer.registrationDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="rewards" className="space-y-6">
            <div className="glass-dark p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-white">Create New Reward</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="reward-name">Reward Name</Label>
                  <Input 
                    id="reward-name" 
                    placeholder="Enter reward name" 
                    value={newReward.name}
                    onChange={(e) => setNewReward({...newReward, name: e.target.value})}
                    className="input-field"
                  />
                </div>
                <div>
                  <Label htmlFor="reward-points">Points Required</Label>
                  <Input 
                    id="reward-points" 
                    type="number" 
                    placeholder="Points required" 
                    value={newReward.points || ''}
                    onChange={(e) => setNewReward({...newReward, points: parseInt(e.target.value) || 0})}
                    className="input-field"
                    min="1"
                  />
                </div>
                <div>
                  <Label htmlFor="reward-stock">Stock Available</Label>
                  <Input 
                    id="reward-stock" 
                    type="number" 
                    placeholder="Available stock" 
                    value={newReward.stock || ''}
                    onChange={(e) => setNewReward({...newReward, stock: parseInt(e.target.value) || 0})}
                    className="input-field"
                    min="1"
                  />
                </div>
                <div className="flex items-end">
                  <Button 
                    onClick={addReward}
                    className="bg-xforge-teal text-xforge-dark hover:brightness-110 w-full"
                  >
                    <Plus size={16} className="mr-2" />
                    Add Reward
                  </Button>
                </div>
              </div>
            </div>

            <div className="glass-dark p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-white">Manage Rewards</h2>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xforge-teal">ID</TableHead>
                      <TableHead className="text-xforge-teal">Name</TableHead>
                      <TableHead className="text-xforge-teal">Points</TableHead>
                      <TableHead className="text-xforge-teal">Stock</TableHead>
                      <TableHead className="text-xforge-teal">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rewards.map((reward) => (
                      <TableRow key={reward.id} className="hover:bg-xforge-teal/10">
                        <TableCell className="font-medium">{reward.id}</TableCell>
                        <TableCell>{reward.name}</TableCell>
                        <TableCell className="text-xforge-teal font-bold">{reward.points.toLocaleString()}</TableCell>
                        <TableCell>{reward.stock}</TableCell>
                        <TableCell>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => deleteReward(reward.id)}
                          >
                            <Trash size={16} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="winners" className="glass-dark p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-white">Prize Winners</h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xforge-teal">ID</TableHead>
                    <TableHead className="text-xforge-teal">Winner</TableHead>
                    <TableHead className="text-xforge-teal">Prize</TableHead>
                    <TableHead className="text-xforge-teal">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockWinners.map((winner) => (
                    <TableRow key={winner.id} className="hover:bg-xforge-teal/10">
                      <TableCell className="font-medium">{winner.id}</TableCell>
                      <TableCell>{winner.name}</TableCell>
                      <TableCell className="text-xforge-teal font-bold">{winner.prize}</TableCell>
                      <TableCell>{winner.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="games" className="glass-dark p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-white">Feature Game Selection</h2>
            <p className="text-xforge-gray mb-6">Select which game to feature on the Rewards page today</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockGames.map((game) => (
                <div 
                  key={game.id} 
                  className={`p-6 rounded-lg glass-dark card-3d cursor-pointer border-2 ${
                    featuredGame === game.id ? 'border-xforge-teal' : 'border-transparent'
                  }`}
                  onClick={() => handleFeatureGame(game.id)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <Gamepad className="text-xforge-teal mr-2" size={24} />
                      <h3 className="text-lg font-semibold text-white">{game.name}</h3>
                    </div>
                    {featuredGame === game.id && (
                      <div className="bg-xforge-teal text-xforge-dark font-bold text-xs p-1 rounded flex items-center">
                        <Check size={12} className="mr-1" />
                        Featured
                      </div>
                    )}
                  </div>
                  <p className="text-xforge-gray mb-2">Type: {game.type}</p>
                  <div className="flex justify-end mt-4">
                    <Button 
                      variant={featuredGame === game.id ? "default" : "outline"}
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
                          <Calendar size={16} className="mr-2" />
                          Featured Today
                        </>
                      ) : (
                        "Set as Featured"
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
