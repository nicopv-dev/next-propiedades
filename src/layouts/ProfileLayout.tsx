import ProfileSidebar from '../components/Profile/ProfileSidebar';

interface IProfileLayoutProps {
  children: JSX.Element | JSX.Element[];
}

export default function ProfileLayout({ children }: IProfileLayoutProps) {
  return (
    <div className="flex gap-8 px-4 sm:px-14 md:px-20 lg:px-24 xl:px-32 my-4 min-h-[calc(100vh-32px)]">
      <ProfileSidebar />
      <div className="flex-[0.7_1_0%] grow border border-gray-500">
        {children}
      </div>
    </div>
  );
}
