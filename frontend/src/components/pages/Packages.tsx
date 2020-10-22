import { StarRating } from 'baseui/rating';
import React from 'react';
import { useQuery } from 'react-query';
import { formatCurrency } from 'src/utils/formatCurrency';
import { getPackages } from '../../api/packages';
import { Card } from '../common/Card';

export function Packages() {
    const { data: packages } = useQuery('packages', getPackages);

    return (
        <div>
            {packages?.map(pkg => {
                return (
                    <div key={pkg.id} className="mb-6">
                        <Card title={pkg.name}>
                            <div>{formatCurrency(pkg.price)}</div>
                            <div>{pkg.version}</div>
                            <div>
                                Rating: {<StarRating value={pkg.averageRating || 0} />} ({pkg.numRatings} ratings)
                            </div>
                        </Card>
                    </div>
                );
            })}
        </div>
    );
}
