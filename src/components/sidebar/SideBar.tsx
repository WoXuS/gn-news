import { Link } from "react-router-dom";
import { Drawer, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import styles from "./SideBar.module.css";
import { transformedCountryData } from "../../types/types";

interface CountryData {
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  name: {
    common: string;
    nativeName: Object;
    oficial: string;
  };
  cca2: string;
}

interface SideBarProps {
  toggleDrawer: () => void;
  drawerOpen: boolean;
  countrySet: (data: Array<transformedCountryData>) => void;
  countries: Array<transformedCountryData> | null;
}

const SideBar = ({
  toggleDrawer,
  drawerOpen,
  countrySet,
  countries,
}: SideBarProps) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await fetch(
          "https://restcountries.com/v3.1/alpha?codes=ar,au,at,be,br,bg,ca,cn,co,cu,cz,eg,fr,de,gr,hk,hu,in,ie,il,it,jp,lv,lt,my,mx,ma,nl,nz,ng,no,ph,pl,pt,ro,ru,sa,rs,sg,sk,si,za,kr,se,ch,tw,th,tr,ae,ua,uk,us,ve"
        );
        const data = await response.json();
        const transformedCountries = data.map((countryData: CountryData) => {
          return {
            flag: countryData.flags,
            countryCode: countryData.cca2,
            countryName: countryData.name.common,
          };
        });
        countrySet(transformedCountries);
        setError(null)
      } catch (error) {
        setError("Something went wrong. Please try again later.")
        return null;
      }
    }
    
    fetchCountries();
  }, [countrySet]);

  return (
    <>
      <Drawer
        anchor="left"
        variant="temporary"
        open={drawerOpen}
        onClose={toggleDrawer}
        PaperProps={{
          sx: {
            backgroundColor: "#f5f7fa",
          },
        }}
      >
        {error && (
        <Typography color="error" align="center">
          Error: {error}
        </Typography>
      )}
        {countries &&
          countries.map((country) => (
            <Link
              to={`/country/${country.countryName}`}
              key={country.countryCode}
              onClick={toggleDrawer}
            >
              <Button
                variant="contained"
                color="info"
                sx={{
                  justifyContent: "flex-start",
                  color: "#3a424d",
                  marginY: 1,
                  marginX: 2.9,
                  width: "84%",
                }}
                size="large"
                startIcon={
                  <img
                    src={country.flag.svg}
                    alt={country.flag.alt}
                    className={styles.countryFlag}
                  />
                }
              >
                {country.countryName}
              </Button>
            </Link>
          ))}
      </Drawer>
    </>
  );
};

export default SideBar;
