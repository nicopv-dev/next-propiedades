interface ICardProps {
  title: string;
  description: string;
  textColor?: string;
}

export default function Card({
  title,
  description,
  textColor = 'text-black',
}: ICardProps) {
  return (
    <div
      className={`py-6 px-10 bg-gray-100 rounded-xl space-y-3 shadow-sm flex flex-col items-center sm:items-start`}
    >
      <h3 className="font-medium text-light text-center sm:text-left">
        {title}
      </h3>
      <h2 className={`text-4xl font-semibold ${textColor}`}>{description}</h2>
    </div>
  );
}
