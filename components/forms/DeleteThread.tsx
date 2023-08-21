'use client';

import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

import { deleteThread } from '@/lib/actions/thread.actions';

interface Props {
    threadId: string;
    currentUserId: string;
    authorId: string;
    parentId: string | null;
    isComment?: boolean;
}

const DeleteThread = ({ threadId, currentUserId, authorId, parentId, isComment }: Props) => {
    const router = useRouter();
    const pathname = usePathname();

    if (currentUserId !== authorId || pathname === '/') return null;

    return (
        <Image
            src="/assets/delete.svg"
            alt="delete thread"
            width={20}
            height={20}
            className="cursor-pointer object-contain"
            onClick={async () => {
                await deleteThread(threadId, pathname);
                if (!parentId || !isComment) {
                    router.push('/');
                }
            }}
        />
    );
};

export default DeleteThread;
