import React, { FunctionComponent } from 'react';

type CardProps = {
    accent?: boolean;
};

export const Card: FunctionComponent<CardProps> = ({ accent, children }) => {
    function getClasses() {
        if (accent)
            return 'bg-primary rounded-lg shadow-md px-6 py-4';
        else
            return 'bg-white rounded-lg shadow-md px-6 py-4';
    }

    return (
        <div className={getClasses()}>
            {children}
        </div>
    );
};
