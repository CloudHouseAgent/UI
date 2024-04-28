import Link from "next/link"
import {
    ChevronLeft,
    Upload,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"



export default function Dashboard() {
    return (
        <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
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
                    <Button size="sm">Adauga</Button>
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
                            <div className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="description">Descriere</Label>
                                    <Textarea
                                        id="description"
                                        defaultValue=""
                                        className="min-h-32"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card x-chunk="dashboard-07-chunk-2">
                        <CardHeader>
                            <CardTitle>Product Category</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6 sm:grid-cols-3">
                                <div className="grid gap-3">
                                    <Label htmlFor="category">Category</Label>
                                    <Select>
                                        <SelectTrigger
                                            id="category"
                                            aria-label="Select category"
                                        >
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="clothing">Clothing</SelectItem>
                                            <SelectItem value="electronics">
                                                Electronic
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
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
                            <div className="grid gap-2">
                                <div className="grid grid-cols-3 gap-2">

                                    <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                                        <Upload className="h-4 w-4 text-muted-foreground" />
                                        <span className="sr-only">Incarca</span>
                                    </button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}


/*FOR CREATE
{
   "adress":{
      "location":"Strada Exemplu 123",
      "floor":2,
      "city":"București",
      "county":"București",
      "country":"România"
   },
   "propertyInfo":{
      "rooms":3,
      "surface":70,
      "year":2010,
      "state":"Bună",
      "furnished":true,
      "price":1000,
      "warranty":false,
      "type":"Apartament",
      "comfort":"Bun"
   },
   "facilities":{
      "internet":true,
      "cableTv":true,
      "airConditioning":true,
      "centralHeating":true,
      "fridge":true,
      "stove":true,
      "washingMachine":true,
      "lift":true,
      "parking":true,
      "storageSpace":true,
      "balcony":true,
      "smokeDetector":true,
      "gasDetector":true
   },
   "otherInfo":{
      "description":"Apartament spațios cu vedere la parc",
      "freeFrom":"Disponibil imediat",
      "petsAllowed":true
   },
}
*/