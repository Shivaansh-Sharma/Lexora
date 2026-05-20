import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

export function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {

  return (

    <div className="relative flex min-h-screen overflow-hidden bg-background text-foreground">

      <div className="absolute inset-0 -z-10">

        <div className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-3xl" />

        <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-3xl" />

        <div className="absolute left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-fuchsia-500/5 blur-3xl" />
      </div>

      <Sidebar />

      <div className="relative flex flex-1 flex-col">

        <Topbar />

        <main className="flex-1 p-8 xl:p-10">

          <div className="mx-auto w-full max-w-[1700px]">

            {children}
          </div>
        </main>
      </div>
    </div>
  );
}