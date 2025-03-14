
import { useState, useMemo } from "react";
import { format } from "date-fns";
import { CATEGORIES, SAMPLE_TRANSACTIONS, Transaction } from "@/lib/constants";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ExpenseForm } from "./ExpenseForm";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const TransactionList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>(SAMPLE_TRANSACTIONS);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState<string | null>(null);
  
  const filteredTransactions = useMemo(() => {
    if (!searchTerm) return transactions;
    
    const term = searchTerm.toLowerCase();
    return transactions.filter(
      transaction => 
        transaction.description.toLowerCase().includes(term) || 
        CATEGORIES.find(cat => cat.id === transaction.categoryId)?.name.toLowerCase().includes(term)
    );
  }, [searchTerm, transactions]);

  const groupedTransactions = useMemo(() => {
    const groups: Record<string, Transaction[]> = {};
    
    filteredTransactions.forEach(transaction => {
      const dateString = format(new Date(transaction.date), "MMMM d, yyyy");
      if (!groups[dateString]) {
        groups[dateString] = [];
      }
      groups[dateString].push(transaction);
    });
    
    // Sort dates in descending order (newest first)
    return Object.entries(groups)
      .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())
      .map(([date, transactions]) => ({
        date,
        transactions: transactions.sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        )
      }));
  }, [filteredTransactions]);

  const handleAddExpense = (expense: Omit<Transaction, "id">) => {
    const newTransaction: Transaction = {
      ...expense,
      id: `t${transactions.length + 1}`,
    };
    
    setTransactions([newTransaction, ...transactions]);
    setShowAddForm(false);
  };

  const handleUpdateExpense = (expense: Omit<Transaction, "id">) => {
    if (!editingTransaction) return;
    
    const updatedTransactions = transactions.map(t => 
      t.id === editingTransaction.id 
        ? { ...expense, id: editingTransaction.id } 
        : t
    );
    
    setTransactions(updatedTransactions);
    setEditingTransaction(null);
  };

  const confirmDelete = (id: string) => {
    setTransactionToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const handleDelete = () => {
    if (!transactionToDelete) return;
    
    setTransactions(transactions.filter(t => t.id !== transactionToDelete));
    toast.success("Expense deleted");
    setDeleteConfirmOpen(false);
    setTransactionToDelete(null);
  };

  return (
    <div className="space-y-6">
      {!showAddForm && !editingTransaction && (
        <>
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={() => setShowAddForm(true)} className="sm:w-auto w-full">
              <Plus className="mr-2 h-4 w-4" /> Add Expense
            </Button>
          </div>

          {groupedTransactions.map(group => (
            <div key={group.date} className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground sticky top-0 bg-background/80 backdrop-blur-sm py-1">
                {group.date}
              </h3>
              
              <div className="space-y-2">
                {group.transactions.map(transaction => {
                  const category = CATEGORIES.find(c => c.id === transaction.categoryId);
                  const Icon = category?.icon;
                  
                  return (
                    <div 
                      key={transaction.id} 
                      className="card-elegant p-4 flex items-center justify-between hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={cn(
                          "h-10 w-10 rounded-full flex items-center justify-center",
                          category?.color
                        )}>
                          {Icon && <Icon className="h-5 w-5 text-white" />}
                        </div>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-xs text-muted-foreground">{category?.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="text-right mr-4">
                          <p className="font-semibold">${transaction.amount.toFixed(2)}</p>
                          <p className="text-xs text-muted-foreground">
                            {format(new Date(transaction.date), "h:mm a")}
                          </p>
                        </div>
                        <div className="flex space-x-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setEditingTransaction(transaction)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => confirmDelete(transaction.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          
          {filteredTransactions.length === 0 && (
            <div className="text-center py-12 card-elegant">
              <p className="text-muted-foreground">No transactions found</p>
            </div>
          )}
        </>
      )}

      {showAddForm && (
        <ExpenseForm
          onSave={handleAddExpense}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {editingTransaction && (
        <ExpenseForm
          onSave={handleUpdateExpense}
          onCancel={() => setEditingTransaction(null)}
          initialData={editingTransaction}
        />
      )}

      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Expense</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this expense? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
