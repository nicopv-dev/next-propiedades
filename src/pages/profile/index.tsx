import MainLayout from '../../layouts/MainLayout';
import ProfileLayout from '../../layouts/ProfileLayout';

export default function index() {
  return (
    <MainLayout title="Mi perfil">
      <ProfileLayout>
        <div>perfil</div>
      </ProfileLayout>
    </MainLayout>
  );
}
