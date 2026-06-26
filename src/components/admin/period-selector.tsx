"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PeriodSelectorProps {
  value: '7d' | '30d' | '90d';
  onChange: (value: '7d' | '30d' | '90d') => void;
}

export function PeriodSelector({ value, onChange }: PeriodSelectorProps) {
  const options: { label: string; value: '7d' | '30d' | '90d' }[] = [
    { label: '7 Days', value: '7d' },
    { label: '30 Days', value: '30d' },
    { label: '90 Days', value: '90d' },
  ];

  return (
    <div className="flex gap-2 bg-[#1A0F0A] p-1 rounded-md border border-[#5C3D2E] w-fit">
      {options.map((opt) => (
        <Button
          key={opt.value}
          variant="ghost"
          onClick={() => onChange(opt.value)}
          className={cn(
            "text-xs font-cinzel uppercase tracking-wider transition-all",
            value === opt.value 
              ? "bg-[#CA8A04] text-[#1A0F0A] hover:bg-[#B8780A] font-bold" 
              : "text-[#BFA98A] hover:bg-[#3D2517] hover:text-[#F5E6D3]"
          )}
        >
          {opt.label}
        </Button>
      ))}
    </div>
  );
}
