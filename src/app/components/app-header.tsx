import { useState } from "react";
import {
  MessageSquare,
  History,
  User,
  ChevronDown,
  CreditCard,
  Settings,
  FileText,
} from "lucide-react";
import { Button } from "./ui/button";

interface AppHeaderProps {
  isLoggedIn: boolean;
  currentPage?: "home" | "history" | "video" | "search" | "pricing" | "billing" | "subscription" | "settings";
  onGoHome: () => void;
  onNewChat?: () => void;
  onGoToHistory?: () => void;
  onLogin: () => void;
  onGoToPricing?: () => void;
  onGoToBilling?: () => void;
  onGoToSubscription?: () => void;
  onGoToSettings?: () => void;
}

export function AppHeader({
  isLoggedIn,
  currentPage = "home",
  onGoHome,
  onNewChat,
  onGoToHistory,
  onLogin,
  onGoToPricing,
  onGoToBilling,
  onGoToSubscription,
  onGoToSettings,
}: AppHeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="shrink-0 py-3">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="bg-white/70 backdrop-blur-xl border border-white/20 shadow-lg shadow-gray-200/50 rounded-full px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Left: Logo */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-xs">R</span>
                </div>
                <span className="font-semibold text-gray-900 text-sm">
                  RISC-V大模型视频问答系统
                </span>
              </div>
            </div>

            {/* Center: Navigation */}
            <nav className="flex items-center gap-1">
              <button
                onClick={onGoHome}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  currentPage === "home"
                    ? "text-blue-600 bg-blue-50 hover:bg-blue-100"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                主页
              </button>
              <button
                onClick={onGoToPricing}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
              >
                定价
              </button>

              {isLoggedIn && (
                <>
                  <div className="w-px h-5 bg-gray-300 mx-2" />
                  {onNewChat && (
                    <button
                      onClick={onNewChat}
                      className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors flex items-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      新对话
                    </button>
                  )}
                  {onGoToHistory && (
                    <button
                      onClick={onGoToHistory}
                      className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors flex items-center gap-2"
                    >
                      <History className="w-4 h-4" />
                      历史记录
                    </button>
                  )}
                </>
              )}
            </nav>

            {/* Right: Auth */}
            <div className="flex items-center gap-2 relative">
              {!isLoggedIn ? (
                <>
                  <Button
                    onClick={onLogin}
                    variant="ghost"
                    size="sm"
                    className="rounded-full text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  >
                    登录
                  </Button>
                  <Button
                    onClick={onLogin}
                    size="sm"
                    className="rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                  >
                    注册
                  </Button>
                </>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 rounded-full hover:bg-gray-100 transition-colors pl-1 pr-3 py-1"
                  >
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-md">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-600 transition-transform ${
                        showUserMenu ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {showUserMenu && (
                    <>
                      {/* Backdrop */}
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setShowUserMenu(false)}
                      />
                      
                      {/* Menu */}
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden z-50">
                        <div className="py-2">
                          <button
                            onClick={() => {
                              setShowUserMenu(false);
                              onGoToBilling?.();
                            }}
                            className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 text-sm text-gray-700"
                          >
                            <CreditCard className="w-4 h-4 text-gray-500" />
                            <span>账单详情</span>
                          </button>
                          <button
                            onClick={() => {
                              setShowUserMenu(false);
                              onGoToSubscription?.();
                            }}
                            className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 text-sm text-gray-700"
                          >
                            <FileText className="w-4 h-4 text-gray-500" />
                            <span>订阅管理</span>
                          </button>
                          <button
                            onClick={() => {
                              setShowUserMenu(false);
                              onGoToSettings?.();
                            }}
                            className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 text-sm text-gray-700"
                          >
                            <Settings className="w-4 h-4 text-gray-500" />
                            <span>设置</span>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}