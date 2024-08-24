import { validateRequest } from '~/auth/validateRequest';
import LogoutButton from './LogoutButton';
import DrawerSideBar from "~/components/DrawerSideBar";

export default async function Header() {
    const { user } = await validateRequest();

    return (
        <header className='sticky top-0 bg-indigo-600   gap-4 items-center flex    text-indigo-50'>
            
            <div className='justify-between grow container mx-auto flex p-3 items-center'>
            

            <div className='sticky top-0 z-0'>
            <DrawerSideBar />
            </div>
            
                

              

                <div className='flex justify-between gap-4 items-center'>
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
