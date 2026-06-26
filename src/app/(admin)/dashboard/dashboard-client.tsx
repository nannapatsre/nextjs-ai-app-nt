"use client";

import React, { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { RiDashboard2Line, RiMoneyDollarCircleLine, RiShoppingBag3Line, RiUser3Line, RiFileList3Line } from "@remixicon/react"; // Corrected icons
import { KpiCard } from '@/components/admin/kpi-card';
import { PeriodSelector } from '@/components/admin/period-selector';
import { RecentOrdersTable } from '@/components/admin/recent-orders-table';
import { AdminStats, RevenuePoint, AdminOrderItem } from '@/types/admin';

const RevenueChart = dynamic(() => import('@/components/admin/revenue-chart'), { ssr: false });

export default function DashboardClient() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState<string | null>(null);

  const [revenue, setRevenue] = useState<RevenuePoint[]>([]);
  const [revenueLoading, setRevenueLoading] = useState(true);
  const [revenueError, setRevenueError] = useState<string | null>(null);

  const [period, setPeriod] = useState<'7d' | '30d' | '90d'>('30d');

  const [orders, setOrders] = useState<AdminOrderItem[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState<string | null>(null);

  const fetchStatsAndOrders = useCallback(async () => {
    setStatsLoading(true);
    setOrdersLoading(true);
    setStatsError(null);
    setOrdersError(null);
    
    try {
      const [statsRes, ordersRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/orders?limit=5')
      ]);

      if (!statsRes.ok) throw new Error('Failed to fetch stats');
      if (!ordersRes.ok) throw new Error('Failed to fetch orders');

      const statsData = await statsRes.json();
      const ordersData = await ordersRes.json();

      setStats(statsData);
      setOrders(ordersData.orders);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unknown error occurred';
      setStatsError(message);
      setOrdersError(message);
    } finally {
      setStatsLoading(false);
      setOrdersLoading(false);
    }
  }, []);

  const fetchRevenue = useCallback(async () => {
    setRevenueLoading(true);
    setRevenueError(null);
    try {
      const res = await fetch(`/api/admin/revenue?period=${period}`);
      if (!res.ok) throw new Error('Failed to fetch revenue');
      const data = await res.json();
      setRevenue(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unknown error occurred';
      setRevenueError(message);
    } finally {
      setRevenueLoading(false);
    }
  }, [period]);

  useEffect(() => {
    let isMounted = true;

    const loadInitialData = async () => {
      await fetchStatsAndOrders();
      await fetchRevenue();
    };

    loadInitialData();

    const interval = setInterval(() => {
      if (isMounted) fetchStatsAndOrders();
    }, 30000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [fetchStatsAndOrders, fetchRevenue]);

  return (
    <div className="min-h-screen bg-[#1A0F0A] p-6 lg:p-12 text-[#F5E6D3] font-spectral">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-cinzel font-bold tracking-wide">Admin Dashboard</h1>
            <p className="text-[#BFA98A] text-sm">Manage your realm and track your treasures</p>
          </div>
          <PeriodSelector value={period} onChange={setPeriod} />
        </header>

        {statsError && (
          <div className="p-4 mb-4 border border-[#991B1B] bg-[#2C1A10] rounded-md flex justify-between items-center">
            <p className="text-[#F87171] font-spectral text-sm">{statsError}</p>
            <button 
              onClick={fetchStatsAndOrders} 
              className="px-3 py-1 text-xs font-cinzel uppercase bg-[#CA8A04] text-[#1A0F0A] rounded hover:bg-[#B8780A] transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <KpiCard 
            title="Today's Sales" 
            value={stats ? new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(stats.todaySales) : '...'} 
            icon={<RiMoneyDollarCircleLine className="size-6" />} 
            isLoading={statsLoading} 
          />
          <KpiCard 
            title="Today's Orders" 
            value={stats?.todayOrders ?? '...'} 
            icon={<RiShoppingBag3Line className="size-6" />} 
            isLoading={statsLoading} 
          />
          <KpiCard 
            title="Pending Orders" 
            value={stats?.pendingOrders ?? '...'} 
            icon={<RiFileList3Line className="size-6" />} 
            isLoading={statsLoading} 
          />
          <KpiCard 
            title="Total Products" 
            value={stats?.totalProducts ?? '...'} 
            icon={<RiDashboard2Line className="size-6" />} 
            isLoading={statsLoading} 
          />
          <KpiCard 
            title="Total Users" 
            value={stats?.totalUsers ?? '...'} 
            icon={<RiUser3Line className="size-6" />} 
            isLoading={statsLoading} 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-cinzel font-semibold text-[#BFA98A] uppercase tracking-wider">Revenue Overview</h2>
            <RevenueChart 
              data={revenue} 
              isLoading={revenueLoading} 
              error={revenueError} 
              onRetry={fetchRevenue} 
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-cinzel font-semibold text-[#BFA98A] uppercase tracking-wider">Recent Orders</h2>
            <RecentOrdersTable 
              orders={orders} 
              isLoading={ordersLoading} 
              error={ordersError} 
              onRetry={fetchStatsAndOrders} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
