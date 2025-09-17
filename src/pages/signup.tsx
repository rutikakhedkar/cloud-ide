import { SignupForm } from "@/components/signup-form"
import { CodeQuote } from "@/components/code-quote"

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Left side - Signup Form (Mandatory) */}
      <div className="flex-1 flex items-center justify-center p-8">
        <SignupForm />
      </div>

      {/* Right side - Code Quote (Optional) */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-8 bg-gray-800/50">
        <CodeQuote />
      </div>
    </div>
  )
}
