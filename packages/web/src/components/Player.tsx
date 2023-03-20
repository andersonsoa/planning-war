import clx from "classnames";

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
        <p className={props.isYou ? "text-green-500 font-semibold" : ""}>
          {props.name}
        </p>
      )}
    </div>
  );
}
