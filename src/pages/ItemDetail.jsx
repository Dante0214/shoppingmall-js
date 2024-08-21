import {
  Button,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ItemDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setSelectedSize(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSelectedSize("");
  };
  const getItem = async () => {
    setLoading(true);
    try {
      const url = `https://my-json-server.typicode.com/Dante0214/shoppingmall-js/products/${id}`;
      const res = await fetch(url);
      const data = await res.json();
      setItem(data);
    } catch (error) {
      setError("불러오기 실패");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getItem();
  }, [id]);

  if (loading || item == null) return <CircularProgress />;

  return (
    <Container>
      {error ? (
        <Alert severity="error" className="text-center">
          {error}
        </Alert>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <img
              src={item.img}
              alt={item.title}
              style={{ width: "100%", height: "80%" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              {item.title}
            </Typography>
            <Typography variant="h6" gutterBottom>
              ₩ {item.price}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {item.choice ? "Conscious choice" : ""}
            </Typography>
            <form onSubmit={handleSubmit}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="select-size-label">사이즈 선택</InputLabel>
                <Select
                  labelId="select-size-label"
                  value={selectedSize}
                  onChange={handleChange}
                  label="사이즈 선택"
                >
                  {item.size &&
                    item.size.map((size) => (
                      <MenuItem key={size} value={size}>
                        {size}
                      </MenuItem>
                    ))}
                </Select>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{ mt: 2 }}
                >
                  담기
                </Button>
              </FormControl>
            </form>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default ItemDetail;
