"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AdminOrderItem } from "@/types/admin";
import { cn } from "@/lib/utils";

interface RecentOrdersTableProps {
  orders: AdminOrderItem[];
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
}

export function RecentOrdersTable({ orders, isLoading, error, onRetry }: RecentOrdersTableProps) {
  if (error) {
    return (
      <div className="p-6 text-center border border-[#991B1B] bg-[#2C1A10] rounded-md">
        <p className="text-[#F87171] font-spectral mb-4">{error}</p>
        <button 
          onClick={onRetry} 
          className="px-4 py-2 text-xs font-cinzel uppercase bg-[#CA8A04] text-[#1A0F0A] rounded hover:bg-[#B8780A] transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-md border border-[#5C3D2E] bg-[#2C1A10] overflow-hidden">
      <Table>
        <TableHeader className="bg-[#3D2517]">
          <TableRow className="border-b border-[#5C3D2E] hover:bg-[#3D2517]">
            <TableHead className="font-cinzel text-[#BFA98A] uppercase text-xs">Customer</TableHead>
            <TableHead className="font-cinzel text-[#BFA98A] uppercase text-xs">Amount</TableHead>
            <TableHead className="font-cinzel text-[#BFA98A] uppercase text-xs">Status</TableHead>
            <TableHead className="font-cinzel text-[#BFA98A] uppercase text-xs text-right">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center text-[#BFA98A] font-spectral">
                Loading orders...
              </TableCell>
            </TableRow>
          ) : orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center text-[#BFA98A] font-spectral">
                No recent orders found.
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order) => (
              <TableRow key={order.id} className="border-b border-[#3D2517] hover:bg-[#3D2517] transition-colors">
                <TableCell className="font-spectral text-[#F5E6D3]">{order.customerName}</TableCell>
                <TableCell className="font-spectral text-[#F5E6D3]">
                  {new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(order.amount)}
                </TableCell>
                <TableCell>
                  <Badge 
                    className={cn(
                      "font-cinzel text-[10px] uppercase tracking-tighter",
                      order.status === 'completed' && "bg-[#22C55E20] text-[#22C55E] border-none",
                      order.status === 'pending' && "bg-[#CA8A0420] text-[#CA8A04] border-none",
                      order.status === 'cancelled' && "bg-[#991B1B20] text-[#F87171] border-none"
                    )}
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-spectral text-[#BFA98A] text-xs">
                  {new Date(order.createdAt).toLocaleDateString('th-TH')}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
