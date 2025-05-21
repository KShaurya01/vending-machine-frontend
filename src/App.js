import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  Container,
  CssBaseline,
  ThemeProvider,
  AppBar,
  Toolbar,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  Badge,
  IconButton,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryList from "./pages/InventoryList";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import { CartProvider, useCart } from "./context/CartContext";
import theme from "./theme";

const Header = () => {
  const { cartCount } = useCart();

  return (
    <AppBar position="sticky" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            color: "inherit",
            fontWeight: 600,
          }}
        >
          Vending Machine
        </Typography>
        <IconButton component={Link} to="/cart" color="inherit" sx={{ ml: 2 }}>
          <Badge badgeContent={cartCount} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

const AppContent = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CartProvider>
        <Router>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
              backgroundColor: "background.default",
            }}
          >
            <Header />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                py: isMobile ? 2 : 4,
                px: isMobile ? 1 : 2,
              }}
            >
              <Routes>
                <Route path="/" element={<InventoryList />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/success" element={<Success />} />
              </Routes>
            </Box>
          </Box>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
};

const App = () => {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
};

export default App;
