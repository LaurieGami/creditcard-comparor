import * as React from "react";

import { AppBar, Toolbar, Button, Link, Typography } from '@mui/material';

const Header = () => {
    return (
        <AppBar
            position="relative"
            color="default"
            elevation={0}
            sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
            <Toolbar sx={{ flexWrap: 'wrap' }}>
                <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                    Credit Card Comparator
                </Typography>
                <nav>
                    <Link
                        variant="button"
                        color="text.primary"
                        href="#"
                        sx={{ my: 1, mx: 1.5 }}
                    >
                        Credit Cards
                    </Link>
                    <Link
                        variant="button"
                        color="text.primary"
                        href="#"
                        sx={{ my: 1, mx: 1.5 }}
                    >
                        Merchants
                    </Link>
                </nav>
                <Button 
                    href="#" 
                    variant="outlined"
                    sx={{ my: 1, mx: 1.5 }}
                >
                    Login
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
