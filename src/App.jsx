import { Route, Routes } from "react-router-dom";
import "./App.css";
import ItemAll from "./pages/ItemAll";
import Login from "./pages/Login";
import ItemDetail from "./pages/ItemDetail";
import Navbar from "./components/Navbar";
import { useState } from "react";
import PrivateRoute from "./routes/PrivateRoute";

//1. 전체 상품 페이지, 로그인, 상품 상세페이지
//2. 전체상품 페이지는 전체상픔
//3. 로그인 버튼을 누르면 로그인 페이지 나옴
//4. 상품 디테일을 눌러도 로그인이 안되면 로그인 페이지로
//5. 로그인이 되엇을땐 보임
//6. 로그아웃 버튼을 클릭하면 로그아웃됨
//7. 상품 디테일 볼 수 없음
//8. 로그인 로그아웃 버튼 활성화
//9. 상품검색
// npx json-server db.json --port 5000

function App() {
  const [login, setLogin] = useState(false);
  return (
    <div>
      <Navbar login={login} setLogin={setLogin} />
      <Routes>
        <Route path="/" element={<ItemAll />}></Route>
        <Route path="/login" element={<Login setLogin={setLogin} />}></Route>
        <Route
          path="/item/:id"
          element={<PrivateRoute login={login} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
