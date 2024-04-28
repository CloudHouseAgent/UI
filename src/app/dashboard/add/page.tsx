"use client"

import Link from "next/link"
import {
    ChevronLeft,
} from "lucide-react"
import { z } from "zod"
import { useToast } from "@/components/ui/use-toast"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { createChirie } from "@/lib/actions"

const formSchema = z.object({
    adress: z.object({
        location: z.string(),
        floor: z.number(),
        city: z.string(),
        county: z.string(),
        country: z.string(),
    }),
    propertyInfo: z.object({
        rooms: z.number(),
        surface: z.number(),
        year: z.number(),
        state: z.string(),
        furnished: z.boolean(),
        price: z.number(),
        warranty: z.boolean(),
        type: z.string(),
        comfort: z.string()
    }),
    facilities: z.object({
        internet: z.boolean(),
        cableTv: z.boolean(),
        airConditioning: z.boolean(),
        centralHeating: z.boolean(),
        fridge: z.boolean(),
        stove: z.boolean(),
        washingMachine: z.boolean(),
        lift: z.boolean(),
        parking: z.boolean(),
        storageSpace: z.boolean(),
        balcony: z.boolean(),
        smokeDetector: z.boolean(),
        gasDetector: z.boolean(),
    }),
    otherInfo: z.object({
        description: z.string(),
        freeFrom: z.string(),
        petsAllowed: z.boolean(),
    }),
})


