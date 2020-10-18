import {
    Card as BaseCard,
    StyledBody
} from 'baseui/card';
import React, { FunctionComponent } from 'react';

type CardProps = {
    title?: string;
};

export const Card: FunctionComponent<CardProps> = ({ title, children }) => {
    return (
        <BaseCard title={title} overrides={{
            Root: {
                style: {
                    borderTopWidth: '1px',
                    borderLeftWidth: '1px',
                    borderBottomWidth: '1px',
                    borderRightWidth: '1px'
                }
            }
        }}>
            <StyledBody>
                {children}
            </StyledBody>
        </BaseCard>
    );
};
