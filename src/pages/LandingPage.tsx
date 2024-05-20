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
    </div>
    );
  };

export default LandingPage;