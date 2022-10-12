import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearNotification,
  selectNotification,
} from "../features/notification/notificationSlice";

const Notification = () => {
  const { type, message } = useSelector(selectNotification);
  const timeoutRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [type, message]);

  const notificaitonStyle = {
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: type === "error" ? "red" : "green",
    display: message ? "" : "none",
  };

  return <div style={notificaitonStyle}>{message}</div>;
};

export default Notification;
