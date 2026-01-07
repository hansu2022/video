import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, X, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";

export interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
}

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  onSendMessage: (message: string) => void;
  onNewChat: () => void;
  messages: Message[];
}

export function AIAssistant({
  isOpen,
  onClose,
  onSendMessage,
  onNewChat,
  messages,
}: AIAssistantProps) {
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 h-screen w-[420px] bg-white shadow-2xl flex flex-col z-50 border-l border-gray-100">
      {/* Header */}
      <div className="shrink-0 border-b border-gray-100 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="flex items-center justify-between p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-white font-semibold">AI 视频助手</h3>
              <p className="text-xs text-blue-100">智能推荐 · 精准搜索</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-9 w-9 p-0 text-white hover:bg-white/20 rounded-full"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        {/* New Chat Button */}
        <div className="px-5 pb-4">
          <Button
            onClick={onNewChat}
            variant="outline"
            className="w-full gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30 backdrop-blur-sm"
          >
            <Plus className="w-4 h-4" />
            开启新对话
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-white">
        <div className="p-5 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${
                  message.type === "user"
                    ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white"
                    : "bg-white text-gray-900 border border-gray-100"
                }`}
              >
                {message.type === "ai" && (
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                      <Sparkles className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-xs font-medium text-blue-600">AI助手</span>
                  </div>
                )}
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                <p
                  className={`text-xs mt-2 ${
                    message.type === "user" ? "text-blue-100" : "text-gray-400"
                  }`}
                >
                  {message.timestamp.toLocaleTimeString("zh-CN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="p-5 border-t border-gray-100 bg-white shrink-0">
        <div className="flex gap-3">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="输入您的问题或搜索关键词..."
            className="flex-1 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
          />
          <Button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md rounded-xl px-5"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-gray-400 mt-3 text-center">
          按 Enter 发送 · Shift + Enter 换行
        </p>
      </div>
    </div>
  );
}