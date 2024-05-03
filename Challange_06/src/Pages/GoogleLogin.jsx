import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleLogin as Google } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/reducers/loginRdc";

function GoogleLogin({ buttonText }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registerLoginWithGoogleAction = async (accessToken) => {
    console.log("token ", accessToken);
    try {
      let data = JSON.stringify({
        access_token: accessToken,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `https://shy-cloud-3319.fly.dev/api/v1/auth/google`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);
      console.log("response", response);

      const { token } = response.data.data;
      console.log("initokennnn", token);
      console.log("response.data ", response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return;
      }
    }
  };

  return (
    <>
      <Google
        onSuccess={(credentialResponse) => {
          dispatch(setToken(credentialResponse.credential));
          console.log("kredensial", credentialResponse.credential);
          navigate("/");
          alert("Berhasil Login");
          window.location.reload();
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </>
  );
}

export default GoogleLogin;
