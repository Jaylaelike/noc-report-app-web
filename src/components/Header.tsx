import { validateRequest } from "~/auth/validateRequest";
import LogoutButton from "./LogoutButton";
import DrawerSideBar from "~/components/DrawerSideBar";

export default async function Header() {
  const { user } = await validateRequest();

  return (
    <header className="sticky top-0 flex items-center gap-4 bg-indigo-600 text-indigo-50">
      <div className="container mx-auto flex grow items-center justify-between p-3">
        <div className="sticky top-0 z-0">
        
            <DrawerSideBar />
         
        </div>

        <div className="flex items-center justify-between gap-4">
          {user && (
            <>
              <div>Hi, {user.username}!</div> <LogoutButton />
            </>
          )}
        </div>
      </div>
    </header>
  );
}
