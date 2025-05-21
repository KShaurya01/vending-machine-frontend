import React from "react";
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch, useSelector } from "react-redux";
import { incrementQuantity, decrementQuantity } from "../store/quantitySlice";

const QuantityCounter = ({
  itemId,
  maxQuantity,
  minQuantity = 1,
  size = "medium",
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const quantity = useSelector(
    (state) => state.quantity[itemId] || minQuantity
  );

  const handleIncrement = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (quantity < maxQuantity) {
      dispatch(incrementQuantity({ itemId, maxQuantity }));
    }
  };

  const handleDecrement = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (quantity > minQuantity) {
      dispatch(decrementQuantity({ itemId }));
    }
  };

  const isSmall = size === "small";
  const buttonSize = isSmall ? "small" : "medium";
  const typographyVariant = isSmall ? "body1" : "h6";

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        overflow: "hidden",
        width: isSmall ? "fit-content" : "100%",
        backgroundColor: "background.paper",
        minWidth: isSmall ? "120px" : "150px",
        userSelect: "none",
      }}
    >
      <IconButton
        size={buttonSize}
        onClick={handleDecrement}
        onMouseDown={(e) => e.preventDefault()}
        disabled={quantity <= minQuantity}
        sx={{
          borderRadius: 0,
          color: quantity <= minQuantity ? "text.disabled" : "primary.main",
          "&:hover": {
            backgroundColor: "action.hover",
          },
          minWidth: isSmall ? "36px" : "48px",
          height: isSmall ? "36px" : "48px",
          transition: "all 0.2s ease",
          "&:active": {
            backgroundColor: "action.selected",
          },
        }}
      >
        <RemoveIcon fontSize={isSmall ? "small" : "medium"} />
      </IconButton>

      <Typography
        variant={typographyVariant}
        sx={{
          px: isSmall ? 1 : 2,
          minWidth: isSmall ? "32px" : "40px",
          textAlign: "center",
          fontWeight: 500,
          flex: 1,
        }}
      >
        {quantity}
      </Typography>

      <IconButton
        size={buttonSize}
        onClick={handleIncrement}
        onMouseDown={(e) => e.preventDefault()}
        disabled={quantity >= maxQuantity}
        sx={{
          borderRadius: 0,
          color: quantity >= maxQuantity ? "text.disabled" : "primary.main",
          "&:hover": {
            backgroundColor: "action.hover",
          },
          minWidth: isSmall ? "36px" : "48px",
          height: isSmall ? "36px" : "48px",
          transition: "all 0.2s ease",
          "&:active": {
            backgroundColor: "action.selected",
          },
        }}
      >
        <AddIcon fontSize={isSmall ? "small" : "medium"} />
      </IconButton>
    </Box>
  );
};

export default QuantityCounter;
