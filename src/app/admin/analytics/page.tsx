import { redirect } from "next/navigation";

/**
 * Legacy átirányítás: a régi /admin/analytics könyvjelzők
 * a KPI Dashboardra (/admin/dashboard) mutatnak — 404 helyett redirect.
 */
export default function AdminAnalyticsRedirectPage() {
  redirect("/admin/dashboard");
}
