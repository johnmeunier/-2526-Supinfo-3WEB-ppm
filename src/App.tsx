import { useEffect } from "react";
import { RouterProvider } from "react-router";
import { useAtom } from "jotai";
import { userAtom } from "./services/store";
import routes from "./routes";

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setUser] = useAtom(userAtom);

  useEffect(() => {
    // Simulate fetching user data
    const fetchUser = async () => {
      // Simulated delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setUser({ id: "1", firstname: "Ash", lastname: "Ketchum", type: "electric" });
    };
    fetchUser();
  }, [setUser]);

  return <RouterProvider router={routes} />;
}

export default App;
