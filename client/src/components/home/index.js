import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { addToCart, calculateTotal } from "../../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchProducts();
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const fetchProducts = () => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((res) => {
        setProducts(res.products);
      });
  };

  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div>
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
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => navigate("/cart")}
          >
            <ShoppingCartIcon /> {!!cartItems.length && cartItems.length}
          </IconButton>
          <Button color="inherit" onClick={logOut}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <div className="d-flex flex-wrap text-center justify-content-center">
        {!!products.length &&
          products.map((product) => {
            return (
              <Card sx={{ maxWidth: 345, margin: "1rem" }} key={product.id}>
                <CardMedia
                  sx={{ height: 140 }}
                  image={product.thumbnail}
                  title={product.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                </CardContent>
                <CardActions className="d-flex flex-column">
                  <div>
                    <Typography variant="body2" color="text.secondary">
                      Price: ${product.price}
                    </Typography>
                  </div>
                  <Button
                    size="small"
                    onClick={() => {
                      dispatch(addToCart(product));
                      dispatch(calculateTotal())
                    }}
                  >
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
