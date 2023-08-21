import { redirect } from 'next/navigation';

import { fetchUserReplies } from '@/lib/actions/user.actions';

import ThreadCard from '../cards/ThreadCard';

interface Props {
    currentUserId: string;
}

const RepliesTab = async ({ currentUserId }: Props) => {
    let results: any;

    results = await fetchUserReplies(currentUserId);
    console.log('result:', results);

    if (!results) {
        redirect('/');
    }

    return (
        <section className="mt-9 flex flex-col gap-10">
            {results.map((result: any) => (
                <ThreadCard
                    key={result._id}
                    id={result._id}
                    currentUserId={JSON.stringify(currentUserId)}
                    parentId={result.parentId}
                    content={result.text}
                    author={{ name: result.author.name, image: result.author.image, id: result.author.id }}
                    community={result.community}
                    createdAt={result.createdAt}
                    comments={result.children}
                    isComment
                />
            ))}
        </section>
    );
};

export default RepliesTab;
