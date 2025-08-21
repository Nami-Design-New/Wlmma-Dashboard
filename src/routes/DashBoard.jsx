import Statistics from "../components/home/Statistcs";
import QuickActions from "../components/home/QuickActions";
import TopBanner from "../components/home/TopBanner";
import DashboardCharts from "../components/home/DashboardCharts";

export default function DashBoard() {
  return (
    <section className="dashboard_section">
      <TopBanner />
      <QuickActions />
      <Statistics />
      <DashboardCharts />
    </section>
  );
}
