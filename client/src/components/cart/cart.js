import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch, useSelector } from "react-redux";
import {
  decrease,
  increase,
  removeItem,
  calculateTotal,
} from "../../features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  const { cartItems, total } = useSelector((state) => state.cart);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Souled Store
          </Typography>

          <Button color="inherit" onClick={() => navigate("/")}>
            Back to Home
          </Button>
          <Button color="inherit" onClick={logOut}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <div className="w-50 mx-auto shadow">
        {!!cartItems.length ? (
          <div>
            <Typography
              variant="h4"
              align="center"
              className="mt-5"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Items in your cart
            </Typography>
            {cartItems.map((product) => (
              <div className="d-flex justify-content-between mt-2">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  width="300px"
                  height="200px"
                />
                <Typography variant="h5" color="text.secondary">
                  {product.title}
                </Typography>
                <Typography variant="h5" color="text.secondary">
                  ${product.price}
                </Typography>
                <div className="d-flex justify-content-between align-items-center">
                  <RemoveIcon
                    className="rounded-circle shadow"
                    onClick={() => {
                      if (product.amount === 1) {
                        dispatch(removeItem(product.id));
                      } else {
                        dispatch(decrease(product.id));
                      }
                      dispatch(calculateTotal());
                    }}
                  />
                  <Typography
                    variant="h6"
                    component="div"
                    className="mx-2"
                    sx={{ flexGrow: 1 }}
                  >
                    {product.amount}
                  </Typography>
                  <AddIcon
                    className="rounded-circle shadow"
                    onClick={() => {
                      dispatch(increase(product.id));
                      dispatch(calculateTotal());
                    }}
                  />
                </div>
              </div>
            ))}
            <Typography
              variant="h4"
              className="p-2"
              component="div"
              align="center"
              sx={{ flexGrow: 1 }}
            >
              Total Payable amount: ${total}
            </Typography>
          </div>
        ) : (
          <Typography
            variant="h4"
            className="p-2"
            component="div"
            align="center"
            sx={{ flexGrow: 1 }}
          >
            Your cart is currently empty
          </Typography>
        )}
      </div>
    </>
  );
};

export default Cart;
