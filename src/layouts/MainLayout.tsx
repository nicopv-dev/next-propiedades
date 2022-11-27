import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import HeadComponent from '../components/HeadComponent';
import Footer from '../components/Navigation/Footer';
import Header from '../components/Navigation/Header';
import useWidth from '../hooks/useWidth';

interface IMainLayoutProps {
  children: JSX.Element;
  title: string;
}

const conditions = ['whislists', 'profile', 'likes'];

export default function MainLayout({ children, title }: IMainLayoutProps) {
  const router = useRouter();
  const [isFooterVisible, setIsFooterVisible] = useState<boolean>(true);
  const width = useWidth();

  const showFooter = (): void => {
    const isContain = conditions.some((item) => router.pathname.includes(item));

    if (isContain) {
      setIsFooterVisible(false);
    } else {
      setIsFooterVisible(true);
    }
  };

  useEffect(() => {
    showFooter();
  }, [router.pathname]);

  return (
    <>
      <HeadComponent title={title} />
      <div className="relative">
        {/* HEADER */}
        <Header />
        {/* CONTENT */}
        <div>{children}</div>
        {/* FOOTER */}
        {isFooterVisible && width > 600 && <Footer />}
      </div>
    </>
  );
}
