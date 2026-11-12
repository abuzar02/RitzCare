export default function HeroTypography() {
  return (
    <div
      aria-hidden
      className="
        pointer-events-none absolute inset-x-0 z-10
        top-[48%] -translate-y-1/2
        sm:top-[50%]
        lg:top-[52%]
        flex flex-col items-center justify-center text-center
      "
    >
      <div className="hero-text hero-title leading-[0.9] text-[27vw] sm:text-[24vw] lg:text-[21vw] xl:text-[15rem]">
        Ritz Auto
      </div>
      <div className="hero-text hero-sub -mt-[1.2vw] leading-[0.9] text-[12vw] sm:text-[10vw] lg:text-[8.5vw] xl:text-[8rem]">
        Care LLC
      </div>
      <h1 className="sr-only">Ritz Auto Care LLC – SL 400 R-Matic</h1>
    </div>
  );
}