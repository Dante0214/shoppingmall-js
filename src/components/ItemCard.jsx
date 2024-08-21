import React from "react";
import { useNavigate } from "react-router-dom";

const ItemCard = ({ item }) => {
  const nav = useNavigate();
  const showDetail = () => {
    nav(`/item/${item.id}`);
  };
  return (
    <div className="card" onClick={showDetail}>
      <img src={item.img} alt={item.id} />

      <div>{item?.choice ? "Conscious choice" : ""}</div>
      <div>{item?.title}</div>
      <div>₩{item?.price}</div>
      <div>{item?.new ? "신제품" : ""}</div>
    </div>
  );
};

export default ItemCard;
