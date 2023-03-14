import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { routes } from "../../routes";
import { ShowAlert } from "../../store/actions/alertActions";

const RejectPage = () => {
  const { userNewId } = useParams();
  const navigate = useNavigate();
  const [show, isShow] = React.useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const acceptUser = async () => {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/new-user/request/deny/${userNewId}`
      );
      const result = await response.data;
      try {
        if (result.success) {
          isShow(result.success);
          dispatch(ShowAlert("User reject", "error"));
        } else {
          // dispatch(ShowAlert("You Have Already Cancel This", "error"));
          isShow(result.success);
          setTimeout(() => {
            navigate(routes.LOGIN);
          }, 3000);
        }
      } catch (e) {
        dispatch(ShowAlert("Something went wrong", "error"));
        navigate(routes.LOGIN);
      }
    };
    acceptUser();
  }, [navigate, dispatch, userNewId]);

  if (show) {
    return <Navigate to={routes.LOGIN} replace />;
  }

  return (
    <div>
      {show
        ? "Redirecting to Login..."
        : "You Have Already Cancel This Redirecting in 2 Seconds"}
    </div>
  );
};

export default RejectPage;
