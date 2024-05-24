import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect } from "react";

const LandingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
    return (
      <div className="landingPage">
        <div className="pageTitle">
            This is the home page.
        </div>
        <div className="Text">
            Some text here
        </div>
          <Box sx={{ display: 'flex', justifyContent: 'center'}}>
            <CircularProgress />
            <p> Loading...</p>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center'}}>
            <CircularProgress />
          </Box>
    </div>
    );
  };

export default LandingPage;