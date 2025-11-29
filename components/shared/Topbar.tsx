import { OrganizationSwitcher, SignOutButton, SignedIn } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import Image from 'next/image';
import Link from 'next/link';

const Topbar = () => {
    return (
        <nav className="topbar">
            <Link href="/" className="flex items-center gap-4">
                <Image src="/assets/logo.svg" alt="logo" width={28} height={28} />
                <p className="text-heading3-bold text-light-1 max-xs:hidden">ThreadLoom</p>
            </Link>
            <div className="flex items-center gap-1">
                <div className="block md:hidden">
                    <SignedIn>
                        <SignOutButton>
                            <div className="flex cursor-pointer">
                                <Image src="/assets/logout.svg" alt="logout" width={24} height={24} />
                            </div>
                        </SignOutButton>
                    </SignedIn>
                </div>
                <OrganizationSwitcher
                    appearance={{
                        baseTheme: dark,
                        elements: {
                            organizationSwitcherTrigger:
                                'py-2 px-4 bg-dark-3 text-light-1 border border-dark-4 hover:bg-dark-2 transition data-[state=open]:bg-dark-2 data-[state=open]:text-light-1 data-[active=true]:text-light-1 !text-light-1',
                            organizationSwitcherTriggerIcon:
                                'text-light-1 group-hover:text-light-1 data-[state=open]:text-light-1 data-[active=true]:text-light-1 !text-light-1',
                            organizationSwitcherTriggerText:
                                'text-light-1 hover:text-light-1 data-[state=open]:text-light-1 data-[active=true]:text-light-1 !text-light-1',
                            organizationSwitcherPopoverCard: 'bg-dark-3 border border-dark-4 text-light-1',
                            organizationSwitcherPopoverHeader: 'text-light-1',
                            organizationSwitcherPopoverText: 'text-light-1',
                            organizationSwitcherPopoverSubtitle: 'text-light-2',
                            organizationSwitcherPopoverItem: 'text-light-1 hover:bg-dark-2',
                            organizationSwitcherPopoverActionButton:
                                'text-light-1 hover:bg-dark-2 border border-dark-4',
                            organizationSwitcherPopoverCreateOrganization:
                                'text-light-1 hover:bg-dark-2 border border-dark-4',
                            organizationSwitcherPopoverManageOrganization:
                                'text-light-1 hover:bg-dark-2 border border-dark-4',
                            organizationSwitcherPopoverPrimaryButton: 'bg-primary-500 hover:bg-primary-600 text-white'
                        }
                    }}
                />
            </div>
        </nav>
    );
};

export default Topbar;
