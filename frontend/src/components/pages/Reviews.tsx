import React, { useEffect, useState } from 'react';
import superagent from 'superagent';
import { ReviewData } from 'unity-publisher-api';
import { Card } from '../common/Card';

export function Reviews() {
    const [reviews, setReviews] = useState<ReviewData[]>([]);

    useEffect(() => {
        superagent.get('/api/reviews')
            .then(res => {
                setReviews(res.body);
            });
    }, []);

    function averageRating(): number {
        const sum = reviews.reduce((sum, value) => sum + value.rating, 0);
        return sum / reviews.length;
    }

    function getReviewLink(review: ReviewData): string {
        return `https://assetstore.unity.com/packages/slug/${review.packageId}/reviews?rid=${review.id}`;
    }

    return (
        <div>
            <h2 className="font-semibold mb-4">Reviews</h2>

            <div className="w-1/3 mb-4">
                <Card title="Average Rating">
                    <h1>
                        <span className="mr-4">
                            {averageRating().toPrecision(2)}
                        </span>
                        {'⭐'.repeat(Math.round(averageRating()))}
                    </h1>
                </Card>
            </div>

            <Card>
                <table className="">
                    <thead>
                        <tr>
                            <th>Package</th>
                            <th>Rating</th>
                            <th>Subject</th>
                            <th>Text</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map((review, index) =>
                            <tr key={index}>
                                <td>{review.package}</td>
                                <td>{'⭐'.repeat(review.rating)}</td>
                                <td className="w-32">{review.date}</td>
                                <td>{review.subject}</td>
                                <td>
                                    <div className="flex space-x-1">
                                        <div className="flex-1 max-w-lg truncate">
                                            {review.body}
                                        </div>
                                        <a href={getReviewLink(review)}>
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                                            </svg>
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </Card>


        </div>
    );
}