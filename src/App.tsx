import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { transformedCountryData } from "./types/types";
import MainContent from "./pages/news-page/NewsPageContent";
import Header from "./components/header/Header";
import SideBar from "./components/sidebar/SideBar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";

function App(): JSX.Element {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [numArticles, setNumArticles] = useState<number>();
  const [countries, setCountries] =
    useState<Array<transformedCountryData> | null>(null);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Router>
        <Header toggleDrawer={toggleDrawer} />
        <SideBar
          toggleDrawer={toggleDrawer}
          drawerOpen={drawerOpen}
          countries={countries}
          countrySet={setCountries}
        />
        <Routes>
          {countries &&
            countries.map((country) => (
              <Route
                key={country.countryCode}
                path={`/country/${country.countryName}`}
                element={
                  <MainContent
                    country={country}
                    setNumArticles={setNumArticles}
                  />
                }
              />
            ))}
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer numArticles={numArticles} />
    </Router>
  );
}

export default App;
