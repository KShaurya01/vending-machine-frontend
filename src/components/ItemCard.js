import React, { useState } from "react";
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
} from "@mui/material";
import QuantityCounter from "./QuantityCounter";
import { useCart } from "../context/CartContext";
import { useSelector } from "react-redux";

const ItemCard = ({ item, onAddToCart }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const quantity = useSelector((state) => state.quantity[item._id] || 1);

  const handleAdd = () => {
    console.log("handleAdd clicked");
    console.log("Current quantity:", quantity);
    console.log("Item:", item);

    if (quantity <= 0) {
      setError("Quantity must be greater than 0");
      return;
    }

    if (quantity > item.available_units) {
      setError(`Only ${item.available_units} items available`);
      return;
    }

    try {
      console.log("Adding to cart:", { ...item, quantity });
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
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "visible",
      }}
    >
      <CardMedia
        component="img"
        height={isMobile ? "160" : "200"}
        image={item.display_image_url}
        alt={item.name}
        sx={{
          objectFit: "cover",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      />
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
            {item.available_units} available
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
          <QuantityCounter
            itemId={item._id}
            maxQuantity={getMaxQuantity()}
            size="small"
          />
          <Button
            variant="contained"
            onClick={handleAdd}
            disabled={quantity < 1 || quantity > getMaxQuantity()}
            fullWidth
            sx={{
              minWidth: isMobile ? "100px" : "120px",
              height: "40px",
            }}
          >
            Add to Cart
          </Button>
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
  );
};

export default ItemCard;
