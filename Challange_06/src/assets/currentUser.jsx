import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [userData, setUserData] = useState(null);
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsInVzZXJuYW1lIjoia21pbmNoZWxsZSIsImVtYWlsIjoia21pbmNoZWxsZUBxcS5jb20iLCJmaXJzdE5hbWUiOiJKZWFubmUiLCJsYXN0TmFtZSI6IkhhbHZvcnNvbiIsImdlbmRlciI6ImZlbWFsZSIsImltYWdlIjoiaHR0cHM6Ly9yb2JvaGFzaC5vcmcvSmVhbm5lLnBuZz9zZXQ9c2V0NCIsImlhdCI6MTcxMTIwOTAwMSwiZXhwIjoxNzExMjEyNjAxfQ.F_ZCpi2qdv97grmWiT3h7HcT1prRJasQXjUR4Nk1yo8"; // Ganti dengan token yang sebenarnya

  useEffect(() => {
    const getCurrentAuthUser = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/auth/refresh", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("respon", response);
        setUserData(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    getCurrentAuthUser();
  }, [token]);

  return (
    <div>
      {userData ? (
        <div>
          <h1>User Data:</h1>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          {/* Include other user data fields as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
