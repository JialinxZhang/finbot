
export interface StockData {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  history: { date: string; value: number; open: number; close: number; high: number; low: number }[];
  description: string;
  analysis?: string;
}

export interface Post {
  id: string;
  stock: StockData;
  author: string;
  authorAvatar: string;
  likes: number;
  comments: number;
  isLiked: boolean;
}
