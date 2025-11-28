'use client';

import { useState, useEffect } from 'react';
import { Review } from '@/lib/types/Review';

export default function Dashboard() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews/hostaway');
        const data = await response.json();
        setReviews(data.reviews);
        setLoading(false);
      } catch (_err) {
        setError('Failed to fetch reviews');
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const toggleApproval = (id: number) => {
    setReviews(reviews.map(review => 
      review.id === id ? { ...review, approved: !review.approved } : review
    ));
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  // Group reviews by property
  const reviewsByProperty: Record<string, Review[]> = {};
  reviews.forEach(review => {
    if (!reviewsByProperty[review.listingName]) {
      reviewsByProperty[review.listingName] = [];
    }
    reviewsByProperty[review.listingName].push(review);
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Flex Living Reviews Dashboard</h1>
      
      {Object.entries(reviewsByProperty).map(([property, propertyReviews]) => (
        <div key={property} className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{property}</h2>
          
          <div className="space-y-4">
            {propertyReviews.map(review => (
              <div key={review.id} className="border p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{review.guestName}</h3>
                    <p className="text-gray-600 mt-1">{review.publicReview}</p>
                    
                    <div className="mt-2">
                      <h4 className="font-medium text-sm">Categories:</h4>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {review.reviewCategory.map((category, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                            {category.category}: {category.rating}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => toggleApproval(review.id)}
                    className={`px-4 py-2 rounded ${
                      review.approved 
                        ? 'bg-green-500 hover:bg-green-600 text-white' 
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  >
                    {review.approved ? 'Approved' : 'Approve'}
                  </button>
                </div>
                
                <div className="mt-2 text-sm text-gray-500">
                  Submitted: {new Date(review.submittedAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}