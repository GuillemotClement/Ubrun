import { useNavigate, useSearch } from "@tanstack/react-router";
import React, { useState, type HTMLAttributes } from "react";
import loginService from "../../../services/login";
import { useAuthStore } from "../../../stores/auth";

type UserLoginResponse = {
  token: string;
  username: string;
};

const LoginPage = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<null | string>(null);

  const [errorName, setErrorName] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const [user, setUser] = useState<null | UserLoginResponse>(null);

  const setLogin = useAuthStore((state) => state.setLogin);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const data: UserLoginResponse = await loginService.login({
        name,
        password,
      });
      setLogin({ name: data.username, token: data.token });
      navigate({ to: "/" });
    } catch (err) {
      setErrorMessage("Wrong credentials");
      console.error(err);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div className="mx-auto border container">
      <form onSubmit={handleLogin} className="border w-100 mx-auto">
        <div className="flex flex-col my-4">
          <label htmlFor="">Nom</label>
          <input
            className="input"
            type="text"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>

        <div className="flex flex-col my-4">
          <label htmlFor="">Mot de passe :</label>
          <input
            className="input"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>

        {errorMessage && (
          <div className="text-center my-5">
            <p className="text-red-500 font-bold">{errorMessage}</p>
          </div>
        )}

        <div className="">
          <button className="btn btn-neutral" type="button">
            Reset
          </button>
          <button className="btn btn-primary" type="submit">
            Connexion
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
