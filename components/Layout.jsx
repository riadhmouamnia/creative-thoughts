import Nav from "./Nav";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Layout({ children }) {
  const [user, loading] = useAuthState(auth);
  return (
    <div className="mx-6 md:max-w-2xl lg:max-w-4xl md:mx-auto font-poppins">
      <Nav user={user} loading={loading} />
      <main>{children}</main>
    </div>
  );
}
