import React from 'react';
import { useMutation } from 'react-query';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
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
                                    // backgroundColor: 'red',
                                    color: activeColor
                                }
                            };
                        }
                    }
                }}
            />

            {/* <NavLink to="/" exact className="sidebar-item">
                <div className="flex space-x-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                    <span>
                        Home
                    </span>
                </div>
            </NavLink>
            <NavLink to="/reviews" strict className="sidebar-item">
                <div className="flex space-x-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
                    <span>
                        Reviews
                    </span>
                </div>
            </NavLink>
            <NavLink to="/settings" strict className="sidebar-item">
                <div className="flex space-x-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    <span>
                        Settings
                    </span>
                </div>
            </NavLink> */}

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
