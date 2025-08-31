export interface User {
  id: string;
  name: string;
  image: string;
}
// types.ts
export interface MetricData {
  current: number;
  reference: number;
  absoluteChange: number;
  percentChange: number;
}

export interface DashboardEntry {
  country: string;
  state: string;
  city: string;
  sector: string;
  category: string;
  startDate: string; // ISO date string
  endDate: string;   // ISO date string
  mySpend: MetricData;
  sameStoreSpend: MetricData;
  newStoreSpend: MetricData;
  lostStoreSpend: MetricData;
}

export interface DashboardData {
  [userId: string]: DashboardEntry[];
}

export type groupBy = 'category' | 'sector' | 'country'; // New prop to control the grouping


export const metrics = [
  { label: 'My Spend', value: 'mySpend' },
  { label: 'Same Store Spend', value: 'sameStoreSpend' },
  { label: 'New Store Spend', value: 'newStoreSpend' },
  { label: 'Lost Store Spend', value: 'lostStoreSpend' }
];

export const attributeOptions = ['Country', 'State', 'City', 'Sector', 'Category​'];

export const sectors = ['Retail', 'Food', 'Industrial']; // Updated sectors
export const categories = ['Juice', 'Snacks', 'Beverages', 'Packaged Foods']; // Updated categories

export type SelectedMetric = 'mySpend' | 'sameStoreSpend' | 'newStoreSpend' | 'lostStoreSpend'; 
 