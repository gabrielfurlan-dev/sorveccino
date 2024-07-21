export type Order = {
    id: string;
    createdAt: Date;
    customer: {
      name: string;
      notes: string;
    };
    description: string;
    total: number;
    totalToRecieve: number;
  };