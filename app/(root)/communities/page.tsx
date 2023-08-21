import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs';

import { fetchCommunities } from '@/lib/actions/community.actions';
import { fetchUser } from '@/lib/actions/user.actions';

import CommunityCard from '@/components/cards/CommunityCard';
import Searchbar from '@/components/shared/Searchbar';

const Page = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect('/onboarding');

    const results = await fetchCommunities({
        pageNumber: 1,
        pageSize: 25,
        searchString: searchParams.q
    });

    return (
        <section>
            <h1 className="head-text mb-10">Search Page</h1>
            <div className="mt-5">
                <Searchbar routeType="communities" />
            </div>
            <div className="mt-14 flex flex-col gap-9">
                {results.communities.length === 0 ? (
                    <p className="no-result">No result</p>
                ) : (
                    <>
                        {results.communities.map((community) => (
                            <CommunityCard
                                key={community.id}
                                id={community.id}
                                name={community.name}
                                username={community.username}
                                imgUrl={community.image}
                                bio={community.bio}
                                members={community.members}
                            />
                        ))}
                    </>
                )}
            </div>
        </section>
    );
};

export default Page;
