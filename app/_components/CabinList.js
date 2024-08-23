import { getCabins } from "@/app/_lib/data-service";
import CabinCard from "./CabinCard";
import { unstable_noStore as noStore } from "next/cache";

async function CabinList({ filter }) {
  // noStore()

  const cabins = await getCabins();

  if (!cabins.length) return null;

  let activeCabins;
  if (filter === "all") activeCabins = cabins;
  if (filter === "small")
    activeCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
  if (filter === "medium")
    activeCabins = cabins.filter(
      (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7,
    );
  if (filter === "large")
    activeCabins = cabins.filter((cabin) => cabin.maxCapacity >= 8);

  return (
    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:gap-12 xl:gap-14">
      {activeCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinList;
