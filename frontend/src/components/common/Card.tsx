import React, { FunctionComponent } from 'react';
import {
    Card as BaseCard,
    StyledBody,
    StyledAction
} from 'baseui/card';

type CardProps = {
    accent?: boolean;
    title?: string;
};

export const Card: FunctionComponent<CardProps> = ({ accent, title, children }) => {
    function getClasses() {
        if (accent)
            return 'bg-primary rounded-lg shadow-md px-6 py-4';
        else
            return 'bg-white rounded-lg shadow-md px-6 py-4';
    }

    return (
        // <div className={getClasses()}>
        //     {children}
        // </div>
        <BaseCard title={title} overrides={{
            Root: {
                style: {
                    borderWidth: '1px'
                }
            }
        }}>
            <StyledBody>
                {children}
            </StyledBody>
        </BaseCard>
    );
};
