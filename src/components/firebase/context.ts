import React from "react";
import Firebase from "./firebase";

const FirebaseContext = React.createContext<Firebase | null | any>(null);

export default FirebaseContext;
