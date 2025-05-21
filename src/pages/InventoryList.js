import React, { useEffect, useState } from "react";
import { Grid, Typography, CircularProgress } from "@mui/material";
import axios from "axios";
import ItemCard from "../components/ItemCard";
import { useCart } from "../context/CartContext";

const InventoryList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get(
          "https://vendine-backend-1.onrender.com/api/inventory"
        );

        setItems(response.data);
      } catch (error) {
        console.error("Error fetching inventory:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInventory();
    const interval = setInterval(fetchInventory, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading)
    return <CircularProgress sx={{ display: "block", mx: "auto", mt: 4 }} />;

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Vending Machine
      </Typography>
      <Grid container spacing={3}>
        {items.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item._id}>
            <ItemCard item={item} onAddToCart={addToCart} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default InventoryList;
