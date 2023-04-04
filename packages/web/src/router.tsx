import { createBrowserRouter } from "react-router-dom";
import { ErrorPage } from "./components/ErrorPage";
import { Home } from "./pages/Home";
import { RoomWrapper } from "./pages/Room/RoomWrapper";
import { RoomCreate } from "./pages/Room/RoomCreate";
import { RoomDetail, loader as detailLoader } from "./pages/Room/RoomDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/room",
    element: <RoomWrapper />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/room",
        element: <RoomCreate />,
      },
      {
        path: "/room/:roomId",
        element: <RoomDetail />,
        loader: detailLoader,
      },
    ],
  },
]);
