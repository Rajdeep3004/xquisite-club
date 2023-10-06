import { Fragment, useEffect } from "react";
import Navbar from "./components/Navbar";
import MainRoutes from "./components/MainRoutes";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "./store/authSlice";
import { recActions } from "./store/recSlice";
import Background from "./components/Resuable/Background";
import axios from "axios";
import "./index.css";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const uid = localStorage.getItem("uid");
  const cart = useSelector((state) => state.cart);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const fetchData = useSelector((state) => state.received.fetchData);
  const url = process.env.REACT_APP_BACK_CONNECT || "http://localhost:5000";

  useEffect(() => {
    const isLoggedin = localStorage.getItem("isLoggedIn");
    if (isLoggedin) {
      dispatch(authActions.login());
    }
    navigate("home", { replace: true });
  }, []);

  useEffect(() => {
    localStorage.setItem(`items_${uid}`, JSON.stringify(cart.items));
    localStorage.setItem(`price_${uid}`, cart.totalPrice);
  }, [cart]);

  // fetching data for Previous Orders in order page
  useEffect(() => {
    if (!uid) {
      return;
    }
    axios
      .post(
        `${url}/api/data/fetchData`,
        {
          uid: uid,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => response.data)
      .then((data) => {
        let tempArr = [];
        for (const key in data) {
          tempArr.push({
            id: key,
            cartItems: data[key].cartItems,
            cartTotal: data[key].cartTotal,
          });
        }

        dispatch(recActions.setData(tempArr));
      })
      .catch((error) => alert(`Previous orders --- ${error.message}`));
  }, [fetchData, isLoggedIn]);

  return (
    <Fragment>
      <Background />
      <Navbar />
      <MainRoutes isLoggedIn={isLoggedIn} />
    </Fragment>
  );
}

export default App;
