
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { X } from "lucide-react";
import { toast } from "sonner";
import { CATEGORIES, Transaction } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface ExpenseFormProps {
  onSave: (expense: Omit<Transaction, "id">) => void;
  onCancel: () => void;
  initialData?: Transaction;
}

export const ExpenseForm = ({ onSave, onCancel, initialData }: ExpenseFormProps) => {
  const [description, setDescription] = useState(initialData?.description || "");
  const [amount, setAmount] = useState(initialData?.amount.toString() || "");
  const [date, setDate] = useState(
    initialData?.date
      ? new Date(initialData.date).toISOString().slice(0, 10)
      : new Date().toISOString().slice(0, 10)
  );
  const [categoryId, setCategoryId] = useState(initialData?.categoryId || "uncategorized");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description.trim()) {
      toast.error("Please enter a description");
      return;
    }
    
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    const expense = {
      date: new Date(date),
      amount: Number(amount),
      description: description.trim(),
      categoryId
    };

    onSave(expense);
    toast.success(initialData ? "Expense updated" : "Expense added");
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">
          {initialData ? "Edit Expense" : "Add Expense"}
        </CardTitle>
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Grocery shopping, dinner, etc."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount">Amount ($)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Category</Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {CATEGORIES.map((category) => {
                const Icon = category.icon;
                return (
                  <div
                    key={category.id}
                    className={cn(
                      "flex flex-col items-center justify-center p-2 border rounded-md cursor-pointer hover:bg-accent transition-colors",
                      categoryId === category.id && "border-primary ring-1 ring-primary"
                    )}
                    onClick={() => setCategoryId(category.id)}
                  >
                    <div className={cn(
                      "h-8 w-8 rounded-full flex items-center justify-center mb-1",
                      category.color
                    )}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-xs text-center">{category.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {initialData ? "Update" : "Add"} Expense
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
