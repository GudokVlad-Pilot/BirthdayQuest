import React, {useEffect, useState} from "react";

interface NumbersData {
  numbers?: number[];
}

const NumbersPage: React.FC = () => {
  const [numbersData, setNumbersData] = useState<NumbersData>({});

  useEffect(() => {
         fetch("/numbers")
           .then(response => response.json())
           .then(data => {
             setNumbersData(data);
           });
       }, []);
    

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


    return (
      <div className="numbersPage">
        <div className="pageTitle">
            This is the numbers page.
        </div>
        <div className="text">
            Some text here
        </div>
        <div>
          {typeof numbersData.numbers === 'undefined' ? (
            <p>Loading...</p>
          ) : (
            numbersData.numbers.map((number, i) => (
              <p key={i}>{number}</p>
            ))
          )}
        </div>
    </div>
    );
  };

export default NumbersPage;