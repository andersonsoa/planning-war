import { Popover, Transition } from "@headlessui/react";
import { FormEvent, Fragment } from "react";

interface UpdatePlayerNameProps {
  children: React.ReactNode;
  placeholder?: string;
  onSubmit: (name: string) => void;
}

export function UpdatePlayerName(props: UpdatePlayerNameProps) {
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

      const name = form.get("name") as string | null;

      if (name) {
        props.onSubmit(name);
      }

      closeFn(undefined);
    };
  }

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

  const animation = animations["bottom"];

  return (
    <Popover>
      <Popover.Button>{props.children}</Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom={animation.enterFrom}
        enterTo={animation.enterTo}
        leave="transition ease-in duration-150"
        leaveFrom={animation.leaveFrom}
        leaveTo={animation.leaveTo}
      >
        <Popover.Panel className={`absolute z-10 right-0 transform px-4 mt-2`}>
          {({ close }) => (
            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
              <form
                onSubmit={createHandleChangeName(close)}
                className="relative flex gap-2 bg-white p-1 items-center text-sm"
              >
                <input
                  type="text"
                  name="name"
                  className="outline-none focus:bottom-0 focus:outline-none px-2 text-zinc-800"
                  placeholder={props.placeholder}
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
  );
}
