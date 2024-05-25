import React, { useEffect, useState } from "react";
import axios from "axios";

interface Champion {
  name: string;
  chest: string;
}

const ChestPage: React.FC = () => {
  const [champions, setChampions] = useState<Champion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex(currentIndex+1);
  };

  const handleReset = () => {
    setCurrentIndex(0);
  };

  useEffect(() => {
    const fetchChampions = async () => {
      try {
        const response = await axios.get("https://birthdayquestbackend.onrender.com/champions");
        setChampions(response.data.champions);
      } catch (error) {
        console.error('Error fetching champions:', error);
      }
    };

    fetchChampions();
  }, []);

  return (
    <div className="chestsPage">
      <div className="pageTitle">
        This is the chest page.
      </div>
      <div className="text">
        Some text here
      </div>
      <div>
        {champions.length === 0 ? (
          <p>Loading...</p>
        ) : (
          // champions.map((champion, index) => (
          //   <div key={index} className="champion">
          //     <img src={`https://birthdayquestbackend.onrender.com/chests/${champion.chest}`} alt={`${champion.name}'s chest`} style={{height: '200px'}}/>
          //     <p>{champion.name}</p>
          //   </div>
          // ))
          currentIndex < champions.length ? (
          <div className="champion">
            <img 
              src={`https://birthdayquestbackend.onrender.com/chests/${champions[currentIndex].chest}`} 
              alt={`${champions[currentIndex].name}'s chest`} 
              style={{ height: '200px' }} 
            />
            <p>{champions[currentIndex].name}</p>
          </div>) : 
          <p>Done</p>
        )}
      </div>
      {champions.length > 0 && (
        <button onClick={handleNext}>Далее</button>
      )}
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default ChestPage;