// import { useEffect, useState } from "react";
// import axios from "axios";
import "./App.css";
import Projects from "./components/Projects";
// import Todos from "./components/Todos";

function App() {
  // const [data, setData] = useState([]);
  //
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3000/todos")
  //     .then((res) => setData(res.data))
  //     .catch((error) => console.log(error));
  // }, []);
  //
  // return <>{JSON.stringify(data)}</>;
  return (
    <>
      {<Projects />}
      {/* <Todos /> */}
    </>
  );
}

export default App;
