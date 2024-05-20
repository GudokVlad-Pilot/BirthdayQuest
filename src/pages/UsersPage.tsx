import React, {useEffect, useState} from "react";

interface UsersData {
  users?: number[];
}
const UsersPage: React.FC = () => {
    const [usersData, setUsersData] = useState<UsersData>({});
  
    useEffect(() => {
           fetch("https://birthdayquestbackend.onrender.com/users")
             .then(response => response.json())
             .then(data => {
               setUsersData(data);
             });
         }, []);
      
  
    useEffect(() => {
      window.scrollTo(0, 0)
    }, [])

    return (
      <div className="usersPage">
        <div className="pageTitle">
            This is the users page.
        </div>
        <div className="text">
            Some text here
        </div>
        <div>
          {typeof usersData.users === 'undefined' ? (
            <p>Loading...</p>
          ) : (
            usersData.users.map((user, i) => (
              <p key={i}>{user}</p>
            ))
          )}
        </div>
    </div>
    );
  };

export default UsersPage;