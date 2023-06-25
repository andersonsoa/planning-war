import { FormEvent, useEffect, useState } from "react";
import { socket } from "../../lib/socket";
import { LoaderFunctionArgs, useNavigate, useParams } from "react-router-dom";
import { Side } from "../../components/Side";
import { Player } from "../../components/Player";
import { ClipboardButton } from "../../components/ClipboardButton";
import { Button } from "../../components/Button";
import { useUserStore } from "../../store/userStore";

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
  issue: string;
};

export function loader({ params }: LoaderFunctionArgs) {
  const store = useUserStore.getState();

  socket.emit("user:join", {
    userName: store.user?.name,
    roomId: params.roomId,
  });

  return params;
}

export function RoomDetail() {
  const fib = ["0", "1", "2", "3", "5", "8", "13", "21", "34", "55", "89", "?"];

  const [room, setRoom] = useState<Room>();
  const userStore = useUserStore();
  const navigate = useNavigate();

  function handleSelectCard(cardValue?: string) {
    socket.emit("user:update", {
      id: userStore.user?.id,
      selectedCard: cardValue === userStore.user?.selectedCard ? "" : cardValue,
    });
  }

  function handleReveal() {
    if (!room?.isReveled && room?.ownerId === userStore.user?.id) {
      socket.emit("room:reveal", room?.id);
    }
  }

  function handleNewRound() {
    if (room?.isReveled && room?.ownerId === userStore.user?.id) {
      socket.emit("room:new-round", room?.id);
    }
  }

  function onSubmitRoomIssue(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const issue = form.get("issue");
    e.currentTarget.reset();

    socket.emit("room:update", {
      roomId: room?.id,
      issue,
    });
  }

  useEffect(() => {
    const onConnect = () => console.log("[socket] connected");

    socket.on("connect", onConnect);
    socket.connect();

    return () => {
      socket.off("connect", onConnect);
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const onNotFound = () => {
      navigate("/");
    };

    const onMe = (me: User) => {
      userStore.updateUser(me);
    };

    const onRoomUpdated = (room: Room) => {
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
  const isOwner = userStore.user?.id === owner?.id;
  const commonUsers =
    room?.users.filter((user) => user.id !== room.ownerId) ?? [];

  const average = room?.users
    .filter((u) => !u.isSpectator)
    .map((u) => ({ ...u, selectedCard: u.selectedCard || "😴" }))
    .reduce((acc: Record<string, { count: number; names: string[] }>, cur) => {
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
                  Convide alguém
                </ClipboardButton>
              </div>
            ) : (
              commonUsers.map((cUser) => (
                <Player
                  id={cUser.id}
                  key={cUser.id}
                  isYou={cUser.id === userStore.user?.id}
                  name={cUser.name ?? "Unknow"}
                  selectedCard={cUser.selectedCard}
                  isSpectator={cUser.isSpectator}
                  isReveled={room?.isReveled}
                  side="top"
                />
              ))
            )}
          </Side>

          <div className="bg-zinc-800 rounded-b-lg rounded-t-full shadow-lg grid place-items-center">
            {!isOwner ? (
              <h2>{room?.issue || "O que será votado agora ?"}</h2>
            ) : (
              <>
                <form
                  onSubmit={onSubmitRoomIssue}
                  className="flex gap-1 rounded border border-zinc-700 p-1 max-w-sm w-full"
                >
                  <input
                    type="text"
                    name="issue"
                    placeholder={room?.issue || "O que será votado agora ?"}
                    className="bg-transparent focus:outline-none focus:border-none px-3 py-1 text-sm text-white w-full"
                  />
                  <button className="text-sm bg-zinc-600 rounded px-1">
                    Salvar
                  </button>
                </form>

                {room?.isReveled ? (
                  <Button onClick={handleNewRound}>Iniciar nova rodada!</Button>
                ) : (
                  <Button onClick={handleReveal}>Revelar!</Button>
                )}
              </>
            )}
          </div>

          <Side>
            {owner ? (
              <Player
                isYou={owner.id === userStore.user?.id}
                id={owner.id}
                name={owner.name ?? "Unknow"}
                side="bottom"
                selectedCard={owner.selectedCard}
                isReveled={room?.isReveled}
                isSpectator={owner.isSpectator}
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
              Escolha sua carta {userStore.user?.selectedCard ? "👍" : "👇"}
            </p>
            <div className="flex gap-2 items-center justify-center">
              {fib.map((value) => {
                return (
                  <button
                    key={value}
                    disabled={userStore.user?.isSpectator}
                    className={`w-14 h-24 rounded grid place-items-center transition-all text-lg font-bold ${
                      value === userStore.user?.selectedCard
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
