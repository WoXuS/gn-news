import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AppBar, Toolbar, IconButton } from "@mui/material";
import { GridView, FormatListBulleted, Help, Menu } from "@mui/icons-material";

import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { viewTypeActions } from "../../redux/viewTypeSlice";

import Popup from "../popup/Popup";
import LanguageSelector from "../language-selector/LanguageSelector";
import styles from "./Header.module.css";
import logo from "./logo.png";

interface HeaderProps {
  toggleDrawer: () => void;
}
const Header = ({ toggleDrawer }: HeaderProps) => {
  const viewType = useAppSelector((state) => state.viewType.viewType);
  const language = useAppSelector((state) => state.language.language);
  const dispatch = useAppDispatch();
  const [popupOpen, setPopupOpen] = useState<boolean>(false);
  const location = useLocation();

  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  const handlePopupOpen = () => {
    setPopupOpen(true);
  };

  const handlePopupClose = () => {
    setPopupOpen(false);
  };

  const handleViewTypeChange = () => {
    dispatch(viewTypeActions.handleViewTypeChange());
  };
  return (
    <AppBar position="static" color="secondary" sx={{ marginBottom: 3 }}>
      <Toolbar sx={{ maxWidth: "1200px", margin: "0 auto" }}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={toggleDrawer}
        >
          <Menu />
        </IconButton>
        <Link to="/" className={styles.navLink}>
          <img className={styles.navLogo} src={logo} alt="gnNews logo"></img>
        </Link>
        {location.pathname.startsWith("/country/") && (
          <IconButton onClick={handleViewTypeChange} color="primary">
            {viewType === "list" ? <GridView /> : <FormatListBulleted />}
          </IconButton>
        )}
        <IconButton onClick={handlePopupOpen} color="primary">
          <Help />
        </IconButton>
        <Popup popupOpen={popupOpen} handlePopupClose={handlePopupClose} />
        <LanguageSelector />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
