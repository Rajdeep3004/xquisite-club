import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Fallback from "./Resuable/Fallback";

const Home = React.lazy(() => import("../routes/Home"));
const Items = React.lazy(() => import("../routes/Items"));
const Upperwear = React.lazy(() => import("../routes/items/Upperwear"));
const Bottomwear = React.lazy(() => import("../routes/items/Bottomwear"));
const Shoes = React.lazy(() => import("../routes/items/Shoes"));
const Order = React.lazy(() => import("../routes/Order"));
const Login = React.lazy(() => import("../routes/Login"));

const MainRoutes = ({ isLoggedIn }) => {
  return (
    <Suspense fallback={<Fallback />}>
      <Routes>
        <Route index element={<Home />} />
        <Route path="*" element={<Navigate to="home" replace={true} />} />
        <Route path="home" element={<Home />} />
        <Route path="items" element={<Items />}>
          <Route
            path="*"
            element={<Navigate to="upperwear" replace={true} />}
          />
          <Route path="upperwear" element={<Upperwear />} />
          <Route path="bottomwear" element={<Bottomwear />} />
          <Route path="shoes" element={<Shoes />} />
        </Route>

        {isLoggedIn && <Route path="order" element={<Order />} />}
        {!isLoggedIn && <Route path="login" element={<Login />} />}
      </Routes>
    </Suspense>
  );
};

export default MainRoutes;
