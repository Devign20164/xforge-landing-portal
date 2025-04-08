
import React, { useState, useRef } from "react";
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
  Clock,
  Trophy,
  Zap,
  Calendar as CalendarIcon,
  Upload,
  Download,
  FileUp,
  FileDown,
  File
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
import { DashboardHeader } from "@/components/admin/DashboardHeader";
import { DashboardStats } from "@/components/admin/DashboardStats";
import { RetailersTab } from "@/components/admin/tabs/RetailersTab";
import { RewardsTab } from "@/components/admin/tabs/RewardsTab";
import { WinnersTab } from "@/components/admin/tabs/WinnersTab";
import { PrizesTab } from "@/components/admin/tabs/PrizesTab";
import { FlashPromosTab } from "@/components/admin/tabs/FlashPromosTab";
import { GamesTab } from "@/components/admin/tabs/GamesTab";
import { PromoExcelTab } from "@/components/admin/tabs/PromoExcelTab";
import { ExcelPreviewDialog } from "@/components/admin/dialogs/ExcelPreviewDialog";

// Mock data moved to separate files

const AdminDashboard: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isExcelDialogOpen, setIsExcelDialogOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    toast({
      title: "Logged Out",
      description: "You have been logged out of the admin panel",
    });
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-xforge-darkgray to-xforge-dark">
      <DashboardHeader onLogout={handleLogout} />

      <div className="container mx-auto pt-24 pb-10 px-4">
        <DashboardStats />

        <Tabs defaultValue="retailers" className="w-full">
          <TabsList className="grid grid-cols-7 mb-8 bg-xforge-darkgray/40 p-1">
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
            <TabsTrigger value="prizes" className="data-[state=active]:bg-xforge-teal data-[state=active]:text-xforge-dark">
              <Trophy size={16} className="mr-2" />
              Prize Pool
            </TabsTrigger>
            <TabsTrigger value="flash-promos" className="data-[state=active]:bg-xforge-teal data-[state=active]:text-xforge-dark">
              <Zap size={16} className="mr-2" />
              Flash Promos
            </TabsTrigger>
            <TabsTrigger value="games" className="data-[state=active]:bg-xforge-teal data-[state=active]:text-xforge-dark">
              <Gamepad size={16} className="mr-2" />
              Featured Games
            </TabsTrigger>
            <TabsTrigger value="promo-excel" className="data-[state=active]:bg-xforge-teal data-[state=active]:text-xforge-dark">
              <File size={16} className="mr-2" />
              Promo Excel
            </TabsTrigger>
          </TabsList>

          <RetailersTab />
          <RewardsTab />
          <WinnersTab />
          <PrizesTab />
          <FlashPromosTab />
          <GamesTab />
          <PromoExcelTab onPreviewClick={() => setIsExcelDialogOpen(true)} />
        </Tabs>
      </div>

      <ExcelPreviewDialog 
        isOpen={isExcelDialogOpen} 
        onOpenChange={setIsExcelDialogOpen}
      />
    </div>
  );
};

export default AdminDashboard;
