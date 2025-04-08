
import React from "react";
import { Download, File, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockExcelPromoCodes } from "@/data/mockAdminData";

interface ExcelPreviewDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ExcelPreviewDialog: React.FC<ExcelPreviewDialogProps> = ({ 
  isOpen, 
  onOpenChange 
}) => {
  const { toast } = useToast();
  
  const downloadExcelFile = () => {
    // In a real implementation, this would generate an Excel file
    // For now, we'll simulate the download with a toast notification
    toast({
      title: "File Downloaded",
      description: "Promo_Codes_Updated.xlsx has been downloaded.",
    });
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-xforge-darkgray border border-xforge-teal/20 text-white max-w-3xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white flex items-center">
            <File className="text-green-500 mr-2" size={20} />
            Excel Promo Codes Preview
          </AlertDialogTitle>
          <AlertDialogDescription className="text-xforge-gray">
            This is a preview of the promo codes data that will be exported to Excel.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="overflow-x-auto max-h-96">
          <Table>
            <TableHeader className="bg-xforge-dark/50 sticky top-0">
              <TableRow>
                <TableHead className="text-xforge-teal font-bold">ID</TableHead>
                <TableHead className="text-xforge-teal font-bold">Code</TableHead>
                <TableHead className="text-xforge-teal font-bold">Value</TableHead>
                <TableHead className="text-xforge-teal font-bold">Status</TableHead>
                <TableHead className="text-xforge-teal font-bold">Redeemed</TableHead>
                <TableHead className="text-xforge-teal font-bold">Redeemed By</TableHead>
                <TableHead className="text-xforge-teal font-bold">Redeemed At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockExcelPromoCodes.map((code) => (
                <TableRow key={code.id} className="hover:bg-xforge-teal/5 border-b border-xforge-darkgray/50">
                  <TableCell className="font-medium">{code.id}</TableCell>
                  <TableCell>
                    <span className="font-mono bg-xforge-dark/50 px-2 py-1 rounded-md text-xforge-teal">
                      {code.code}
                    </span>
                  </TableCell>
                  <TableCell>{code.value}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      code.status === "Active"
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                        : 'bg-xforge-darkgray/30 text-xforge-gray border border-xforge-gray/20'
                    }`}>
                      {code.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {code.redeemed ? (
                      <Check size={16} className="text-green-500" />
                    ) : (
                      <span className="text-xforge-gray">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {code.redeemedBy || <span className="text-xforge-gray">—</span>}
                  </TableCell>
                  <TableCell>
                    {code.redeemedAt || <span className="text-xforge-gray">—</span>}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <AlertDialogFooter className="flex justify-between">
          <AlertDialogCancel className="bg-xforge-dark border-xforge-gray/20 text-xforge-gray hover:bg-xforge-darkgray hover:text-white">
            Close
          </AlertDialogCancel>
          <AlertDialogAction 
            className="bg-gradient-to-r from-xforge-teal to-cyan-500 text-xforge-dark hover:brightness-110"
            onClick={downloadExcelFile}
          >
            <Download size={16} className="mr-2" />
            Download Excel
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
