import {
    CornerDownLeft,
    SquareUser,
    Triangle,
} from "lucide-react"

import { AI } from '@/lib/ai-actions';

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider
} from "@/components/ui/tooltip"
import Link from "next/link"
import React from "react";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <AI>
        <TooltipProvider>
            <div className="grid h-screen w-full pl-[56px]">
                <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
                    <div className="border-b p-2">
                        <Button variant="outline" size="icon" aria-label="Home">
                            <Triangle className="size-5 fill-foreground" />
                        </Button>
                    </div>
                    <nav className="mt-auto grid gap-1 p-2">
                        <Tooltip>
                            <Link href="/dashboard">
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="mt-auto rounded-lg"
                                        aria-label="Account"
                                    >
                                        <SquareUser className="size-5" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="right" sideOffset={5}>
                                    Proprietar
                                </TooltipContent>
                            </Link>
                        </Tooltip>
                    </nav>
                </aside>
                <div className="">
                    {children}
                </div>
            </div>
        </TooltipProvider >
        </AI>
    )
}
