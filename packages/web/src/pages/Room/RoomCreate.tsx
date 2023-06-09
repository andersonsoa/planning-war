import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export function RoomCreate() {
  const navigate = useNavigate();

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const data = JSON.stringify({
      title: form.get("room-name"),
    });

    fetch(`${import.meta.env.VITE_SERVER_URL}/api/room`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((res) => {
        return res.json();
      })
      .then((room) => {
        navigate(`/room/${room.id}`);
      });
  }

  return (
    <form
      className="max-w-md w-full space-y-5 mx-auto mt-10"
      onSubmit={onSubmit}
    >
      <label htmlFor="room-name" className="block">
        <p className="text-md mb-1">
          - Escolha um nome para a sua{" "}
          <strong className="text-red-600">Guerra!</strong>
        </p>
        <input
          id="room-name"
          name="room-name"
          type="text"
          className="text-black text-xl px-2 h-12 w-full rounded bg-zinc-300 shadow"
          required
        />
      </label>

      <div>
        <button className="w-full h-12 bg-zinc-600 rounded uppercase font-bold tracking-wider hover:bg-zinc-700 shadow">
          Criar Sala
        </button>
      </div>
    </form>
  );
}
