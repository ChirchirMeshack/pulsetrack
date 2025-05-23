import axios from "axios"

// Twilio credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER
const twilioWhatsappNumber = process.env.TWILIO_WHATSAPP_NUMBER

// Function to send SMS via Twilio
export async function sendSMS(to: string, body: string) {
  try {
    // In a real implementation, we would use the Twilio SDK
    // For this example, we'll use axios to make the API call
    const response = await axios.post(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      new URLSearchParams({
        To: to,
        From: twilioPhoneNumber || "",
        Body: body,
      }),
      {
        auth: {
          username: accountSid || "",
          password: authToken || "",
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    )

    return response.data
  } catch (error) {
    console.error("Error sending SMS:", error)
    throw error
  }
}

// Function to send WhatsApp message via Twilio
export async function sendWhatsApp(to: string, body: string) {
  try {
    // Format the 'to' number for WhatsApp
    const whatsappTo = to.startsWith("whatsapp:") ? to : `whatsapp:${to}`
    const whatsappFrom = twilioWhatsappNumber || ""

    const response = await axios.post(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      new URLSearchParams({
        To: whatsappTo,
        From: whatsappFrom,
        Body: body,
      }),
      {
        auth: {
          username: accountSid || "",
          password: authToken || "",
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    )

    return response.data
  } catch (error) {
    console.error("Error sending WhatsApp message:", error)
    throw error
  }
}

// Function to send a test message (for verification)
export async function sendTestMessage() {
  const testPhoneNumber = process.env.TEST_PHONE_NUMBER
  if (!testPhoneNumber) {
    throw new Error("Test phone number not configured")
  }

  return sendSMS(
    testPhoneNumber,
    "This is a test message from PulseTrack. If you received this, Twilio is configured correctly!",
  )
}
