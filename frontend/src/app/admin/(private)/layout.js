import AdminHeader from "@/components/AdminHeader";
import AdminSidebar from "@/components/AdminSidebar";

const AdminLayout = ({ children }) => {
  return (
    <>
      <AdminHeader />
      <div className="w-full h-[58px]" />
      <div className="w-full h-[calc(100vh-58px)] flex">
        <AdminSidebar />
        <div className="w-full h-[calc(100vh-58px)] overflow-y-auto px-4 hide-scrollbar">
          {children}
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
