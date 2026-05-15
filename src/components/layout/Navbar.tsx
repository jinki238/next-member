import Link from "next/link";
import styles from "./Navbar.module.css";
import {
  Home,
  Users,
  UserPlus,
  Briefcase,
  UserCheck,
  GraduationCap
} from "lucide-react";

const Navbar = () => {
  const menuItems = [
    { name: "홈", href: "/", icon: <Home size={20} /> },
    { name: "회원관리", href: "/member", icon: <Users size={20} /> },
    { name: "회원가입", href: "/member/register", icon: <UserPlus size={20} /> },
    { name: "사원관리", href: "/emp", icon: <Briefcase size={20} /> },
    { name: "사원입력", href: "/emp/register", icon: <UserCheck size={20} /> },
  ];

  return (
    <nav className={styles.sidebar}>
      {/* 상단 로고 영역 */}
      <div className={styles.logoBox}>
        <div className={styles.logoIcon}>
          <GraduationCap size={24} />
        </div>
        <div>
          <p className={styles.logoTitle}>서울 IT 학원</p>
          <p className={styles.logoSub}>Seoul IT Academy</p>
        </div>
      </div>

      {/* 메뉴 */}
      <div className={styles.menuArea}>
        {menuItems.map((item) => (
          <Link key={item.href} href={item.href} className={styles.navItem}>
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.text}>{item.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;