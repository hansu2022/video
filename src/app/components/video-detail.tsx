import { ArrowLeft, RefreshCw, MessageSquare, History, User, Play, Eye, Calendar } from "lucide-react";
import { Video } from "./video-card";
import { ChatPanel, Message } from "./chat-panel";
import { Button } from "./ui/button";
import { AppHeader } from "./app-header";

interface VideoDetailProps {
  video: Video;
  onBack: () => void;
  messages: Message[];
  onSendMessage: (content: string) => void;
  onNewChat: () => void;
  isLoggedIn: boolean;
  onGoToHistory: () => void;
  showBackToResults?: boolean;
  onGoToHome: () => void;
}

export function VideoDetail({
  video,
  onBack,
  messages,
  onSendMessage,
  onNewChat,
  isLoggedIn,
  onGoToHistory,
  showBackToResults,
  onGoToHome,
}: VideoDetailProps) {
  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 flex flex-col overflow-hidden">
      {/* Header with AppHeader Component */}
      <AppHeader
        isLoggedIn={isLoggedIn}
        currentPage="video"
        onGoHome={onGoToHome}
        onNewChat={onNewChat}
        onGoToHistory={onGoToHistory}
        onLogin={() => {}}
      />

      {/* Split View - Aligned with Header */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 h-full flex gap-6">
          {/* Left: Video Player & Details */}
          <div className="flex-1 overflow-y-auto">
            <div className="py-8 space-y-6">
              {/* Back and Refresh Buttons - Symmetric Layout */}
              <div className="flex items-center justify-between mb-2">
                {/* Left: Back Button */}
                <button
                  onClick={onBack}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center group-hover:border-blue-500 group-hover:bg-blue-50 transition-all">
                    <ArrowLeft className="w-4 h-4 group-hover:text-blue-600" />
                  </div>
                  <span className="text-sm font-medium">
                    {showBackToResults ? '返回搜索结果' : '返回主页'}
                  </span>
                </button>

                {/* Right: Refresh Button */}
                <button
                  onClick={() => window.location.reload()}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
                >
                  <span className="text-sm font-medium">
                    刷新视频
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center group-hover:border-green-500 group-hover:bg-green-50 transition-all">
                    <RefreshCw className="w-4 h-4 group-hover:text-green-600 group-hover:rotate-180 transition-all duration-500" />
                  </div>
                </button>
              </div>

              {/* Video Player */}
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="relative aspect-video bg-gray-900 group cursor-pointer">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                    <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-10 h-10 text-blue-600 ml-1" fill="currentColor" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Info */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {video.title}
                </h1>

                {/* Author & Stats */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {video.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {video.author}
                      </p>
                      <p className="text-sm text-gray-500">AI Research Scientist</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      <span>12.5k 观看</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>2024.05.20</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-500">⭐</span>
                      <span className="font-medium">{video.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 py-4 border-b border-gray-100">
                  {video.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <div className="pt-4">
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">
                    内容简介
                  </h2>
                  <div className="prose prose-sm max-w-none text-gray-600">
                    <p className="mb-3">
                      本次课程深入剖析了大语言模型在特定领域应用的微调策略。专家详细分析了数据配比、LoRA技术在自然语言处理下的应用、以及如何评估微调模型的优化空间。
                    </p>
                    <p className="mb-3">
                      课程涵盖了包含多案例分析与实践参考，建议中高级AI爱好者与工程师参考。
                    </p>
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mt-4">
                      <p className="text-sm text-blue-900 font-medium mb-2">
                        💡 您可以通过右侧 AI 助手询问：
                      </p>
                      <ul className="text-sm text-blue-800 space-y-1 ml-4">
                        <li>• 总结个不懂的部分的核心观点</li>
                        <li>• 讲解某段具体内容的意思</li>
                        <li>• 请推荐相关的扩展阅读材料</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Chat Panel */}
          <div className="w-[580px] shrink-0">
            <ChatPanel
              onSendMessage={onSendMessage}
              onNewChat={onNewChat}
              messages={messages}
              showNewChatButton={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}