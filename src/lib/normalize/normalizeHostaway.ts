import { Review } from '@/lib/types/Review';

export function normalizeHostaway(raw: unknown[]): Review[] {
  return raw.map(r => {
    const review = r as any; // Type assertion since we know the structure
    return {
      id: review.id,
      type: review.type,
      status: review.status,
      rating: review.rating,
      publicReview: review.publicReview,
      reviewCategory: review.reviewCategory,
      submittedAt: review.submittedAt,
      guestName: review.guestName,
      listingName: review.listingName,
      approved: false
    };
  });
}