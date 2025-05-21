import React from "react";
import { useNavigate } from "react-router-dom";
import { Badge, IconButton, Tooltip } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../context/CartContext";

const CartIcon = () => {
  const navigate = useNavigate();
  const { cart } = useCart();

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Tooltip title="View Cart">
      <IconButton
        color="inherit"
        onClick={() => navigate("/cart")}
        sx={{ ml: 2 }}
      >
        <Badge badgeContent={itemCount} color="error">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </Tooltip>
  );
};

export default CartIcon;