export default function Dashboard() {
    const [uploadedImages, setUploadedImages] = useState<FileList | null>(null)
    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            adress: {
                location: "",
                floor: 0,
                city: "",
                county: "",
                country: "",
            },
            propertyInfo: {
                rooms: 0,
                surface: 0,
                year: 0,
                state: "",
                furnished: false,
                price: 0,
                warranty: false,
                type: "",
                comfort: "",
            },
            facilities: {
                internet: false,
                cableTv: false,
                airConditioning: false,
                centralHeating: false,
                fridge: false,
                stove: false,
                washingMachine: false,
                lift: false,
                parking: false,
                storageSpace: false,
                balcony: false,
                smokeDetector: false,
                gasDetector: false,
            },
            otherInfo: {
                description: "",
                freeFrom: "",
                petsAllowed: false,
            },
        },
    })


    async function onSubmit(data: z.infer<typeof formSchema>) {
        if (!uploadedImages || uploadedImages.length === 0) {
            toast({
                title: "Eroare",
                description: "Trebuie sa adaugi cel putin o imagine",

            })
            return
        }

        const imageAsFile = uploadedImages[0]
        const formData = new FormData();
        formData.append("images", imageAsFile)
        formData.append("data", JSON.stringify(data))

        try {
            await createChirie(formData)
            toast({
                title: "Succes",
                description: "Chirie adaugata cu succes",
            })
        }
        catch (error) {
            toast({
                title: "Eroare",
                description: "A aparut o eroare la nivelul serverului",
            })
            console.error(error)
        }
    }


    return (
        <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4" >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex items-center gap-4 my-5">
                        <Button variant="outline" size="icon" className="h-7 w-7" asChild>
                            <Link href="/dashboard">
                                <ChevronLeft className="h-4 w-4" />
                                <span className="sr-only">Back</span>
                            </Link>
                        </Button>
                        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                            Adauga chirie
                        </h1>
                        <div className="hidden items-center gap-2 md:ml-auto md:flex">
                            <Button variant="outline" size="sm" asChild>
                                <Link href="/dashboard">
                                    Renunta
                                </Link>
                            </Button>
                            <Button type="submit" size="sm">Adauga</Button>
                        </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                            <Card x-chunk="dashboard-07-chunk-0">
                                <CardHeader>
                                    <CardTitle>Detalii chirie</CardTitle>
                                    <CardDescription>
                                        Adauga detaliile chiriei tale aici.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <FormField
                                        control={form.control}
                                        name="otherInfo.description"
                                        render={({ field }) => (
                                            <div className="grid gap-3">
                                                <FormItem>
                                                    <FormLabel>Descriere</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            {...field}
                                                            className="min-h-32"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            </div>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="adress.location"
                                        render={({ field }) => (
                                            <div className="grid gap-3">
                                                <FormItem>
                                                    <FormLabel>Locatie</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Locatie" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            </div>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="adress.floor"
                                        render={({ field }) => (
                                            <div className="grid gap-3">
                                                <FormItem>
                                                    <FormLabel>Etaj</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Etaj" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            </div>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="adress.city"
                                        render={({ field }) => (
                                            <div className="grid gap-3">
                                                <FormItem>
                                                    <FormLabel>Oras</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Oras" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            </div>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="adress.county"
                                        render={({ field }) => (
                                            <div className="grid gap-3">
                                                <FormItem>
                                                    <FormLabel>Judet</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Judet" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            </div>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="adress.country"
                                        render={({ field }) => (
                                            <div className="grid gap-3">
                                                <FormItem>
                                                    <FormLabel>Tara</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Tara" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            </div>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="propertyInfo.rooms"
                                        render={({ field }) => (
                                            <div className="grid gap-3">
                                                <FormItem>
                                                    <FormLabel>Camere</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Camere" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            </div>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="propertyInfo.surface"
                                        render={({ field }) => (
                                            <div className="grid gap-3">
                                                <FormItem>
                                                    <FormLabel>Suprafata</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Suprafata" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            </div>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="propertyInfo.year"
                                        render={({ field }) => (
                                            <div className="grid gap-3">
                                                <FormItem>
                                                    <FormLabel>Anul constructiei</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Anul constructiei" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            </div>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="propertyInfo.state"
                                        render={({ field }) => (
                                            <div className="grid gap-3">
                                                <FormItem>
                                                    <FormLabel>Stare</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Stare" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            </div>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="propertyInfo.furnished"
                                        render={({ field }) => (
                                            <div className="grid gap-3">
                                                <FormItem>
                                                    <FormLabel>Mobilat</FormLabel>
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            </div>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="propertyInfo.price"
                                        render={({ field }) => (
                                            <div className="grid gap-3">
                                                <FormItem>
                                                    <FormLabel>Pret</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Pret" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            </div>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="propertyInfo.warranty"
                                        render={({ field }) => (
                                            <div className="grid gap-3">
                                                <FormItem>
                                                    <FormLabel>Garantie</FormLabel>
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            </div>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="propertyInfo.type"
                                        render={({ field }) => (
                                            <div className="grid gap-3">
                                                <FormItem>
                                                    <FormLabel>Tip</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Tip" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            </div>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="propertyInfo.comfort"
                                        render={({ field }) => (
                                            <div className="grid gap-3">
                                                <FormItem>
                                                    <FormLabel>Confort</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Confort" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            </div>
                                        )}
                                    />


                                    <FormField
                                        control={form.control}
                                        name="facilities.internet"
                                        render={({ field }) => (
                                            <div className="grid gap-3">
                                                <FormItem>
                                                    <FormLabel>Internet</FormLabel>
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            </div>
                                        )}
                                    />


                                    <FormField
                                        control={form.control}
                                        name="facilities.cableTv"
                                        render={({ field }) => (
                                            <div className="grid gap-3">
                                                <FormItem>
                                                    <FormLabel>Televiziune</FormLabel>
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            </div>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="facilities.airConditioning"
                                        render={({ field }) => (
                                            <div className="grid gap-3">
                                                <FormItem>
                                                    <FormLabel>Aer conditionat</FormLabel>
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            </div>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="facilities.centralHeating"
                                        render={({ field }) => (
                                            <div className="grid gap-3">
                                                <FormItem>
                                                    <FormLabel>Centrala termica</FormLabel>
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            </div>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="facilities.fridge"
                                        render={({ field }) => (
                                            <div className="grid gap-3">
                                                <FormItem>
                                                    <FormLabel>Frigider</FormLabel>
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            </div>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="facilities.stove"
                                        render={({ field }) => (
                                            <div className="grid gap-3">
                                                <FormItem>
                                                    <FormLabel>Cuptor</FormLabel>
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            </div>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="facilities.washingMachine"
                                        render={({ field }) => (
                                            <div className="grid gap-3">
                                                <FormItem>
                                                    <FormLabel>Mașină de spălat</FormLabel>
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            </div>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="facilities.lift"
                                        render={({ field }) => (
                                            <div className="grid gap-3">
                                                <FormItem>
                                                    <FormLabel>Lift</FormLabel>
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            </div>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="facilities.parking"
                                        render={({ field }) => (
                                            <div className="grid gap-3">
                                                <FormItem>
                                                    <FormLabel>Parcare</FormLabel>
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            </div>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="facilities.storageSpace"
                                        render={({ field }) => (
                                            <div className="grid gap-3">
                                                <FormItem>
                                                    <FormLabel>Spațiu de depozitare</FormLabel>
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            </div>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="facilities.balcony"
                                        render={({ field }) => (
                                            <div className="grid gap-3">
                                                <FormItem>
                                                    <FormLabel>Balcon</FormLabel>
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            </div>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="facilities.smokeDetector"
                                        render={({ field }) => (
                                            <div className="grid gap-3">
                                                <FormItem>
                                                    <FormLabel>Detector de fum</FormLabel>
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            </div>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="facilities.gasDetector"
                                        render={({ field }) => (
                                            <div className="grid gap-3">
                                                <FormItem>
                                                    <FormLabel>Detector de gaz</FormLabel>
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            </div>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="otherInfo.freeFrom"
                                        render={({ field }) => (
                                            <div className="grid gap-3">
                                                <FormItem>
                                                    <FormLabel>Disponibil din</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Disponibil din" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            </div>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="otherInfo.petsAllowed"
                                        render={({ field }) => (
                                            <div className="grid gap-3">
                                                <FormItem>
                                                    <FormLabel>Animale de companie</FormLabel>
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            </div>
                                        )}
                                    />


                                    <FormField
                                        control={form.control}
                                        name="otherInfo.petsAllowed"
                                        render={({ field }) => (
                                            <div className="grid gap-3">
                                                <FormItem>
                                                    <FormLabel>Animale de companie</FormLabel>
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            </div>
                                        )}
                                    />




                                </CardContent>
                            </Card>
                        </div>
                        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                            <Card
                                className="overflow-hidden" x-chunk="dashboard-07-chunk-4"
                            >
                                <CardHeader>
                                    <CardTitle>Incarca imagini</CardTitle>
                                    <CardDescription>
                                        Adauga imagini pentru chiria ta.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="w-[100%]">
                                        <span className="sr-only">Incarca</span>
                                        <input type="file" multiple onChange={(e) =>
                                            setUploadedImages(e.target.files)
                                        } />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <Button type="submit">Adauga</Button>
                    </div >
                </form >
            </Form >
        </div >
    )
}
