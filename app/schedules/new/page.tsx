// Redirect page: new schedule creation is now done via calendar modal or image upload
import { redirect } from "next/navigation";

export default function NewSchedulePage() {
  // redirect to schedules list
  redirect("/schedules");
}
