interface IBannerProps {
  bgColor?: string;
  textColor?: string;
  title: string;
  btnTextColor?: string;
  height?: string;
  hero?: boolean;
}

export default function Banner({
  bgColor,
  textColor = 'text-white',
  title,
  btnTextColor,
  height = 'h-96',
  hero = false,
}: IBannerProps) {
  return (
    <div
      className={`${height} ${
        hero ? 'bg-hero' : bgColor
      } px-12 sm:px-20 flex flex-col items-center justify-center rounded-xl gap-10`}
    >
      <h1
        className={`${textColor} font-semibold max-w-3xl text-2xl sm:text-3xl md:text-5xl text-center`}
      >
        {title}
      </h1>
      <button
        type="button"
        className={`bg-transparent ${btnTextColor} border border-white py-2 px-6 rounded-lg transition-all duration-300 ease-in hover:bg-white hover:text-black`}
      >
        Mas informacion
      </button>
    </div>
  );
}
