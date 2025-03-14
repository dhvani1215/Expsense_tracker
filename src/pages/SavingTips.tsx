
import { Layout } from "@/components/layout/Layout";
import { SavingTipsList } from "@/components/savings/SavingTipsList";

const SavingTips = () => {
  return (
    <Layout requireAuth>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-primary">Saving Tips</h1>
        <SavingTipsList />
      </div>
    </Layout>
  );
};

export default SavingTips;
