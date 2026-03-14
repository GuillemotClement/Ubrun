import React from "react";

const LoginForm = () => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="">
        <label htmlFor="">Nom</label>
        <input type="text" />
      </div>

      <div className="">
        <label htmlFor="">Email: </label>
        <input type="email" />
      </div>

      <div className="">
        <label htmlFor="">Mot de passe :</label>
        <input type="password" />
      </div>

      <div className="">
        <label htmlFor="">Confirmation de mot de passe :</label>
        <input type="password" />
      </div>

      <div className="">
        <button className="btn btn-neutral" type="button">
          Reset
        </button>
        <button className="btn btn-primary" type="submit">
          Inscription
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
