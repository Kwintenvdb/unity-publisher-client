import React, { ReactNode } from 'react';
import { useMutation } from 'react-query';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../authentication/AuthContext';
import { logout } from '../../api/authentication';
import { Navigation } from 'baseui/side-navigation';
import { Button } from 'baseui/button';
import { useStyletron } from 'baseui';
import { H6 } from 'baseui/typography';
import { useTheme } from '../../theme/ThemeContext';

function SidebarItem(title: string, icon: ReactNode): ReactNode {
    return (
        <div className="flex">
            <div className="mr-3">
                {icon}
            </div>
            <div>
                {title}
            </div>
        </div>
    );
}

export function Sidebar() {
    const location = useLocation();
    const history = useHistory();

    const { darkTheme, setDarkTheme } = useTheme();
    const [css, theme] = useStyletron();
    const background = css({
        backgroundColor: theme.colors.backgroundPrimary,
    });

    const { setAuthenticated } = useAuth();
    const [logoutMutation] = useMutation(logout);

    const doLogout = async () => {
        await logoutMutation();
        setAuthenticated(false);
    };

    const toggleTheme = () => {
        setDarkTheme(!darkTheme);
    };

    return (
        <div className={'w-64 h-full flex flex-col bg-white ' + background}>
            {/* <h2 className="font-semibold text-lg mb-6 text-center mt-4"> */}
            <H6 className="mb-6 text-center mt-4">
                Unity Publisher Client
            </H6>
            {/* </h2> */}

            <Navigation
                items={[
                    {
                        title: SidebarItem('Sales', <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>),
                        itemId: '/'
                    },
                    {
                        title: SidebarItem('Packages', <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>),
                        itemId: '/packages'
                    },
                    {
                        title: SidebarItem('Reviews', <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>),
                        itemId: '/reviews'
                    },
                    {
                        title: SidebarItem('Settings', <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>),
                        itemId: '/settings'
                    }
                ]}
                activeItemId={location.pathname}
                onChange={({ event, item }) => {
                    event.preventDefault();
                    history.push(item.itemId);
                }}
                overrides={{
                    NavItem: {
                        style: ({ $active, $theme }) => {
                            const textColor = darkTheme ? $theme.colors.primaryA : $theme.colors.accent;
                            const borderColor = $theme.colors.accent;
                            const bgColor = $theme.colors.backgroundLightAccent;
                            if ($active) {
                                return {
                                    color: textColor,
                                    backgroundColor: bgColor,
                                    backgroundImage: 'none',
                                    borderRightWidth: '4px',
                                    borderLeftWidth: '0',
                                    borderRightColor: borderColor,
                                    ':hover': {
                                        color: textColor
                                    }
                                };
                            }
                            return {
                                borderLeftWidth: '0',
                                ':hover': {
                                    color: textColor
                                }
                            };
                        }
                    }
                }}
            />

            <div className="flex-1"></div>

            <Button
                kind="minimal"
                overrides={{
                    Root: {
                        style: {
                            marginLeft: '24px',
                            marginRight: '24px',
                            marginBottom: '14px'
                        }
                    }
                }}
                startEnhancer={() => {
                    return (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                    );
                }}
                onClick={toggleTheme}
            >
                Toggle Theme
            </Button>

            <Button
                kind="secondary"
                startEnhancer={() => {
                    return (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                    );
                }}
                overrides={{
                    Root: {
                        style: {
                            marginLeft: '24px',
                            marginRight: '24px',
                            marginBottom: '24px'
                        }
                    }
                }}
                onClick={doLogout}
            >
                Logout
            </Button>
        </div>
    );
}
