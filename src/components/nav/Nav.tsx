import Link from "next/link";
import { MdOutlineFlagCircle, MdMenuBook } from "react-icons/md";
import { geistMono } from "@/app/ui/fonts";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div className={`${styles.sidebar} bg-white shadow-lg shadow-gray-500/30`}>
      <div className={styles.logo}>
        <h2>Rocket Dashboard</h2>
      </div>
      <nav>
        <ul className={`${geistMono.className} font-bold`}>
          <li>
            <Link href="/dashboard">
              <div className="flex items-center hover:text-purple-800">
                <MdOutlineFlagCircle className="text-2xl mr-5" />
                <span>DASHBOARD</span>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/courses">
              <div className="flex items-center">
                <MdMenuBook className="text-2xl mr-5" />
                <span>COURSES</span>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/notes">
              <div className="flex items-center">
                {/* Insert your icon here */}
                <span>Study Notes</span>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/events">
              <div className="flex items-center">
                {/* Insert your icon here */}
                <span>Events</span>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/resources">
              <div className="flex items-center">
                {/* Insert your icon here */}
                <span>Resources</span>
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
