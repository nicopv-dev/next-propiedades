import HeadComponent from '../components/HeadComponent';

interface IProfileLayoutProps {
  children: JSX.Element | JSX.Element[];
  title: string;
}

export default function ProfileLayout({
  children,
  title,
}: IProfileLayoutProps) {
  return (
    <>
      <HeadComponent title={title} />
      <div className="relative">
        {/* HEADER */}
        {/* CONTENT */}
        <div>{children}</div>
        {/* FOOTER */}
      </div>
    </>
  );
}
