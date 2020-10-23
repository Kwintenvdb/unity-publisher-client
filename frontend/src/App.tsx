import { BaseProvider, createDarkTheme, createLightTheme, LightTheme } from 'baseui';
import React from 'react';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { AppContainer } from './AppContainer';
import { AuthProvider } from './components/authentication/AuthContext';
import './styles/main.scss';
import './styles/tailwind.css';

const engine = new Styletron();

const borderRadius = LightTheme.borders.radius200;

const useDarkTheme = true;
const themeCreationFunction = useDarkTheme ? createDarkTheme : createLightTheme;

// const theme = createLightTheme({
const theme = themeCreationFunction({

    // primaryFontFamily: 'Source Sans Pro'
}, {
    borders: {
        surfaceBorderRadius: borderRadius,
        buttonBorderRadius: borderRadius,
        inputBorderRadius: borderRadius
    },
    colors: {
        linkText: LightTheme.colors.accent,
        linkVisited: LightTheme.colors.accent500,
        linkHover: LightTheme.colors.accent600,
        tableHeadBackgroundColor: '#f9f9f9'
    },
    typography: {
        ParagraphSmall: {
            fontSize: '16px'
        }
    },
    dark: useDarkTheme
});

const queryCache = new QueryCache();

function App() {
    return (
        <AuthProvider>
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
        </AuthProvider>
    );
}

export default App;
