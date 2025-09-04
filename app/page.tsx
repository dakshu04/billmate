// app/page.tsx
import { Home } from "@/components/sections/Home";
import Navbar from "@/components/sections/Navbar";

export default function BillMateLanding() {
  return (
    <div className="h-screen">
      <Navbar />
      <Home />
    </div>
  );
}
