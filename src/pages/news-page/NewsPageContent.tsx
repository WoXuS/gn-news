import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Grid, Typography, Skeleton, Container } from "@mui/material";

import { useAppSelector } from "../../redux/hooks";

import { NewsItem, ViewTypes, transformedCountryData } from "../../types/types";
import NewsCard from "../../components/news-card/NewsCard";
import styles from "../../components/news-card/NewsCard.module.css";

type SetNumber = React.Dispatch<React.SetStateAction<number | undefined>>;

interface NewsPageContentProps {
  country: transformedCountryData;
  setNumArticles: SetNumber;
}

const NewsPageContent = ({ country, setNumArticles }: NewsPageContentProps) => {
  const viewType = useAppSelector((state) => state.viewType.viewType);
  const [news, setNews] = useState<Array<NewsItem> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();
  useEffect(() => {
    async function fetchNews() {
      setLoading(true);
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=${country.countryCode}&apiKey=34299859420e47e8a7eb34ecaaf5f2ce`
        );
        const data = await response.json();
        if (data.status === "error") {
          setError(data.message);
          setLoading(false);
          return null;
        } else {
          setNews(data.articles);
          setNumArticles(data.articles.length);
          setLoading(false);
          setError(null);
          return data.articles;
        }
      } catch (error) {
        setLoading(false);
        setError("Something went wrong. Please try again later.");
        return null;
      }
    }
    fetchNews();
  }, [country.countryCode, setNumArticles]);

  return (
    <Container sx={{ flex: 1, marginBottom: 5 }}>
      {error && (
        <Typography color="error" align="center">
          Error: {error}
        </Typography>
      )}
      {news && (
        <>
          <Typography
            variant="h4"
            sx={{
              color: "#3a424d",
              marginY: 5,
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {t("mainHeader")}
            <img
              src={country.flag.svg}
              alt={country.flag.alt}
              className={styles.countryFlag}
            />
            {country.countryName}
          </Typography>
          <Grid container>
            {news &&
              news.map((item) => (
                <Grid
                  key={item.url}
                  item
                  xs={12}
                  sm={viewType === ViewTypes.tiles ? 6 : 12}
                  md={viewType === ViewTypes.tiles ? 4 : 12}
                  lg={viewType === ViewTypes.tiles ? 4 : 12}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    padding: 1,
                  }}
                >
                  {!loading ? (
                    <NewsCard news={item} viewType={viewType} />
                  ) : (
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height={viewType === ViewTypes.tiles ? "500px" : "150px"}
                      sx={{ bgcolor: "#cfcfcf" }}
                    />
                  )}
                </Grid>
              ))}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default NewsPageContent;
