import React, { useEffect, useState } from "react";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import "../styles/FriendsPage.css";
import Box from "@mui/material/Box";
import ForwardIcon from '@mui/icons-material/Forward';
import CircularProgress from "@mui/material/CircularProgress";

interface Friend {
  name: string;
  meeting: number;
  hair: string[];
  city: string;
  birthday: number;
  game: string;
  formula: string;
}

const getRandomElements = (arr: Friend[], num: number): Friend[] => {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};

const FriendsPage: React.FC = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [isGuessed, setIsGuessed] = useState<boolean>(false);
  const [selectedFriend, setSelectedFriend] = useState<string | null>(null);
  const [currentFriends, setCurrentFriends] = useState<Friend[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [guessedFriends, setGuessedFriends] = useState<Friend[]>([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get("https://birthdayquestbackend.onrender.com/friends");
        setFriends(response.data.friends);
        setCurrentFriends(getRandomElements(response.data.friends, 3));
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };

    fetchFriends();
  }, []);

  const handleGuess = () => {
    const selected = friends.find((friend) => friend.name === selectedFriend);
    if (selected && selected.name === currentFriends[currentIndex].name && !isGuessed) {
      setIsGuessed(true);
      setGuessedFriends([selected, ...guessedFriends]);
    } else if (selected && !isGuessed) {
      setGuessedFriends([selected, ...guessedFriends]);
      setSelectedFriend(null);
    } else {
      console.log('Выбранный друг не соответствует целевому другу, действие не выполнено.');
    }
  };

  const handleNext = () => {
    setSelectedFriend(null);
    setGuessedFriends([]);
    setCurrentIndex((prevIndex) => prevIndex + 1);
    setIsGuessed(false);
  };

  useEffect(() => {
    // Прокручиваем вниз каждый раз, когда обновляется guessedFriends
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }, [guessedFriends]);

  const options = friends.map((friend) => friend.name).sort();

  const getHairColor = (friend: Friend) => {
    const hasExactMatch = friend.hair.join(", ") === currentFriends[currentIndex].hair.join(", ");
    const hasPartialMatch = friend.hair.some(color => currentFriends[currentIndex].hair.includes(color));
    if (hasExactMatch) {
      return "#D3EFAB";
    } else if (hasPartialMatch) {
      return "#EAD181";
    } else {
      return "#E27D7D";
    }
  };

  const getCellStyle = (isExactMatch: boolean, isEarlier: boolean | null) => {
    if (isExactMatch) {
      return { backgroundColor: "#D3EFAB" };
    } else if (isEarlier === true) {
      return { backgroundImage: "url('/pictures/arrow_up.png')", backgroundColor: "#E27D7D" };
    } else if (isEarlier === false) {
      return { backgroundImage: "url('/pictures/arrow_down.png')", backgroundColor: "#E27D7D"  };
    } else {
      return {};
    }
  };

  const getMeetingStyle = (friend: Friend) => {
    const targetMeeting = currentFriends[currentIndex].meeting;
    const isExactMatch = friend.meeting === targetMeeting;
    const isEarlier = friend.meeting < targetMeeting ? true : friend.meeting > targetMeeting ? false : null;
    return getCellStyle(isExactMatch, isEarlier);
  };

  const getBirthdayStyle = (friend: Friend) => {
    const targetBirthday = currentFriends[currentIndex].birthday;
    const isExactMatch = friend.birthday === targetBirthday;
    const isEarlier = friend.birthday < targetBirthday ? true : friend.birthday > targetBirthday ? false : null;
    return getCellStyle(isExactMatch, isEarlier);
  };

  return (
    <div className="friendsPage">
      <div className="contentBox">
          <div className="taskText">
            Угадай друга!
          </div>
          {currentFriends.length === 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <CircularProgress style={{color: "#F9F1D2"}}/>
            <p className="friendLoader">Loading...</p>
          </Box>
        ) : (
          currentIndex < currentFriends.length ?
          (<div className="subtaskText" style={{marginBottom: "20px"}}>
            Введите имя, чтобы начать
          </div>):(
            currentFriends.length === 0 ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <CircularProgress style={{color: "#F9F1D2"}}/>
                <p className="friendLoader">Loading...</p>
              </Box>
              ) : (
                <div className="completedBox">
                  <div className="taskText">
                    Этап пройден
                  </div>
                </div>
              )
          )
          )}
        </div>
      {currentFriends.length > 0 && (currentIndex < currentFriends.length) && 
      <div>
        {!isGuessed && <div className="guessBox">
          <Autocomplete
          className="guessTextBox autocomplete-no-border"
          id="friendsSearch"
          options={options}
          groupBy={(option) => option[0].toUpperCase()}
          freeSolo
          sx={{ width: 300, display: "inline-flex" }}
          renderInput={(params) => <TextField className="guessTextField" {...params} placeholder="Друг" 
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
          value={selectedFriend || ''}
          onChange={(event, value) => {
            setSelectedFriend(value || null);
          }}
        />
        <div className="guessButtonBox">
            <button className="guessButton" onClick={handleGuess}><ForwardIcon style={{height:"60px", width: "60px"}}/></button>
          </div>
        </div>}
        {isGuessed && (
          <div className="nextButtonBox">
            <button className="nextButton" onClick={handleNext}>
            Следующий
            <ForwardIcon style={{height:"60px", width: "60px"}}/>
            </button>
          </div>
        )}
      </div>}
      {(isGuessed || guessedFriends.length > 0) && (
        <table className="friendTable">
          <thead>
            <tr>
              <th>Имя</th>
              <th>Год знакомства</th>
              <th>Цвет Волос</th>
              <th>Город обучения</th>
              <th>Год рождения</th>
              <th>Любимая игра</th>
              <th>Любимая команда F1</th>
            </tr>
          </thead>
          <tbody>
            {guessedFriends.slice().reverse().map((friend, index) => (
              <tr key={index} style={{ animation: `slideIn 0.5s forwards`, animationDelay: `${index * 0.5}s` }}>
                <td>{friend.name}</td>
                <td style={{ ...getMeetingStyle(friend), animation: `fadeIn 0.5s forwards`, animationDelay: `${index * 0.5 + 0.5}s` }}>{friend.meeting}</td>
                <td style={{ backgroundColor: getHairColor(friend), animation: `fadeIn 0.5s forwards`, animationDelay: `${index * 0.5 + 1}s` }}>{friend.hair.join(", ")}</td>
                <td style={{ backgroundColor: friend.city === currentFriends[currentIndex].city ? "#D3EFAB" : "#E27D7D", animation: `fadeIn 0.5s forwards`, animationDelay: `${index * 0.5 + 1.5}s` }}>{friend.city}</td>
                <td style={{ ...getBirthdayStyle(friend), animation: `fadeIn 0.5s forwards`, animationDelay: `${index * 0.5 + 2}s` }}>{friend.birthday}</td>
                <td style={{ backgroundColor: friend.game === currentFriends[currentIndex].game ? "#D3EFAB" : "#E27D7D", animation: `fadeIn 0.5s forwards`, animationDelay: `${index * 0.5 + 2.5}s` }}>{friend.game}</td>
                <td style={{ backgroundColor: friend.formula === currentFriends[currentIndex].formula ? "#D3EFAB" : "#E27D7D", animation: `fadeIn 0.5s forwards`, animationDelay: `${index * 0.5 + 3}s` }}>{friend.formula}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div style={{margin: "10px"}}/>
    </div>
  );
};

export default FriendsPage;