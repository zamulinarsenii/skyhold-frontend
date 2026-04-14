import "./LoginView.css";
import React, { useState } from "react";
import { useLoginUserMutation } from "../../api/hooks/user/useLoginUserMutation";
import axios from "axios";
import { Link } from "react-router-dom";
import SmartInput from "../../components/GlobalComponents/SmartInput/SmartInput";

function LoginView() {
  const { mutate: login, isPending, error } = useLoginUserMutation();

  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(newUser);
  };

  const getErrorMessage = () => {
    if (!error) return null;
    if (axios.isAxiosError(error) && error.response?.data?.error) {
      return error.response.data.error;
    }
    return error.message;
  };

  const errorMessage = getErrorMessage();

  return (
    <main className="login-main">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Вход</h2>
        <SmartInput
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(val) => setNewUser({ ...newUser, email: val })}
          required
        />
        <SmartInput
          type="password"
          placeholder="Пароль"
          value={newUser.password}
          onChange={(val) => setNewUser({ ...newUser, password: val })}
          required
        />
        <button type="submit" disabled={isPending}>
          {isPending ? "Отправка..." : "Отправить"}
        </button>
        <Link to="/registration">Нет аккаунта</Link>
        {errorMessage && <p className="error">{errorMessage}</p>}
      </form>
    </main>
  );
}

export default LoginView;
