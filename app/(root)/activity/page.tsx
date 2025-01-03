import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { currentUser } from '@clerk/nextjs/server';

import { fetchUser, getActivites } from '@/lib/actions/user.actions';

const Page = async () => {
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect('/onboard');

    const activities = await getActivites(userInfo._id);

    return (
        <section>
            <h1 className="head-text mb-10">Activities</h1>
            <section className="mt-10 flex flex-col gap-5">
                {activities.length > 0 ? (
                    <>
                        {activities.map((activity: any) => (
                            <Link key={activity.id} href={`/thread/${activity.parentId}`}>
                                <article className="activity-card">
                                    <Image
                                        src={activity.author.image}
                                        alt="Profile Photo"
                                        width={20}
                                        height={20}
                                        className="rounded-full object-cover"
                                    />
                                    <p className="!text-small-regular text-light-1">
                                        <span className="mr-1 text-primary-500">{activity.author.name}</span> replied to
                                        your thread
                                    </p>
                                </article>
                            </Link>
                        ))}
                    </>
                ) : (
                    <p className="!text-base-regular text-light-3">No activity yet!</p>
                )}
            </section>
        </section>
    );
};

export default Page;
