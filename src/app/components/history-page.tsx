import { useState } from "react";
import { ArrowLeft, Clock, MessageSquare, Sparkles, User as UserIcon, History as HistoryIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Video } from "./video-card";
import { Message } from "./chat-panel";
import { ChatPanel } from "./chat-panel";
import { ScrollArea } from "./ui/scroll-area";
import { AppHeader } from "./app-header";

export interface HistorySession {
  id: string;
  video: Video;
  messages: Message[];
  timestamp: Date;
  searchQuery: string;
}

interface HistoryPageProps {
  sessions: HistorySession[];
  onBack: () => void;
  isLoggedIn: boolean;
  onNewChat: () => void;
  onLogin: () => void;
  onGoToPricing?: () => void;
  onGoToBilling?: () => void;
  onGoToSubscription?: () => void;
  onGoToSettings?: () => void;
}

export function HistoryPage({ sessions, onBack, isLoggedIn, onNewChat, onLogin, onGoToPricing, onGoToBilling, onGoToSubscription, onGoToSettings }: HistoryPageProps) {
  const [selectedSession, setSelectedSession] = useState<HistorySession | null>(
    null
  );
  const [currentMessages, setCurrentMessages] = useState<Message[]>([]);

  const handleSessionSelect = (session: HistorySession) => {
    setSelectedSession(session);
    setCurrentMessages(session.messages);
  };

  const handleSendMessage = (content: string) => {
    if (!selectedSession) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content,
      timestamp: new Date(),
    };

    setCurrentMessages((prev) => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: `关于"${content}"，这个视频《${selectedSession.video.title}》提供了详细的讲解。\n\n视频主要涵盖以下内容：\n• ${selectedSession.video.tags.join("、")}\n\n您还想了解视频的哪些方面？`,
        timestamp: new Date(),
      };
      setCurrentMessages((prev) => [...prev, aiMessage]);
    }, 800);
  };

  const handleNewChat = () => {
    if (selectedSession) {
      setCurrentMessages(selectedSession.messages);
    }
  };

  if (selectedSession) {
    return (
      <div className="h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 flex flex-col overflow-hidden">
        {/* Header with AppHeader Component */}
        <AppHeader
          isLoggedIn={isLoggedIn}
          currentPage="history"
          onGoHome={onBack}
          onNewChat={onNewChat}
          onGoToHistory={() => {}}
          onLogin={onLogin}
          onGoToPricing={onGoToPricing || (() => {})}
          onGoToBilling={onGoToBilling || (() => {})}
          onGoToSubscription={onGoToSubscription || (() => {})}
          onGoToSettings={onGoToSettings || (() => {})}
        />

        {/* Split View - Aligned with Header */}
        <div className="flex-1 overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-6 h-full flex gap-6">
            {/* Left: Video Info */}
            <div className="flex-1 overflow-y-auto">
              <div className="py-8">
                <div className="max-w-4xl mx-auto">
                  {/* Video Card */}
                  <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <img
                      src={selectedSession.video.thumbnail}
                      alt={selectedSession.video.title}
                      className="w-full h-96 object-cover"
                    />
                    <div className="p-6">
                      <h2 className="text-3xl font-bold mb-4 text-gray-900">
                        {selectedSession.video.title}
                      </h2>
                      <div className="flex items-center gap-6 mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">讲师</p>
                            <p className="font-medium text-gray-900">
                              {selectedSession.video.author}
                            </p>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">时长</p>
                          <p className="font-medium text-gray-900">
                            {selectedSession.video.duration}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">评分</p>
                          <p className="font-medium text-gray-900">
                            ⭐ {selectedSession.video.rating}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {selectedSession.video.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-500 mb-1">搜索关键词</p>
                            <p className="font-medium text-gray-900">
                              {selectedSession.searchQuery}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500 mb-1">搜索时间</p>
                            <p className="font-medium text-gray-900">
                              {selectedSession.timestamp.toLocaleString("zh-CN")}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Chat Panel */}
            <div className="w-[580px] shrink-0">
              <ChatPanel
                onSendMessage={handleSendMessage}
                onNewChat={handleNewChat}
                messages={currentMessages}
                showNewChatButton={false}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50">
      {/* Header with AppHeader Component */}
      <div className="sticky top-0 z-50">
        <AppHeader
          isLoggedIn={isLoggedIn}
          currentPage="history"
          onGoHome={onBack}
          onNewChat={onNewChat}
          onGoToHistory={() => {}}
          onLogin={onLogin}
          onGoToPricing={onGoToPricing}
          onGoToBilling={onGoToBilling}
          onGoToSubscription={onGoToSubscription}
          onGoToSettings={onGoToSettings}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-10">
        <div className="max-w-6xl mx-auto">
          {sessions.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500">暂无历史记录</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-6">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  onClick={() => handleSessionSelect(session)}
                  className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all cursor-pointer overflow-hidden border border-gray-100 hover:border-blue-200"
                >
                  <img
                    src={session.video.thumbnail}
                    alt={session.video.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-5">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                      {session.video.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {session.video.author}
                    </p>
                    <div className="space-y-2 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>
                          {session.timestamp.toLocaleDateString("zh-CN")}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        <span>{session.messages.length} 条对话</span>
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                      搜索：{session.searchQuery}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}