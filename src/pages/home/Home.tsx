import { Typography, Container } from "@mui/material";
import { useTranslation } from "react-i18next";
const Home = () => {
  const { t } = useTranslation();
  return (
    <Container sx={{ flex: 1 }}>
      <Typography variant="h1" color="primary" textAlign="left">
        {t("home1")}
      </Typography>
      <Typography variant="h2" color="#3a424d" textAlign="left">
        {t("home2")}
      </Typography>
      <Typography variant="h4" color="#3a424d" textAlign="left">
        <br></br>
        {t("home3")}
      </Typography>
    </Container>
  );
};

export default Home;
