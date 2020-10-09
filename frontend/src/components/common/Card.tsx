import React, { FunctionComponent, useEffect, useState } from 'react';

export const Card: FunctionComponent = ({ children }) => {
    return (
        <div className="bg-white rounded-md shadow-md p-4">
            {children}
        </div>
    );
};
