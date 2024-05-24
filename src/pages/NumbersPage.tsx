import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const TIMER_DURATION = 90000; // 1.5 minutes

const NumbersPage: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<number>(TIMER_DURATION);
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const socket = io("https://birthdayquestbackend.onrender.com");

  useEffect(() => {
    const fetchCurrentNumber = async () => {
      try {
        const response = await axios.get("https://birthdayquestbackend.onrender.com/get-current-number");
        const { currentNumber, startTime } = response.data;

        const updateTimer = () => {
          const elapsedTime = Date.now() - startTime;
          const newTimeLeft = TIMER_DURATION - (elapsedTime % TIMER_DURATION);
          setTimeLeft(newTimeLeft);
        };

        setCurrentNumber(currentNumber);
        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
      } catch (error) {
        console.error('Error fetching current number:', error);
      }
    };

    fetchCurrentNumber();

    socket.on("numberUpdated", (data) => {
      setCurrentNumber(data.currentNumber);
      setTimeLeft(TIMER_DURATION);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="numbersPage">
      <div className="pageTitle">
        This is the numbers page.
      </div>
      <div className="text">
        Some text here
      </div>
      <div>
        {currentNumber === null ? (
          <Box sx={{ display: 'flex', justifyContent: 'center'}}>
            <CircularProgress />
          </Box>
        ) : (
          <div>
            <p>Current number: {currentNumber}</p>
            <p>Time left: {formatTime(timeLeft)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NumbersPage;



// import React, {useEffect, useState} from "react";

// interface NumbersData {
//   numbers?: number[];
// }

// const NumbersPage: React.FC = () => {
//   const [numbersData, setNumbersData] = useState<NumbersData>({});

//   useEffect(() => {
//          fetch("https://birthdayquestbackend.onrender.com/numbers")
//            .then(response => response.json())
//            .then(data => {
//              setNumbersData(data);
//            });
//        }, []);
    

//   useEffect(() => {
//     window.scrollTo(0, 0)
//   }, [])


//     return (
//       <div className="numbersPage">
//         <div className="pageTitle">
//             This is the numbers page.
//         </div>
//         <div className="text">
//             Some text here
//         </div>
//         <div>
//           {typeof numbersData.numbers === 'undefined' ? (
//             <p>Loading...</p>
//           ) : (
//             numbersData.numbers.map((number, i) => (
//               <p key={i}>{number}</p>
//             ))
//           )}
//         </div>
//     </div>
//     );
//   };

// export default NumbersPage;