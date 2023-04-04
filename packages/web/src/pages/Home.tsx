import { Link } from "react-router-dom";

export function Home() {
  const memes = ["/meme1.jpg", "/meme2.jpg", "/meme3.jpg", "/meme4.jpg"];

  const selectedMeme = memes[Math.floor(Math.random() * memes.length)];

  return (
    <section className="p-4 h-screen flex flex-col items-center justify-center gap-8 max-w-4xl mx-auto w-[600px]">
      <h1 className="text-2xl font-semibold text-fuchsia-200">Planning WARS</h1>

      <img src={selectedMeme} alt="Planning..." className="w-[600px]" />

      <Link
        className="px-4 h-10 rounded grid place-items-center text-xl shadow-lg ring-1 ring-purple-600 hover:bg-purple-600 transition-all"
        to="/room"
      >
        Crie sua Planning agora!
      </Link>
    </section>
  );
}
