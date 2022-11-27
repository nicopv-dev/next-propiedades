interface IFeatureProps {
  title: string;
  description: string;
  icon?: string;
}

export default function Feature({ title, description }: IFeatureProps) {
  return (
    <section>
      <h2 className="font-semibold">{title}</h2>
      <p className="font-light text-sm">{description}</p>
    </section>
  );
}
