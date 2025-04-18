// src/types/index.ts

export interface User {
    id: string;
    name: string;
    image: string;
  }
  
  export interface DashboardEntry {
    date: string;
    sector: string;
    category: string;
    country: string;
    spend: number;
    reference: number;
    percentChange: number;
    absoluteChange: number;
  }
  
  export interface DashboardData {
    [userId: string]: DashboardEntry[];
  }
  
  // export interface DataViewProps {
  //   data: DashboardData;
  // }

  export interface MockData {
    users: User[];
    dashboardData: DashboardData;
  }
  