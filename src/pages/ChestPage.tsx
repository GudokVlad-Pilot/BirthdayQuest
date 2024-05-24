import React, { useEffect, useState } from "react";
import axios from "axios";

interface Champion {
  name: string;
  chest: string;
}

const ChestPage: React.FC = () => {
  const [champions, setChampions] = useState<Champion[]>([]);

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
          champions.map((champion, index) => (
            <div key={index} className="champion">
              <img src={`https://birthdayquestbackend.onrender.com/chests/${champion.chest}`} alt={`${champion.name}'s chest`} style={{height: '200px'}}/>
              <p>{champion.name}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChestPage;