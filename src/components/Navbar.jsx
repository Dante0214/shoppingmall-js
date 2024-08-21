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

const Navbar = ({ login, setLogin }) => {
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
  const goToLogin = () => {
    nav("/login");
  };
  const search = (e) => {
    if (e.key === "Enter") {
      const keyword = e.target.value;

      nav(`/?q=${keyword}`);
    }
  };

  const toggleDrawer = (open) => (e) => {
    setIsDrawerOpen(open);
  };

  return (
    <div>
      <div>
        <div className="login-button" onClick={goToLogin}>
          <FontAwesomeIcon icon={faUser} />
          {login ? (
            <div onClick={() => setLogin(false)}>로그아웃</div>
          ) : (
            <div onClick={() => nav("/login")}>로그인</div>
          )}
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
