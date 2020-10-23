import { StarRating } from 'baseui/rating';
import { Tag, KIND, VARIANT } from 'baseui/tag';
import { StyledLink as Link } from 'baseui/link';
import React, { FunctionComponent } from 'react';
import { Card } from 'src/components/common/Card';
import { formatCurrency } from 'src/utils/formatCurrency';
import { PackageData } from 'unity-publisher-api';
import { H4 } from 'baseui/typography';

type Props = {
    pkg: PackageData;
};

export const PackageInfo: FunctionComponent<Props> = ({ pkg }) => {
    return (
        <Card title={
            <div className="flex">
                <span className="mr-2">{pkg.name}</span>
                <Tag closeable={false} variant={VARIANT.solid} kind={KIND.accent}>
                    version {pkg.version}
                </Tag>
                <div className="flex-1"></div>
                <div className="text-base font-normal"><Link href={pkg.url}>View in Asset Store</Link></div>
            </div>
        }>
            <div className="w-full flex">
                <div className="w-1/4">
                    <H4>{formatCurrency(pkg.price)}</H4>
                    <p>Price</p>
                </div>
                <div>
                    <H4>
                        <StarRating value={pkg.averageRating || 0} />
                    </H4>
                    <p>Average Rating ({pkg.numRatings} reviews)</p>

                </div>
            </div>
        </Card>
    );
};
