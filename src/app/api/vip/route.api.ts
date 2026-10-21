import { VipInput } from "@/lib/forms";
import { handleSubmission } from "@/lib/submit";

export async function POST(req: Request) {
  return handleSubmission(req, VipInput, { kind: "vip-signup", webhookEnv: "VIP_SIGNUP_WEBHOOK_URL" });
}
