import { Route, Routes } from "react-router-dom";
import "./App.css";
import ItemAll from "./pages/ItemAll";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import PrivateRoute from "./routes/PrivateRoute";
import { supabase } from "./services/supabaseClient";

//1. 전체 상품 페이지, 로그인, 상품 상세페이지
//2. 전체상품 페이지는 전체상픔
//3. 로그인 버튼을 누르면 로그인 페이지 나옴
//4. 상품 디테일을 눌러도 로그인이 안되면 로그인 페이지로
//5. 로그인이 되엇을땐 보임
//6. 로그아웃 버튼을 클릭하면 로그아웃됨
//7. 상품 디테일 볼 수 없음
//8. 로그인 로그아웃 버튼 활성화
//9. 상품검색
//10. 로그인 수파베이스로
// npx json-server db.json --port 5000

function App() {
  const [login, setLogin] = useState(false);
  const [session, setSession] = useState(null);
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    const fetchSessionAndUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setLogin(!!session);

      if (session) {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          const displayname = user.user_metadata?.user_name || "";
          setDisplayName(displayname);
        }
      }
    };

    fetchSessionAndUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLogin(!!session);
      if (session) {
        const fetchUser = async () => {
          const {
            data: { user },
          } = await supabase.auth.getUser();
          if (user) {
            const displayname = user.user_metadata?.user_name || "";
            setDisplayName(displayname);
          }
        };
        fetchUser();
      } else {
        setDisplayName("");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div>
      <Navbar displayName={displayName} login={login} setLogin={setLogin} />
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
