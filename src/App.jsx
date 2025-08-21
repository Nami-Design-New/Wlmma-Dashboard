import { RouterProvider } from "react-router";
import { router } from "./providers/Router";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Toaster expand={false} richColors position="bottom-right" />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
