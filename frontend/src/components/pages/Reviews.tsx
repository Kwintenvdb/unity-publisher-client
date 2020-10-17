import React, { useEffect, useState } from 'react';
import superagent from 'superagent';
import { ReviewData } from 'unity-publisher-api';
import { Card } from '../common/Card';
import {
    TableBuilder,
    TableBuilderColumn,
} from 'baseui/table-semantic';
import { Skeleton } from 'baseui/skeleton';

export function Reviews() {
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState<ReviewData[]>([]);

    useEffect(() => {
        superagent.get('/api/reviews')
            .then(res => {
                setReviews(res.body);
                setLoading(false);
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
            <div className="w-1/3 mb-4">
                <Card title="Average Rating">
                    {loading
                        ? <Skeleton width="200px" height="40px" rows={2} animation />
                        : <h1>
                            <span className="mr-4">
                                {averageRating().toPrecision(2)}
                            </span>
                            {'⭐'.repeat(Math.round(averageRating()))}
                        </h1>
                    }
                </Card>
            </div>

            <Card title="Reviews">
                {loading
                    ? <Skeleton width="100%" height="100px" rows={4} animation />
                    : <TableBuilder data={reviews}>
                        <TableBuilderColumn header="Package">
                            {review => review.package}
                        </TableBuilderColumn>
                        <TableBuilderColumn header="Rating">
                            {review => '⭐'.repeat(review.rating)}
                        </TableBuilderColumn>
                        <TableBuilderColumn header="Date">
                            {review => review.date}
                        </TableBuilderColumn>
                        <TableBuilderColumn header="Subject">
                            {review => review.subject}
                        </TableBuilderColumn>
                        <TableBuilderColumn header="Text">
                            {review =>
                                <div className="flex space-x-4 max-w-xl">
                                    <div className="flex-1 truncate">
                                        {review.body}
                                    </div>
                                    <a href={getReviewLink(review)}>
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                                        </svg>
                                    </a>
                                </div>
                            }
                        </TableBuilderColumn>
                    </TableBuilder>
                }
            </Card>
        </div>
    );
}