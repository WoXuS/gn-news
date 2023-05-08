import { useState } from "react";
import { Paper, Typography, Box } from "@mui/material";

import styles from "./NewsCard.module.css";
import Popup from "../popup/Popup";
import { NewsItem, ViewTypes } from "../../types/types";

interface NewsCardProps {
  news: NewsItem;
  viewType: string;
}

const NewsCard = ({ news, viewType }: NewsCardProps) => {
  const [popupOpen, setPopupOpen] = useState<boolean>(false);

  const handlePopupOpen = () => {
    setPopupOpen(true);
  };

  const handlePopupClose = () => {
    setPopupOpen(false);
  };

  return (
    <>
      <Paper
        elevation={3}
        className={`${styles.card} ${
          viewType === ViewTypes.tiles ? styles.tiles : styles.list
        }`}
        onClick={handlePopupOpen}
        data-testid="news-card"
      >
        {news.urlToImage && viewType === ViewTypes.tiles && (
          <img
            className={styles.image}
            src={news.urlToImage}
            alt={news.title}
          />
        )}
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant={viewType === ViewTypes.tiles ? "body1" : "h6"}
            textAlign={viewType === ViewTypes.tiles ? "center" : "left"}
            marginTop={viewType === ViewTypes.tiles ? 2 : 0}
            fontWeight="bold"
          >
            {news.title}
          </Typography>
          <Box
            display="flex"
            justifyContent="space-between"
            sx={{ marginTop: 2, color: "#999" }}
          >
            <Typography variant="body2" textAlign="right" fontStyle="italic">
              {news.source.name}
            </Typography>
            <Typography variant="body2">
              {new Date(news.publishedAt).toLocaleDateString()}
            </Typography>
          </Box>
          {viewType === ViewTypes.tiles && (
            <Typography
              sx={{ marginTop: 2 }}
              variant="body2"
              textAlign="justify"
            >
              {news.description}
            </Typography>
          )}
        </Box>
      </Paper>
      <Popup
        news={news}
        popupOpen={popupOpen}
        handlePopupClose={handlePopupClose}
      />
    </>
  );
};

export default NewsCard;
