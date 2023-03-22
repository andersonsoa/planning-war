interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export function Button(props: ButtonProps) {
  return (
    <button
      onClick={props.onClick}
      className="py-2 px-4 ring-1 ring-zinc-500 rounded-md shadow text-sm uppercase font-semibold tracking-widest transition-all hover:bg-zinc-900 hover:px-5"
    >
      {props.children}
    </button>
  );
}
