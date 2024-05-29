import * as React from "react"
import Image from "next/image"
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
} from "@/components/ui/carousel"
import { getChirieById } from "@/lib/actions"



export default async function SingleChirie({ params }: { params: { id: string } }) {
    const { propertyInfo, adress, id, images, otherInfo, facilities } = await getChirieById(params.id);
    const title = `${propertyInfo.type} cu ${propertyInfo.rooms} camere în ${adress.city}, ${propertyInfo.surface}mp`;

    return (
        <Card className="max-w-full h-[800px] overflow-y-auto overflow-x-hidden">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription className="text-primary text-xl">{propertyInfo.price} €</CardDescription>
            </CardHeader>
            <CardContent className="">
                <Carousel className="w-[750px]">
                    <CarouselContent>
                        {
                            images.map((img, index) =>
                                <CarouselItem key={index}>
                                    <Image src={img} alt="apartment" width={350} height={200} />
                                </CarouselItem>
                            )
                        }
                    </CarouselContent>
                    <div className="py-6">
                        <div className="py-6">
                            {otherInfo.description}
                        </div>
                        <div className="py-6">
                            <h2>Adresa:</h2>
                            <div>{adress.location}, {adress.city}</div>
                            <div>{adress.county}, {adress.country}</div>
                        </div>
                        <div className="py-6">
                            <h2>Detalii:</h2>
                            <div>Suprafata: {propertyInfo.surface}mp</div>
                            <div>Camere: {propertyInfo.rooms}</div>
                            <div>Etaj: {adress.floor}</div>
                            <div>An constructie: {propertyInfo.year}</div>
                            <div>Stare: {propertyInfo.state}</div>
                            <div>Mobilat: {propertyInfo.furnished ? 'Da' : 'Nu'}</div>
                            <div>Tip: {propertyInfo.type}</div>
                            <div>Confort: {propertyInfo.comfort}</div>
                        </div>
                        <div className="py-6">
                            <h2>Facilitati:</h2>
                            <div>Internet {facilities.internet ? 'Da' : 'Nu'}</div>
                            <div>Televiziune cablu {facilities.cableTv ? 'Da' : 'Nu'}</div>
                            <div>Aer conditionat {facilities.airConditioning ? 'Da' : 'Nu'}</div>
                            <div>Centrala termica {facilities.centralHeating ? 'Da' : 'Nu'}</div>
                            <div>Frigider {facilities.fridge ? 'Da' : 'Nu'}</div>
                            <div>Cuptor {facilities.stove ? 'Da' : 'Nu'}</div>
                            <div>Masina de spalat {facilities.washingMachine ? 'Da' : 'Nu'}</div>
                            <div>Lift {facilities.lift ? 'Da' : 'Nu'}</div>
                            <div>Parcare {facilities.parking ? 'Da' : 'Nu'}</div>
                            <div>Depozit {facilities.storageSpace ? 'Da' : 'Nu'}</div>
                            <div>Balcon {facilities.balcony ? 'Da' : 'Nu'}</div>
                            <div>Detector fum {facilities.smokeDetector ? 'Da' : 'Nu'}</div>
                            <div>Detector gaz {facilities.gasDetector ? 'Da' : 'Nu'}</div>
                        </div>
                        <div className="py-6">
                            <h2>Altele:</h2>
                            <div>Disponibil de la: {otherInfo.freeFrom}</div>
                            <div>Animale de companie: {otherInfo.petsAllowed ? 'Da' : 'Nu'}</div>
                        </div>
                    </div>
                    {/*<CarouselPrevious />*/}
                    {/*<CarouselNext />*/}
                </Carousel>
            </CardContent>
            <CardFooter className="flex justify-between">
            </CardFooter>
        </Card >
    )
}


// export type ChirieType = {
//   id: string;
//   adress: {
//     location: string;
//     floor: number;
//     city: string;
//     county: string;
//     country: string;
//   };
//   propertyInfo: {
//     rooms: number;
//     surface: number;
//     year: number;
//     state: string;
//     furnished: boolean;
//     price: number;
//     warranty: boolean;
//     type: string;
//     comfort: string;
//   };
//   facilities: {
//     internet: boolean;
//     cableTv: boolean;
//     airConditioning: boolean;
//     centralHeating: boolean;
//     fridge: boolean;
//     stove: boolean;
//     washingMachine: boolean;
//     lift: boolean;
//     parking: boolean;
//     storageSpace: boolean;
//     balcony: boolean;
//     smokeDetector: boolean;
//     gasDetector: boolean;
//   };
//   otherInfo: {
//     description: string;
//     freeFrom: string;
//     petsAllowed: boolean;
//   };
//   contact: {
//     userId: string;
//     name: string;
//     email: string;
//   };
//   images: string[];
// };