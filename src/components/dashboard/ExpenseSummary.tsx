
import { useMemo } from "react";
import { ArrowDown, ArrowUp, DollarSign } from "lucide-react";
import { SAMPLE_TRANSACTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface SummaryCardProps {
  title: string;
  amount: number;
  icon: React.ReactNode;
  change?: number;
  className?: string;
}

const SummaryCard = ({ title, amount, icon, change, className }: SummaryCardProps) => {
  const isPositive = change && change > 0;
  
  return (
    <div className={cn(
      "card-elegant p-5 flex flex-col space-y-2",
      className
    )}>
      <div className="flex justify-between items-start">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <div className="h-9 w-9 rounded-md flex items-center justify-center bg-primary/10">
          {icon}
        </div>
      </div>
      <div className="flex items-baseline justify-between">
        <h3 className="text-2xl font-bold">${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
        {change !== undefined && (
          <div className={cn(
            "flex items-center text-xs font-medium",
            isPositive ? "text-green-600" : "text-red-600"
          )}>
            {isPositive ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
            {Math.abs(change)}%
          </div>
        )}
      </div>
    </div>
  );
};

export const ExpenseSummary = () => {
  const summaryData = useMemo(() => {
    const transactions = SAMPLE_TRANSACTIONS;
    
    // Calculate total spending
    const totalSpent = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    
    // Calculate average spending per day
    const now = new Date();
    const days = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const avgPerDay = totalSpent / days;
    
    // Get last month transactions (mock data)
    const previousMonthTotal = totalSpent * 0.9; // Mock 10% less
    const totalChange = ((totalSpent - previousMonthTotal) / previousMonthTotal) * 100;
    
    return {
      totalSpent,
      avgPerDay,
      totalChange: parseFloat(totalChange.toFixed(1)),
      avgDayChange: parseFloat((totalChange * 0.8).toFixed(1)), // Mock slightly different change
      largestExpense: Math.max(...transactions.map(t => t.amount)),
      largestExpenseChange: -5.2, // Mock data
    };
  }, []);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <SummaryCard
        title="Total Spending"
        amount={summaryData.totalSpent}
        icon={<DollarSign className="h-5 w-5 text-primary" />}
        change={summaryData.totalChange}
      />
      
      <SummaryCard
        title="Average Per Day"
        amount={summaryData.avgPerDay}
        icon={<ArrowDown className="h-5 w-5 text-expense" />}
        change={summaryData.avgDayChange}
      />
      
      <SummaryCard
        title="Largest Expense"
        amount={summaryData.largestExpense}
        icon={<ArrowUp className="h-5 w-5 text-income" />}
        change={summaryData.largestExpenseChange}
      />
    </div>
  );
};
