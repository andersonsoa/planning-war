import { Popover, Transition } from "@headlessui/react";
import { Pen } from "@phosphor-icons/react";
import clx from "classnames";
import { Fragment } from "react";

type Sides = "top" | "bottom";

interface PlayerProps {
  name: string;
  avatarUrl?: string;
  side: Sides;
  isYou?: boolean;
  isReveled?: boolean;
  selectedCard?: string;
}

export function Player(props: PlayerProps) {
  const classNames = clx("flex items-center gap-2 p-2", {
    "flex-col flex-col-reverse": props.side === "top",
    "flex-col": props.side === "bottom",
  });

  return (
    <div className={classNames}>
      <div className={`flip-card ${props.isReveled && "active"}`}>
        <div className="flip-card-inner">
          <div
            className={`flip-card-front ring-2 ${
              props.selectedCard ? "ring-purple-500" : "ring-transparent"
            }`}
          >
            {props.selectedCard ? "👍" : "❓"}
          </div>
          <div className="flip-card-back ring-2 ring-transparent">
            {props.selectedCard || "😴"}
          </div>
        </div>
      </div>
      {props.avatarUrl ? (
        <div className="w-14 h-14 rounded-full bg-zinc-600"></div>
      ) : (
        <p
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
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel
                  className={`absolute left-1/2 z-10 w-screen max-w-sm -translate-x-1/2 transform px-4 ${
                    props.side === "bottom" ? "mt-3" : "-top-16"
                  }`}
                >
                  <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                    <form className="relative flex gap-8 bg-white p-2 items-center">
                      <input
                        type="text"
                        className="outline-0 w-full px-2  text-zinc-800"
                        placeholder={props.name}
                      />
                      <button className="bg-zinc-800 hover:bg-zinc-700 text-white hover:text-green-400 transition-colors h-10 px-4 rounded-md">
                        Salvar
                      </button>
                    </form>
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>
          ) : null}
        </p>
      )}
    </div>
  );
}
