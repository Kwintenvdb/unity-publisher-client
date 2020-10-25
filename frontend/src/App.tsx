import { BaseProvider, createDarkTheme, createLightTheme, LightTheme } from 'baseui';
import React, { useState } from 'react';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { AppContainer } from './AppContainer';
import { AuthProvider } from './components/authentication/AuthContext';
import './styles/main.scss';
import './styles/tailwind.css';
import { ThemeState, ThemeContext } from './theme/ThemeContext';

const engine = new Styletron();
const queryCache = new QueryCache();

function App() {
    const [darkTheme, setDarkTheme] = useState(false);
    const themeState: ThemeState = {
        darkTheme,
        setDarkTheme
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
