import { redirect } from "next/navigation";
import AdminLoginForm from "./pageClient";
import { getAdminContext } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const context = await getAdminContext();

  if (context.user && context.profile) {
    redirect("/admin");
  }

  return <AdminLoginForm configured={context.configured} />;
}
