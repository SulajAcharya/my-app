"use client"

import { UserButton } from "@clerk/nextjs"
import { usePathname } from "next/navigation"
import { LogOut } from "lucide-react";
import Link from "next/link";

import { Button } from "./ui/button";

import { SearchInput } from "./search-input";

export const NavbarRoutes = () => {
    const pathname = usePathname();

    const isTeacherPage = pathname?.startsWith("/teacher");
    const isPlayerPage = pathname?.includes("/chapter");
    const isSearchPage = pathname === "/search";

    return (
        <>
            {isSearchPage && (0+5a          1`1`zzxs6 9ijm n
                <div className="hidden md:block">
                    <SearchInput />
                </div>
            )}
            <div className="flex gap-x-2 ml-auto">
                {isTeacherPage || isPlayerPage ? (
                    <Link href="/">
                        <Button size="sm" variant="ghost">
                            <LogOut className="h-4 w-4 mr-2" />
                                Exit
                        </Button>
                    </Link>
                ): (
                    <Link href="/teacher/courses">
                        <Button size="sm" variant="ghost">
                            Teacher Mode
                        </Button>
                    </Link>              
                )}
                <UserButton
                    afterSignOutUrl="/" //if not used while be redirected to clerk website
                />
            </div>
        </>
    )
}