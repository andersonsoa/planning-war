import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { socket } from "../../lib/socket";

export function RoomWrapper() {
  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <section className="flex flex-col h-screen">
      <header className="bg-black/80 p-4">
        <h1>Planning Wars</h1>
      </header>

      <Outlet />
    </section>
  );
}
