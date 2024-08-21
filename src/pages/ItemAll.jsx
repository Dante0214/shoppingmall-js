import React, { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import { CircularProgress, Container, Grid } from "@mui/material";
import { useSearchParams } from "react-router-dom";

const ItemAll = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [itemList, setItemList] = useState([]);
  const [query, setQuery] = useSearchParams();
  const getItems = async () => {
    setLoading(true);
    try {
      const searchQuery = query.get("q") || "";
      const url = `https://my-json-server.typicode.com/Dante0214/shoppingmall-js/products?q=${searchQuery}`;
      const res = await fetch(url);
      const data = await res.json();
      setItemList(data);
    } catch (error) {
      setError("불러오기 실패");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getItems();
  }, [query]);
  if (loading || itemList == null) return <CircularProgress />;
  return (
    <Container>
      {error ? (
        <Alert severity="error" className="text-center">
          {error}
        </Alert>
      ) : (
        <Grid container spacing={2}>
          {itemList.map((item) => (
            <Grid item md={3} sm={12} key={item.id}>
              <ItemCard item={item} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ItemAll;
