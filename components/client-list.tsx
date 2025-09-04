import { PlusIcon } from "lucide-react";
import { Button } from "./ui/button";

export default function ClientListPage() {
  return (
    <div className="min-h-screen bg-background"> 
        <div className="px-2 sm:px-0 flex justify-between items-center">
            <div className="">
                <div className="text-5xl pl-5 font-bold">Clients</div>
                <p>Manage your clients and send invoices via WhatsApp</p>
            </div>
            <div>
                <Button>
                    <PlusIcon className="h-6 w-6 mr-2 inline"/>Add Client</Button>
            </div>
        </div>
    </div>
    )
}