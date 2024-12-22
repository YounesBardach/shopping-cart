import styles from "../styles/NavBar.module.css";

const NavBar = (): JSX.Element => {

  return (
    <nav className={styles.flexnav}>
      <ul className={styles["flexnav__list"]}>
        <li className={styles["flexnav__item"]}><a className= {styles["flexnav__link"]} href="#">Home</a></li>
        <li className={styles["flexnav__item"]}><a className= {styles["flexnav__link"]} href="#">Cart</a></li>
      </ul>
    </nav>
  );
};

export default NavBar;
