import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export default function Register() {
  return (
    <div className="mt-20 max-w-[80rem] mx-auto py-12 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h1 className="text-3xl font-bold mb-4">Startup Weekend Jaipur</h1>
          <p className="text-muted-foreground mb-6">
            Startup Weekend Jaipur 🚀 is a three-day program where aspiring
            entrepreneurs can experience the startup life.
          </p>
          <p className="text-muted-foreground mb-6">
            You get the best mentors, investors, co-founders, and sponsors, 🧑‍🏫🤝
            to help you learn what it really takes to innovate, disrupt, and
            start a business. 💼🔥
          </p>
          <p className="text-muted-foreground mb-6">
            It's about pitching, 🎤 business model creation 📊, prototyping 🛠️,
            designing 🎨, and market validation ✅, in a friendly and supportive
            team environment. 🌟
          </p>
          <p className="text-muted-foreground mb-6">
            You have 54 hours to change the world! 💪🎉
          </p>
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold mb-2">Event Details</h2>
              <p className="text-muted-foreground">
                Duration: 3 days (Friday to Sunday)
              </p>
              <p className="text-muted-foreground">Registration Fee: ₹800</p>
            </div>
          </div>
        </div>
        <div>
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>Registration Form</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Enter your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registration-number">
                    Registration Number
                  </Label>
                  <Input
                    id="registration-number"
                    placeholder="Enter your registration number"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="branch">Branch</Label>
                  <Input id="branch" placeholder="Enter your branch" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Year of Study</Label>
                  <Input id="year" placeholder="Enter your year of study" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="residence">Residence</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your residence" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hosteller">Hosteller</SelectItem>
                    <SelectItem value="day-scholar">Day Scholar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="outlook-id">Outlook ID</Label>
                <Input id="outlook-id" placeholder="Enter your Outlook ID" />
              </div>
              <Separator />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="transaction-id">Transaction ID</Label>
                  <Input
                    id="transaction-id"
                    placeholder="Enter your transaction ID"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="payment-screenshot">Payment Screenshot</Label>
                  <Input id="payment-screenshot" type="file" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="agree-to-event-agreement" />
                <Label htmlFor="agree-to-event-agreement">
                  By checking the box below, you acknowledge that your provided
                  information will be used in accordance with the relevant SWJ
                  guidelines.
                </Label>
              </div>
              <div className="flex justify-center">
                <img
                  src="/qr.png"
                  width={200}
                  height={200}
                  alt="Payment QR Code"
                  style={{ aspectRatio: "1/1", objectFit: "cover" }}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
