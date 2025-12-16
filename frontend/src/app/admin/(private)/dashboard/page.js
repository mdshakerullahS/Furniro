import DashboardMiniCard from "@/components/DashboardMiniCard";
import { Button } from "@/components/ui/button";

const Page = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between py-2">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <Button
          variant="outline"
          size="sm"
          aria-label="Manage"
          className="cursor-pointer"
        >
          Manage
        </Button>
      </div>
      <div className="flex justify-between">
        <DashboardMiniCard />
        <DashboardMiniCard />
        <DashboardMiniCard />
        <DashboardMiniCard />
        <DashboardMiniCard />
      </div>
    </div>
  );
};

export default Page;
