import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import Home from "./Components/Home/Home";
import LandingPage from "./Components/LandingPage/LandingPage";
import store from "./Store/store";
import Album from "./Components/Album/Album";

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
                path: "/album/:albumName/:albumId",
                element: <Album />,
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
