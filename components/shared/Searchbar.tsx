'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Input } from '../ui/input';

interface Props {
    routeType: string;
}

const Searchbar = ({ routeType }: Props) => {
    const router = useRouter();
    const [search, setSearch] = useState('');

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (search) {
                router.push(`/${routeType}?q=` + search);
            } else {
                router.push(`/${routeType}`);
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, routeType]);

    return (
        <div className="searchbar">
            <Image src="/assets/search-gray.svg" alt="search" width={24} height={24} className="object-contain" />
            <Input
                id="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`${routeType !== 'search' ? 'Search communities' : 'Search users'}`}
                className="no-focus searchbar_input"
            />
        </div>
    );
};

export default Searchbar;
