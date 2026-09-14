import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  getDoc,
  arrayUnion,
} from "firebase/firestore";
import { createHmac, timingSafeEqual } from "crypto";

export const dynamic = "force-dynamic";

// 1. Signature Verification Helper using standard Web Crypto / Node Crypto
function verifyStripeSignature(
  rawBody: string,
  signatureHeader: string,
  webhookSecret: string
): boolean {
  if (!signatureHeader || !webhookSecret) return false;

  const parts = signatureHeader.split(",");
  let timestamp = "";
  let signature = "";

  for (const part of parts) {
    const [key, value] = part.split("=");
    if (key?.trim() === "t") {
      timestamp = value.trim();
    } else if (key?.trim() === "v1") {
      signature = value.trim();
    }
  }

  if (!timestamp || !signature) return false;

  const signedPayload = `${timestamp}.${rawBody}`;
  const hmac = createHmac("sha256", webhookSecret);
  hmac.update(signedPayload);
  const computedSignature = hmac.digest("hex");

  try {
    return timingSafeEqual(
      Buffer.from(computedSignature, "hex"),
      Buffer.from(signature, "hex")
    );
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeSecret || !webhookSecret) {
    console.error("Stripe credentials are not configured in environment.");
    return new NextResponse("Configuration Error", { status: 500 });
  }

  const headerList = await headers();
  const signature = headerList.get("stripe-signature") || "";
  const rawBody = await req.text();

  // Verify signature to prevent spoofing
  const isValid = verifyStripeSignature(rawBody, signature, webhookSecret);
  if (!isValid) {
    console.warn("Invalid Stripe signature received on webhook.");
    return new NextResponse("Unauthorized", { status: 400 });
  }

  try {
    const event = JSON.parse(rawBody) as {
      type: string;
      data: {
        object: {
          id: string;
          payment_status: string;
          amount_total?: number;
          metadata?: {
            orderId?: string;
            workflowId?: string;
            phase?: string;
            clientId?: string;
          };
        };
      };
    };

    console.log(`Stripe Webhook received event: ${event.type}`);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      if (session.payment_status === "paid") {
        const metadata = session.metadata || {};
        const orderId = metadata.orderId;
        const workflowId = metadata.workflowId;
        const phase = metadata.phase;
        const clientId = metadata.clientId;

        if (!db) {
          console.error("Firestore is not initialized.");
          return new NextResponse("Database Error", { status: 500 });
        }

        // Case 1: Purchased from AddonStore (has orderId metadata)
        if (orderId) {
          console.log(`Processing paid AddonStore order: ${orderId}`);
          const orderRef = doc(db, "orders", orderId);
          await updateDoc(orderRef, { status: "paid" });

          // Fetch the order document to unlock the tool in user profile
          const orderSnap = await getDoc(orderRef);
          if (orderSnap.exists()) {
            const orderData = orderSnap.data();
            const orderClientId = orderData.clientId;
            const orderAddonId = orderData.addonId;

            if (orderClientId && orderAddonId) {
              const userRef = doc(db, "users", orderClientId);
              const userSnap = await getDoc(userRef);
              if (userSnap.exists()) {
                await updateDoc(userRef, {
                  allowedTools: arrayUnion(orderAddonId),
                });
                console.log(
                  `Unlocked tool ${orderAddonId} for user ${orderClientId}`
                );
              }
            }
          }
        }

        // Case 2: Milestone phase payment OR direct auditor addon checkout (has workflowId & phase metadata)
        if (workflowId && phase) {
          if (workflowId === "addon") {
            // Direct addon purchase from the Lighthouse auditor
            const finalClientId = clientId || "anonymous_client";
            console.log(
              `Processing direct addon purchase: ${phase} for client: ${finalClientId}`
            );

            // 1. Create a paid order in orders collection
            const addonNameMap: Record<string, string> = {
              addon_speed_opt: "⚡ Webhely Sebesség Optimalizálás",
              addon_seo_article: "🚀 Extra AI SEO Cikk (1 db)",
              addon_security_pack: "🛡️ Prémium Biztonsági Csomag (1 év)",
              addon_ai_chatbot: "🤖 Egyedi AI Chatbot Asszisztens",
            };

            await addDoc(collection(db, "orders"), {
              clientId: finalClientId,
              addonId: phase,
              title: addonNameMap[phase] || "Kiegészítő Szolgáltatás",
              status: "paid",
              amount: session.amount_total ? session.amount_total : 0,
              createdAt: new Date().toISOString(),
              deliveredAt: null,
              stripeSessionId: session.id,
            });

            // 2. Unlock tool in user profile if clientId is valid
            if (finalClientId !== "anonymous_client") {
              const userRef = doc(db, "users", finalClientId);
              const userSnap = await getDoc(userRef);
              if (userSnap.exists()) {
                await updateDoc(userRef, {
                  allowedTools: arrayUnion(phase),
                });
                console.log(`Unlocked tool ${phase} for user ${finalClientId}`);
              }
            }
          } else {
            // Standard workflow milestone payment
            console.log(
              `Processing paid milestone: ${phase} for workflow: ${workflowId}`
            );
            const workflowRef = doc(db, "workflows", workflowId);
            const paidKey = `${phase}Paid`;
            await updateDoc(workflowRef, {
              [paidKey]: true,
            });
          }
        }
      }
    }

    return new NextResponse("Webhook Handled", { status: 200 });
  } catch (err) {
    console.error("Error processing Stripe webhook:", err);
    return new NextResponse("Webhook Processing Error", { status: 500 });
  }
}
