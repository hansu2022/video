import { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Bell,
  Globe,
  Shield,
  Palette,
  Database,
  HelpCircle,
  LogOut,
  Camera,
  Eye,
  EyeOff,
} from "lucide-react";
import { AppHeader } from "./app-header";
import { Button } from "./ui/button";

interface SettingsPageProps {
  onBack: () => void;
  isLoggedIn: boolean;
  onNewChat: () => void;
  onGoToHistory: () => void;
  onLogin: () => void;
  onLogout: () => void;
}

export function SettingsPage({
  onBack,
  isLoggedIn,
  onNewChat,
  onGoToHistory,
  onLogin,
  onLogout,
}: SettingsPageProps) {
  const [activeTab, setActiveTab] = useState<
    "profile" | "security" | "notifications" | "preferences"
  >("profile");

  // Profile State
  const [name, setName] = useState("张三");
  const [email, setEmail] = useState("zhangsan@example.com");
  const [bio, setBio] = useState("AI 视频学习爱好者");

  // Security State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  // Notification State
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  // Preferences State
  const [language, setLanguage] = useState("zh-CN");
  const [theme, setTheme] = useState("light");
  const [autoPlay, setAutoPlay] = useState(true);

  const tabs = [
    { id: "profile", label: "个人资料", icon: User },
    { id: "security", label: "安全设置", icon: Shield },
    { id: "notifications", label: "通知设置", icon: Bell },
    { id: "preferences", label: "偏好设置", icon: Palette },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 flex flex-col">
      {/* Header */}
      <AppHeader
        isLoggedIn={isLoggedIn}
        currentPage="settings"
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">设置</h1>
            <p className="text-gray-600">管理您的账户设置和偏好</p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sticky top-24">
                <nav className="space-y-1">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${
                          activeTab === tab.id
                            ? "bg-blue-50 text-blue-600 font-medium"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}

                  <div className="pt-4 mt-4 border-t border-gray-200">
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left text-gray-700 hover:bg-gray-50">
                      <HelpCircle className="w-5 h-5" />
                      <span>帮助中心</span>
                    </button>
                    <button
                      onClick={onLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>退出登录</span>
                    </button>
                  </div>
                </nav>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
                {/* Profile Tab */}
                {activeTab === "profile" && (
                  <div className="p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      个人资料
                    </h2>

                    {/* Avatar */}
                    <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-200">
                      <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white text-3xl font-bold">
                          张
                        </div>
                        <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                          <Camera className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          头像照片
                        </h3>
                        <p className="text-sm text-gray-500 mb-3">
                          推荐尺寸 400x400，支持 JPG、PNG 格式
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-300"
                        >
                          上传新头像
                        </Button>
                      </div>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-6">
                      {/* Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          姓名
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          邮箱地址
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          更改邮箱需要验证新邮箱地址
                        </p>
                      </div>

                      {/* Bio */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          个人简介
                        </label>
                        <textarea
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                          placeholder="介绍一下自己..."
                        />
                      </div>

                      {/* Save Button */}
                      <div className="flex justify-end gap-3 pt-4">
                        <Button variant="outline" className="border-gray-300">
                          取消
                        </Button>
                        <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white">
                          保存更改
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Security Tab */}
                {activeTab === "security" && (
                  <div className="p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      安全设置
                    </h2>

                    {/* Change Password */}
                    <div className="mb-8 pb-8 border-b border-gray-200">
                      <h3 className="font-semibold text-gray-900 mb-4">
                        修改密码
                      </h3>
                      <div className="space-y-4">
                        {/* Current Password */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            当前密码
                          </label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type={showCurrentPassword ? "text" : "password"}
                              value={currentPassword}
                              onChange={(e) =>
                                setCurrentPassword(e.target.value)
                              }
                              className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setShowCurrentPassword(!showCurrentPassword)
                              }
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showCurrentPassword ? (
                                <EyeOff className="w-5 h-5" />
                              ) : (
                                <Eye className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* New Password */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            新密码
                          </label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type={showNewPassword ? "text" : "password"}
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setShowNewPassword(!showNewPassword)
                              }
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showNewPassword ? (
                                <EyeOff className="w-5 h-5" />
                              ) : (
                                <Eye className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            确认新密码
                          </label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="password"
                              value={confirmPassword}
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                          </div>
                        </div>

                        <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white">
                          更新密码
                        </Button>
                      </div>
                    </div>

                    {/* Two-Factor Authentication */}
                    <div className="mb-8 pb-8 border-b border-gray-200">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">
                            双重认证
                          </h3>
                          <p className="text-sm text-gray-600">
                            为您的账户添加额外的安全保护
                          </p>
                        </div>
                        <button
                          onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                          className={`relative w-11 h-6 rounded-full transition-colors ${
                            twoFactorEnabled ? "bg-blue-600" : "bg-gray-300"
                          }`}
                        >
                          <div
                            className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                              twoFactorEnabled
                                ? "translate-x-5"
                                : "translate-x-0.5"
                            }`}
                          ></div>
                        </button>
                      </div>
                      {twoFactorEnabled && (
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                          <p className="text-sm text-blue-900">
                            双重认证已启用。登录时需要输入验证码。
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Active Sessions */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">
                        活动会话
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                              <Globe className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 text-sm">
                                当前设备 - Chrome on macOS
                              </p>
                              <p className="text-xs text-gray-500">
                                上海, 中国 • 活跃中
                              </p>
                            </div>
                          </div>
                          <div className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                            当前
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Notifications Tab */}
                {activeTab === "notifications" && (
                  <div className="p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      通知设置
                    </h2>

                    <div className="space-y-6">
                      {/* Email Notifications */}
                      <div className="flex items-center justify-between py-4 border-b border-gray-200">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                            <Mail className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              邮件通知
                            </p>
                            <p className="text-sm text-gray-600">
                              接收账户活动和更新通知
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            setEmailNotifications(!emailNotifications)
                          }
                          className={`relative w-11 h-6 rounded-full transition-colors ${
                            emailNotifications ? "bg-blue-600" : "bg-gray-300"
                          }`}
                        >
                          <div
                            className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                              emailNotifications
                                ? "translate-x-5"
                                : "translate-x-0.5"
                            }`}
                          ></div>
                        </button>
                      </div>

                      {/* Push Notifications */}
                      <div className="flex items-center justify-between py-4 border-b border-gray-200">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                            <Bell className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              推送通知
                            </p>
                            <p className="text-sm text-gray-600">
                              接收实时推送提醒
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            setPushNotifications(!pushNotifications)
                          }
                          className={`relative w-11 h-6 rounded-full transition-colors ${
                            pushNotifications ? "bg-blue-600" : "bg-gray-300"
                          }`}
                        >
                          <div
                            className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                              pushNotifications
                                ? "translate-x-5"
                                : "translate-x-0.5"
                            }`}
                          ></div>
                        </button>
                      </div>

                      {/* Marketing Emails */}
                      <div className="flex items-center justify-between py-4 border-b border-gray-200">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                            <Mail className="w-5 h-5 text-orange-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              营销邮件
                            </p>
                            <p className="text-sm text-gray-600">
                              接收产品更新和优惠信息
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => setMarketingEmails(!marketingEmails)}
                          className={`relative w-11 h-6 rounded-full transition-colors ${
                            marketingEmails ? "bg-blue-600" : "bg-gray-300"
                          }`}
                        >
                          <div
                            className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                              marketingEmails
                                ? "translate-x-5"
                                : "translate-x-0.5"
                            }`}
                          ></div>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Preferences Tab */}
                {activeTab === "preferences" && (
                  <div className="p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      偏好设置
                    </h2>

                    <div className="space-y-8">
                      {/* Language */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          语言设置
                        </label>
                        <select
                          value={language}
                          onChange={(e) => setLanguage(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="zh-CN">简体中文</option>
                          <option value="zh-TW">繁体中文</option>
                          <option value="en">English</option>
                        </select>
                      </div>

                      {/* Theme */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          主题设置
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { value: "light", label: "浅色" },
                            { value: "dark", label: "深色" },
                            { value: "auto", label: "跟随系统" },
                          ].map((option) => (
                            <button
                              key={option.value}
                              onClick={() => setTheme(option.value)}
                              className={`p-4 border-2 rounded-xl transition-all ${
                                theme === option.value
                                  ? "border-blue-500 bg-blue-50"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <p className="font-medium text-gray-900 text-sm">
                                {option.label}
                              </p>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Auto Play */}
                      <div className="flex items-center justify-between py-4 border-t border-gray-200">
                        <div>
                          <p className="font-medium text-gray-900">视频自动播放</p>
                          <p className="text-sm text-gray-600">
                            打开视频详情页时自动播放
                          </p>
                        </div>
                        <button
                          onClick={() => setAutoPlay(!autoPlay)}
                          className={`relative w-11 h-6 rounded-full transition-colors ${
                            autoPlay ? "bg-blue-600" : "bg-gray-300"
                          }`}
                        >
                          <div
                            className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                              autoPlay ? "translate-x-5" : "translate-x-0.5"
                            }`}
                          ></div>
                        </button>
                      </div>

                      {/* Data & Storage */}
                      <div className="pt-4 border-t border-gray-200">
                        <h3 className="font-semibold text-gray-900 mb-4">
                          数据与存储
                        </h3>
                        <div className="space-y-3">
                          <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-3">
                              <Database className="w-5 h-5 text-gray-600" />
                              <span className="text-gray-900">清除缓存</span>
                            </div>
                            <span className="text-sm text-gray-500">
                              128 MB
                            </span>
                          </button>
                          <button className="w-full flex items-center justify-between p-4 border border-red-200 rounded-xl hover:bg-red-50 transition-colors text-red-600">
                            <div className="flex items-center gap-3">
                              <Database className="w-5 h-5" />
                              <span>删除所有数据</span>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}