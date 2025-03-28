"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Frame, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // This is a mock authentication for the prototype
      // In a real app, you would call your authentication API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user data - in a real app, this would come from your backend
      const mockUsers = [
        { email: "cook@example.com", password: "password", role: "cook" },
        { email: "buyer@example.com", password: "password", role: "buyer" },
      ]

      const user = mockUsers.find((user) => user.email === email && user.password === password)

      if (user) {
        // Store user info in localStorage for this prototype
        // In a real app, you would use a proper auth solution
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: user.email,
            role: user.role,
          }),
        )

        // Redirect based on user role
        if (user.role === "cook") {
          router.push("/cook-panel")
        } else {
          router.push("/buyer-panel")
        }
      } else {
        setError("Invalid email or password")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4" style={{display:"flex",justifyContent:"space-between", padding:"0",margin:"0"}}>
      <div className="bclass" style={{height:"710px",width:"700px",background:"linear-gradient(to right,rgb(247, 88, 48),rgb(246, 8, 123))",color:"white"}}>
      <div className="nameofcomp" style={{fontSize:"90px",marginLeft:"100px",marginTop:"150px",marginBottom:"100px",fontFamily:"Boldonse",fontWeight:"bold"}}>QuickBites</div>
      <div className="hindiname" style={{fontFamily: '"Noto Sans Devanagari", sans-serif',fontSize:"60px",fontWeight:"bold",marginLeft:"100px",marginTop:"60px"}}># स्वाद अपने घर का</div>
     { /*<Link href="/" className="flex items-center gap-2 mb-8 justify-center">
          <Frame className="w-8 h-8" />
          <div className="font-bold text-2xl bg-gradient-to-r from-orange-500 to-pink-600 text-transparent bg-clip-text">
            Home
          </div>
        </Link>*/} 
      </div>
      <div className="w-full max-w-md" style={{marginRight:"80px"}}>
        

        <Card style={{backgroundColor:"lightgray",boxShadow:"10px 10px 30px rgba(0, 0, 0, 0.3)"}}>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Welcome.</CardTitle>
            <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/forgot-password" className="text-xs text-muted-foreground hover:text-primary">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                  </Button>
                </div>
              </div>

              {error && <div className="text-sm text-red-500 font-medium">{error}</div>}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>


            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <div className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/signup" className="font-medium text-primary hover:underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

