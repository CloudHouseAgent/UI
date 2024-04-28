import {
    Book,
    Bot,
    Code2,
    CornerDownLeft,
    LifeBuoy,
    Mic,
    Paperclip,
    Settings2,
    SquareTerminal,
    SquareUser,
    Triangle,
} from "lucide-react"

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

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
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
                <div className="flex flex-col">
                    <main className="flex h-screen">
                        <div
                            className="p-4 relative hidden w-3/4 f-hull overflow-y-auto flex-row flex-wrap justify-center gap-4 md:flex" x-chunk="dashboard-03-chunk-0"
                        >
                            {children}
                        </div>
                        <div className="relative flex h-full flex-col rounded-xl bg-muted/50 p-4 w-1/4">
                            <div className="flex-1" />
                            <form
                                className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring" x-chunk="dashboard-03-chunk-1"
                            >
                                <Label htmlFor="message" className="sr-only">
                                    Mesaj
                                </Label>
                                <Textarea
                                    id="message"
                                    placeholder="Scrie un mesaj aici..."
                                    className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                                />
                                <div className="flex items-center p-3 pt-0">
                                    <Button type="submit" size="sm" className="ml-auto gap-1.5">
                                        Scrie un mesaj
                                        <CornerDownLeft className="size-3.5" />
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </main>
                </div>
            </div>
        </TooltipProvider >
    )
}
