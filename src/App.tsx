
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Products from "./pages/Products";
import News from "./pages/News";
import PromoCodes from "./pages/PromoCodes";
import Rewards from "./pages/Rewards";
import AccountSettings from "./pages/AccountSettings";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import NotFound from "./pages/NotFound";
import RetailersLanding from "./pages/RetailersLanding";
import VerificationSuccess from "./pages/VerificationSuccess";
import { NotificationsProvider } from "./context/NotificationsContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <NotificationsProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/products" element={<Products />} />
            <Route path="/news" element={<News />} />
            <Route path="/promocodes" element={<PromoCodes />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/account" element={<AccountSettings />} />
            <Route path="/retailers" element={<RetailersLanding />} />
            <Route path="/verification-success" element={<VerificationSuccess />} />
            {/* Admin routes */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </NotificationsProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
