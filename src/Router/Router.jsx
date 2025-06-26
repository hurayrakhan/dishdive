import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import HomePage from "../pages/HomePage";
import AllRecipes from "../pages/AllRecipes";
import AddRecipe from "../pages/addRecipe";
import MyRecipes from "../pages/MyRecipes";
import AboutUs from "../pages/AboutUs";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ErrorPage from "../pages/ErrorPage";
import Loading from "../Components/Loading";
import RecipeDetails from "../pages/RcipeDetails";
import PrivateRouter from "./PrivateRouter";
import Profile from "../pages/Profile";
import { Suspense } from "react";
import Dashboard from "../pages/Dashboard";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <HomePage></HomePage>
            },
            {
                path: '/allRecipes',
                loader: () => fetch('https://assignment-10-server-lime-beta.vercel.app/recipes'),
                hydrateFallbackElement: <Loading></Loading>,
                element: <AllRecipes></AllRecipes>
            },
            {
                path: '/addRecipe',
                element: <PrivateRouter><AddRecipe></AddRecipe></PrivateRouter>
            },
            {
                path: '/myRecipes',
                element:  <PrivateRouter><MyRecipes></MyRecipes></PrivateRouter>
            },
            {
                path: '/aboutUs',
                element: <AboutUs></AboutUs>
            },
            {
                path: '/recipes/:id',
                loader: ({params}) => fetch(`https://assignment-10-server-lime-beta.vercel.app/recipes/${params.id}`),
                hydrateFallbackElement: <Loading></Loading>,
                element: <RecipeDetails></RecipeDetails>
            },
            {
                path: "/profile",
                element: <PrivateRouter><Profile></Profile></PrivateRouter>
            },
            {
                path: '/dashboard',
                element: <PrivateRouter><Dashboard></Dashboard></PrivateRouter>
            }
        ]
    },
    {
        path: '/login',
        element: <Login></Login>
    },
    {
        path: '/register',
        element: <Register></Register>
    }
]);


export default router;