"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { createChirie, getChirieDescriptionFromParams } from "@/lib/actions";
import Image from "next/image";

import React from "react";

const Loader = () => (
  <div className="loader">
    <style jsx>{`
      .loader {
        border: 4px solid rgba(0, 0, 0, 0.1);
        border-left-color: #000;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `}</style>
  </div>
);

const formSchema = z.object({
  adress: z.object({
    location: z.string(),
    floor: z
      .union([z.string(), z.number()])
      .transform((val) => (typeof val === "string" ? parseInt(val, 10) : val))
      .refine((val) => val >= -100 && val <= 1000, {
        message: "Etajul trebuie să fie între -100 și 1000",
      })
      .optional(),
    city: z.string(),
    county: z.string(),
    country: z.string(),
  }),
  propertyInfo: z.object({
    rooms: z
      .union([z.string(), z.number()])
      .transform((val) => (typeof val === "string" ? parseInt(val, 10) : val))
      .refine((val) => val > 0, {
        message: "Numarul de camere trebuie să fie mai mare decât 0",
      })
      .optional(),
    surface: z
      .union([z.string(), z.number()])
      .transform((val) => (typeof val === "string" ? parseInt(val, 10) : val))
      .refine((val) => val > 0, {
        message: "Suprafata trebuie să fie mai mare decât 0",
      })
      .optional(),
    year: z
      .union([z.string(), z.number()])
      .transform((val) => (typeof val === "string" ? parseInt(val, 10) : val))
      .refine((val) => val > 0 && val <= new Date().getFullYear(), {
        message:
          "Anul trebuie să fie mai mare decât 0 și mai mic decât anul curent",
      })
      .optional(),
    state: z.string(),
    furnished: z.boolean(),
    price: z
      .union([z.string(), z.number()])
      .transform((val) => (typeof val === "string" ? parseInt(val, 10) : val))
      .refine((val) => val > 0, {
        message: "Pretul trebuie să fie mai mare decât 0",
      })
      .optional(),
    warranty: z.boolean(),
    type: z.string(),
    comfort: z.string(),
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
});

export default function Dashboard() {
  const [uploadedImages, setUploadedImages] = useState<FileList | null>(null);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      adress: {
        location: "Bulevardul Unirii 1",
        floor: 0,
        city: "Bucuresti",
        county: "Ilfov",
        country: "Romania",
      },
      propertyInfo: {
        rooms: 1,
        surface: 10,
        year: new Date().getFullYear(),
        state: "Bună",
        furnished: false,
        price: 1,
        warranty: false,
        type: "Decomandat",
        comfort: "Mediu",
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
        freeFrom: new Date().toLocaleDateString(),
        petsAllowed: false,
      },
    },
  });

  async function onAutocomplete(data: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const description = await getChirieDescriptionFromParams(data);
      form.setValue("otherInfo.description", description);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (!uploadedImages || uploadedImages.length === 0) {
      toast({
        title: "Eroare",
        description: "Trebuie sa adaugi cel putin o imagine",
      });
      return;
    }

    const imageAsFile = uploadedImages[0];
    const formData = new FormData();
    formData.append("images", imageAsFile);
    formData.append("data", JSON.stringify(data));

    try {
      await createChirie(formData);
      toast({
        title: "Succes",
        description: "Chirie adaugata cu succes",
      });
    } catch (error) {
      toast({
        title: "Eroare",
        description: "A aparut o eroare la nivelul serverului",
      });
      console.error(error);
    }
  }

  return (
    <div className="mx-auto grid flex-1 auto-rows-max gap-4 p-6 bg-transparent rounded-lg shadow-md">
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
                <Link href="/dashboard">Renunta</Link>
              </Button>
              <Button type="submit" size="sm">
                Adauga
              </Button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Detalii chirie</CardTitle>
                  <CardDescription>
                    Adauga detaliile chiriei tale aici.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Adresa</CardTitle>
                        <CardDescription>
                          Adauga adresa chiriei tale.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <FormField
                          control={form.control}
                          name="adress.location"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Locatie</FormLabel>
                              <FormControl>
                                <Input placeholder="Locatie" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="adress.floor"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Etaj</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="Etaj"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="adress.city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Oras</FormLabel>
                              <FormControl>
                                <Input placeholder="Oras" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="adress.county"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Judet</FormLabel>
                              <FormControl>
                                <Input placeholder="Judet" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="adress.country"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tara</FormLabel>
                              <FormControl>
                                <Input placeholder="Tara" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Detalii proprietate</CardTitle>
                        <CardDescription>
                          Adauga detalii despre proprietatea ta.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <FormField
                          control={form.control}
                          name="propertyInfo.rooms"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Camere</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="Camere"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="propertyInfo.surface"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Suprafata</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="Suprafata"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="propertyInfo.year"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Anul constructiei</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="Anul constructiei"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="propertyInfo.state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Stare</FormLabel>
                              <FormControl>
                                <Input placeholder="Stare" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="propertyInfo.furnished"
                          render={({ field }) => (
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
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="propertyInfo.price"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Pret</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="Pret"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="propertyInfo.warranty"
                          render={({ field }) => (
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
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="propertyInfo.type"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tip</FormLabel>
                              <FormControl>
                                <Input placeholder="Tip" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="propertyInfo.comfort"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confort</FormLabel>
                              <FormControl>
                                <Input placeholder="Confort" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Facilitati</CardTitle>
                        <CardDescription>
                          Adauga facilitatile disponibile.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <FormField
                          control={form.control}
                          name="facilities.internet"
                          render={({ field }) => (
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
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="facilities.cableTv"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Televiziune prin cablu</FormLabel>
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="facilities.airConditioning"
                          render={({ field }) => (
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
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="facilities.centralHeating"
                          render={({ field }) => (
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
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="facilities.fridge"
                          render={({ field }) => (
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
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="facilities.stove"
                          render={({ field }) => (
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
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="facilities.washingMachine"
                          render={({ field }) => (
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
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="facilities.lift"
                          render={({ field }) => (
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
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="facilities.parking"
                          render={({ field }) => (
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
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="facilities.storageSpace"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Depozitare</FormLabel>
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="facilities.balcony"
                          render={({ field }) => (
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
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="facilities.smokeDetector"
                          render={({ field }) => (
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
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="facilities.gasDetector"
                          render={({ field }) => (
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
                          )}
                        />
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Alte informatii</CardTitle>
                        <CardDescription>
                          Adauga alte informatii.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <FormField
                          control={form.control}
                          name="otherInfo.freeFrom"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Disponibil din</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Disponibil din"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="otherInfo.petsAllowed"
                          render={({ field }) => (
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
                          )}
                        />
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Descriere</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <FormField
                          control={form.control}
                          name="otherInfo.description"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Textarea {...field} className="min-h-32" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <CardFooter className="p-4">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              size="sm"
                              type="button"
                              onClick={form.handleSubmit(onAutocomplete)}
                            >
                              {loading ? <Loader /> : "AI Complete"}
                              <Image
                                src="https://agentvanzariaistorage2.blob.core.windows.net/agentvanzariaicontainer2/a75b9107-eeed-4568-b055-d9dd89436cfb.png"
                                alt=""
                                width={20}
                                height={20}
                              />
                            </Button>
                          </div>
                        </CardFooter>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle>Incarca imagini</CardTitle>
                  <CardDescription>
                    Adauga imagini pentru chiria ta.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="w-full">
                    <span className="sr-only">Incarca</span>
                    <input
                      type="file"
                      multiple
                      onChange={(e) => setUploadedImages(e.target.files)}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <Button type="submit" className="w-full lg:hidden">
            Adauga
          </Button>
        </form>
      </Form>
    </div>
  );
}
