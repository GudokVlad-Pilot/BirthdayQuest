import { useEffect } from "react";
import "../styles/LandingPage.css"

const LandingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
    return (
      <div className="landingPage">
        <div className="contentBox">
          <div className="landingTitleText">
            С Днём рождения, Николай!
          </div>
          <div className="landingSubtext">
              Наслаждайся интерактивом в честь твоего дня!
          </div>
        </div>
    </div>
    );
  };

export default LandingPage;