import { Profile } from "@/features/me/Profile/Profile";
import GoBackButton from "@/components/custom/GoBackButton";
import { PageTitle } from "@/components/custom/PageTitle";
import { SideBar, type SideBarSections } from "@/components/custom/SideBar";

const sections: SideBarSections = [
  {
    title: "👤 Профиль",
    content: <Profile />,
  },
];
export default function MePage() {
  return (
    <div>
      <GoBackButton />
      <PageTitle title={"👤 Жеке кабинет"} />
      <SideBar sections={sections} />
    </div>
  );
}
