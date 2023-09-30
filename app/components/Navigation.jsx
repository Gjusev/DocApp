import { useContext } from "react";
import Link from "next/link";
import styles from "./Navigation.module.css";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../../firebase/firebase";
const linksU = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "About",
    route: "/about",
  },
];

const linksN = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "About",
    route: "/about",
  },
  {
    label: "Process",
    route: "/process",
  },
];

const Navigation = () => {
  const { currentUser } = useContext(AuthContext);
  const links = currentUser !== null ? linksN : linksU;

  const handleLogOut = () => {
    auth.signOut();
    window.location.href = "/";
  };

  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.navigation}>
          {links.map(({ label, route }) => (
            <li key={route}>
              <Link href={route}>{label}</Link>
            </li>
          ))}
          {currentUser !== null && ( // <-- Verifica aquí si currentUser no es null
            <li>
              <button
                className="text-white bg-slate-800 hover:underline"
                onClick={handleLogOut}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};
export default Navigation;
