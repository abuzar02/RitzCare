"use client";
import { Battery, CircleDot, FileCheck2, LifeBuoy, Phone, Tag, Wrench } from "lucide-react";

const BLOCKS = [
  { id: "services", title: "Car Service", Icon: Wrench, text: "Periodic maintenance, diagnostics, brake, AC and engine repairs by expert technicians using quality parts.", service: "Car Service" },
  { id: "brands", title: "Brands We Service", Icon: Tag, text: "Mercedes-Benz, BMW, Audi, Toyota, Nissan, Land Rover and more. Tell us your make and model when you book.", service: "Car Service" },
  { id: "batteries", title: "Buy Batteries", Icon: Battery, text: "Battery testing and replacement with on-site fitting. Ask us for the right battery for your vehicle.", service: "Battery Replacement" },
  { id: "tires", title: "Buy Tires", Icon: CircleDot, text: "Tire supply, fitting, balancing and alignment for all major brands and sizes.", service: "Tire Replacement" },
  { id: "contract", title: "Service Contract", Icon: FileCheck2, text: "Plan your maintenance with a service contract. Request details and we will get back to you.", service: "Service Contract" },
  { id: "support", title: "Support & Roadside", Icon: LifeBuoy, text: "Stuck on the road or have a question? Reach our team and book roadside support.", service: "Roadside Support" },
];

export default function Sections({ onBook }: { onBook: (s?: string) => void }) {
  return (
    <div className="bg-white">
      {BLOCKS.map(({ id, title, Icon, text, service }, i) => (
        <section key={id} id={id} className={`scroll-mt-4 px-6 py-20 ${i % 2 ? "bg-slate-50" : ""}`}>
          <div className="mx-auto flex max-w-4xl flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-8">
            <span className="rounded-3xl bg-royal/10 p-5 text-royal"><Icon size={36} /></span>
            <div>
              <h2 className="text-2xl font-extrabold">{title}</h2>
              <p className="mt-2 max-w-xl text-navy/70">{text}</p>
              <button onClick={() => onBook(service)} className="mt-4 inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-royal">
                {id === "support" ? <Phone size={15} /> : null} Book / Enquire
              </button>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
