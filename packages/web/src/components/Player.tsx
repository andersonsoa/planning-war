import { Eye, EyeSlash, Pen } from "@phosphor-icons/react";
import clx from "classnames";
import { socket } from "../lib/socket";
import { UpdatePlayerName } from "./UpdatePlayerName";

type Sides = "top" | "bottom";

interface PlayerProps {
  id: string;
  name: string;
  avatarUrl?: string;
  side: Sides;
  isYou?: boolean;
  isReveled?: boolean;
  selectedCard?: string;
  isSpectator?: boolean;
}

export function Player(props: PlayerProps) {
  function handleToggleSpectator() {
    socket.emit("user:update", {
      id: props.id,
      isSpectator: !props.isSpectator,
      selectedCard: "",
    });
  }

  const classNames = clx("group flex items-center gap-2 p-2", {
    "flex-col flex-col-reverse": props.side === "top",
    "flex-col": props.side === "bottom",
  });

  return (
    <div className={classNames}>
      <div
        className={`flip-card ${
          props.isReveled && !props.isSpectator && "active"
        }`}
      >
        <div className="flip-card-inner">
          {!props.isSpectator ? (
            <>
              <div
                className={`flip-card-front ring-2 relative ${
                  props.selectedCard ? "ring-purple-500" : "ring-transparent"
                }`}
              >
                {props.selectedCard ? "👍" : "❓"}
              </div>
              <div className="flip-card-back ring-2 ring-transparent">
                {props.selectedCard || "😴"}
              </div>
            </>
          ) : (
            <div className="text-lg w-full h-full bg-zinc-800 border-dashed border-purple-500 border-2 rounded grid place-items-center">
              👀
            </div>
          )}
        </div>
        {props.isYou && (
          <button
            onClick={handleToggleSpectator}
            className="absolute translate-x-10 hidden bg-zinc-800 shadow rounded-full place-items-center h-6 w-6 group-hover:grid hover:bg-zinc-700"
          >
            {props.isSpectator ? (
              <EyeSlash size={14} className="" />
            ) : (
              <Eye size={14} className="" />
            )}
          </button>
        )}
      </div>
      {props.avatarUrl ? (
        <div className="w-14 h-14 rounded-full bg-zinc-600"></div>
      ) : (
        <div
          className={`flex items-center gap-2 relative ${
            props.isYou ? "text-green-500 font-semibold" : ""
          }`}
        >
          {props.name}
        </div>
      )}
    </div>
  );
}
