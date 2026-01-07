import { useState } from "react";
import { Check, Sparkles, Zap, Crown, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { AppHeader } from "./app-header";

interface PricingPageProps {
  onBack: () => void;
  isLoggedIn: boolean;
  onNewChat: () => void;
  onGoToHistory: () => void;
  onLogin: () => void;
}

export function PricingPage({
  onBack,
  isLoggedIn,
  onNewChat,
  onGoToHistory,
  onLogin,
}: PricingPageProps) {
  const [customAmount, setCustomAmount] = useState("1000");
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans = [
    {
      id: "starter",
      name: "入门套餐",
      price: 10,
      credits: 1000,
      icon: Zap,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      popular: false,
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 flex flex-col">
      {/* Header */}
      <AppHeader
        isLoggedIn={isLoggedIn}
        currentPage="pricing"
        onGoHome={onBack}
        onNewChat={onNewChat}
        onGoToHistory={onGoToHistory}
        onLogin={onLogin}
        onGoToPricing={() => {}}
        onGoToBilling={() => {}}
        onGoToSubscription={() => {}}
        onGoToSettings={() => {}}
      />

      {/* Main Content */}
      <div className="flex-1 py-12">
        <div className="max-w-[1440px] mx-auto px-6">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full mb-6 text-sm font-medium border border-blue-100">
              <Sparkles className="w-4 h-4" />
              灵活的积分套餐
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              选择适合您的套餐
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              按需购买 AI 积分，无需订阅，随时充值随时使用
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
            {plans.map((plan) => {
              const Icon = plan.icon;
              return (
                <div
                  key={plan.id}
                  className={`relative bg-white rounded-2xl border-2 ${
                    selectedPlan === plan.id
                      ? "border-blue-500 shadow-xl shadow-blue-500/20"
                      : plan.borderColor
                  } p-8 hover:shadow-lg transition-all cursor-pointer`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg">
                      最受欢迎
                    </div>
                  )}

                  {/* Icon */}
                  <div
                    className={`w-12 h-12 ${plan.bgColor} rounded-xl flex items-center justify-center mb-6`}
                  >
                    <Icon className={`w-6 h-6 ${plan.iconColor}`} />
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-4xl font-bold text-gray-900">
                      ¥{plan.price}
                    </span>
                    <span className="text-gray-500">一次性付费</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-6">
                    获得 {plan.credits.toLocaleString()} AI 积分
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 text-blue-600" />
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Buy Button */}
                  <Button
                    className={`w-full py-3 rounded-xl font-medium transition-all ${
                      selectedPlan === plan.id
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/30"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      alert(`购买 ${plan.name}：¥${plan.price}`);
                    }}
                  >
                    {selectedPlan === plan.id ? "立即购买" : "选择套餐"}
                  </Button>
                </div>
              );
            })}
          </div>

          {/* Custom Amount Section */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl border-2 border-blue-200 p-8 shadow-lg relative overflow-hidden">
              {/* Decorative gradient background */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-50 -z-0"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-100 to-pink-100 rounded-full blur-3xl opacity-50 -z-0"></div>
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 px-4 py-2 rounded-full mb-3 text-sm font-medium border border-blue-100">
                      <Sparkles className="w-4 h-4" />
                      灵活购买
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">自定义积分购买</h3>
                    <p className="text-gray-600">
                      按需购买，1000 积分起购，满足不同需求
                    </p>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Input Section */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      购买积分数量
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={customAmount}
                        onChange={(e) => {
                          const value = Math.max(1000, parseInt(e.target.value) || 1000);
                          setCustomAmount(value.toString());
                        }}
                        min="1000"
                        step="100"
                        className="w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400 font-semibold text-lg"
                        placeholder="输入积分数量"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                        积分
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-blue-500"></span>
                      最少购买 1000 积分
                    </p>

                    {/* Quick Amount Buttons */}
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">快速选择</p>
                      <div className="flex gap-2">
                        {[2000, 5000, 10000].map((amount) => (
                          <button
                            key={amount}
                            onClick={() => setCustomAmount(amount.toString())}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border-2 ${
                              customAmount === amount.toString()
                                ? "bg-blue-50 border-blue-500 text-blue-700"
                                : "bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                            }`}
                          >
                            {amount.toLocaleString()}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Price Display */}
                  <div className="flex flex-col justify-center">
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-100">
                      <div className="text-center mb-4">
                        <p className="text-sm text-gray-600 mb-2">需要支付</p>
                        <div className="flex items-baseline justify-center gap-2 mb-1">
                          <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            ¥{calculateCustomPrice(parseInt(customAmount) || 1000)}
                          </span>
                          <span className="text-gray-500 font-medium">元</span>
                        </div>
                        <p className="text-sm text-gray-500">人民币</p>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-4 pb-4 border-b border-gray-200">
                        <span>积分单价</span>
                        <span className="font-semibold text-gray-900">¥0.01/积分</span>
                      </div>
                      
                      <div className="bg-white rounded-xl p-3 mb-4 border border-gray-200">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">获得积分</span>
                          <span className="font-bold text-blue-600 text-lg">
                            {parseInt(customAmount).toLocaleString()}
                          </span>
                        </div>
                      </div>
                      
                      <Button
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-xl font-medium shadow-lg shadow-blue-500/30 transition-all"
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
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              常见问题
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  q: "积分如何使用？",
                  a: "每次 AI 对话和视频检索都会消耗相应积分，具体消耗量根据请求复杂度而定。",
                },
                {
                  q: "积分会过期吗？",
                  a: "入门套餐有效期 30 天，专业套餐有效期 90 天，自定义购买有效期 60 天。",
                },
                {
                  q: "支持退款吗？",
                  a: "购买后 7 天内未使用积分可申请全额退款，已使用积分不支持退款。",
                },
                {
                  q: "如何查看余额？",
                  a: "登录后在个人中心或页面右上角可查看当前积分余额和使用记录。",
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-gray-200 p-6"
                >
                  <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-sm text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}