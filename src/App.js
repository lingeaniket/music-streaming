import React from "react";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./Components/Home/Home";
import Details from "./Components/Details/Details";
import UserTab from "./Components/UserTab/UserTab";
import LandingPage from "./Components/LandingPage/LandingPage";

import store from "./Store/store";
import Search from "./Components/Search/Search";
import ViewAll from "./Components/Search/ViewAll/ViewAll";
import Library from "./Components/Library/Library";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        children: [
            {
                path: "/",
                element: <LandingPage />,
            },
            {
                path: "/album/:name/:id",
                element: <Details type="album" />,
            },
            {
                path: "/song/:name/:id",
                element: <Details type="song" />,
            },
            {
                path: "/featured/:name/:id",
                element: <Details type="playlist" />,
            },
            {
                path: "/search",
                element: <Search />,
            },
            {
                path: "/my-list/:id",
                element: <UserTab />,
            },
            {
                path: "/search/:type/:key",
                element: <ViewAll />,
            },
            {
                path: "/library/:type",
                element: <Library />,
            },
        ],
    },
]);

const App = () => {
    return (
        <div>
            <Provider store={store}>
                <RouterProvider router={router}></RouterProvider>
            </Provider>
        </div>
    );
};

export default App;
