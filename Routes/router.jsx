import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../Pages/Home/Home';
import { Root } from '../Pages/Root/Root';
import { ErrorPage } from '../Pages/EorrorPage/ErrorPage';

import { Registration } from '../src/Component/LoginAndRegister/RegistrationForm';
import { Login } from '../src/Component/LoginAndRegister/Login';
import { AddFood } from '../src/Component/AddFood/AddFood';
import FridgePage from '../src/Component/Fridge/FridgePage';
import SingleFoodItem from '../src/Component/SingleItem/SingleFoodItem';
import { MyItem } from '../src/Component/MyItem/MyItem';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Registration />
      },
      {
        path: "add-food",
        element: <AddFood />
      },
      {
        path: "fridge",
        element: <FridgePage />
      },
      {
        path: "food/:id",
        element: <SingleFoodItem />
      },
     {
      path:"my-items",
      element: <MyItem></MyItem>
     }
    ]
  }
]);