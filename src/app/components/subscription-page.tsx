import { useState } from "react";
import {
  Wallet,
  Zap,
  Calendar,
  Shield,
  Crown,
  Sparkles,
  Check,
  AlertCircle,
  X,
} from "lucide-react";
import { AppHeader } from "./app-header";
import { Button } from "./ui/button";

interface SubscriptionPageProps {
  onBack: () => void;
  isLoggedIn: boolean;
  onNewChat: () => void;
  onGoToHistory: () => void;
  onLogin: () => void;
  onGoToPricing: () => void;
}

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  credits: number;
  interval: "month" | "quarter" | "year";
  icon: any;
  iconColor: string;
  bgColor: string;
  borderColor: string;
  popular?: boolean;
  features: string[];
}

export function SubscriptionPage({
  onBack,
  isLoggedIn,
  onNewChat,
  onGoToHistory,
  onLogin,
  onGoToPricing,
}: SubscriptionPageProps) {
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [autoRenew, setAutoRenew] = useState(true);
  const [customAmount, setCustomAmount] = useState("1000");

  // Current subscription
  const currentSubscription = {
    planId: "pro",
    planName: "专业版",
    credits: 3770,
    price: 59,
    interval: "month" as const,
    nextBillingDate: "2025-01-22",
    status: "active" as const,
  };

  const subscriptionPlans: SubscriptionPlan[] = [
    {
      id: "basic",
      name: "入门套餐",
      price: 10,
      credits: 1000,
      interval: "month",
      icon: Zap,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      features: [
        "1000 AI 积分",
        "基础视频检索",
        "标准对话速度",
        "30天有效期",
      ],
    },
    {
      id: "pro",
      name: "专业套餐",
      price: 20,
      credits: 3000,
      interval: "month",
      icon: Crown,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      popular: true,
      features: [
        "3000 AI 积分",
        "高级视频检索",
        "优先对话速度",
        "90天有效期",
        "技术支持优先",
      ],
    },
  ];

  const calculateCustomPrice = (credits: number) => {
    return (credits / 100).toFixed(0);
  };

  const handleCancelSubscription = () => {
    // Logic to cancel subscription
    alert("订阅已取消，将在 2025-01-22 到期后停止续费");
    setShowCancelDialog(false);
  };

  const handleChangePlan = (planId: string) => {
    if (planId === currentSubscription.planId) {
      alert("您已订阅此套餐");
      return;
    }
    alert(`切换到${subscriptionPlans.find(p => p.id === planId)?.name}，将在下个计费周期生效`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 flex flex-col">
      {/* Header */}
      <AppHeader
        isLoggedIn={isLoggedIn}
        currentPage="subscription"
        onGoHome={onBack}
        onNewChat={onNewChat}
        onGoToHistory={onGoToHistory}
        onLogin={onLogin}
        onGoToPricing={onGoToPricing}
        onGoToBilling={() => {}}
        onGoToSubscription={() => {}}
        onGoToSettings={() => {}}
      />

      {/* Main Content */}
      <div className="flex-1 py-8">
        <div className="max-w-[1440px] mx-auto px-6">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">订阅管理</h1>
            <p className="text-gray-600">管理您的订阅计划和积分余额</p>
          </div>

          {/* Current Subscription Overview */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-white shadow-xl mb-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <Crown className="w-8 h-8" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold">
                      {currentSubscription.planName}
                    </h2>
                    <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                      {currentSubscription.status === "active"
                        ? "使用中"
                        : "已取消"}
                    </div>
                  </div>
                  <p className="text-blue-100 text-sm">
                    ¥{currentSubscription.price}/月 • 下次账单日期:{" "}
                    {currentSubscription.nextBillingDate}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowCancelDialog(true)}
                className="text-sm text-white/80 hover:text-white underline transition-colors"
              >
                取消订阅
              </button>
            </div>

            {/* Credits Display */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-blue-100 text-sm">当前积分余额</span>
                  <Wallet className="w-5 h-5 text-blue-100" />
                </div>
                <p className="text-3xl font-bold mb-2">
                  {currentSubscription.credits.toLocaleString()}
                </p>
                <p className="text-blue-100 text-sm">AI 积分</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-blue-100 text-sm">自动续订</span>
                  <button
                    onClick={() => setAutoRenew(!autoRenew)}
                    className={`relative w-11 h-6 rounded-full transition-colors ${
                      autoRenew ? "bg-white/30" : "bg-white/10"
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                        autoRenew ? "translate-x-5" : "translate-x-0.5"
                      }`}
                    ></div>
                  </button>
                </div>
                <p className="text-lg font-semibold mb-2">
                  {autoRenew ? "已开启" : "已关闭"}
                </p>
                <p className="text-blue-100 text-sm">
                  {autoRenew
                    ? "到期自动续订"
                    : "到期后需要手动续订"}
                </p>
              </div>
            </div>
          </div>

          {/* Available Plans */}
          <div className="mb-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                选择订阅计划
              </h2>
              <p className="text-gray-600">升级或更改您的订阅套餐</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {subscriptionPlans.map((plan) => {
                const Icon = plan.icon;
                const isCurrentPlan = plan.id === currentSubscription.planId;

                return (
                  <div
                    key={plan.id}
                    className={`relative bg-white rounded-2xl border-2 p-6 hover:shadow-lg transition-all cursor-pointer ${
                      isCurrentPlan
                        ? "border-blue-500 shadow-xl shadow-blue-500/20"
                        : selectedPlan === plan.id
                        ? "border-blue-400 shadow-lg"
                        : plan.borderColor
                    }`}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    {/* Popular Badge */}
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-1 rounded-full text-xs font-medium shadow-lg">
                        最受欢迎
                      </div>
                    )}

                    {/* Current Plan Badge */}
                    {isCurrentPlan && (
                      <div className="absolute top-4 right-4 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                        当前套餐
                      </div>
                    )}

                    {/* Icon */}
                    <div
                      className={`w-12 h-12 ${plan.bgColor} rounded-xl flex items-center justify-center mb-4 mt-2`}
                    >
                      <Icon className={`w-6 h-6 ${plan.iconColor}`} />
                    </div>

                    {/* Plan Name */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {plan.name}
                    </h3>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-3xl font-bold text-gray-900">
                        ¥{plan.price}
                      </span>
                      <span className="text-gray-500">一次性付费</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-6">
                      获得 {plan.credits.toLocaleString()} AI 积分
                    </p>

                    {/* Features */}
                    <ul className="space-y-2.5 mb-6">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-green-600" />
                          </div>
                          <span className="text-sm text-gray-700">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Action Button */}
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleChangePlan(plan.id);
                      }}
                      disabled={isCurrentPlan}
                      className={`w-full py-3 rounded-xl font-medium transition-all ${
                        isCurrentPlan
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : selectedPlan === plan.id
                          ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/30"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      }`}
                    >
                      {isCurrentPlan ? "当前套餐" : "选择此套餐"}
                    </Button>
                  </div>
                );
              })}

              {/* Custom Amount Card */}
              <div className="relative bg-white rounded-2xl border-2 border-blue-200 p-6 hover:shadow-lg transition-all overflow-hidden">
                {/* Decorative gradient background */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-50 -z-0"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-100 to-pink-100 rounded-full blur-3xl opacity-50 -z-0"></div>

                <div className="relative z-10">
                  {/* Badge */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded-full text-xs font-medium shadow-lg">
                    灵活购买
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 mt-2">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    自定义购买
                  </h3>

                  {/* Custom Input */}
                  <div className="mb-4">
                    <div className="relative mb-2">
                      <input
                        type="number"
                        value={customAmount}
                        onChange={(e) => {
                          const value = Math.max(1000, parseInt(e.target.value) || 1000);
                          setCustomAmount(value.toString());
                        }}
                        min="1000"
                        step="100"
                        className="w-full px-3 py-2 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 font-semibold"
                        placeholder="输入积分"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                        积分
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-3">
                      最少购买 1000 积分
                    </p>

                    {/* Quick Select Buttons */}
                    <div className="flex gap-2 mb-4">
                      {[2000, 5000, 10000].map((amount) => (
                        <button
                          key={amount}
                          onClick={() => setCustomAmount(amount.toString())}
                          className={`flex-1 px-2 py-1.5 rounded-lg text-xs font-medium transition-all border-2 ${
                            customAmount === amount.toString()
                              ? "bg-blue-50 border-blue-500 text-blue-700"
                              : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
                          }`}
                        >
                          {(amount / 1000).toFixed(0)}k
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Display */}
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 mb-4 border border-blue-100">
                    <p className="text-xs text-gray-600 mb-1">需要支付</p>
                    <div className="flex items-baseline gap-1 mb-2">
                      <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        ¥{calculateCustomPrice(parseInt(customAmount) || 1000)}
                      </span>
                      <span className="text-gray-500 text-sm">元</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-600 pt-2 border-t border-gray-200">
                      <span>单价</span>
                      <span className="font-semibold">¥0.01/积分</span>
                    </div>
                  </div>

                  {/* Buy Button */}
                  <Button
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl font-medium shadow-lg shadow-blue-500/30 transition-all"
                    onClick={() => {
                      const price = calculateCustomPrice(parseInt(customAmount) || 1000);
                      alert(`自定义购买：${customAmount} 积分，¥${price}`);
                    }}
                  >
                    立即购买
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Subscription Info Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Billing History */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gray-600" />
                账单历史
              </h3>
              <div className="space-y-3">
                {[
                  {
                    date: "2024-12-22",
                    plan: "专业版",
                    amount: 59,
                    status: "已支付",
                  },
                  {
                    date: "2024-11-22",
                    plan: "专业版",
                    amount: 59,
                    status: "已支付",
                  },
                  {
                    date: "2024-10-22",
                    plan: "基础版",
                    amount: 29,
                    status: "已支付",
                  },
                ].map((bill, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {bill.plan}
                      </p>
                      <p className="text-xs text-gray-500">{bill.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-900">
                        ¥{bill.amount}
                      </p>
                      <span className="text-xs text-green-600">
                        {bill.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
                查看全部账单 →
              </button>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-gray-600" />
                订阅权益
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      灵活取消
                    </p>
                    <p className="text-xs text-gray-600">
                      随时取消，当月取消下月生效
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-xl">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      随时升级
                    </p>
                    <p className="text-xs text-gray-600">
                      升级立即生效，差价按比例结算
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-xl">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      无风险试用
                    </p>
                    <p className="text-xs text-gray-600">
                      7天内不满意全额退款
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Subscription Dialog */}
      {showCancelDialog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center shrink-0">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  取消订阅
                </h3>
                <p className="text-sm text-gray-600">
                  您确定要取消 {currentSubscription.planName} 订阅吗？
                </p>
              </div>
              <button
                onClick={() => setShowCancelDialog(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-900 mb-1">
                    重要提示
                  </p>
                  <ul className="text-xs text-yellow-800 space-y-1">
                    <li>
                      • 取消后，您可以继续使用服务至{" "}
                      {currentSubscription.nextBillingDate}
                    </li>
                    <li>• 到期后将不再自动续费</li>
                    <li>• 未使用的积分将在到期后清零</li>
                    <li>• 您可以随时重新订阅</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => setShowCancelDialog(false)}
                variant="outline"
                className="flex-1 border-gray-300"
              >
                保留订阅
              </Button>
              <Button
                onClick={handleCancelSubscription}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              >
                确认取消
              </Button>
            </div>

            <p className="text-xs text-gray-500 text-center mt-4">
              取消后您仍可在账单日期前使用所有功能
            </p>
          </div>
        </div>
      )}
    </div>
  );
}