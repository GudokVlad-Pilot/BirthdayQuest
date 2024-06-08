import React, { useEffect, useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import ForwardIcon from '@mui/icons-material/Forward';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import "../styles/ChestPage.css"

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
  const [isGuessed, setIsGuessed] = useState<boolean>(false)

  const handleGuess = () => {
    console.log(selectedChampion)
    if (selectedChampion === champions[currentIndex].name) {
      setIsGuessed(true)
    }
    else if (selectedChampion !== null) {
      setGuessedChampion([...guessedChampion, selectedChampion]);
      setSelectedChampion(null);
    }
    else {
      console.log('Выбранный чемпион не соответствует целевому чемпиону, действие не выполнено.');
    }
  };

  const handleNext = () => {
    setSelectedChampion(null);
    setGuessedChampion([])
    setCurrentIndex((prevIndex) => prevIndex + 1);
    setIsGuessed(false)
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
      {/* <div className="pageTitle">
        This is the chest page.
      </div> */}
      <div className="contentBox">
        <div className="taskText">
          Угадай чемпиона по груди!
        </div>
        <div>
          {champions.length === 0 || championsLol.length === 0 ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <CircularProgress style={{color: "#F9F1D2"}}/>
              <p className="chestLoader">Loading...</p>
            </Box>
          ) : (
            currentIndex < champions.length ? (
              <div className="champion">
                <img 
                  src={`https://birthdayquestbackend.onrender.com/chests/${champions[currentIndex].chest}`} 
                  alt={`Самый умный?`} 
                  style={{ height: '200px' }} 
                />
                <div className="subtaskText">
                  Введите имя чемпиона
                </div>
              </div>
            ) : championsLol.length === 0 ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <CircularProgress style={{color: "#F9F1D2"}}/>
              <p className="chestLoader">Loading...</p>
            </Box>
            ) : (
              <div className="completedBox">
                <div className="taskText">
                  Этап пройден
                </div>
                {/* <div className="nextLevelButton"><Link className="link" to="/friends">Угадай друга!</Link></div> */}
              </div>
            )
          )}
        </div>
      </div>
      {champions.length > 0 && (currentIndex < champions.length) &&(
      !isGuessed && <div className="guessBox">
        <Autocomplete
          className="guessTextBox autocomplete-no-border"
          id="championsLolSearch"
          options={options}
          groupBy={(option) => option[0].toUpperCase()}
          freeSolo
          sx={{ width: 300, display: "inline-flex" }}
          renderInput={(params) => <TextField className="guessTextField" {...params} placeholder="Чемпион" 
          InputProps={{
            ...params.InputProps,
            style: {
              color: "black",
              fontFamily: '"Poiret One", monospace',
              fontSize: 25,
              fontWeight: "bold",
            },
          }}/>}
          disabled={isGuessed}
          value={selectedChampion || ''}
          onChange={(event, value) => {
          setSelectedChampion(value || null);
          } } />
        <div className="guessButtonBox">
          <button className="guessButton" onClick={handleGuess}><ForwardIcon style={{height:"60px", width: "60px"}}/></button>
        </div>
      </div>
      )}
      {/* <button onClick={handleReset}>Reset</button> */}
      {isGuessed && (
        <div className="nextButtonBox">
          <button className="nextButton" onClick={handleNext}>
          Следующая
          <ForwardIcon style={{height:"60px", width: "60px"}}/>
          </button>
        </div>
      )}
      <div>
        <ul className="incorrectPool" style={{marginTop: "25px"}}>
      {isGuessed && <li className="correctGuess" style={{backgroundColor: "#D3EFAB"}}>
            {champions[currentIndex].name}
            <CheckIcon style={{height:"60px", width: "60px"}}/>
            </li>}
            </ul>
        <ul className="incorrectPool" style={{marginBottom: "25px"}}>
          {guessedChampion.map((champion, index) => (
            <li key={index} className="incorrectGuess" style={{backgroundColor: "#E27D7D"}}>
              {champion.charAt(0).toUpperCase() + champion.slice(1)}
              <CloseIcon style={{height:"60px", width: "60px"}}/>
              </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChestPage;