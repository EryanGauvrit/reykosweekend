import { auth } from 'auth';
import { User } from 'next-auth';
import UserPannel from './UserPannel';

const HeaderAuth = async () => {
    const session = await auth();

    const user = session?.user as unknown as User;

    return <>{user && <UserPannel user={user} />}</>;
};

export default HeaderAuth;
