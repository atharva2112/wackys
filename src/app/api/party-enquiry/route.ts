import { PartyInput } from "@/lib/forms";
import { handleSubmission } from "@/lib/submit";

export async function POST(req: Request) {
  return handleSubmission(req, PartyInput, { kind: "party-enquiry", webhookEnv: "PARTY_ENQUIRY_WEBHOOK_URL" });
}
