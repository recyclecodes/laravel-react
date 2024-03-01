import { ThemeProvider } from "@/components/theme-provider";

const Dashboard = () => {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="text-black dark:text-white">Dashboard</div>
      </ThemeProvider>
    </>
  );
};

export default Dashboard;
