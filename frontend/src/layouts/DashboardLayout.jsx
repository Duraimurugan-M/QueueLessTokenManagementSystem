import Header from "../components/common/Header";
import Sidebar from "../components/common/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex-1 flex flex-col">

        <Header />

        <main className="flex-1 p-4 lg:p-8">
          {children}
        </main>

      </div>
    </div>
  );
}
