import React from "react";

const ItemCard = ({ item }) => {
  return (
    <div className="card">
      <img src={item.img} alt={item.id} />
      <div>{item?.choice ? "Conscious choice" : ""}</div>
      <div>{item?.title}</div>
      <div>₩{item?.price}</div>
      <div>{item?.new ? "신제품" : ""}</div>
    </div>
  );
};

export default ItemCard;
