
import React, { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockRetailers } from "@/data/mockAdminData";

export const RetailersTab: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredRetailers = searchQuery 
    ? mockRetailers.filter(retailer => 
        retailer.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : mockRetailers;

  return (
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
  );
};
