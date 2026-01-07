import { useState, useEffect } from "react";
import {
  Search,
  Sparkles,
  RefreshCw,
  ArrowUp,
} from "lucide-react";
import { Button } from "./components/ui/button";
import { VideoCard, Video } from "./components/video-card";
import { ChatPanel, Message } from "./components/chat-panel";
import { VideoDetail } from "./components/video-detail";
import { HistoryPage, HistorySession } from "./components/history-page";
import { AppHeader } from "./components/app-header";
import { LoginPage } from "./components/login-page";
import { RegisterPage } from "./components/register-page";
import { PricingPage } from "./components/pricing-page";
import { BillingPage } from "./components/billing-page";
import { SubscriptionPage } from "./components/subscription-page";
import { SettingsPage } from "./components/settings-page";

// Mock data
const mockVideos: Video[] = [
  {
    id: "1",
    title: "Transformer 架构深度解析与实际应用案例",
    author: "Andrej Karpathy",
    rating: 9.4,
    duration: "12:30",
    thumbnail:
      "https://images.unsplash.com/photo-1751448582395-27fc57293f1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwY29uY2VwdHxlbnwxfHx8fDE3NjU3NTUyNzF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["AI架构", "深度学习", "Transformer"],
    category: "AI技术",
    matchedSegments: 3,
  },
  {
    id: "2",
    title: "大型语言模型(LLM)微调与战略指南",
    author: "Yann LeCun",
    rating: 9.4,
    duration: "15:20",
    thumbnail:
      "https://images.unsplash.com/photo-1707301280425-475534ec3cc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBwcmVzZW50YXRpb258ZW58MXx8fHwxNzY1NzU1MDc1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["LLM", "微调", "机器学习"],
    category: "AI技术",
    matchedSegments: 5,
  },
  {
    id: "3",
    title: "多模态生成式AI助理构建的创新方法",
    author: "Andrew Ng",
    rating: 9.4,
    duration: "18:45",
    thumbnail:
      "https://images.unsplash.com/photo-1762968286778-60e65336d5ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwY29uZmVyZW5jZSUyMHNwZWFrZXJ8ZW58MXx8fHwxNzY1ODUwNjUwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["多模态", "生成式AI", "AI助理"],
    category: "AI应用",
    matchedSegments: 4,
  },
  {
    id: "4",
    title: "AI Agent 在企业级应用中的实战经验",
    author: "Jeff Dean",
    rating: 9.4,
    duration: "14:10",
    thumbnail:
      "https://images.unsplash.com/photo-1744782211816-c5224434614f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHlzaXMlMjB2aXN1YWxpemF0aW9ufGVufDF8fHx8MTc2NTg1MDY1MHww&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["AI Agent", "企业应用", "自动化"],
    category: "行业实践",
    matchedSegments: 2,
  },
  {
    id: "5",
    title: "自动驾驶智能增强视觉算法知识图谱",
    author: "Fei-Fei Li",
    rating: 9.4,
    duration: "16:30",
    thumbnail:
      "https://images.unsplash.com/photo-1531498860502-7c67cf02f657?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGRldmVsb3BtZW50JTIwY29kaW5nfGVufDF8fHx8MTc2NTc3ODIxNHww&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["自动驾驶", "计算机视觉", "知识图谱"],
    category: "前沿技术",
    matchedSegments: 6,
  },
  {
    id: "6",
    title: "Rust 语言在高性能AI计算中的实践",
    author: "Andrej Karpathy",
    rating: 9.4,
    duration: "13:25",
    thumbnail:
      "https://images.unsplash.com/photo-1644325349124-d1756b79dd42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwdHJhbnNmb3JtYXRpb258ZW58MXx8fHwxNzY1ODUwNjUxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["Rust", "高性能计算", "AI系统"],
    category: "编程语言",
    matchedSegments: 3,
  },
  {
    id: "7",
    title: "深度学习在医疗AI影像诊断中的应用",
    author: "Yoshua Bengio",
    rating: 9.2,
    duration: "17:50",
    thumbnail:
      "https://images.unsplash.com/photo-1751448582395-27fc57293f1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwY29uY2VwdHxlbnwxfHx8fDE3NjU3NTUyNzF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["医疗AI", "影像识别", "深度学习"],
    category: "AI应用",
    matchedSegments: 4,
  },
  {
    id: "8",
    title: "强化学习在游戏AI中的突破性进展",
    author: "Demis Hassabis",
    rating: 9.6,
    duration: "20:15",
    thumbnail:
      "https://images.unsplash.com/photo-1707301280425-475534ec3cc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBwcmVzZW50YXRpb258ZW58MXx8fHwxNzY1NzU1MDc1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["强化学习", "游戏AI", "AlphaGo"],
    category: "AI技术",
    matchedSegments: 7,
  },
  {
    id: "9",
    title: "GPT-4 架构解析与提示工程实战",
    author: "Sam Altman",
    rating: 9.8,
    duration: "22:40",
    thumbnail:
      "https://images.unsplash.com/photo-1762968286778-60e65336d5ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwY29uZmVyZW5jZSUyMHNwZWFrZXJ8ZW58MXx8fHwxNzY1ODUwNjUwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["GPT-4", "提示工程", "AI模型"],
    category: "AI技术",
    matchedSegments: 8,
  },
  {
    id: "10",
    title: "AI驱动的代码生成工具开发指南",
    author: "GitHub Copilot Team",
    rating: 9.3,
    duration: "19:20",
    thumbnail:
      "https://images.unsplash.com/photo-1744782211816-c5224434614f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHlzaXMlMjB2aXN1YWxpemF0aW9ufGVufDF8fHx8MTc2NTg1MDY1MHww&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["代码生成", "AI工具", "开发效率"],
    category: "AI应用",
    matchedSegments: 5,
  },
  {
    id: "11",
    title: "神经网络优化与AI模型压缩技术",
    author: "Song Han",
    rating: 9.1,
    duration: "16:55",
    thumbnail:
      "https://images.unsplash.com/photo-1531498860502-7c67cf02f657?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGRldmVsb3BtZW50JTIwY29kaW5nfGVufDF8fHx8MTc2NTc3ODIxNHww&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["模型压缩", "神经网络", "AI优化"],
    category: "AI技术",
    matchedSegments: 4,
  },
  {
    id: "12",
    title: "对话式AI系统设计与用户体验优化",
    author: "Percy Liang",
    rating: 9.5,
    duration: "21:10",
    thumbnail:
      "https://images.unsplash.com/photo-1644325349124-d1756b79dd42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwdHJhbnNmb3JtYXRpb258ZW58MXx8fHwxNzY1ODUwNjUxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["对话AI", "用户体验", "AI交互"],
    category: "AI应用",
    matchedSegments: 6,
  },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<
    | "home"
    | "history"
    | "video"
    | "login"
    | "register"
    | "pricing"
    | "billing"
    | "subscription"
    | "settings"
  >("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredVideos, setFilteredVideos] = useState<Video[]>(mockVideos);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content:
        "您好！我是您的AI视频助手。您可以直接搜键词，或者告诉我您想了解什么内容，我会为您推荐相关视频。",
      timestamp: new Date(),
    },
  ]);
  const [historySessions, setHistorySessions] = useState<HistorySession[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fromSearchResults, setFromSearchResults] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchMode, setSearchMode] = useState<"ai" | "keyword">("ai"); // AI智能搜索 or 关键词匹配

  useEffect(() => {
    // Filter videos based on search query
    if (searchQuery.trim()) {
      const filtered = mockVideos.filter(
        (video) =>
          video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          video.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          video.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          ) ||
          video.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredVideos(filtered);
    } else {
      setFilteredVideos(mockVideos);
    }
  }, [searchQuery]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setShowSearchResults(true);
      setIsAIOpen(true);

      // Add user search query as a message
      const userMessage: Message = {
        id: Date.now().toString(),
        type: "user",
        content: searchQuery,
        timestamp: new Date(),
      };

      // Add AI response
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: `为您找到 ${filteredVideos.length} 个与"${searchQuery}"相关的视频。这些视频涵盖了${searchQuery}的多个方面。您可以点击视频卡片查看详情，或继续询问我更多问题。`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage, aiMessage]);

      // Save to history
      if (filteredVideos.length > 0) {
        const session: HistorySession = {
          id: Date.now().toString(),
          video: filteredVideos[0],
          messages: [...messages, userMessage, aiMessage],
          timestamp: new Date(),
          searchQuery: searchQuery,
        };
        setHistorySessions((prev) => [session, ...prev]);
      }
    }
  };

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
    setCurrentPage("video");
    setIsAIOpen(true);
    // 记录是否从搜索结果页进入
    setFromSearchResults(showSearchResults);

    const newMessage: Message = {
      id: Date.now().toString(),
      type: "ai",
      content: `您选择了视频《${video.title}》。\n\n视频信息：\n- 时长：${video.duration}\n- 讲师：${video.author}\n- 评分：${video.rating}\n- 主题：${video.tags.join("、")}\n\n这个视频主要讨论了${video.category}相关的内容。您想了解视频的哪个部分？`,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content,
      timestamp: new Date(),
    };

    // Add user message immediately
    setMessages((prev) => [...prev, userMessage]);

    // Simulate AI response based on message content
    setTimeout(() => {
      let aiContent = "";
      const lowerContent = content.toLowerCase();

      // First, try to search for videos based on the content
      const searchResults = mockVideos.filter(
        (video) =>
          video.title.toLowerCase().includes(lowerContent) ||
          video.author.toLowerCase().includes(lowerContent) ||
          video.tags.some((tag) =>
            tag.toLowerCase().includes(lowerContent)
          ) ||
          video.category.toLowerCase().includes(lowerContent)
      );

      // If videos are found, update the display and inform the user
      if (searchResults.length > 0) {
        setFilteredVideos(searchResults);
        setShowSearchResults(true);
        setSearchQuery(content);
        
        aiContent = `我为您找到了 ${searchResults.length} 个关于"${content}"的视频：\n\n`;
        
        // List the top 3 videos
        searchResults.slice(0, 3).forEach((video, index) => {
          aiContent += `${index + 1}. 《${video.title}》\n   讲师：${video.author} | 评分：${video.rating}\n\n`;
        });
        
        if (searchResults.length > 3) {
          aiContent += `还有 ${searchResults.length - 3} 个相关视频，您可以在下方查看全部结果。\n\n`;
        }
        
        aiContent += "点击任意视频卡片可以查看详细介绍。您还想了解什么？";

        // Save to history for AI assistant searches
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          type: "ai",
          content: aiContent,
          timestamp: new Date(),
        };
        
        const session: HistorySession = {
          id: Date.now().toString(),
          video: searchResults[0],
          messages: [...messages, userMessage, aiResponse],
          timestamp: new Date(),
          searchQuery: content,
        };
        setHistorySessions((prev) => [session, ...prev]);
      } else if (
        lowerContent.includes("介绍") ||
        lowerContent.includes("讲解") ||
        lowerContent.includes("内容")
      ) {
        aiContent =
          "这个视频详细介绍了相关技术的核心概念和实践应用。主要分为以下几个部分：\n\n1. 基础概念讲解（00:00-05:00）\n2. 技术原理深入分析（05:00-10:00）\n3. 实战案例演示（10:00-15:00）\n4. 常见问题解答（15:00-结束）\n\n您对哪个部分特别感兴趣？";
      } else {
        // No videos found
        aiContent = `抱歉，我没有找到关于"${content}"的相关视频。\n\n您可以尝试：\n 使用其他关键词搜索，如"深度学习"、"AI应用"\n• 浏览热门推荐视频\n• 点击"换一批"发现更多内容\n\n还有什么我可以帮您的吗？`;
      }

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: aiContent,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 800);
  };

  const handleRefresh = () => {
    setFilteredVideos([...mockVideos].sort(() => Math.random() - 0.5));
  };

  const handleNewChat = () => {
    // Save current conversation to history if it has user messages
    const hasUserMessages = messages.some((msg) => msg.type === "user");
    if (hasUserMessages && filteredVideos.length > 0) {
      const session: HistorySession = {
        id: Date.now().toString(),
        video: filteredVideos[0],
        messages: messages,
        timestamp: new Date(),
        searchQuery: searchQuery || "对话记录",
      };
      setHistorySessions((prev) => [session, ...prev]);
    }

    // Reset to initial state
    setMessages([
      {
        id: "1",
        type: "ai",
        content:
          "您好！我是您的AI视频助手。您可以直接搜索关键词，或者告诉我您想了解什么内容，我会为您推荐相关视频。",
        timestamp: new Date(),
      },
    ]);
    setSearchQuery("");
    setFilteredVideos(mockVideos);
    setShowSearchResults(false);
    setIsAIOpen(false);
    setCurrentPage("home");
  };

  // Login Page
  if (currentPage === "login") {
    return (
      <LoginPage
        onBack={() => setCurrentPage("home")}
        onLogin={() => {
          setIsLoggedIn(true);
          setCurrentPage("home");
        }}
        onSwitchToRegister={() => setCurrentPage("register")}
      />
    );
  }

  // Register Page
  if (currentPage === "register") {
    return (
      <RegisterPage
        onBack={() => setCurrentPage("home")}
        onRegister={() => {
          setIsLoggedIn(true);
          setCurrentPage("home");
        }}
        onSwitchToLogin={() => setCurrentPage("login")}
      />
    );
  }

  // Pricing Page
  if (currentPage === "pricing") {
    return (
      <PricingPage
        onBack={() => setCurrentPage("home")}
        isLoggedIn={isLoggedIn}
        onNewChat={handleNewChat}
        onGoToHistory={() => setCurrentPage("history")}
        onLogin={() => setCurrentPage("login")}
      />
    );
  }

  // Billing Page
  if (currentPage === "billing") {
    return (
      <BillingPage
        onBack={() => setCurrentPage("home")}
        isLoggedIn={isLoggedIn}
        onNewChat={handleNewChat}
        onGoToHistory={() => setCurrentPage("history")}
        onLogin={() => setCurrentPage("login")}
      />
    );
  }

  // Subscription Page
  if (currentPage === "subscription") {
    return (
      <SubscriptionPage
        onBack={() => setCurrentPage("home")}
        isLoggedIn={isLoggedIn}
        onNewChat={handleNewChat}
        onGoToHistory={() => setCurrentPage("history")}
        onLogin={() => setCurrentPage("login")}
        onGoToPricing={() => setCurrentPage("pricing")}
      />
    );
  }

  // Settings Page
  if (currentPage === "settings") {
    return (
      <SettingsPage
        onBack={() => setCurrentPage("home")}
        isLoggedIn={isLoggedIn}
        onNewChat={handleNewChat}
        onGoToHistory={() => setCurrentPage("history")}
        onLogin={() => setCurrentPage("login")}
        onLogout={() => {
          setIsLoggedIn(false);
          setCurrentPage("home");
        }}
      />
    );
  }

  if (currentPage === "history") {
    return (
      <HistoryPage
        sessions={historySessions}
        onBack={() => setCurrentPage("home")}
        isLoggedIn={isLoggedIn}
        onNewChat={handleNewChat}
        onLogin={() => setCurrentPage("login")}
        onGoToPricing={() => setCurrentPage("pricing")}
        onGoToBilling={() => setCurrentPage("billing")}
        onGoToSubscription={() => setCurrentPage("subscription")}
        onGoToSettings={() => setCurrentPage("settings")}
      />
    );
  }

  if (currentPage === "video") {
    return (
      <VideoDetail
        video={selectedVideo!}
        onBack={() => {
          if (fromSearchResults) {
            // 返回搜索结果页
            setCurrentPage("home");
            setIsAIOpen(true);
            setShowSearchResults(true);
          } else {
            // 返回主页
            setCurrentPage("home");
            setShowSearchResults(false);
          }
        }}
        onGoToHome={() => {
          // 直接返回主页
          setCurrentPage("home");
          setShowSearchResults(false);
          setIsAIOpen(false);
        }}
        messages={messages}
        onSendMessage={handleSendMessage}
        onNewChat={handleNewChat}
        isLoggedIn={isLoggedIn}
        onGoToHistory={() => setCurrentPage("history")}
        showBackToResults={fromSearchResults}
      />
    );
  }

  // Search Results Page with Split View
  if (isAIOpen && showSearchResults) {
    return (
      <div className="h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 flex flex-col overflow-hidden">
        {/* Header with AppHeader Component */}
        <AppHeader
          isLoggedIn={isLoggedIn}
          currentPage="search"
          onGoHome={() => {
            setIsAIOpen(false);
            setShowSearchResults(false);
            setCurrentPage("home");
          }}
          onNewChat={handleNewChat}
          onGoToHistory={() => setCurrentPage("history")}
          onLogin={() => setCurrentPage("login")}
          onGoToPricing={() => setCurrentPage("pricing")}
          onGoToBilling={() => setCurrentPage("billing")}
          onGoToSubscription={() => setCurrentPage("subscription")}
          onGoToSettings={() => setCurrentPage("settings")}
        />

        {/* Split View - Aligned with Header */}
        <div className="flex-1 overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-6 h-full flex gap-6">
            {/* Left: Video Results */}
            <div className="flex-1 overflow-y-auto">
              <div className="py-8">
                {/* Professional Header */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-3 mb-2">
                    <h2 className="text-2xl font-bold text-gray-900">
                      为您找到 {filteredVideos.length} 个相关视频
                    </h2>
                    {searchQuery && (
                      <span className="text-sm text-gray-500">
                        关于 "{searchQuery}"
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    AI 已为您筛选出最相关的内容
                  </p>
                </div>

                {filteredVideos.length > 0 ? (
                  <div className="grid grid-cols-3 gap-6">
                    {filteredVideos.map((video) => (
                      <VideoCard
                        key={video.id}
                        video={video}
                        onClick={() => handleVideoClick(video)}
                        showMatches={true}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
                    <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">未找到相关视频</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Chat Panel */}
            <div className="w-[580px] shrink-0">
              <ChatPanel
                onSendMessage={handleSendMessage}
                onNewChat={handleNewChat}
                messages={messages}
                showNewChatButton={true}
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
          currentPage="home"
          onGoHome={() => {
            setCurrentPage("home");
            setShowSearchResults(false);
            setIsAIOpen(false);
          }}
          onNewChat={handleNewChat}
          onGoToHistory={() => setCurrentPage("history")}
          onLogin={() => setCurrentPage("login")}
          onGoToPricing={() => setCurrentPage("pricing")}
          onGoToBilling={() => setCurrentPage("billing")}
          onGoToSubscription={() => setCurrentPage("subscription")}
          onGoToSettings={() => setCurrentPage("settings")}
        />
      </div>

      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto px-6 py-10">
        {/* Search Section */}
        <div className="max-w-3xl mx-auto mb-14">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full mb-6 text-sm font-medium border border-blue-100">
              <Sparkles className="w-4 h-4" />
              AI 驱动的智能视频检索
            </div>
            <h2 className="text-4xl font-bold mb-3 text-gray-900">
              向 AI 提问，发现优质视频
            </h2>
            <p className="text-gray-600">
              描述您想学习的内容，AI 会为您推荐最合适的视频
            </p>
          </div>

          {/* ChatGPT-style Input Box */}
          <div className="relative">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow focus-within:border-blue-500 focus-within:shadow-lg p-4">
              <textarea
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSearch();
                  }
                }}
                placeholder="例如：介绍 Transformer 架构的视频、AI 在医疗领域的应用..."
                className="w-full px-1 py-1 pr-12 text-base resize-none outline-none bg-transparent min-h-[40px] max-h-[160px]"
                rows={1}
                style={{
                  height: "auto",
                  overflowY: searchQuery.split("\n").length > 3 ? "auto" : "hidden",
                }}
              />
              
              {/* Bottom Actions Bar - No Border */}
              <div className="flex items-center justify-between mt-3">
                {/* Left: Search Mode Toggle */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSearchMode("ai")}
                    className={`px-3 py-1.5 text-sm rounded-lg transition-all border ${
                      searchMode === "ai"
                        ? "border-blue-500 text-blue-600 bg-blue-50"
                        : "border-gray-300 text-gray-600 hover:border-gray-400"
                    }`}
                  >
                    AI智能搜索
                  </button>
                  <button
                    onClick={() => setSearchMode("keyword")}
                    className={`px-3 py-1.5 text-sm rounded-lg transition-all border ${
                      searchMode === "keyword"
                        ? "border-blue-500 text-blue-600 bg-blue-50"
                        : "border-gray-300 text-gray-600 hover:border-gray-400"
                    }`}
                  >
                    关键词匹配
                  </button>
                </div>

                {/* Right: Send Button with Arrow Up */}
                <button
                  onClick={handleSearch}
                  disabled={!searchQuery.trim()}
                  className="w-8 h-8 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:cursor-not-allowed flex items-center justify-center transition-all shadow-sm"
                >
                  <ArrowUp className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Quick Suggestions Below */}
            <div className="mt-4 flex items-center gap-3 text-sm">
              <span className="text-gray-500">快速开始：</span>
              <button
                onClick={() => {
                  setSearchQuery("推荐深度学习相关的视频");
                }}
                className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors border border-gray-200 hover:border-blue-200"
              >
                深度学习
              </button>
              <button
                onClick={() => {
                  setSearchQuery("有哪些 AI 企业应用的案例");
                }}
                className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors border border-gray-200 hover:border-blue-200"
              >
                企业应用
              </button>
              <button
                onClick={() => {
                  setSearchQuery("Transformer 架构讲解");
                }}
                className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors border border-gray-200 hover:border-blue-200"
              >
                技术架构
              </button>
            </div>
          </div>
        </div>

        {/* Videos Section */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-3xl font-bold text-gray-900">
                {showSearchResults && searchQuery
                  ? `"${searchQuery}" 的搜索结果`
                  : "热门推荐"}
              </h3>
              <p className="text-sm text-gray-500 mt-2 font-medium">
                共 {filteredVideos.length} 个精选视频
              </p>
            </div>
            <Button
              onClick={handleRefresh}
              variant="outline"
              className="gap-2 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 shadow-sm"
            >
              <RefreshCw className="w-4 h-4" />
              换一批
            </Button>
          </div>

          <div className="grid grid-cols-4 gap-7">
            {filteredVideos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onClick={() => handleVideoClick(video)}
              />
            ))}
          </div>

          {filteredVideos.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl shadow-sm">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-5">
                <Search className="w-10 h-10 text-blue-600" />
              </div>
              <p className="text-gray-900 font-semibold mb-2 text-lg">未找到相关视频</p>
              <p className="text-sm text-gray-500">
                请尝试其他关键词或使用AI助手帮您搜索
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}