import { useAuth } from "@/contexts/AuthContext";
import ProfileForm from "@/features/me/Profile/ProfileForm";

export const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return <div className="my-4 text-center text-xl">Сізге тіркелу қажет!</div>;
  }

  return (
    <div>
      <div className="flex justify-center">
        <ProfileForm user={user} />
      </div>
    </div>
  );
};
