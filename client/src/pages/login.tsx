import  {LoginForm} from "../components/ui/Auth/login-form"
import  {CodeQuote}  from "../components/ui/Auth/code-quote"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Left side - Login Form (Mandatory) */}
      <div className="flex-1 flex items-center justify-center p-8">
        <LoginForm />
      </div>

      {/* Right side - Code Quote (Optional) */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-8 bg-gray-800/50">
        <CodeQuote />
      </div>
    </div>
  )
}
