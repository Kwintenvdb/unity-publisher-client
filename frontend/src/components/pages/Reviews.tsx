import React, { useEffect, useState } from 'react';
import superagent from 'superagent';
import { ReviewData } from 'unity-publisher-api';

export function Reviews() {
    const [reviews, setReviews] = useState<ReviewData[]>([]);

    useEffect(() => {
        superagent.get('/api/reviews')
            .then(res => {
                setReviews(res.body);
            });
    }, []);

    return (
        <div>
            <h2 className="font-semibold mb-4">Reviews</h2>

            <table className="">
                <thead>
                    <th>Package</th>
                    <th>Rating</th>
                    <th>Subject</th>
                    <th>Text</th>
                </thead>
                <tbody>
                    {reviews.map((review, index) =>
                        <tr key={index}>
                            <td>{review.package}</td>
                            <td>{'⭐'.repeat(review.rating)}</td>
                            <td>{review.subject}</td>
                            <td>
                                <div className="flex space-x-1">
                                    <div className="flex-1 max-w-lg truncate">
                                        {review.body}
                                    </div>
                                    <a href=""><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg></a>
                                </div>

                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

        </div>
    );
}