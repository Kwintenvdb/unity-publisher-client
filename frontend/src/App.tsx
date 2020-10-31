import { BaseProvider, createDarkTheme, createLightTheme, LightTheme } from 'baseui';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { AppContainer } from './AppContainer';
import { AuthProvider } from './components/authentication/AuthContext';
import './styles/tailwind.css';
import './styles/main.scss';
import { ThemeContext, ThemeState } from './theme/ThemeContext';

const engine = new Styletron();
const queryCache = new QueryCache();

function App() {
    const darkThemeFromCookie = Cookies.get('darkTheme') === 'true';
    const [darkTheme, setDarkTheme] = useState(darkThemeFromCookie);

    const setDarkThemeWithCookie = (dark: boolean) => {
        setDarkTheme(dark);
        // Expires after 100 days
        Cookies.set('darkTheme', String(dark), { expires: 100 });
    };

    const themeState: ThemeState = {
        darkTheme,
        setDarkTheme: setDarkThemeWithCookie
    };

    const borderRadius = LightTheme.borders.radius200;
    const themeCreationFunction = darkTheme ? createDarkTheme : createLightTheme;
    const theme = themeCreationFunction({
        // primaryFontFamily: 'Muli'
    }, {
        borders: {
            surfaceBorderRadius: borderRadius,
            buttonBorderRadius: borderRadius,
            inputBorderRadius: borderRadius
        },
        colors: {
            linkText: LightTheme.colors.accent,
            linkVisited: LightTheme.colors.accent500,
            linkHover: LightTheme.colors.accent600
        },
        typography: {
            ParagraphSmall: {
                fontSize: '16px'
            }
        }
    });

    return (
        <AuthProvider>
            <ThemeContext.Provider value={themeState}>
                <StyletronProvider value={engine}>
                    <BaseProvider theme={theme} overrides={{
                        AppContainer: {
                            style: {
                                height: '100%'
                            }
                        }
                    }}>
                        <ReactQueryCacheProvider queryCache={queryCache}>
                            {/* <ReactQueryDevtools initialIsOpen /> */}

                            <AppContainer />
                        </ReactQueryCacheProvider>
                    </BaseProvider>
                </StyletronProvider>
            </ThemeContext.Provider>
        </AuthProvider>
    );
}

export default App;
