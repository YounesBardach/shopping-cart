import { Link } from "react-router-dom";
import styles from "../styles/NavBar.module.css";
import { useCart } from "../hooks/useCart"; // Import the useCart hook

const NavBar = (): JSX.Element => {
  const { getTotalQuantity } = useCart(); // Get total quantity from the cart hook

  const totalQuantity = getTotalQuantity(); // Calculate total quantity

  return (
    <nav className={styles.flexnav}>
      <ul className={styles["flexnav__list"]}>
        <li className={styles["flexnav__item"]}>
          <Link to="/" className={styles["flexnav__link"]}>
            Home
          </Link>
        </li>
        <li className={styles["flexnav__item"]}>
          <Link to="/cart" className={styles["flexnav__link"]}>
            Cart
            {totalQuantity > 0 && (
              <span className={styles.cartCount}>{totalQuantity}</span>
            )}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
