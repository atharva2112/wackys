import Link from "next/link";

export default function NotFound() {
  return (
    <section className="grid min-h-[70vh] place-items-center bg-scanlines px-4 py-20 text-center">
      <div>
        <p className="pixel text-[15px] text-amber">ERROR 404</p>
        <h1 className="pixel mt-4 text-[clamp(3rem,12vw,7rem)] font-bold leading-none glow-text">GAME<br />OVER</h1>
        <p className="mx-auto mt-6 max-w-md text-bark">That page wandered off the menu. Continue?</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-arcade">Continue ▶</Link>
          <Link href="/menu" className="btn btn-primary">See the menu</Link>
        </div>
      </div>
    </section>
  );
}
