import React, { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import { Container, Grid } from "@mui/material";

const ItemAll = () => {
  const [itemList, setItemList] = useState([]);

  const getItems = async () => {
    const url = "http://localhost:5000/products";
    const res = await fetch(url);
    const data = await res.json();
    setItemList(data);
  };
  useEffect(() => {
    getItems();
  }, []);
  return (
    <Container>
      <Grid container spacing={2}>
        {itemList.map((item) => (
          <Grid item md={3} sm={12} key={item.id}>
            <ItemCard item={item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ItemAll;
