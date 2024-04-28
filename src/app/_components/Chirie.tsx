import * as React from "react"
import Image from "next/image"
import { Heart } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
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


export function Chirie({ chirie }: { chirie: ChirieType }) {
    const { adress, propertyInfo, otherInfo, images } = chirie;

    const title = `${propertyInfo.type} cu ${propertyInfo.rooms} camere în ${adress.city}, ${propertyInfo.surface}mp`;

    return (
        <Card className="w-[350px] h-[450px]">
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
                <Button asChild>
                    <Link href={`/${chirie.id}`}>
                        Vezi oferta
                    </Link>
                </Button>
                <Button variant="ghost" size="icon" aria-label="Love">
                    {/* <Heart className="size-5 fill-foreground" /> */}
                    <Heart className="size-5" />
                </Button>
            </CardFooter>
        </Card >
    )
}
