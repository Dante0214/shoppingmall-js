import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { signOut } from "../services/authService";

const Navbar = ({ login, setLogin, displayName }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");

  const menuList = [
    "여성",
    "Divided",
    "남성",
    "신생아/유아",
    "아동",
    "H&M HOME",
    "Sale",
    "지속가능성",
  ];
  const nav = useNavigate();

  const search = (e) => {
    if (e.key === "Enter") {
      const keyword = e.target.value;

      nav(`/?q=${keyword}`);
    }
  };

  const toggleDrawer = (open) => (e) => {
    setIsDrawerOpen(open);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      setLogin(false);
      nav("/");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <div>
      <div className="login-container">
        <div className="login-box">
          {displayName && <div>{`Welcome, ${displayName}!`}</div>}
          <div className="icon-and-buttons">
            <FontAwesomeIcon icon={faUser} className="user-icon" />
            {login ? (
              <div className="logout-btn" onClick={handleLogout}>
                로그아웃
              </div>
            ) : (
              <div className="login-btn" onClick={() => nav("/login")}>
                로그인
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="nav-section">
        <img
          width={100}
          src="https://logos-world.net/wp-content/uploads/2020/04/HM-Logo-1999-present.jpg"
          alt="logo"
          onClick={() => nav("/")}
        />
      </div>
      <div className="search-section">
        <div className="search-box">
          <FontAwesomeIcon icon={faSearch} />
          <input type="text" onKeyPress={(e) => search(e)} />
        </div>
      </div>
      {!isMobile && (
        <div className="menu-area">
          <ul className="menu-list">
            {menuList.map((menu, index) => (
              <li key={index} onClick={() => console.log(menu)}>
                {menu}
              </li>
            ))}
          </ul>
        </div>
      )}
      {isMobile && (
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
          sx={{ mx: 1 }}
        >
          <MenuIcon />
        </IconButton>
      )}
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <List>
          {menuList.map((menu, index) => (
            <ListItem button key={index} onClick={() => console.log(menu)}>
              <ListItemText primary={menu} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default Navbar;
