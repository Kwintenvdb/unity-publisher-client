import {
    Card as BaseCard,
    StyledBody
} from 'baseui/card';
import React, { FunctionComponent } from 'react';

type CardProps = {
    title?: string;
};

const borderWidth = '0';
const extraPadding = '4px';

export const Card: FunctionComponent<CardProps> = ({ title, children }) => {
    return (
        <div className="">
            <BaseCard title={title} overrides={{
                Root: {
                    props: {
                        className: 'shadow-md'
                    },
                    style: {
                        borderTopWidth: borderWidth,
                        borderLeftWidth: borderWidth,
                        borderBottomWidth: borderWidth,
                        borderRightWidth: borderWidth,
                        paddingTop: extraPadding,
                        paddingLeft: extraPadding,
                        paddingBottom: extraPadding,
                        paddingRight: extraPadding,
                    }
                },
                Body: {
                    style: {
                        borderLeftWidth: '0'
                    }
                }
            }}>
                <StyledBody>
                    {children}
                </StyledBody>
            </BaseCard>
        </div>

    );
};
