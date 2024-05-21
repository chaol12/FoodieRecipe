import React from "react";
import "../style/Body.css";
import Body from "./Body";
import useAuth from "../utils/useAuth";
import { useEffect } from "react";
import { useToast } from "../utils/ToastSetUp";


function Home() {
  const {auth} = useAuth()
  const {notifyWarning} = useToast()

  useEffect(()=>{
    const checkLogin = () =>{
      if(!auth?.id){
        notifyWarning("Hi! there, please LogIn to know more about us")
      }
    }
    checkLogin()
  },[auth?.id,notifyWarning])
  return (
    <main>
      <Body />
    </main>
  );
}

export default Home;
