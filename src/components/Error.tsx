interface IErrorProps {
  title: string;
}

export default function Error({ title }: IErrorProps) {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-black font-semibold text-3xl">{title}</h1>
      <p>Lo Sentimos!!</p>
    </div>
  );
}
