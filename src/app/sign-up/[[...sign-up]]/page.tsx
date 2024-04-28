import { SignUp } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-green-500 to-black">
            <SignUp path="/sign-up" />
        </div>
    )
}