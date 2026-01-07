import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Plus, User } from "lucide-react";
import { Button } from "./ui/button";

export interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
}

interface ChatPanelProps {
  onSendMessage: (message: string) => void;
  onNewChat: () => void;
  messages: Message[];
  showNewChatButton?: boolean;
}

export function ChatPanel({
  onSendMessage,
  onNewChat,
  messages,
  showNewChatButton = true,
}: ChatPanelProps) {
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="h-full bg-white flex flex-col border-l border-gray-200">
      {/* Messages - Professional Style with Scroll */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50/30 to-white px-6 py-6"
      >
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.type === "ai" ? (
                // AI Message - Direct Text (Like DeepSeek/ChatGPT)
                <div className="flex gap-3 items-start w-full">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shrink-0 shadow-sm">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="text-sm text-gray-900 leading-relaxed whitespace-pre-wrap">
                      {message.content}
                    </div>
                    <div className="text-xs text-gray-400 mt-2">
                      {message.timestamp.toLocaleTimeString("zh-CN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                // User Message - Bubble Style
                <div className="flex gap-3 items-end max-w-[75%]">
                  <div className="px-4 py-2.5 rounded-2xl bg-blue-600 text-white shadow-sm rounded-br-md">
                    <div className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.content}
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-gray-600" />
                  </div>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area - Fixed at Bottom */}
      <div className="shrink-0 border-t border-gray-200 bg-white px-6 py-4">
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="向 AI 提问或搜索视频..."
              className="w-full px-4 py-3 pr-12 text-sm resize-none outline-none rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white min-h-[52px] max-h-[200px]"
              rows={1}
              style={{
                height: "auto",
                overflowY: inputValue.split("\n").length > 3 ? "auto" : "hidden",
              }}
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="absolute right-2 bottom-2 w-8 h-8 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">
            Enter 发送 · Shift + Enter 换行
          </p>
        </div>
      </div>
    </div>
  );
}