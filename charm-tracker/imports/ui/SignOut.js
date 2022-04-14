import React from "react";
import auth from "../api/Auth";

import { signOut } from "firebase/auth";

const handleSignOut = () => {
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log("Signed out");
    }).catch((error) => {
        // An error happened.
        console.log(error);
    });
}


const SignOut = () => {
    return (
        <button onClick={handleSignOut}>Sign out</button>
    )
}

export default SignOut;