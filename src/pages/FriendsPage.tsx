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

const FriendsPage: React.FC = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [isGuessed, setIsGuessed] = useState<boolean>(false)
  const [selectedFriend, setSelectedFriend] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [guessedFriend, setGuessedFriend] = useState<string[]>([])

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get("https://birthdayquestbackend.onrender.com/friends");
        setFriends(response.data.friends);
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };

    fetchFriends();
  }, []);

  const handleGuess = () => {
    console.log(selectedFriend)
    if (selectedFriend === friends[currentIndex].name) {
      setIsGuessed(true)
    }
    else if (selectedFriend !== null) {
      setGuessedFriend([...guessedFriend, selectedFriend]);
    }
    else {
      console.log('Выбранный друг не соответствует целевому другу, действие не выполнено.');
    }
  };

  const handleNext = () => {
    setSelectedFriend(null);
    setGuessedFriend([])
    setCurrentIndex((prevIndex) => prevIndex + 1);
    setIsGuessed(false)
  };

  const options = friends.map((friend) => friend.name).sort();

  return (
    <div className="numbersPage">
      <div className="pageTitle">
        This is the friends page.
      </div>
      <div className="text">
        Классика LoLdle, но с твоими друзьями!
      </div>
      <div>
      {friends.length === 0 ? (
          <p>Loading...</p>
        ) : (
          currentIndex < friends.length ? (
          <div className="friend">
              <p>{friends[currentIndex].name}</p>
              <p>Введите ваш ответ</p>
          {/* {friends.map((friend, index) => (
            <div key={index} className="friends">
              <p>{friend.name}</p>
            </div>
          ))} */}
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
          </div>) : friends.length === 0 ? (
            <p>Loading...</p>
          ) : (
            <div className="nextLevelButton"><Link className="link" to="/award">Award</Link></div>
          )
        )}
        {friends.length > 0 && (currentIndex < friends.length) &&(
                <button onClick={handleGuess}>Угадать</button>
              )}
              {isGuessed && (
                <button onClick={handleNext}>Далее</button>
              )}
              <ul>
                {isGuessed && <li style={{backgroundColor: "green"}}>{friends[currentIndex].name}</li>}
                {guessedFriend.map((friend, index) => (
                  <li key={index} style={{backgroundColor: "red"}}>{friend}</li>
                ))}
              </ul>
      </div>
    </div>
  );
};

export default FriendsPage;