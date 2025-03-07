import Link from "next/link";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <h2>Student Dashboard</h2>
      </div>
      <nav>
        <ul>
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link href="/courses">Courses</Link>
          </li>
          <li>
            <Link href="/notes">Study Notes</Link>
          </li>
          <li>
            <Link href="/events">Events</Link>
          </li>
          <li>
            <Link href="/resources">Resources</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
