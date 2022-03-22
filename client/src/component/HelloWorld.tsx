import React from "react";
import axios from "axios";
import { useState } from "react";

const HelloWorld = () => {
  const [a, setA] = useState("")
  axios
    .get(`${process.env.REACT_APP_API_URL}`, {
      headers: { "Content-Type": "application/json"}
    })
    .then((res) => setA(res.data) 
    )
  return <div>{a}</div>;
};

export default HelloWorld;



