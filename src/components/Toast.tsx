import styles from "../styles/Toast.module.css";

interface ToastProps {
  message: string;
}

const Toast = ({ message }: ToastProps): JSX.Element => {
  return (
    <div className={styles.toast}>
      <p>{message}</p>
    </div>
  );
};

export default Toast;
