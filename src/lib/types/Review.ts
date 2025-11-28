export interface Review {
  id: number;
  type: string;
  status: string;
  rating: number | null;
  publicReview: string;
  reviewCategory: { category: string; rating: number }[];
  submittedAt: string;
  guestName: string;
  listingName: string;
  approved: boolean;
}