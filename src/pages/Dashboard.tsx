
import { Layout } from "@/components/layout/Layout";
import { ExpenseSummary } from "@/components/dashboard/ExpenseSummary";
import { ExpenseChart } from "@/components/dashboard/ExpenseChart";
import { cn } from "@/lib/utils";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  ArrowUp, 
  ChevronRight, 
  DollarSign, 
  PiggyBank, 
  TrendingDown, 
  TrendingUp 
} from "lucide-react";
import { SAMPLE_TRANSACTIONS, CATEGORIES } from "@/lib/constants";
import { format } from "date-fns";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  const [chartType, setChartType] = useState<"bar" | "pie">("bar");
  
  const recentTransactions = SAMPLE_TRANSACTIONS
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 5);

  const totalIncome = 5000; // Mock income data
  const totalExpenses = SAMPLE_TRANSACTIONS.reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpenses;
  
  return (
    <Layout requireAuth>
      <div className="flex flex-col space-y-10 mb-10">
        {/* Balance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="card-elegant">
            <CardHeader className="pb-2">
              <CardDescription>Income</CardDescription>
              <CardTitle className="text-2xl flex items-center text-green-600">
                ${totalIncome.toLocaleString()}
                <TrendingUp className="h-4 w-4 ml-2" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                This month's earnings
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-elegant">
            <CardHeader className="pb-2">
              <CardDescription>Expenses</CardDescription>
              <CardTitle className="text-2xl flex items-center text-red-600">
                ${totalExpenses.toLocaleString()}
                <TrendingDown className="h-4 w-4 ml-2" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                This month's spending
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-elegant">
            <CardHeader className="pb-2">
              <CardDescription>Balance</CardDescription>
              <CardTitle className="text-2xl flex items-center">
                ${balance.toLocaleString()}
                <DollarSign className="h-4 w-4 ml-2" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Remaining this month
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Spending Summary */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Spending Summary</h2>
          <ExpenseSummary />
        </div>
        
        {/* Charts Section */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Spending Analysis</h2>
            <Tabs defaultValue={chartType} onValueChange={(v) => setChartType(v as "bar" | "pie")}>
              <TabsList>
                <TabsTrigger value="bar">Bar</TabsTrigger>
                <TabsTrigger value="pie">Pie</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <ExpenseChart chartType={chartType} />
        </div>
        
        {/* Recent Transactions and Saving Tips */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Recent Transactions</h2>
              <a href="/transactions" className="text-sm text-primary flex items-center">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </div>
            
            <div className="space-y-3">
              {recentTransactions.map(transaction => {
                const category = CATEGORIES.find(c => c.id === transaction.categoryId);
                
                return (
                  <div key={transaction.id} className="card-elegant p-3 flex justify-between items-center">
                    <div className="flex items-center">
                      <div className={cn(
                        "h-8 w-8 mr-3 rounded-full flex items-center justify-center",
                        category?.color
                      )}>
                        {category?.icon && <category.icon className="h-4 w-4 text-white" />}
                      </div>
                      <div>
                        <div className="font-medium">{transaction.description}</div>
                        <div className="text-xs text-muted-foreground">
                          {format(transaction.date, "MMM d, yyyy")}
                        </div>
                      </div>
                    </div>
                    <div className="font-semibold">${transaction.amount.toFixed(2)}</div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Saving Opportunities</h2>
              <a href="/budget" className="text-sm text-primary flex items-center">
                All Tips <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </div>
            
            <div className="space-y-3">
              <div className="card-elegant p-4 border-l-4 border-l-green-500">
                <div className="flex items-start">
                  <div className="h-8 w-8 rounded-full flex items-center justify-center bg-green-100 text-green-600 mr-3">
                    <PiggyBank className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium">Optimize Coffee Spending</h3>
                    <p className="text-sm text-muted-foreground">
                      Making coffee at home could save you $150 per month
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="card-elegant p-4 border-l-4 border-l-blue-500">
                <div className="flex items-start">
                  <div className="h-8 w-8 rounded-full flex items-center justify-center bg-blue-100 text-blue-600 mr-3">
                    <ArrowUp className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium">Dining Out Less Often</h3>
                    <p className="text-sm text-muted-foreground">
                      Reducing restaurant visits could save $200 monthly
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="card-elegant p-4 border-l-4 border-l-purple-500">
                <div className="flex items-start">
                  <div className="h-8 w-8 rounded-full flex items-center justify-center bg-purple-100 text-purple-600 mr-3">
                    <DollarSign className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium">Subscription Audit</h3>
                    <p className="text-sm text-muted-foreground">
                      Review your subscriptions to save up to $50 monthly
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
