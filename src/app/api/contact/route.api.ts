import { ContactInput } from "@/lib/forms";
import { handleSubmission } from "@/lib/submit";

export async function POST(req: Request) {
  return handleSubmission(req, ContactInput, { kind: "contact", webhookEnv: "CONTACT_WEBHOOK_URL" });
}
