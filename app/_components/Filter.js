"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  
  const activeFilter = searchParams.get("capacity") ?? "all";
  
  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`,{scroll:false});
  }


  return (
    <div className="border-[1px] border-primary-700">
      <Button
        handleFilter={handleFilter}
        filter={"all"}
        activeFilter={activeFilter}
      >
        All cabins
      </Button>
      <Button
        handleFilter={handleFilter}
        filter={"small"}
        activeFilter={activeFilter}
      >
        1&mdash;3 guests
      </Button>
      <Button
        handleFilter={handleFilter}
        filter={"medium"}
        activeFilter={activeFilter}
      >
        4&mdash;7 guests
      </Button>
      <Button
        handleFilter={handleFilter}
        filter={"large"}
        activeFilter={activeFilter}
      >
        8&mdash;12 guests
      </Button>
    </div>
  );
}

function Button({ handleFilter, activeFilter, filter, children }) {
  return (
    <button
      onClick={() => handleFilter(filter)}
      className={`px-5 py-2 hover:bg-primary-700 ${activeFilter === filter ? "bg-primary-700" : ""}`}
    >
      {children}
    </button>
  );
}

export default Filter;
