import React from 'react';

export type ThemeState = {
    darkTheme: boolean;
    setDarkTheme: (dark: boolean) => void;
};

export const ThemeContext = React.createContext<ThemeState>({
    darkTheme: false,
    setDarkTheme: (dark: boolean) => { }
});

export const useTheme = () => React.useContext(ThemeContext);
