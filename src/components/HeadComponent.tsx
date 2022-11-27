import Head from 'next/head';

interface ITitleProps {
  title: string;
}

export default function HeadComponent({ title }: ITitleProps) {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
}
