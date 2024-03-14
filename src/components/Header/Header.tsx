import { useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import { NAVIGATION_ITEMS } from "./constants";
import Button from "../Button/Button";

const Header = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}> Renvest </div>
      <nav className={styles.navbar}>
        {NAVIGATION_ITEMS.map(({ title, path }, index) => (
          <div
            className={styles.navItem}
            key={index}
            onClick={() => handleNavigate(path)}
          >
            {title}
          </div>
        ))}
      </nav>
      <div className={styles.addListing}>
        <Button onClick={() => handleNavigate("/add-listing")}>
          + Add Listing
        </Button>
      </div>
    </header>
  );
};

export default Header;
