// sampleData.ts
import { DashboardData } from '../types/index';

const sampleData: DashboardData = {
  "user1": [
    {
      country: "India",
      state: "Maharashtra",
      city: "Mumbai",
      sector: "Retail",
      category: "Juice",
      startDate: "2024-04-01",
      endDate: "2024-04-30",
      mySpend: {
        current: 120000,
        reference: 100000,
        absoluteChange: 20000,
        percentChange: 20
      },
      sameStoreSpend: {
        current: 95000,
        reference: 90000,
        absoluteChange: 5000,
        percentChange: 5.56
      },
      newStoreSpend: {
        current: 15000,
        reference: 10000,
        absoluteChange: 5000,
        percentChange: 50
      },
      lostStoreSpend: {
        current: 10000,
        reference: 15000,
        absoluteChange: -5000,
        percentChange: -33.33
      }
    },
    {
      country: "India",
      state: "Karnataka",
      city: "Bengaluru",
      sector: "Retail",
      category: "Snacks",
      startDate: "2024-04-01",
      endDate: "2024-04-30",
      mySpend: {
        current: 90000,
        reference: 85000,
        absoluteChange: 5000,
        percentChange: 5.88
      },
      sameStoreSpend: {
        current: 70000,
        reference: 75000,
        absoluteChange: -5000,
        percentChange: -6.67
      },
      newStoreSpend: {
        current: 10000,
        reference: 5000,
        absoluteChange: 5000,
        percentChange: 100
      },
      lostStoreSpend: {
        current: 10000,
        reference: 5000,
        absoluteChange: 5000,
        percentChange: 100
      }
    },
    {
      country: "USA",
      state: "California",
      city: "San Francisco",
      sector: "Hospitality",
      category: "Beverages",
      startDate: "2024-04-01",
      endDate: "2024-04-30",
      mySpend: {
        current: 130000,
        reference: 110000,
        absoluteChange: 20000,
        percentChange: 18.18
      },
      sameStoreSpend: {
        current: 100000,
        reference: 95000,
        absoluteChange: 5000,
        percentChange: 5.26
      },
      newStoreSpend: {
        current: 20000,
        reference: 10000,
        absoluteChange: 10000,
        percentChange: 100
      },
      lostStoreSpend: {
        current: 10000,
        reference: 15000,
        absoluteChange: -5000,
        percentChange: -33.33
      }
    },
    {
      country: "USA",
      state: "Texas",
      city: "Austin",
      sector: "Retail",
      category: "Frozen Foods",
      startDate: "2024-04-01",
      endDate: "2024-04-30",
      mySpend: {
        current: 80000,
        reference: 70000,
        absoluteChange: 10000,
        percentChange: 14.29
      },
      sameStoreSpend: {
        current: 60000,
        reference: 55000,
        absoluteChange: 5000,
        percentChange: 9.09
      },
      newStoreSpend: {
        current: 10000,
        reference: 10000,
        absoluteChange: 0,
        percentChange: 0
      },
      lostStoreSpend: {
        current: 10000,
        reference: 5000,
        absoluteChange: 5000,
        percentChange: 100
      }
    }
  ],
  "user2": [
    {
      country: "Canada",
      state: "Ontario",
      city: "Toronto",
      sector: "Retail",
      category: "Juice",
      startDate: "2024-04-01",
      endDate: "2024-04-30",
      mySpend: {
        current: 110000,
        reference: 90000,
        absoluteChange: 20000,
        percentChange: 22.22
      },
      sameStoreSpend: {
        current: 85000,
        reference: 80000,
        absoluteChange: 5000,
        percentChange: 6.25
      },
      newStoreSpend: {
        current: 12000,
        reference: 8000,
        absoluteChange: 4000,
        percentChange: 50
      },
      lostStoreSpend: {
        current: 13000,
        reference: 17000,
        absoluteChange: -4000,
        percentChange: -23.53
      }
    },
    {
      country: "UK",
      state: "England",
      city: "London",
      sector: "Food",
      category: "Snacks",
      startDate: "2024-04-01",
      endDate: "2024-04-30",
      mySpend: {
        current: 95000,
        reference: 80000,
        absoluteChange: 15000,
        percentChange: 18.75
      },
      sameStoreSpend: {
        current: 75000,
        reference: 70000,
        absoluteChange: 5000,
        percentChange: 7.14
      },
      newStoreSpend: {
        current: 15000,
        reference: 10000,
        absoluteChange: 5000,
        percentChange: 50
      },
      lostStoreSpend: {
        current: 5000,
        reference: 10000,
        absoluteChange: -5000,
        percentChange: -50
      }
    }
  ],
  "user3":[
    {
      country: "India",
      state: "Maharashtra",
      city: "Mumbai",
      sector: "Retail",
      category: "Juice",
      startDate: "2024-04-01",
      endDate: "2024-04-30",
      mySpend: {
        current: 120000,
        reference: 100000,
        absoluteChange: 20000,
        percentChange: 20
      },
      sameStoreSpend: {
        current: 95000,
        reference: 90000,
        absoluteChange: 5000,
        percentChange: 5.56
      },
      newStoreSpend: {
        current: 15000,
        reference: 10000,
        absoluteChange: 5000,
        percentChange: 50
      },
      lostStoreSpend: {
        current: 10000,
        reference: 15000,
        absoluteChange: -5000,
        percentChange: -33.33
      }
    },
    {
      country: "India",
      state: "Karnataka",
      city: "Bengaluru",
      sector: "Retail",
      category: "Snacks",
      startDate: "2024-04-01",
      endDate: "2024-04-30",
      mySpend: {
        current: 90000,
        reference: 85000,
        absoluteChange: 5000,
        percentChange: 5.88
      },
      sameStoreSpend: {
        current: 70000,
        reference: 75000,
        absoluteChange: -5000,
        percentChange: -6.67
      },
      newStoreSpend: {
        current: 10000,
        reference: 5000,
        absoluteChange: 5000,
        percentChange: 100
      },
      lostStoreSpend: {
        current: 10000,
        reference: 5000,
        absoluteChange: 5000,
        percentChange: 100
      }
    },
    {
      country: "USA",
      state: "California",
      city: "San Francisco",
      sector: "Hospitality",
      category: "Beverages",
      startDate: "2024-04-01",
      endDate: "2024-04-30",
      mySpend: {
        current: 130000,
        reference: 110000,
        absoluteChange: 20000,
        percentChange: 18.18
      },
      sameStoreSpend: {
        current: 100000,
        reference: 95000,
        absoluteChange: 5000,
        percentChange: 5.26
      },
      newStoreSpend: {
        current: 20000,
        reference: 10000,
        absoluteChange: 10000,
        percentChange: 100
      },
      lostStoreSpend: {
        current: 10000,
        reference: 15000,
        absoluteChange: -5000,
        percentChange: -33.33
      }
    },
    {
      country: "USA",
      state: "Texas",
      city: "Austin",
      sector: "Retail",
      category: "Frozen Foods",
      startDate: "2024-04-01",
      endDate: "2024-04-30",
      mySpend: {
        current: 80000,
        reference: 70000,
        absoluteChange: 10000,
        percentChange: 14.29
      },
      sameStoreSpend: {
        current: 60000,
        reference: 55000,
        absoluteChange: 5000,
        percentChange: 9.09
      },
      newStoreSpend: {
        current: 10000,
        reference: 10000,
        absoluteChange: 0,
        percentChange: 0
      },
      lostStoreSpend: {
        current: 10000,
        reference: 5000,
        absoluteChange: 5000,
        percentChange: 100
      }
    },
  ]
};

export default sampleData;