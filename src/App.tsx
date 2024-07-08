import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  //
  useEffect(() => {
    axios
      .get("http://localhost:3000/todos")
      .then((res) => setData(res.data))
      .catch((error) => console.log(error));
  }, []);
  //
  return <>{JSON.stringify(data)}</>;
}

export default App;
