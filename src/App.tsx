import { useEffect } from "react";
import { RouterProvider } from "react-router";
import { useAtom } from "jotai";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { userAtom } from "./services/store";
import { ThemeProvider } from "./services/themeContext";
import routes from "./routes";

const queryClient = new QueryClient();

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

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <RouterProvider router={routes} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
