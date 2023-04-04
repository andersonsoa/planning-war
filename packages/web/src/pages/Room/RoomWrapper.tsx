import { Link, Outlet } from "react-router-dom";
import { socket } from "../../lib/socket";
import { useUserStore } from "../../store/userStore";
import { UpdatePlayerName } from "../../components/UpdatePlayerName";
import { Pen } from "@phosphor-icons/react";

export function RoomWrapper() {
  const userStore = useUserStore();

  function handleChangeName(name: string) {
    if (socket.connected) {
      socket.emit("user:update", {
        id: userStore.user?.id,
        name,
      });
      return;
    }

    userStore.updateUserName(name);
  }

  return (
    <section className="flex flex-col h-screen">
      <header className="bg-black/50 p-4 flex justify-between items-center h-20">
        <h1 className="text-2xl font-extrabold">
          <Link to="/">Planning Wars</Link>
        </h1>
        {userStore.user ? (
          <UpdatePlayerName
            onSubmit={handleChangeName}
            placeholder={userStore.user?.name}
          >
            <div className="py-2 px-4 rounded-lg bg-zinc-900 shadow group hover:bg-zinc-800 hover:text-green-300  transition-colors flex items-center gap-3">
              <div className="w-8 h-8 grid place-items-center rounded-full bg-zinc-500">
                {userStore.user?.name.slice(0, 1)}
              </div>
              <span>{userStore.user?.name}</span>
              <Pen size={20} />
            </div>
          </UpdatePlayerName>
        ) : null}
      </header>

      <Outlet />
    </section>
  );
}
