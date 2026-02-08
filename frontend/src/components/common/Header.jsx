import LiveClock from "./LiveClock";

export default function Header() {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-4 lg:px-8 shadow-sm">
      
      {/* Left */}
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded bg-primary text-white flex items-center justify-center font-bold">
          H
        </div>
        <h1 className="text-lg font-semibold text-gray-800 hidden sm:block">
          QueueLess Hospital
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">
        <LiveClock />

        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-secondary text-white flex items-center justify-center">
            D
          </div>
          <span className="text-sm font-medium text-gray-700 hidden md:block">
            Doctor
          </span>
        </div>
      </div>

    </header>
  );
}
