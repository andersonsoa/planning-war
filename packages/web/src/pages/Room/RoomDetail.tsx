import clx from "classnames";
import { useEffect, useMemo, useState } from "react";
import { socket } from "../../lib/socket";
import { LoaderFunctionArgs, useNavigate } from "react-router-dom";
import { CheckCircle, Copy } from "@phosphor-icons/react";
import { Side } from "../../components/Side";
import { Player } from "../../components/Player";
import { ClipboardButton } from "../../components/ClipboardButton";

type User = {
  id: string;
  isSpectator: boolean;
  name: string;
  roomId: string;
  socketId: string;
  selectedCard?: string;
};

type Room = {
  id: string;
  title: string;
  ownerId: string;
  turns: number;
  isReveled: boolean;
  users: User[];
};

export function loader({ params }: LoaderFunctionArgs) {
  socket.emit("user:join", {
    roomId: params.roomId,
  });
  return params;
}

export function RoomDetail() {
  const fib = ["0", "1", "2", "3", "5", "8", "13", "21", "34", "55", "89", "?"];

  const [me, setMe] = useState<User>();
  const [room, setRoom] = useState<Room>();

  const navigate = useNavigate();

  function handleSelectCard(cardValue?: string) {
    socket.emit("user:update", {
      id: me?.id,
      selectedCard: cardValue === me?.selectedCard ? "" : cardValue,
    });
  }

  function handleReveal() {
    if (!room?.isReveled && room?.ownerId === me?.id) {
      socket.emit("room:reveal", room?.id);
    }
  }

  function handleNewRound() {
    if (room?.isReveled && room?.ownerId === me?.id) {
      socket.emit("room:new-round", room?.id);
    }
  }

  useEffect(() => {
    const onConnect = () => console.log("[socket] connected");

    socket.on("connect", onConnect);
    return () => {
      socket.off("connect", onConnect);
    };
  }, []);

  useEffect(() => {
    const onNotFound = () => {
      navigate("/");
    };

    const onMe = (me: User) => {
      setMe(() => ({ ...me }));
    };

    const onRoomUpdated = (room: any) => {
      setRoom(() => room);
    };

    socket.on("user:me", onMe);
    socket.on("room:not-found", onNotFound);
    socket.on("room:updated", onRoomUpdated);

    return () => {
      socket.off("user:me", onMe);
      socket.off("room:not-found", onNotFound);
      socket.off("room:updated", onRoomUpdated);
    };
  }, []);

  const owner = room?.users.find((user) => user.id === room?.ownerId);
  const isOwner = me?.id === owner?.id;
  const commonUsers =
    room?.users.filter((user) => user.id !== room.ownerId) ?? [];

  const average = useMemo(() => {
    return room?.users
      .map((u) => ({ ...u, selectedCard: u.selectedCard || "😴" }))
      .reduce((acc: Record<string, any>, cur) => {
        return {
          ...acc,
          [cur.selectedCard]: acc[cur.selectedCard]
            ? {
                count: acc[cur.selectedCard].count + 1,
                names: [...acc[cur.selectedCard].names, cur.name],
              }
            : { count: 1, names: [cur.name] },
        };
      }, {});
  }, [room?.isReveled]);

  return (
    <>
      <main className="flex-1 flex flex-col justify-center items-center px-2">
        <h2 className="text-sm mt-8">Campo de batalha:</h2>
        <h1 className="text-4xl mt-2 text-violet-700 tracking-wider font-bold">
          {room?.title}
        </h1>

        <div className="grid grid-rows-[auto,200px,auto] gap-1 w-[58rem] min-h-[200px] max-w-full py-20">
          <Side>
            {commonUsers.length === 0 ? (
              <div className="flex flex-col justify-center items-center p-4 gap-2">
                <p>Se sentindo sozinho? 😴</p>
                <ClipboardButton text={window.location.href}>
                  Convide alguem
                </ClipboardButton>
              </div>
            ) : (
              commonUsers.map((cUser) => (
                <Player
                  key={cUser.id}
                  id={cUser.id}
                  isYou={cUser.id === me?.id}
                  name={cUser.name ?? "Unknow"}
                  selectedCard={cUser.selectedCard}
                  isReveled={room?.isReveled}
                  side="top"
                />
              ))
            )}
          </Side>

          <div className="bg-zinc-800 rounded-b-lg rounded-t-full shadow-lg grid place-items-center">
            {!isOwner ? (
              <h2>tu não é o dono da sala rapá</h2>
            ) : room?.isReveled ? (
              <button
                onClick={handleNewRound}
                className="py-3 w-48 ring-1 ring-zinc-500 rounded-lg shadow uppercase font-semibold tracking-widest transition-all hover:bg-zinc-900 hover:w-52"
              >
                Iniciar nova rodada!
              </button>
            ) : (
              <button
                onClick={handleReveal}
                className="py-3 w-48 ring-1 ring-zinc-500 rounded-lg shadow uppercase font-semibold tracking-widest transition-all hover:bg-zinc-900 hover:w-52"
              >
                Revelar!
              </button>
            )}
          </div>

          <Side>
            {owner ? (
              <Player
                isYou={owner.id === me?.id}
                id={owner.id}
                name={owner.name ?? "Unknow"}
                side="bottom"
                selectedCard={owner.selectedCard}
                isReveled={room?.isReveled}
              />
            ) : null}
          </Side>
        </div>
      </main>

      <footer className="px-4 h-36">
        {room?.isReveled ? (
          <div className="flex justify-center items-center gap-4">
            {average &&
              Object.keys(average).map((key) => (
                <div className="flex gap-2 p-3 rounded bg-zinc-800" key={key}>
                  <div className="w-14 h-24 relative rounded grid place-items-center transition-all text-lg font-bold bg-purple-600">
                    {key}
                    <span className="w-6 h-6 grid place-items-center rounded-full bg-red-600 shadow absolute -bottom-2 -right-2 text-sm ring-2 ring-zinc-800">
                      {average[key].count}
                    </span>
                  </div>
                  <ul>
                    {average[key].names.map((name: string) => (
                      <li key={name} className="text-sm">
                        {name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <p className="text-sm">
              Escolha sua carta {me?.selectedCard ? "👍" : "👇"}
            </p>
            <div className="flex gap-2 items-center justify-center">
              {fib.map((value) => {
                return (
                  <button
                    key={value}
                    className={`w-14 h-24 rounded grid place-items-center transition-all text-lg font-bold ${
                      value === me?.selectedCard
                        ? "bg-purple-600 -translate-y-2"
                        : "hover:-translate-y-2 bg-zinc-800"
                    }`}
                    onClick={() => handleSelectCard(value)}
                  >
                    {value}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </footer>
    </>
  );
}
