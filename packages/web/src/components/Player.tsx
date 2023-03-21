import { Popover, Transition } from "@headlessui/react";
import { Eye, EyeSlash, Pen } from "@phosphor-icons/react";
import clx from "classnames";
import { FormEvent, Fragment, useRef } from "react";
import { socket } from "../lib/socket";

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
  function createHandleChangeName(
    closeFn: (
      args:
        | HTMLElement
        | React.MutableRefObject<HTMLElement | null>
        | undefined,
    ) => unknown,
  ) {
    return (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = new FormData(e.currentTarget);

      const name = form.get("name");

      socket.emit("user:update", {
        id: props.id,
        name,
      });

      closeFn(undefined);
    };
  }

  function handleToggleSpectator() {
    socket.emit("user:update", {
      id: props.id,
      isSpectator: !props.isSpectator,
    });
  }

  const classNames = clx("group flex items-center gap-2 p-2", {
    "flex-col flex-col-reverse": props.side === "top",
    "flex-col": props.side === "bottom",
  });

  const animations = {
    top: {
      enterFrom: "opacity-0 -translate-y-1",
      enterTo: "opacity-100 translate-y-0",
      leaveFrom: "opacity-100 translate-y-0",
      leaveTo: "opacity-0 -translate-y-1",
    },
    bottom: {
      enterFrom: "opacity-0 translate-y-1",
      enterTo: "opacity-100 translate-y-0",
      leaveFrom: "opacity-100 translate-y-0",
      leaveTo: "opacity-0 translate-y-1",
    },
  };

  const animation = animations[props.side];

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
          {props.isYou ? (
            <Popover>
              <Popover.Button className="bg-gray-800 p-1 rounded shadow hover:bg-gray-700 transition-colors">
                <Pen size={20} />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom={animation.enterFrom}
                enterTo={animation.enterTo}
                leave="transition ease-in duration-150"
                leaveFrom={animation.leaveFrom}
                leaveTo={animation.leaveTo}
              >
                <Popover.Panel
                  className={`absolute left-1/2 z-10 -translate-x-1/2 transform px-4 ${
                    props.side === "bottom" ? "mt-3" : "-top-14"
                  }`}
                >
                  {({ close }) => (
                    <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                      <form
                        onSubmit={createHandleChangeName(close)}
                        className="relative flex gap-2 bg-white p-1 items-center text-sm"
                      >
                        <input
                          type="text"
                          name="name"
                          className="outline-0  px-2  text-zinc-800"
                          placeholder={props.name}
                          autoFocus
                        />
                        <button className="bg-zinc-800 hover:bg-zinc-700 text-white hover:text-green-400 transition-colors h-8 px-4 rounded-md">
                          Salvar
                        </button>
                      </form>
                    </div>
                  )}
                </Popover.Panel>
              </Transition>
            </Popover>
          ) : null}
        </div>
      )}
    </div>
  );
}
