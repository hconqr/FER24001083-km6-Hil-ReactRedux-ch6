import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function YourComponent() {
  const [showUserData, setShowUserData] = useState(true);
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("api/endpoint")
      .then((response) => {
        setResponseData(response.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  return (
    <>
      {showUserData && (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
          {error && <div>Error</div>}
          <div className="flex justify-center">
            {responseData ? (
              <img
                src={responseData.image}
                className="w-[100px] h-auto rounded-full border-2 border-black"
                alt="Gambar"
              />
            ) : (
              <img
                src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fblank-profile&psig=AOvVaw3ZkEbPi4OOuHuxhBi8xNLO&ust=1712051005302000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCJjfuIvdoIUDFQAAAAAdAAAAABAE"
                className="w-[100px] h-auto border"
              />
            )}
          </div>
          <div className="flex gap-2">
            {responseData ? (
              <>
                <ul className="text-right">
                  <li>First Name:</li>
                  <li>Last Name:</li>
                  <li>Gender:</li>
                  <li>Email:</li>
                </ul>
                <ul className="text-left">
                  <li>{responseData.firstName}</li>
                  <li>{responseData.lastName}</li>
                  <li>{responseData.gender}</li>
                  <li>{responseData.email}</li>
                </ul>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default YourComponent;
