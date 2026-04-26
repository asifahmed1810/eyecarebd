import { Outlet } from "react-router";

export default function RootLayout() {
  return (
    <div className="min-h-screen text-white selection:bg-white/20">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,82,204,0.55),rgba(0,82,204,0)_65%)] blur-2xl" />
        <div className="absolute -bottom-40 left-[-120px] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(107,144,128,0.45),rgba(107,144,128,0)_65%)] blur-2xl" />
        <div className="absolute top-28 right-[-160px] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.18),rgba(255,255,255,0)_60%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),rgba(0,0,0,0)_45%),linear-gradient(180deg,rgba(2,6,23,0.95),rgba(15,23,42,0.92)_55%,rgba(2,6,23,0.96))]" />
      </div>

      <Outlet />
    </div>
  );
}

