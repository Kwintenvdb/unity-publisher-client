import React from 'react';
import { useMutation } from 'react-query';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../authentication/AuthContext';
import { logout } from '../../api/authentication';
import { Navigation } from 'baseui/side-navigation';
import { Button } from 'baseui/button';

export function Sidebar() {
    const location = useLocation();
    const history = useHistory();
    const { setAuthenticated } = useAuth();
    const [logoutMutation] = useMutation(logout);

    const doLogout = async () => {
        await logoutMutation();
        setAuthenticated(false);
    };

    return (
        <div className="w-64 h-full flex flex-col bg-white border-r">
            <h2 className="font-semibold text-lg mb-6 text-center mt-4">
                Unity Publisher Client
            </h2>

            <Navigation
                items={[
                    {
                        title: 'Home',
                        itemId: '/'
                    },
                    {
                        title: 'Packages',
                        itemId: '/packages'
                    },
                    {
                        title: 'Reviews',
                        itemId: '/reviews'
                    },
                    {
                        title: 'Settings',
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
                            const activeColor = $theme.colors.accent;
                            const bgColor = $theme.colors.accent50;
                            if ($active) {
                                return {
                                    color: activeColor,
                                    backgroundColor: bgColor,
                                    backgroundImage: 'none',
                                    borderRightWidth: '4px',
                                    borderLeftWidth: '0',
                                    borderRightColor: activeColor,
                                    ':hover': {
                                        color: activeColor
                                    }
                                };
                            }
                            return {
                                borderLeftWidth: '0',
                                ':hover': {
                                    color: activeColor
                                }
                            };
                        }
                    }
                }}
            />

            <div className="flex-1"></div>

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
