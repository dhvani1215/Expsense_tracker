
import { useEffect } from "react";
import { AuthForm } from "@/components/auth/AuthForm";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { PieChart } from "lucide-react";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="flex-1 bg-primary text-white flex flex-col items-center justify-center p-8 md:p-12">
        <div className="max-w-md mx-auto space-y-6 text-center md:text-left">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-xl bg-white/10 backdrop-blur-sm mb-4">
            <PieChart className="h-8 w-8" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Smart Expense Tracker
          </h1>
          
          <p className="text-primary-foreground/80 text-lg">
            Track your spending, analyze patterns, and discover saving opportunities with our intelligent expense management system.
          </p>
          
          <div className="pt-4 space-y-4">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full flex items-center justify-center bg-white/10">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="ml-4 text-lg">Analyze spending habits</span>
            </div>
            
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full flex items-center justify-center bg-white/10">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="ml-4 text-lg">Get personalized saving tips</span>
            </div>
            
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full flex items-center justify-center bg-white/10">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="ml-4 text-lg">Automate financial tracking</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center bg-card p-8">
        <div className="w-full max-w-md">
          <AuthForm />
        </div>
      </div>
    </div>
  );
};

export default Index;
