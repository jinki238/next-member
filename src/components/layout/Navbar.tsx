import Link from "next/link";
import styles from "./Navbar.module.css"; // ⭐ CSS 모듈 import
import { Home, Users, UserPlus, Box, Briefcase, UserCheck } from "lucide-react";

const Navbar = () => {
  const menuItems = [
    { name: "홈", href: "/", icon: <Home size={20} /> },
    { name: "회원관리", href: "/member", icon: <Users size={20} /> },
    { name: "회원가입", href: "/member/register", icon: <UserPlus size={20} /> },
    { name: "사원관리", href: "/emp", icon: <Briefcase size={20} /> },
    { name: "사원입력", href: "/emp/register", icon: <UserCheck size={20} /> },
    // { name: "제품관리", href: "/product", icon: <Box size={20} /> }
  ];
  return (
    <nav className={styles.sidebar}> {/* ⭐ styles.클래스명 사용 */}
      {menuItems.map((item) => (
        <Link key={item.href} href={item.href} className={styles.navItem}>
          <span className={styles.icon}>{item.icon}</span>
          <span className={styles.text}>{item.name}</span>
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;