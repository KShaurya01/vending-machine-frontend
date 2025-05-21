import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Paper,
  Box,
  Divider,
  useTheme,
  useMediaQuery,
  Container,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../context/CartContext";
import QuantityCounter from "../components/QuantityCounter";
import { useDispatch } from "react-redux";
import { removeQuantity, clearQuantities } from "../store/quantitySlice";

const Cart = () => {
  const { cart, clearCart, removeFromCart, updateCartItemQuantity } = useCart();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleBuy = () => {
    // Here you would typically make an API call to process the purchase
    clearCart();
    dispatch(clearQuantities());
    navigate("/success");
  };

  const handleRemove = (itemId) => {
    removeFromCart(itemId);
    dispatch(removeQuantity(itemId));
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: "primary.main",
          }}
        >
          <ShoppingCartIcon />
          Your Cart
        </Typography>
      </Box>

      {cart.length === 0 ? (
        <Paper
          sx={{
            p: 4,
            textAlign: "center",
            backgroundColor: "background.paper",
            borderRadius: 2,
          }}
        >
          <ShoppingCartIcon
            sx={{ fontSize: 60, color: "text.secondary", mb: 2 }}
          />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Your cart is empty
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Looks like you haven't added any items to your cart yet.
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/")}
            sx={{ mt: 2 }}
          >
            Continue Shopping
          </Button>
        </Paper>
      ) : (
        <>
          <Paper
            sx={{
              mb: 3,
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <List sx={{ p: 0 }}>
              {cart.map((item) => (
                <React.Fragment key={item._id}>
                  <ListItem
                    sx={{
                      py: 2,
                      px: isMobile ? 2 : 3,
                      "&:hover": {
                        backgroundColor: "action.hover",
                      },
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 500 }}
                        >
                          {item.name}
                        </Typography>
                      }
                      secondary={
                        <Box
                          sx={{
                            display: "flex",
                            gap: 2,
                            mt: 1,
                            alignItems: "center",
                          }}
                        >
                          <Typography variant="body2" color="text.secondary">
                            ₹{item.price} each
                          </Typography>
                          <QuantityCounter
                            itemId={item._id}
                            maxQuantity={item.available_units}
                            size="small"
                          />
                        </Box>
                      }
                    />
                    <ListItemSecondaryAction
                      sx={{ display: "flex", alignItems: "center", gap: 2 }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 600,
                          color: "primary.main",
                        }}
                      >
                        ₹{item.price * item.quantity}
                      </Typography>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleRemove(item._id)}
                        color="error"
                        sx={{
                          "&:hover": {
                            backgroundColor: "error.lighter",
                          },
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Paper>

          <Paper
            sx={{
              p: 3,
              borderRadius: 2,
              backgroundColor: "background.paper",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography variant="h6">Total Amount:</Typography>
              <Typography variant="h5" color="primary" sx={{ fontWeight: 600 }}>
                ₹{total}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="outlined"
                onClick={() => navigate("/")}
                fullWidth
                sx={{ py: 1.5 }}
              >
                Continue Shopping
              </Button>
              <Button
                variant="contained"
                onClick={handleBuy}
                fullWidth
                sx={{ py: 1.5 }}
              >
                Buy Now
              </Button>
            </Box>
          </Paper>
        </>
      )}
    </Container>
  );
};

export default Cart;
