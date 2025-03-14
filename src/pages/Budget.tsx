
import { Layout } from "@/components/layout/Layout";
import { BudgetProgress } from "@/components/budget/BudgetProgress";

const Budget = () => {
  return (
    <Layout requireAuth>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-primary">Budget Planning</h1>
        <BudgetProgress />
      </div>
    </Layout>
  );
};

export default Budget;
