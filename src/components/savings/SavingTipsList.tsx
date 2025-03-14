
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { 
  PiggyBank, 
  DollarSign, 
  Coffee, 
  ShoppingBag, 
  Receipt, 
  Home, 
  Utensils, 
  BadgePercent,
  TrendingDown,
  HandCoins
} from "lucide-react";

type SavingTip = {
  id: string;
  title: string;
  description: string;
  potentialSaving: number;
  icon: React.ElementType;
  color: string;
  difficulty: "easy" | "medium" | "hard";
};

const SAVING_TIPS: SavingTip[] = [
  {
    id: "coffee",
    title: "Brew Coffee at Home",
    description: "Making coffee at home instead of buying it can save you a significant amount over time.",
    potentialSaving: 150,
    icon: Coffee,
    color: "bg-amber-500",
    difficulty: "easy",
  },
  {
    id: "diningout",
    title: "Reduce Dining Out",
    description: "Cook more meals at home and limit restaurant visits to special occasions.",
    potentialSaving: 200,
    icon: Utensils,
    color: "bg-green-500",
    difficulty: "medium",
  },
  {
    id: "subscriptions",
    title: "Audit Subscriptions",
    description: "Review your monthly subscriptions and cancel those you barely use.",
    potentialSaving: 50,
    icon: Receipt,
    color: "bg-purple-500",
    difficulty: "easy",
  },
  {
    id: "grocerylists",
    title: "Plan Grocery Shopping",
    description: "Create a shopping list and stick to it to avoid impulse purchases.",
    potentialSaving: 120,
    icon: ShoppingBag,
    color: "bg-pink-500",
    difficulty: "easy",
  },
  {
    id: "energysaving",
    title: "Reduce Energy Usage",
    description: "Lower your thermostat by a few degrees and unplug unused electronics.",
    potentialSaving: 80,
    icon: Home,
    color: "bg-blue-500",
    difficulty: "medium",
  },
  {
    id: "cashbacks",
    title: "Use Cashback Apps",
    description: "Earn money back on purchases with cashback apps and credit cards.",
    potentialSaving: 100,
    icon: HandCoins,
    color: "bg-green-600",
    difficulty: "easy",
  },
  {
    id: "bulkbuying",
    title: "Buy in Bulk",
    description: "Purchase non-perishable items in bulk to save money over time.",
    potentialSaving: 70,
    icon: ShoppingBag,
    color: "bg-orange-500",
    difficulty: "medium",
  },
  {
    id: "salesdeals",
    title: "Shop Sales & Discounts",
    description: "Wait for sales before making large purchases and use discount codes.",
    potentialSaving: 150,
    icon: BadgePercent,
    color: "bg-red-500",
    difficulty: "easy",
  },
  {
    id: "autoexpenses",
    title: "Lower Transportation Costs",
    description: "Use public transport, carpool, or bike to reduce transportation expenses.",
    potentialSaving: 130,
    icon: TrendingDown,
    color: "bg-cyan-500",
    difficulty: "medium",
  },
  {
    id: "emergencyfund",
    title: "Build Emergency Fund",
    description: "Save money for unexpected expenses to avoid costly loans or credit card debt.",
    potentialSaving: 300,
    icon: PiggyBank,
    color: "bg-primary",
    difficulty: "hard",
  },
  {
    id: "budgeting",
    title: "Use the 50/30/20 Rule",
    description: "Allocate 50% of income to needs, 30% to wants, and 20% to savings and debt repayment.",
    potentialSaving: 250,
    icon: DollarSign,
    color: "bg-teal-500",
    difficulty: "hard",
  }
];

export const SavingTipsList = () => {
  // Group tips by difficulty
  const easyTips = SAVING_TIPS.filter(tip => tip.difficulty === "easy");
  const mediumTips = SAVING_TIPS.filter(tip => tip.difficulty === "medium");
  const hardTips = SAVING_TIPS.filter(tip => tip.difficulty === "hard");

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4 text-foreground flex items-center">
          <span className="inline-block w-3 h-3 bg-green-400 rounded-full mr-2"></span>
          Easy Wins
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {easyTips.map(tip => (
            <SavingTipCard key={tip.id} tip={tip} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-foreground flex items-center">
          <span className="inline-block w-3 h-3 bg-yellow-400 rounded-full mr-2"></span>
          Moderate Effort
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mediumTips.map(tip => (
            <SavingTipCard key={tip.id} tip={tip} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-foreground flex items-center">
          <span className="inline-block w-3 h-3 bg-red-400 rounded-full mr-2"></span>
          High Impact Strategies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {hardTips.map(tip => (
            <SavingTipCard key={tip.id} tip={tip} />
          ))}
        </div>
      </div>
    </div>
  );
};

const SavingTipCard = ({ tip }: { tip: SavingTip }) => {
  const Icon = tip.icon;
  
  return (
    <Card className="card-elegant overflow-hidden">
      <div className="flex items-start p-5">
        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${tip.color} text-white shrink-0 mr-4`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <CardTitle className="text-lg mb-1">{tip.title}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground mb-2">
            {tip.description}
          </CardDescription>
          <div className="text-sm font-medium text-green-600">
            Potential savings: ${tip.potentialSaving}/month
          </div>
        </div>
      </div>
    </Card>
  );
};
