import React, { useEffect, useState } from "react";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";

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

  const options = friends.map((friend) => friend.name).sort();

  const getHairColor = (friend: Friend) => {
    const hasExactMatch = friend.hair.join(", ") === currentFriends[currentIndex].hair.join(", ");
    const hasPartialMatch = friend.hair.some(color => currentFriends[currentIndex].hair.includes(color));
    if (hasExactMatch) {
      return "green";
    } else if (hasPartialMatch) {
      return "yellow";
    } else {
      return "red";
    }
  };

  return (
    <div className="numbersPage">
      <div className="pageTitle">
        This is the friends page.
      </div>
      <div className="text">
        Классика LoLdle, но с твоими друзьями!
      </div>
      <div>
        {currentFriends.length === 0 ? (
          <p>Loading...</p>
        ) : (
          currentIndex < currentFriends.length ? (
            <div className="friend">
              <p>{currentFriends[currentIndex].name}</p>
              <p>Введите ваш ответ</p>
              <Autocomplete
                id="friendsSearch"
                options={options}
                groupBy={(option) => option[0].toUpperCase()}
                freeSolo
                sx={{ width: 300, display: "inline-flex" }}
                renderInput={(params) => <TextField {...params} label="Друг" />}
                disabled={isGuessed}
                value={selectedFriend || ''}
                onChange={(event, value) => {
                  setSelectedFriend(value || null);
                }}
              />
            </div>
          ) : currentFriends.length === 0 ? (
            <p>Loading...</p>
          ) : (
            <div className="nextLevelButton"><Link className="link" to="/award">Award</Link></div>
          )
        )}
        {currentFriends.length > 0 && (currentIndex < currentFriends.length) && (
          <button onClick={handleGuess}>Угадать</button>
        )}
        {isGuessed && (
          <button onClick={handleNext}>Далее</button>
        )}
        {(isGuessed || guessedFriends.length > 0) && (
          <table>
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
              {guessedFriends.map((friend, index) => (
                <tr key={index}>
                  <td>{friend.name}</td>
                  <td style={{ backgroundColor: friend.meeting === currentFriends[currentIndex].meeting ? "green" : "red" }}>{friend.meeting}</td>
                  <td style={{ backgroundColor: getHairColor(friend) }}>{friend.hair.join(", ")}</td>
                  <td style={{ backgroundColor: friend.city === currentFriends[currentIndex].city ? "green" : "red" }}>{friend.city}</td>
                  <td style={{ backgroundColor: friend.birthday === currentFriends[currentIndex].birthday ? "green" : "red" }}>{friend.birthday}</td>
                  <td style={{ backgroundColor: friend.game === currentFriends[currentIndex].game ? "green" : "red" }}>{friend.game}</td>
                  <td style={{ backgroundColor: friend.formula === currentFriends[currentIndex].formula ? "green" : "red" }}>{friend.formula}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default FriendsPage;