
import { useMemo } from "react";
import { CATEGORIES, SAMPLE_BUDGETS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ExternalLink, ArrowRight } from "lucide-react";

export const BudgetProgress = () => {
  const budgetData = useMemo(() => {
    return SAMPLE_BUDGETS.map(budget => {
      const category = CATEGORIES.find(c => c.id === budget.categoryId);
      const percentage = (budget.spent / budget.amount) * 100;
      const isExceeding = percentage > 100;
      
      return {
        ...budget,
        category,
        percentage: Math.min(percentage, 100),
        remaining: budget.amount - budget.spent,
        status: isExceeding ? "exceeded" : percentage > 80 ? "warning" : "good"
      };
    });
  }, []);

  const totalBudget = useMemo(() => {
    const total = SAMPLE_BUDGETS.reduce((sum, budget) => sum + budget.amount, 0);
    const spent = SAMPLE_BUDGETS.reduce((sum, budget) => sum + budget.spent, 0);
    const percentage = (spent / total) * 100;
    
    return {
      total,
      spent,
      remaining: total - spent,
      percentage
    };
  }, []);

  return (
    <div className="space-y-8">
      <div className="card-elegant p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold">Total Budget</h3>
            <p className="text-sm text-muted-foreground">Monthly overview</p>
          </div>
          <div className="mt-2 md:mt-0 text-right">
            <p className="text-2xl font-bold">${totalBudget.total.toFixed(2)}</p>
            <p className="text-sm">
              <span className="text-muted-foreground">Spent: </span>
              <span className="font-medium">${totalBudget.spent.toFixed(2)}</span>
            </p>
          </div>
        </div>
        
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-primary/10 text-primary">
                {totalBudget.percentage.toFixed(0)}% Used
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-primary">
                ${totalBudget.remaining.toFixed(2)} remaining
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-primary/20">
            <div
              style={{ width: `${totalBudget.percentage}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary animate-progress-fill"
            ></div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Category Budgets</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {budgetData.map(budget => {
            const Icon = budget.category?.icon;
            
            return (
              <div key={budget.id} className="card-elegant p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className={cn(
                      "h-8 w-8 rounded-full flex items-center justify-center mr-3",
                      budget.category?.color
                    )}>
                      {Icon && <Icon className="h-4 w-4 text-white" />}
                    </div>
                    <span className="font-medium">{budget.category?.name}</span>
                  </div>
                  <span className={cn(
                    "text-xs px-2 py-1 rounded-full font-medium",
                    budget.status === "exceeded" 
                      ? "bg-red-100 text-red-700" 
                      : budget.status === "warning"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                  )}>
                    {budget.status === "exceeded" 
                      ? "Exceeded" 
                      : budget.status === "warning"
                        ? "Almost Reached"
                        : "On Track"}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">
                    ${budget.spent.toFixed(2)} / ${budget.amount.toFixed(2)}
                  </span>
                  <span className="font-medium">
                    {budget.percentage.toFixed(0)}%
                  </span>
                </div>
                
                <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      "absolute top-0 left-0 h-full rounded-full animate-progress-fill",
                      budget.status === "exceeded" 
                        ? "bg-red-500" 
                        : budget.status === "warning"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                    )}
                    style={{ width: `${budget.percentage}%` }}
                  ></div>
                </div>
                
                <div className="mt-2 text-xs text-right">
                  <span className={cn(
                    budget.remaining < 0 ? "text-red-600" : "text-primary"
                  )}>
                    {budget.remaining < 0 
                      ? `$${Math.abs(budget.remaining).toFixed(2)} over budget` 
                      : `$${budget.remaining.toFixed(2)} remaining`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="card-elegant p-6 bg-saving/10 border border-saving/20">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-saving inline-block px-2 py-1 bg-saving/20 rounded-full text-xs font-medium mb-2">
              Saving Tip
            </div>
            <h3 className="text-lg font-semibold mb-1">Reduce Coffee Spending</h3>
            <p className="text-sm text-muted-foreground">Making coffee at home could save you $150 per month.</p>
          </div>
          <div className="h-10 w-10 rounded-full flex items-center justify-center bg-saving/20 text-saving">
            <ExternalLink className="h-5 w-5" />
          </div>
        </div>
        <button className="mt-4 text-sm font-medium text-saving flex items-center hover:opacity-80 transition-opacity">
          See more saving tips <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
