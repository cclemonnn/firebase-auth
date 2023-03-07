import Signup from "./Signup";
import { AuthProvider } from "../context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Signup />
    </AuthProvider>
  );
}

export default App;
