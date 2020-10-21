import {
    Card as BaseCard,
    StyledBody
} from 'baseui/card';
import React, { FunctionComponent } from 'react';

type CardProps = {
    title?: string;
};

const borderWidth = '1px';
const extraPadding = '4px';

export const Card: FunctionComponent<CardProps> = ({ title, children }) => {
    return (
        <BaseCard title={title} overrides={{
            Root: {
                style: {
                    borderTopWidth: borderWidth,
                    borderLeftWidth: borderWidth,
                    borderBottomWidth: borderWidth,
                    borderRightWidth: borderWidth,
                    paddingTop: extraPadding,
                    paddingLeft: extraPadding,
                    paddingBottom: extraPadding,
                    paddingRight: extraPadding
                }
            }
        }}>
            <StyledBody>
                {children}
            </StyledBody>
        </BaseCard>
    );
};
