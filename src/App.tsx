import { Dashboard } from "./pages/Dashboard";
import { Auth } from "./pages/Auth";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SharedPage from "./pages/SharedPage"; // Import shared page

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/Signin", element: <Auth /> },
  { path: "/Signup", element: <Auth /> },
  { path: "/Dashboard", element: <Dashboard /> },
  { path: "/share/:hash", element: <SharedPage /> }, // New shared page route
]);

function App() {
  return (
    <div className="bg-secondary min-h-svh dark:bg-zinc-300">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
