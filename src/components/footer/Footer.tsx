import { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './Footer.module.css';

interface FooterProps {
  numArticles: number | undefined;
}

const Footer = ({ numArticles }: FooterProps) => {
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <footer className={styles.footerContainer}>
      <Box className={styles.footer}>
        {location.pathname.startsWith('/country/') && numArticles && (
          <Typography
            variant='h5'
            className={styles.numArticles}
            color='primary'
          >
            {t('numArticles')}: {numArticles}
          </Typography>
        )}
        <Typography variant='h5' color='primary'>
          {currentTime}
        </Typography>
      </Box>
    </footer>
  );
};

export default Footer;
