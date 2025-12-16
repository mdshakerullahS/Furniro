const DashboardMiniCard = () => {
  return (
    <div className="w-[180px] bg-accent p-2 rounded-md">
      <div className="flex items-center justify-center gap-8">
        <div className="space-y-2">
          <div>
            <h4 className="text-xl font-bold">$10,000</h4>
            <p className="text-xs text-muted-foreground">Total Revenue</p>
          </div>
          <p className="text-xs">22.45%</p>
        </div>
        <div className="w-10 h-10 bg-accent-foreground rounded-full"></div>
      </div>
    </div>
  );
};

export default DashboardMiniCard;
