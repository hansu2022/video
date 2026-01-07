import { useState } from "react";
import {
  CreditCard,
  Download,
  Calendar,
  Wallet,
  TrendingUp,
  ChevronRight,
} from "lucide-react";
import { AppHeader } from "./app-header";
import { Button } from "./ui/button";

interface BillingPageProps {
  onBack: () => void;
  isLoggedIn: boolean;
  onNewChat: () => void;
  onGoToHistory: () => void;
  onLogin: () => void;
}

interface Transaction {
  id: string;
  date: string;
  type: "purchase" | "usage";
  description: string;
  credits: number;
  amount?: number;
  status: "completed" | "pending" | "failed";
}

export function BillingPage({
  onBack,
  isLoggedIn,
  onNewChat,
  onGoToHistory,
  onLogin,
}: BillingPageProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<"all" | "month" | "week">("all");

  const mockTransactions: Transaction[] = [
    {
      id: "1",
      date: "2024-12-17 14:30",
      type: "purchase",
      description: "专业套餐 - 3000积分",
      credits: 3000,
      amount: 20,
      status: "completed",
    },
    {
      id: "2",
      date: "2024-12-17 10:15",
      type: "usage",
      description: "AI视频检索 - Transformer架构",
      credits: -50,
      status: "completed",
    },
    {
      id: "3",
      date: "2024-12-16 16:45",
      type: "usage",
      description: "深度对话 - 深度学习相关",
      credits: -80,
      status: "completed",
    },
    {
      id: "4",
      date: "2024-12-15 09:20",
      type: "purchase",
      description: "入门套餐 - 1000积分",
      credits: 1000,
      amount: 10,
      status: "completed",
    },
    {
      id: "5",
      date: "2024-12-15 08:30",
      type: "usage",
      description: "视频推荐 - AI应用案例",
      credits: -30,
      status: "completed",
    },
    {
      id: "6",
      date: "2024-12-14 20:10",
      type: "usage",
      description: "AI对话 - GPT-4架构讲解",
      credits: -60,
      status: "completed",
    },
  ];

  const totalSpent = mockTransactions
    .filter((t) => t.type === "purchase")
    .reduce((sum, t) => sum + (t.amount || 0), 0);

  const totalCreditsUsed = mockTransactions
    .filter((t) => t.type === "usage")
    .reduce((sum, t) => sum + Math.abs(t.credits), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 flex flex-col">
      {/* Header */}
      <AppHeader
        isLoggedIn={isLoggedIn}
        currentPage="billing"
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
      <div className="flex-1 py-8">
        <div className="max-w-[1440px] mx-auto px-6">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">账单详情</h1>
            <p className="text-gray-600">查看您的消费记录和积分使用情况</p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Current Balance */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-blue-100 text-sm mb-1">当前余额</p>
                  <p className="text-3xl font-bold">3,770</p>
                  <p className="text-blue-100 text-sm mt-1">AI 积分</p>
                </div>
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <Wallet className="w-5 h-5" />
                </div>
              </div>
              <div className="pt-4 border-t border-white/20">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-blue-100">有效期至</span>
                  <span className="font-medium">2025-03-17</span>
                </div>
              </div>
            </div>

            {/* Total Spent */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm mb-1">累计消费</p>
                  <p className="text-3xl font-bold text-gray-900">¥{totalSpent}</p>
                  <p className="text-gray-500 text-sm mt-1">人民币</p>
                </div>
                <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-purple-600" />
                </div>
              </div>
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-gray-600">较上月增长 15%</span>
                </div>
              </div>
            </div>

            {/* Credits Used */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm mb-1">已使用积分</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {totalCreditsUsed.toLocaleString()}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">本月</p>
                </div>
                <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                </div>
              </div>
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">平均每天</span>
                  <span className="font-medium text-gray-900">~13 积分</span>
                </div>
              </div>
            </div>
          </div>

          {/* Transactions Section */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    交易记录
                  </h2>
                  <p className="text-sm text-gray-600">
                    共 {mockTransactions.length} 条记录
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {/* Period Filter */}
                  <div className="flex items-center gap-2">
                    {[
                      { value: "all", label: "全部" },
                      { value: "month", label: "本月" },
                      { value: "week", label: "本周" },
                    ].map((period) => (
                      <button
                        key={period.value}
                        onClick={() => setSelectedPeriod(period.value as any)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          selectedPeriod === period.value
                            ? "bg-blue-50 text-blue-600 border border-blue-200"
                            : "text-gray-600 hover:bg-gray-50 border border-gray-200"
                        }`}
                      >
                        {period.label}
                      </button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    className="gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    <Download className="w-4 h-4" />
                    导出
                  </Button>
                </div>
              </div>
            </div>

            {/* Transaction List */}
            <div className="divide-y divide-gray-100">
              {mockTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="p-6 hover:bg-gray-50 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Icon */}
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          transaction.type === "purchase"
                            ? "bg-green-50"
                            : "bg-blue-50"
                        }`}
                      >
                        {transaction.type === "purchase" ? (
                          <Wallet className="w-6 h-6 text-green-600" />
                        ) : (
                          <TrendingUp className="w-6 h-6 text-blue-600" />
                        )}
                      </div>

                      {/* Info */}
                      <div>
                        <p className="font-medium text-gray-900 mb-1">
                          {transaction.description}
                        </p>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {transaction.date}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              transaction.status === "completed"
                                ? "bg-green-100 text-green-700"
                                : transaction.status === "pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {transaction.status === "completed"
                              ? "已完成"
                              : transaction.status === "pending"
                              ? "处理中"
                              : "失败"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Amount */}
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p
                          className={`text-lg font-bold ${
                            transaction.type === "purchase"
                              ? "text-green-600"
                              : "text-gray-900"
                          }`}
                        >
                          {transaction.credits > 0 ? "+" : ""}
                          {transaction.credits.toLocaleString()} 积分
                        </p>
                        {transaction.amount && (
                          <p className="text-sm text-gray-500">
                            ¥{transaction.amount}
                          </p>
                        )}
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="p-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">显示 1-6 条，共 6 条记录</p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled
                    className="border-gray-300"
                  >
                    上一页
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled
                    className="border-gray-300"
                  >
                    下一页
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}