import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
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
  const [isGuessed, setIsGuest] = useState<boolean>(false)
  const [selectedFriend, setSelectedFriend] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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
      </div>
    </div>
  );
};

export default FriendsPage;