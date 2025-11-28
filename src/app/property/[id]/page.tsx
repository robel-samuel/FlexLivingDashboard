'use client';

import { useState, useEffect } from 'react';
import { Review } from '@/lib/types/Review';

export default function PropertyPage({ params: _params }: { params: { id: string } }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews/hostaway');
        const data = await response.json();
        // Filter for approved reviews only
        const approvedReviews = data.reviews.filter((review: Review) => review.approved);
        setReviews(approvedReviews);
        setLoading(false);
      } catch (_err) {
        setError('Failed to fetch reviews');
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Property Reviews</h1>
      
      {reviews.length === 0 ? (
        <p>No approved reviews for this property yet.</p>
      ) : (
        <div className="space-y-6">
          {reviews.map(review => (
            <div key={review.id} className="border p-4 rounded-lg">
              <div className="flex justify-between">
                <h3 className="font-medium">{review.guestName}</h3>
                <span className="text-sm text-gray-500">
                  {new Date(review.submittedAt).toLocaleDateString()}
                </span>
              </div>
              
              <p className="mt-2">{review.publicReview}</p>
              
              <div className="mt-3">
                <h4 className="font-medium text-sm">Ratings:</h4>
                <div className="flex flex-wrap gap-2 mt-1">
                  {review.reviewCategory.map((category, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {category.category}: {category.rating}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}