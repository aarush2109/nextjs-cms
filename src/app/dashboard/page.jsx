import { getAuthsession } from "@/lib/auth";
import { notFound } from "next/navigation";


export default async function DashboardPage() {
    const session = await getAuthsession();
    if(!session){
        return <div className=" flex justify-center">
            Please sign in to access the dashboard.
        </div>
        
    }
    return <div className="flex justify-center">Welcome back, {session.user.name}</div>;
}