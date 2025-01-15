import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInventory } from "../redux/car/action";

const InventoryList = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.inventory);

  useEffect(() => {
    dispatch(fetchInventory({ color: "Red" }));
  }, [dispatch]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Inventory</h1>
      <ul>
        {items.map(item => (
          <li key={item._id}>{item.title} - {item.oem_spec.color}</li>
        ))}
      </ul>
    </div>
  );
};

export default InventoryList;
