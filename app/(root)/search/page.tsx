import { redirect } from 'next/navigation';
// import Image from 'next/image';
import { currentUser } from '@clerk/nextjs';

import UserCard from '@/components/cards/UserCard';

import { fetchUsers, fetchUser } from '@/lib/actions/user.actions';

const Page = async () => {
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect('/onboard');

    const results = await fetchUsers({
        userId: user.id,
        pageNumber: 1,
        pageSize: 25,
        search: ''
    });

    return (
        <section>
            <h1 className="head-text mb-10">Search Page</h1>
            {/* Search Bar */}
            <div className="mt-14 flex flex-col gap-9">
                {results.users.length === 0 ? (
                    // <div className='text-center'>
                    //     <Image
                    //         src='/images/search.svg'
                    //         alt='search icon'
                    //         width={100}
                    //         height={100}
                    //     />
                    //     <h1 className='text-3xl font-bold text-gray-900'>
                    //         No results found
                    //     </h1>
                    // </div>
                    <p className="no-result">No Users</p>
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
