import Link from "next/link";
import { auth } from "../_lib/auth";

async function Navigation() {
  // by using auth make this component dynamically rendering because auth call cookies and make any component that in it dy rendering
  const session = await auth();

  return (
    <nav className="text-xl">
      <ul className="flex items-center gap-10 lg:gap-16 [&_a:hover]:text-accent-400 [&_a]:transition-colors">
        <li>
          <Link href="/cabins">Cabins</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          {session?.user ? (
            <Link href="/account">
              <div className="flex items-center gap-3">
                <img
                  src={session.user.image}
                  alt={session.user.name}
                  className="h-8 rounded-full"
                  referrerPolicy="no-referrer"
                />
                <span>Guest area</span>
              </div>
            </Link>
          ) : (
            <Link href="/account">Guest area</Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
