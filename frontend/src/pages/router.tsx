import React, {Suspense} from "react";
import { Outlet, RouteObject, useRoutes, BrowserRouter } from 'react-router-dom';

import CircularProgress from '@mui/material/CircularProgress';

import IndexPage from "./IndexPage"


export const  Routes = {
    ROOT: "/",
};

export const InnerRouter: React.FC = () => {
    const routes: RouteObject[] = [
        {
            path: '/',
            // TODO: add layout component
            element: <div><Outlet/></div>,
            children: [
                {
                    index: true,
                    element: <IndexPage/>,
                }, {
                    path: '*',
                    element: <div>ERROR 404</div>, // TODO: add error screen
                },
            ],
        }
    ];
    const element = useRoutes(routes);
    return (
        <Suspense fallback={<CircularProgress/>}>{element}</Suspense>
    );
}

export const Router = () => {
    return (
        <BrowserRouter>
            <InnerRouter />
        </BrowserRouter>
    );
};