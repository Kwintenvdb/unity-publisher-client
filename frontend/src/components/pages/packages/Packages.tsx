import { H4 } from 'baseui/typography';
import React from 'react';
import { useQuery } from 'react-query';
import { getPackages } from '../../../api/packages';
import { PackageInfo } from './PackageInfo';

export function Packages() {
    const { data: packages } = useQuery('packages', getPackages);

    return (
        <div>
            <H4 className="mb-6">Packages</H4>
            <div className="grid grid-cols-2 gap-6">
                {packages?.map(pkg => {
                    return (
                        <div key={pkg.id}>
                            <PackageInfo pkg={pkg} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
