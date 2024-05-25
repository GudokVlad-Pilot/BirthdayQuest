import React, { useEffect, useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

interface Champion {
  name: string;
  chest: string;
}

interface ChampionLol {
  name: string;
  chest: string;
}

const ChestPage: React.FC = () => {
  const [champions, setChampions] = useState<Champion[]>([]);
  const [championsLol, setChampionsLol] = useState<ChampionLol[]>([]);
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

  useEffect(() => {
    const fetchChampionsLol = async () => {
      try {
        const response = await axios.get("https://birthdayquestbackend.onrender.com/champions_lol");
        setChampionsLol(response.data.champions_lol);
      } catch (error) {
        console.error('Error fetching champions_lol:', error);
      }
    };

    fetchChampionsLol();
  }, []);

  const options = championsLol.map((championLol) => {
    const firstLetter = championLol.name[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...championLol,
    };
  });

  return (
    <div className="chestsPage">
      <div className="pageTitle">
        This is the chest page.
      </div>
      <div className="text">
        Some text here
      </div>
      <div>
        {champions.length === 0  && championsLol.length === 0 ? (
          <p>Loading...</p>
        ) : (
          currentIndex < champions.length ? (
          <div className="champion">
            <img 
              src={`https://birthdayquestbackend.onrender.com/chests/${champions[currentIndex].chest}`} 
              alt={`${champions[currentIndex].name}'s chest`} 
              style={{ height: '200px' }} 
            />
            <p>{champions[currentIndex].name}</p>
            <Autocomplete
              id="championsLolSearch"
              options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
              groupBy={(option) => option.firstLetter}
              getOptionLabel={(option) => option.name}
              // sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Чемпион" />}
            />
          </div>) : 
          championsLol.length === 0 ? (
            <p>Loading...</p>
          ) :
          // <p>Done</p>
          championsLol.map((championLol, index) => (
            <div key={index} className="championLol">
            <p>{championLol.name}</p>
          </div>
          ))
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