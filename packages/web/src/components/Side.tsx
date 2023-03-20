interface SideProps {
  children?: React.ReactNode;
}

export function Side(props: SideProps) {
  return (
    <div className="flex justify-center items-center gap-2">
      {props.children}
    </div>
  );
}
