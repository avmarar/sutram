import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';

import { fetchCommunities } from '@/lib/actions/community.actions';
import { fetchUser } from '@/lib/actions/user.actions';

import CommunityCard from '@/components/cards/CommunityCard';
import Searchbar from '@/components/shared/Searchbar';

type CommunityPageProps = {
    searchParams: Promise<Record<string, string | undefined>>;
};

const Page = async ({ searchParams }: CommunityPageProps) => {
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect('/onboard');

    const resolvedSearchParams = await searchParams;

    const results = await fetchCommunities({
        pageNumber: 1,
        pageSize: 25,
        searchString: resolvedSearchParams.q
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
