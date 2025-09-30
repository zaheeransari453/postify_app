import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import styles from "./Notification.module.css";
import { notificationSliceAction } from "../../store/reducers/notificationSlice";

const Notification = () => {
  const { message } = useSelector((store) => store.notification);
  const dispatch = useDispatch();
  // console.log(message);
  useEffect(() => {
    if (message) {
      const timer = setTimeout(
        () => dispatch(notificationSliceAction.clearNotification()),
        1500
      );
      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  if (!message) return null;

  return (
    <>
      {message && (
        <div className={`${styles.notificationDialog}`}>
          <p>{message}</p>
        </div>
      )}
    </>
  );
};

export default Notification;
