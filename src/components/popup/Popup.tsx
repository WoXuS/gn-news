import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  useMediaQuery,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useTheme } from "@mui/material/styles";

import { useTranslation } from "react-i18next";

import { NewsItem } from "../../types/types";
import styles from "./Popup.module.css";

interface PopupProps {
  popupOpen: boolean;
  handlePopupClose: () => void;
  news?: NewsItem;
}

const Popup = ({ popupOpen, handlePopupClose, news }: PopupProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { t } = useTranslation();

  return (
    <Dialog open={popupOpen} onClose={handlePopupClose} data-testid="popup">
      {!news && (
        <Box sx={{ paddingX: isMobile ? 1 : 5, paddingY: isMobile ? 1 : 3 }}>
          <DialogTitle variant="h4">{t("popupTitle")}</DialogTitle>
          <DialogContent>
            <Typography>
              {t("popupContent1")}
              <br></br>
              <br></br>
            </Typography>
            <Typography>{t("popupContent2")}</Typography>
            <Button
              onClick={handlePopupClose}
              variant="contained"
              data-testid="close-button"
              color="secondary"
              sx={{ marginTop: 3 }}
            >
              {t("closeButton")}
            </Button>
          </DialogContent>
        </Box>
      )}
      {news && (
        <DialogContent
          sx={{
            padding: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {news.urlToImage && (
            <img
              className={styles.image}
              src={news.urlToImage}
              alt={news.title}
            />
          )}
          <a
            href={news.url}
            target="_blank"
            rel="noreferrer"
            style={{ width: "85%" }}
          >
            <DialogTitle
              color="#000"
              variant="h5"
              sx={{
                padding: 0,
                marginTop: 2,
              }}
            >
              {news.title}
            </DialogTitle>
          </a>
          <Box marginBottom={3} width="85%">
            <Typography variant="body1" sx={{ marginY: 3 }}>
              {news.content}
            </Typography>
            <span
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <a href={news.url} target="_blank" rel="noreferrer">
                <Typography sx={{ color: "#999" }} variant="body2">
                  {t("source")}: {news.source.name}
                </Typography>
                {news.author && (
                  <Typography sx={{ color: "#999" }} variant="body2">
                    {t("author")}: {news.author}
                  </Typography>
                )}
              </a>
              <Typography sx={{ color: "#999" }} variant="body2">
                {new Date(news.publishedAt).toLocaleDateString()}
              </Typography>
            </span>
          </Box>
          <DialogActions
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              paddingBottom: 3,
              width: "85%",
            }}
          >
            <Button
              href={news.url}
              target="_blank"
              variant="contained"
              color="primary"
              endIcon={<OpenInNewIcon />}
              sx={{ color: "white", marginBottom: isMobile ? 2 : 0 }}
              data-testid="openArticle-button"
            >
              {t("readArticleButton")}
            </Button>
            <Button
              onClick={handlePopupClose}
              variant="contained"
              color="secondary"
              data-testid="close-button"
            >
              {t("closeButton")}
            </Button>
          </DialogActions>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default Popup;
