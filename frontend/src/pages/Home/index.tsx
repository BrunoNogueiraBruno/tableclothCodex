import baseApi from "../../services";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await baseApi.post("/logout", null, { withCredentials: true })
      navigate("/login")
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
