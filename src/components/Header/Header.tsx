import { useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import { GET_NAVIGATION_ITEMS } from "./constants";
import Button from "../Button/Button";
import { useContext } from "react";
import { UserContext } from "../../context/User/UserContext";
import { IUserContext } from "../../context/User/UserContext.type";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

const Header = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const handleNavigate = (path: string) => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}> Renvest </div>
      <nav className={styles.navbar}>
        {GET_NAVIGATION_ITEMS(Boolean(user)).map(({ title, path }, index) => (
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
        {user && (
          <Button onClick={() => handleNavigate("/add-listing")}>
            + Add Listing
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
