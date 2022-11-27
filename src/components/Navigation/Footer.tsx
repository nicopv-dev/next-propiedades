import { useRouter } from 'next/router';

export default function Footer() {
  const router = useRouter();
  return (
    <footer
      className={`${
        router.pathname.includes('search') ? 'static' : 'fixed bottom-0 left-0'
      } bg-white h-12 flex items-center w-full px-20 shadow-lg border-t border-t-slate-300 z-20`}
    >
      <span className="text-sm">© 2022 Airbnb, Inc.</span>
    </footer>
  );
}
