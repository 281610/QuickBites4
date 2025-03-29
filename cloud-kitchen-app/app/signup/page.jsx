"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Frame, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import bgimage from "../Assets/imagelogo.jpg";
export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "buyer",
    phone: "",
    address: "",
    city: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [step, setStep] = useState(1)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRoleChange = (value) => {
    setFormData((prev) => ({ ...prev, role: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNextStep = () => {
    if (step === 1) {
      // Validate first step
      if (!formData.name || !formData.email || !formData.password || !formData.role) {
        setError("Please fill all required fields")
        return
      }
      setError("")
      setStep(2)
    }
  }

  const handlePrevStep = () => {
    setStep(1)
    setError("")
  }

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
        const response = await fetch("http://localhost:4000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role: formData.role,
                phone: formData.phone,
                address: formData.address,
                city: formData.city,
            }),
        });

        const data = await response.json();

        if (data.success) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role);

            if (data.role === "cook") {
                router.push("/cook-panel");
            } else {
                router.push("/buyer-panel");
            }
        } else {
            setError(data.message);
        }
    } catch (err) {
        console.error(err);
        setError("An error occurred. Please try again.");
    } finally {
        setIsLoading(false);
    }
};

  
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4" style={{display:"flex",justifyContent:"space-between", padding:"0",margin:"0"}}>
      <div className="bclass" style={{height:"710px",width:"700px",background:"linear-gradient(to right,rgb(247, 88, 48),rgb(246, 8, 123))",color:"white"}}>
      <img src={bgimage}/>
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
            <CardTitle className="text-2xl text-center">Create an account</CardTitle>
            <CardDescription className="text-center">
              {step === 1 ? "Enter your details to get started" : "Just a few more details"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup} className="space-y-4">
              {step === 1 ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
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

                  <div className="space-y-2">
                    <Label>I want to</Label>
                    <RadioGroup
                      defaultValue={formData.role}
                      onValueChange={handleRoleChange}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="buyer" id="buyer" />
                        <Label htmlFor="buyer" className="cursor-pointer">
                          Order food (Buyer)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="cook" id="cook" />
                        <Label htmlFor="cook" className="cursor-pointer">
                          Sell my food (Home Cook)
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="+91 9876543210"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      placeholder="123 Main St"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2 cursor-pointer">
                    <Label htmlFor="city">City</Label>
                    <Select onValueChange={(value) => handleSelectChange("city", value)} defaultValue={formData.city}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your city" />
                      </SelectTrigger>
                      <SelectContent className="cursor-pointer">
                        <SelectItem value="mumbai">Mumbai</SelectItem>
                        <SelectItem value="delhi">Delhi</SelectItem>
                        <SelectItem value="bangalore">Bangalore</SelectItem>
                        <SelectItem value="hyderabad">Hyderabad</SelectItem>
                        <SelectItem value="chennai">Chennai</SelectItem>
                        <SelectItem value="kolkata">Kolkata</SelectItem>
                        <SelectItem value="pune">Pune</SelectItem>
                        <SelectItem value="ahmedabad">Ahmedabad</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.role === "cook" && (
                    <div className="space-y-2">
                      <Label htmlFor="cuisine">Cuisine Specialty</Label>
                      <Select
                        onValueChange={(value) => handleSelectChange("cuisine", value)}
                        defaultValue={formData.cuisine}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your cuisine specialty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="north-indian">North Indian</SelectItem>
                          <SelectItem value="south-indian">South Indian</SelectItem>
                          <SelectItem value="bengali">Bengali</SelectItem>
                          <SelectItem value="gujarati">Gujarati</SelectItem>
                          <SelectItem value="punjabi">Punjabi</SelectItem>
                          <SelectItem value="mughlai">Mughlai</SelectItem>
                          <SelectItem value="chinese">Indo-Chinese</SelectItem>
                          <SelectItem value="continental">Continental</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </>
              )}

              {error && <div className="text-sm text-red-500 font-medium">{error}</div>}

              <div className="flex gap-4">
                {step === 2 && (
                  <Button type="button" variant="outline" className="flex-1" onClick={handlePrevStep}>
                    Back
                  </Button>
                )}

                {step === 1 ? (
                  <Button
                    type="button"
                    className="flex-1 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700"
                    onClick={handleNextStep}
                  >
                    Continue
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                )}
              </div>
            </form>
          </CardContent><br></br>
          <CardFooter className="flex justify-center">
            <div className="text-sm text-muted-foreground">
              Already have an account?{" "} 
              <Link href="/login" className="font-medium text-primary hover:underline">
                Sign in
              </Link><br></br>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}





// fetch("http://localhost:4000/signup", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({ name, email, password })
// })
// .then(res => res.json())
// .then(data => {
//   if (data.success) {
//       window.location.href = "/app/login\page.jsx"; // Redirect to Signin page
//   } else {
//       alert(data.message);
//   }
// })
// .catch(err => console.error(err));
