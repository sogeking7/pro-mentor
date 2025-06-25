import { Profile } from "@/features/me/Profile/Profile";
import GoBackButton from "@/components/custom/GoBackButton";

export default function MePage() {
  return (
    <div>
      <GoBackButton />
      <h1 className="mb-4 text-2xl font-bold">Жеке кабинет</h1>
      <Profile />
    </div>
  );
}
