import { StyledLink as Link } from 'baseui/link';
import { StarRating as Rating } from 'baseui/rating';
import { Skeleton } from 'baseui/skeleton';
import {
    TableBuilder,
    TableBuilderColumn
} from 'baseui/table-semantic';
import { H4 } from 'baseui/typography';
import React from 'react';
import { useQuery } from 'react-query';
import { getReviews } from 'src/api';
import { ReviewData } from 'unity-publisher-api';
import { tableBuilderOverrides } from '../../overrides/TableOverrides';
import { Card } from '../common/Card';

export function Reviews() {
    const { data: reviews, isLoading } = useQuery('reviews', getReviews);

    function averageRating(): number {
        if (!reviews) return 0;
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
                    {isLoading
                        ? <Skeleton width="200px" height="40px" rows={2} animation />
                        : <H4>
                            <span className="mr-4">
                                {averageRating().toPrecision(2)}
                            </span>
                            <Rating readOnly value={Math.round(averageRating())} />
                        </H4>
                    }
                </Card>
            </div>

            <Card title="Reviews">
                {isLoading
                    ? <Skeleton width="100%" height="100px" rows={4} animation />
                    : <TableBuilder data={reviews as ReviewData[]} overrides={tableBuilderOverrides}>
                        <TableBuilderColumn header="Package">
                            {review => review.package}
                        </TableBuilderColumn>
                        <TableBuilderColumn header="Rating">
                            {review => <Rating readOnly value={review.rating} />}
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
                                    <Link href={getReviewLink(review)}>
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                                        </svg>
                                    </Link>
                                </div>
                            }
                        </TableBuilderColumn>
                    </TableBuilder>
                }
            </Card>
        </div>
    );
}