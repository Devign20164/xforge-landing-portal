
import React, { useState } from "react";
import { Plus, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockRewards as initialMockRewards } from "@/data/mockAdminData";

export const RewardsTab: React.FC = () => {
  const { toast } = useToast();
  const [newReward, setNewReward] = useState({ name: "", points: 0, stock: 0 });
  const [rewards, setRewards] = useState(initialMockRewards);

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
  );
};
