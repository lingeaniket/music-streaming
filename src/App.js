import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Components/Home/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
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
