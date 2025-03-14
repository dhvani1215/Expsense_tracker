
import { Layout } from "@/components/layout/Layout";
import { TransactionList } from "@/components/transactions/TransactionList";

const Transactions = () => {
  return (
    <Layout requireAuth>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-primary">Manage Expenses</h1>
        <TransactionList />
      </div>
    </Layout>
  );
};

export default Transactions;
