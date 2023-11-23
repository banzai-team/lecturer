import React, {Suspense} from "react";
import { RouteObject, useRoutes, BrowserRouter } from 'react-router-dom';

import CircularProgress from '@mui/material/CircularProgress';

import IndexPage from "./IndexPage"
import MainLayout from "../components/MainLayout";
import EmptyPage from "./EmptyPage";


export const  Routes = {
    ROOT: "/",
    LECTURE: "/lecture",
};

const Loading = () => <EmptyPage><CircularProgress color="primary"/></EmptyPage>;

export const InnerRouter: React.FC = () => {
    const routes: RouteObject[] = [
        {
            path: '/',
            element: <MainLayout />,
            children: [
                {
                    index: true,
                    element: <IndexPage/>,
                }, {
                    path: '*',
                    element: <EmptyPage text="ERROR 404"/>,
                },
            ],
        }
    ];
    const element = useRoutes(routes);
    return (
        <Suspense fallback={<Loading/>}>{element}</Suspense>
    );
}

export const Router = () => {
    return (
        <BrowserRouter>
            <InnerRouter />
        </BrowserRouter>
    );
};