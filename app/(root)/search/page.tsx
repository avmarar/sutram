import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs';

import UserCard from '@/components/cards/UserCard';
import Searchbar from '@/components/shared/Searchbar';

import { fetchUsers, fetchUser } from '@/lib/actions/user.actions';

const Page = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect('/onboard');

    const results = await fetchUsers({
        userId: user.id,
        pageNumber: 1,
        pageSize: 25,
        search: searchParams.q
    });

    return (
        <section>
            <h1 className="head-text mb-10">Search Page</h1>
            <Searchbar routeType="search" />
            <div className="mt-14 flex flex-col gap-9">
                {results.users.length === 0 ? (
                    <p className="no-result">No result</p>
                ) : (
                    <>
                        {results.users.map((user) => (
                            <UserCard
                                key={user.id}
                                id={user.id}
                                name={user.name}
                                username={user.username}
                                imgUrl={user.image}
                                personType="User"
                            />
                        ))}
                    </>
                )}
            </div>
        </section>
    );
};

export default Page;
