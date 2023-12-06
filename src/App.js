import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Components/Home/Home";
import LandingPage from "./Components/LandingPage/LandingPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        children: [
            {
                path: "/",
                element: <LandingPage/>
            }
        ]
    },
]);

const App = () => {
    return (
        <div>
            <RouterProvider router={router}></RouterProvider>
        </div>
    );
};

export default App;
