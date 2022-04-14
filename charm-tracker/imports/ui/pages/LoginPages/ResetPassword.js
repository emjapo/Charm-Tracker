import React, { useCallback, useContext } from "react";
import ReactDom from "react-dom";
import { withRouter, Redirect } from "react-router";
import auth from "../../../api/Auth";
import { sendPasswordResetEmail } from "firebase/auth";
import { AuthContext } from "../../AuthManagement";
import LoginHeader from "../../LoginHeader";
import { Link } from "react-router-dom";


const ResetPassword = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email } = event.target.elements;
      try {
        await sendPasswordResetEmail(auth, email.value)
          .then(() => {
            // Password reset email sent!
            let element = <p className="success">Password reset email sent!</p>
            ReactDom.render(element, document.getElementById('error'));
            // ..
          })
          .catch((error) => {
            console.log(error.code)
            let element = <p className="err">{error.code}</p>
            ReactDom.render(element, document.getElementById('error'));
          });
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to='/' />;
  }

  return (
    <div className="login">
      <LoginHeader />
        <form className="login" onSubmit={handleLogin}>
        <div id="error"></div>
        <label>Email</label>
        <input
          type="text"
          id="email"
          name="email"
        ></input>
        <Link to="/login" className="login-link">Back to Login</Link>
        <input type="submit" id="reset" value="Reset Password"></input>
      </form>
    </div>
  );
};

export default withRouter(ResetPassword);
