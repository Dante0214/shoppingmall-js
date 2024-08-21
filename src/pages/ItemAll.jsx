import React, { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import { Container, Grid } from "@mui/material";
import { useSearchParams } from "react-router-dom";

const ItemAll = () => {
  const [itemList, setItemList] = useState([]);
  const [query, setQuery] = useSearchParams();
  const getItems = async () => {
    const searchQuery = query.get("q") || "";
    const url = `http://localhost:5000/products?q=${searchQuery}`;
    const res = await fetch(url);
    const data = await res.json();
    setItemList(data);
  };
  useEffect(() => {
    getItems();
  }, [query]);
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
