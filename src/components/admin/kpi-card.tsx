"use client";

import { Card } from "@/components/ui/card";

interface KpiCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  isLoading?: boolean;
}

export function KpiCard({ title, value, icon, description, isLoading }: KpiCardProps) {
  if (isLoading) {
    return (
      <Card className="p-6 flex flex-col gap-2 border-t-2 border-t-[#CA8A04] bg-[#2C1A10]">
        <div className="h-4 w-24 animate-pulse rounded bg-[#5C3D2E]" />
        <div className="h-8 w-32 animate-pulse rounded bg-[#5C3D2E]" />
        <div className="h-4 w-full animate-pulse rounded bg-[#5C3D2E]" />
      </Card>
    );
  }

  return (
    <Card className="p-6 flex flex-col gap-2 border-t-2 border-t-[#CA8A04] bg-[#2C1A10] text-[#F5E6D3] shadow-sm">
      <div className="flex items-center justify-between">
        <span className="font-cinzel text-sm uppercase tracking-wider text-[#BFA98A]">{title}</span>
        <div className="text-[#CA8A04]">{icon}</div>
      </div>
      <div className="text-2xl font-cinzel font-bold">{value}</div>
      {description && (
        <span className="font-spectral text-xs text-[#BFA98A]">{description}</span>
      )}
    </Card>
  );
}
