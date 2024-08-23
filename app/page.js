import Image from "next/image";
import Link from "next/link";
import bg from "@/public/bg.png";
import Spinner from "./_components/Spinner";

function Page() {
  return (
    <div className="mt-24">
      <Image
        src={bg}
        alt="background of hotel"
        fill
        className="z-[-1] object-cover object-top"
      />
      <div className="text-center">
        <h1 className="mb-4 text-clampTitle font-normal tracking-tight text-primary-50 md:mb-10">
          Welcome to Hotel.
        </h1>

        <Link
          href="/cabins"
          className="bg-accent-500 px-2.5 py-2.5 text-clampBtn font-semibold text-primary-800 transition-all hover:bg-accent-600 sm:py-3 sm:px-4 md:px-5 md:py-4 2xl:px-8 2xl:py-6"
        >
          Explore luxury cabins
        </Link>
      </div>
    </div>
  );
}

export default Page;
