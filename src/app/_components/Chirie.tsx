import * as React from "react"
import Image from "next/image"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { ChirieType } from "@/types/chirie"
import SingleChirie from "@/app/(main)/single";
import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";


export function Chirie({ chirie }: { chirie: ChirieType }) {
    const { adress, propertyInfo, otherInfo, images } = chirie;

    const title = `${propertyInfo.type} cu ${propertyInfo.rooms} camere în ${adress.city}, ${propertyInfo.surface}mp`;

    return (
        <Card className="w-[350px] h-[450px] m-4">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription className="text-primary">{propertyInfo.price} €</CardDescription>
                <CardDescription className="h-[50px]">{otherInfo.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <Carousel>
                    <CarouselContent>
                        {
                            images.map((img, index) =>
                                <CarouselItem key={index}>
                                    <Image src={img} alt="apartment" width={350} height={200} />
                                </CarouselItem>
                            )
                        }
                    </CarouselContent>
                    {/* <CarouselPrevious /> */}
                    {/* <CarouselNext /> */}
                </Carousel>
            </CardContent>
            <CardFooter className="flex justify-between">
                    <Dialog>
                    <Button className="bg-primary text-white" asChild>
                        <DialogTrigger>Vezi detalii</DialogTrigger>
                    </Button>
                        <DialogContent className="overflow-y-auto">
                            <SingleChirie params={{ id: chirie.id }} />
                        </DialogContent>
                    </Dialog>
            </CardFooter>
        </Card >
    )
}
