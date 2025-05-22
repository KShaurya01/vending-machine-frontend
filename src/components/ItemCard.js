import React, { useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Snackbar,
  Alert,
  Box,
  useTheme,
  useMediaQuery,
  IconButton,
  Fade,
  Zoom,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../context/CartContext";
import { useSelector } from "react-redux";

const ItemCard = ({ item, onAddToCart }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isInCart, setIsInCart] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const quantity = useSelector((state) => state.quantity[item._id] || 1);
  const { incrementQuantity, decrementQuantity, cart } = useCart();

  // Check if item is in cart
  useEffect(() => {
    const itemInCart = cart.find((cartItem) => cartItem._id === item._id);
    setIsInCart(!!itemInCart);
  }, [cart, item._id]);

  const handleAdd = () => {
    if (quantity <= 0) {
      setError("Quantity must be greater than 0");
      return;
    }

    if (quantity > item.available_units) {
      setError(`Only ${item.available_units} items available`);
      return;
    }

    try {
      onAddToCart({ ...item, quantity });
      setShowSuccess(true);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const getMaxQuantity = () => {
    const remainingQuantity = item.available_units;
    return Math.max(0, remainingQuantity);
  };

  return (
    <Zoom in={true}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
          transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: theme.shadows[8],
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            paddingTop: "100%",
            overflow: "hidden",
          }}
        >
          <CardMedia
            component="img"
            image={item.display_image_url}
            alt={item.name}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain",
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          />
        </Box>
        <CardContent
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            gap: 1,
            p: isMobile ? 2 : 3,
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            sx={{
              fontWeight: 600,
              fontSize: isMobile ? "1.1rem" : "1.25rem",
              lineHeight: 1.2,
            }}
          >
            {item.name}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
              ₹{item.price}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                backgroundColor: "action.hover",
                px: 1,
                py: 0.5,
                borderRadius: 1,
              }}
            >
              {item.available_units} left
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
              mt: "auto",
            }}
          >
            {!isInCart ? (
              <Button
                variant="contained"
                onClick={handleAdd}
                disabled={quantity < 1 || quantity > getMaxQuantity()}
                fullWidth
                startIcon={<ShoppingCartIcon />}
                sx={{
                  minWidth: isMobile ? "100px" : "120px",
                  height: "40px",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
              >
                {isMobile ? "Add" : "Add to Cart"}
              </Button>
            ) : (
              <Fade in={isInCart}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={() => decrementQuantity(item._id)}
                    sx={{
                      backgroundColor: "action.hover",
                      "&:hover": {
                        backgroundColor: "action.selected",
                      },
                    }}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography
                    variant="h6"
                    sx={{
                      minWidth: "40px",
                      textAlign: "center",
                      fontWeight: 600,
                    }}
                  >
                    {quantity}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() =>
                      incrementQuantity(item._id, getMaxQuantity())
                    }
                    sx={{
                      backgroundColor: "action.hover",
                      "&:hover": {
                        backgroundColor: "action.selected",
                      },
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
              </Fade>
            )}
          </Box>
        </CardContent>

        <Snackbar
          open={showSuccess}
          autoHideDuration={3000}
          onClose={() => setShowSuccess(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            severity="success"
            onClose={() => setShowSuccess(false)}
            sx={{ width: "100%" }}
          >
            Added to cart successfully!
          </Alert>
        </Snackbar>
      </Card>
    </Zoom>
  );
};

export default ItemCard;
