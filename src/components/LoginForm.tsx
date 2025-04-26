
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const LoginForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.username || !form.password) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Login successful!");
      navigate("/dashboard");
    }, 1500);
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    
    // Simulate API call for social login
    setTimeout(() => {
      setIsLoading(false);
      toast.success(`${provider} login successful!`);
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md shadow-lg animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>
          Sign in to access your Instagram dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              placeholder="Your username"
              value={form.username}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Your password"
              value={form.password}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Log in"}
          </Button>
        </form>

        <div className="flex items-center my-4">
          <Separator className="flex-grow" />
          <span className="px-2 text-sm text-muted-foreground">OR</span>
          <Separator className="flex-grow" />
        </div>

        <div className="space-y-2">
          <Button 
            variant="outline" 
            type="button" 
            className="w-full" 
            onClick={() => handleSocialLogin("Instagram")}
            disabled={isLoading}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="mr-2"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
            Continue with Instagram
          </Button>
          <Button 
            variant="outline" 
            type="button" 
            className="w-full" 
            onClick={() => handleSocialLogin("Facebook")}
            disabled={isLoading}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="mr-2"
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
            Continue with Facebook
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Don't have an account? <a href="#" className="text-primary hover:underline">Sign up</a>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
