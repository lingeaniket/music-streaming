import React from "react";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./Components/Home/Home";
import Details from "./Components/Details/Details";
import LandingPage from "./Components/LandingPage/LandingPage";

import store from "./Store/store";
import Search from "./Components/Search/Search";

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
                path: "featured/:name/:id",
                element: <Details type="playlist" />,
            },
            {
                path: 'search',
                element: <Search/>
            }
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
