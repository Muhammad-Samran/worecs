import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Main from "../../components/order_details/all-candidates/index";
import { singleOrder } from "../../store/actions/orderActions";
const OrderDetail = () => {
  const orders = useSelector((state) => state?.rorders);
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    if (Object?.keys(orders?.singleOrder).length === 0) {
      dispatch(singleOrder({ plan_id: location?.state?.id }));
    }
  }, [location]);
  return (
    <div>
      <Main />
    </div>
  );
};

export default OrderDetail;
