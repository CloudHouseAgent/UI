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


const img_url = 'https://ireland.apollo.olxcdn.com/v1/files/eyJmbiI6Im1vZjZ5dW01bjM0MzItQVJPIiwidyI6W3siZm4iOiIzdzU2NnhnanB5MnAxLUFSTyIsInMiOiIxNCIsInAiOiIxMCwtMTAiLCJhIjoiMCJ9XX0.iLW6bvSn-qjNVBcn0297CKaMoZcCJYI3vrryJ-BuSPM/image;s=1280x1024;q=80';



export default function Page() {
    return (
        <Card className="">
            <CardHeader>
                <CardTitle>Apartament finisat, la cheie</CardTitle>
                <CardDescription className="text-primary">63 000 €</CardDescription>
                <CardDescription>Apartament in micro cu 2 camere cu bucatarie separata, se preda complet mobilat.</CardDescription>
            </CardHeader>
            <CardContent className="">
                <Carousel className="w-[750px]">
                    <CarouselContent>
                        <CarouselItem>
                            <Image src={img_url} alt="apartment" width={750} height={200} />
                        </CarouselItem>
                        <CarouselItem>
                            <Image src={img_url} alt="apartment" width={750} height={200} />
                        </CarouselItem>
                        <CarouselItem>
                            <Image src={img_url} alt="apartment" width={750} height={200} />
                        </CarouselItem>
                    </CarouselContent>
                    <div>
                        <p>Salut</p>
                    </div>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button asChild>
                    <Link href="1">
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