import React, { useEffect, useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Link } from "react-router-dom";

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
  const [isGuessed, setIsGuest] = useState<boolean>(false)

  const handleGuess = () => {
    console.log(selectedChampion)
    if (selectedChampion === champions[currentIndex].name) {
      setIsGuest(true)
    }
    else if (selectedChampion !== null) {
      setGuessedChampion([...guessedChampion, selectedChampion]);
    }
    else {
      console.log('Выбранный чемпион не соответствует целевому чемпиону, действие не выполнено.');
    }
  };

  const handleNext = () => {
    setSelectedChampion(null);
    setGuessedChampion([])
    setCurrentIndex((prevIndex) => prevIndex + 1);
    setIsGuest(false)
  };

  // const handleReset = () => {
  //   setCurrentIndex(0);
  //   setSelectedChampion(null);
  // };

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
        Угадай чемпиона по груди
      </div>
      <div>
        {champions.length === 0 && championsLol.length === 0 ? (
          <p>Loading...</p>
        ) : (
          currentIndex < champions.length ? (
            <div className="champion">
              <img 
                src={`https://birthdayquestbackend.onrender.com/chests/${champions[currentIndex].chest}`} 
                alt={`Самый умный?`} 
                style={{ height: '200px' }} 
              />
              <p>Введите ваш ответ</p>
              <Autocomplete
                id="championsLolSearch"
                options={options}
                groupBy={(option) => option[0].toUpperCase()}
                freeSolo
                sx={{ width: 300, display: "inline-flex" }}
                renderInput={(params) => <TextField {...params} label="Чемпион" />}
                disabled={isGuessed}
                value={selectedChampion || ''}
                onChange={(event, value) => {
                  setSelectedChampion(value || null);
                }}
              />
            </div>
          ) : championsLol.length === 0 ? (
            <p>Loading...</p>
          ) : (
            <div className="nextLevelButton"><Link className="link" to="/friends">Friends</Link></div>
            // championsLol.map((championLol, index) => (
            //   <div key={index} className="championLol">
            //     <p>{championLol.name}</p>
            //   </div>
            // ))
          )
        )}
      </div>
      {champions.length > 0 && (currentIndex < champions.length) &&(
        <button onClick={handleGuess}>Угадать</button>
      )}
      {/* <button onClick={handleReset}>Reset</button> */}
      {isGuessed && (
        <button onClick={handleNext}>Далее</button>
      )}
      <ul>
        {isGuessed && <li style={{backgroundColor: "green"}}>{champions[currentIndex].name}</li>}
        {guessedChampion.map((champion, index) => (
          <li key={index} style={{backgroundColor: "red"}}>{champion}</li>
        ))}
      </ul>
    </div>
  );
};

export default ChestPage;