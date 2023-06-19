import { Tooltip } from "@material-ui/core";
import {
  AirlineSeatReclineNormalOutlined,
  DashboardOutlined,
  KeyboardArrowLeftOutlined,
  KeyboardArrowRightOutlined,
  LocalShippingOutlined,
  LocationOnOutlined,
  PeopleAltOutlined,
} from "@material-ui/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styles from "../styles.module.css";

const menuOptions = [
  { name: "Dashboard", icon: <DashboardOutlined />, path: "/" },
  { name: "Clientes", icon: <PeopleAltOutlined />, path: "/clientes" },
  {
    name: "Condutores",
    icon: <AirlineSeatReclineNormalOutlined />,
    path: "/condutores",
  },
  {
    name: "Deslocamentos",
    icon: <LocationOnOutlined />,
    path: "/deslocamentos",
  },
  { name: "Veículos", icon: <LocalShippingOutlined />, path: "/veiculos" },
];

interface Props {
  title?: string;
}

const SideMenu = ({ title }: Props) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={isOpen ? styles.sidenav : styles.sidenavClosed}>
      <div className={styles.sideHeader}>
        <button className={styles.menuBtn} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <KeyboardArrowLeftOutlined />
          ) : (
            <KeyboardArrowRightOutlined />
          )}
        </button>

        {isOpen && <h3>{title}</h3>}
      </div>

      {menuOptions.map((option, index) => (
        <Tooltip title={!isOpen ? option.name : ""} placement="right" key={index}>
          <Link
            href={option.path}
            className={
              pathname === option.path ? styles.activeSideItem : styles.sideitem
            }
          >
            {option.icon}
            {isOpen && <span className={styles.linkText}>{option.name}</span>}
          </Link>
        </Tooltip>
      ))}
    </div>
  );
};

export default SideMenu;
