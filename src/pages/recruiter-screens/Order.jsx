import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Main from "../../components/orders/all-candidates/index";
import { getOrderList } from "../../store/actions/orderActions";
const Order = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderList());
  }, []);
  return (
    <div>
      <Main />
    </div>
  );
};

export default Order;
