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
  const [selectedChampion, setSelectedChampion] = useState<string | null>(null);
  const [guessedChampion, setGuessedChampion] = useState<string[]>([])

  const handleNext = () => {
    console.log(selectedChampion)
    if (selectedChampion !== null) {
      setGuessedChampion([...guessedChampion, selectedChampion]);
    }
    if (selectedChampion === champions[currentIndex].name) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setSelectedChampion(null);
      setGuessedChampion([])
    } else {
      console.log('Выбранный чемпион не соответствует целевому чемпиону, действие не выполнено.');
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedChampion(null);
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

  const options = championsLol.map((championLol) => championLol.name).sort();

  return (
    <div className="chestsPage">
      <div className="pageTitle">
        This is the chest page.
      </div>
      <div className="text">
        Some text here
      </div>
      <div>
        {champions.length === 0 && championsLol.length === 0 ? (
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
                options={options}
                groupBy={(option) => option[0].toUpperCase()}
                freeSolo
                sx={{ width: 300, display: "inline-flex" }}
                renderInput={(params) => <TextField {...params} label="Чемпион" />}
                value={selectedChampion || ''}
                onChange={(event, value) => {
                  setSelectedChampion(value || null);
                }}
              />
            </div>
          ) : championsLol.length === 0 ? (
            <p>Loading...</p>
          ) : (
            championsLol.map((championLol, index) => (
              <div key={index} className="championLol">
                <p>{championLol.name}</p>
              </div>
            ))
          )
        )}
      </div>
      {champions.length > 0 && (
        <button onClick={handleNext}>Далее</button>
      )}
      <button onClick={handleReset}>Reset</button>
      <ul>
        {guessedChampion.map((champion, index) => (
          <li key={index}>{champion}</li>
        ))}
      </ul>
    </div>
  );
};

export default ChestPage;