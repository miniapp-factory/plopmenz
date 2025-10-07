import { Logout } from "@/components/logout";
import { headers } from "next/headers";

export default async function Auth() {
  const user = await headers().then((h) => h.get("Xnode-Auth-User"));
  return (
    <main className="flex flex-col gap-3 place-items-center px-4">
      <div className="flex flex-col gap-1 place-items-center">
        <span>Authenticated as</span>
        <span className="text-xs break-all">{user}</span>
      </div>
      <Logout />
    </main>
  );
}
