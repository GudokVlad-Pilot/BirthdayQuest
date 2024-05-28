import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

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


  return (
    <div className="numbersPage">
      <div className="pageTitle">
        This is the friends page.
      </div>
      <div className="text">
        Some text here
      </div>
      <div>
      {friends.length === 0 ? (
          <p>Loading...</p>
        ) : (
          friends.map((friend, index) => (
            <div key={index} className="friends">
              <p>{friend.name}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FriendsPage;