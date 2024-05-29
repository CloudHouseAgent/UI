import Image from "next/image"
import Link from "next/link"
import {
    MoreHorizontal,
    PlusCircle,
} from "lucide-react"


import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Tabs,
    TabsContent,
} from "@/components/ui/tabs"

import { deleteChirieById, getChiriileMele } from "@/lib/actions"


export default async function Dashboard() {
    const chirii = await getChiriileMele();

    async function handleDelete(data: FormData) {
        "use server"
        const id = data.get("id") as string;
        await deleteChirieById(id);
    }

    return (
        <Tabs defaultValue="all">
            <div className="flex items-center">
                <div className="ml-auto flex items-center gap-2">
                    <Button size="sm" className="h-8 gap-1" asChild>
                        <Link href="/dashboard/add" className="flex items-center gap-1">
                            <PlusCircle className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Adauga chirie
                            </span>
                        </Link>
                    </Button>
                </div>
            </div>
            <TabsContent value="all">
                <Card x-chunk="dashboard-06-chunk-0">
                    <CardHeader>
                        <CardTitle>Chiriile tale</CardTitle>
                        <CardDescription>
                            Gestioneaza chiriile tale aici sau adauga una noua.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="hidden w-[100px] sm:table-cell">
                                        <span className="sr-only">Image</span>
                                    </TableHead>
                                    <TableHead>Nume</TableHead>
                                    <TableHead className="hidden md:table-cell">
                                        Pret
                                    </TableHead>
                                    <TableHead>
                                        <span className="sr-only">Actions</span>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    chirii.map(({ propertyInfo, adress, id, images }) => (
                                        <TableRow key={id}>
                                            <TableCell className="hidden sm:table-cell">
                                                {
                                                    images.length > 0 ?
                                                        <Image
                                                            alt="Product image"
                                                            className="aspect-square rounded-md object-cover"
                                                            height="64"
                                                            src={images[0]}
                                                            width="64"
                                                        /> :
                                                        <div className="aspect-square rounded-md bg-green-500" />
                                                }
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {propertyInfo.type} cu {propertyInfo.rooms} camere în {adress.city}, {propertyInfo.surface}
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                {propertyInfo.price} €
                                            </TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button
                                                            aria-haspopup="true"
                                                            size="icon"
                                                            variant="ghost"
                                                        >
                                                            <MoreHorizontal className="h-4 w-4" />
                                                            <span className="sr-only">Toggle menu</span>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <form action={handleDelete}>
                                                            <input name="id" type="hidden" value={id} />
                                                            <DropdownMenuItem>
                                                                <Button className="" size="sm" type="submit">
                                                                    Delete
                                                                </Button>
                                                            </DropdownMenuItem>
                                                        </form>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>))
                                }
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    )
}
