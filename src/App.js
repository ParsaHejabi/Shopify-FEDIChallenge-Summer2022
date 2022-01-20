import { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { red, amber, blue, deepPurple } from "@mui/material/colors";

import NasaCard from "./components/NasaCard";

const avatarBgColors = [red[500], amber[500], blue[500], deepPurple[500]];

function App() {
  const [cardsData, setCardsData] = useState(null);
  const [showBackdrop, setShowBackdrop] = useState(true);

  useEffect(() => {
    fetchPhoto();

    async function fetchPhoto() {
      const res = await fetch(
        `https://api.nasa.gov/planetary/apod?count=${10}&api_key=${
          process.env.REACT_APP_NASA_API_KEY
        }`
      );
      const data = await res.json();
      setCardsData(data);
      setShowBackdrop(false);
    }
  }, []);

  if (!cardsData) {
    return (
      <div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={showBackdrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  } else {
    return (
      <>
        <CssBaseline />
        <Container
          maxWidth="lg"
          sx={{ marginTop: "16px", marginBottom: "16px" }}
        >
          <Grid container spacing={{ xs: 2, md: 2, lg: 2 }}>
            {cardsData.map((cardData, index) => {
              cardData.avatarBgColor =
                avatarBgColors[Math.floor(Math.random() * 4)];
              cardData.index = index;
              return (
                <Grid key={index} item xs={12} md={6} lg={4}>
                  <NasaCard cardData={cardData} />
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </>
    );
  }
}

export default App;
