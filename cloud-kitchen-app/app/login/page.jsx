"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Frame, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import logo from "../Assets/imagelogo-removebg-preview.png"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isClient, setIsClient] = useState(false) // Ensure client-side rendering

  useEffect(() => {
    setIsClient(true) // Mark that component is now on client
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
        const response = await fetch("http://localhost:4000/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (data.success) {
            // Token aur role ko localStorage me store karna
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role);

            // Role ke basis pe redirect karna
            if (data.role === "cook") {
                router.push("/cook-panel");
            } else {
                router.push("/buyer-panel");
            }
        } else {
            setError(data.message);
        }
    } catch (err) {
        setError("Login failed! Please try again.");
        console.error(err);
    } finally {
        setIsLoading(false);
    }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4" style={{display:"flex",justifyContent:"space-between", padding:"0",margin:"0"}}>
      <div className="bclass" style={{ display: "flex",
  justifyContent: "center", 
  alignItems: "center"  ,
        height:"710px",width:"700px",background:"linear-gradient(to right,rgb(247, 88, 48),rgb(246, 8, 123))",color:"white"}}>
      <img src={logo.src} style={{
    display: "block", 
    margin: "auto", 
    width: "500px", 
    height: "500px",
    padding:"50px"
  }}    / >
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

// fetch("http://localhost:4000/signin", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({ email, password })
// })
// .then(res => res.json())
// .then(data => {
//   if (data.success) {
//       localStorage.setItem("token", data.token); // Save JWT Token
//       window.location.href = "/dashboard.html"; // Redirect after login
//   } else {
//       alert(data.message);
//   }
// })
// .catch(err => console.error(err));

