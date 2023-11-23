import React from 'react';
import {Link, Outlet} from 'react-router-dom';
import {AppBar, Container, Toolbar, Box} from "@mui/material";
import {Routes} from "../pages/router";

const MainLayout: React.FC = () => {
    return (
            <Box minHeight="100vh" bgcolor="secondary.light">
            <AppBar component="nav" position="sticky" color={"secondary"} >
                <Container maxWidth="xl" >
                    <Toolbar disableGutters>
                        <Link to={Routes.ROOT}>
                            <img src={"/logo.png"} alt="logo" width={150}/>
                        </Link>
                    </Toolbar>
                </Container>
            </AppBar>
            <Container maxWidth="lg" component="main" >
                <Box paddingY={4} >
                    <Outlet/>
                </Box>
            </Container>
        </Box>
    );
};

export default MainLayout;
