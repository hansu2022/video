import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { Video } from "./video-card";
import { Message } from "./ai-assistant";
import { Clock, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";

export interface HistorySession {
  id: string;
  video: Video;
  messages: Message[];
  timestamp: Date;
}

interface HistoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  sessions: HistorySession[];
}

export function HistoryDialog({
  isOpen,
  onClose,
  sessions,
}: HistoryDialogProps) {
  const [selectedSession, setSelectedSession] = useState<HistorySession | null>(
    null
  );

  const handleClose = () => {
    setSelectedSession(null);
    onClose();
  };

  const handleBack = () => {
    setSelectedSession(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {selectedSession && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="h-8 w-8 p-0 mr-2"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
            {selectedSession ? "对话详情" : "历史对话"}
          </DialogTitle>
          <DialogDescription>
            {selectedSession
              ? `查看与视频 ${selectedSession.video.title} 的对话记录`
              : "浏览您所有的历史对话记录"}
          </DialogDescription>
        </DialogHeader>

        {!selectedSession ? (
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-3">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  onClick={() => setSelectedSession(session)}
                  className="flex gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
                >
                  <img
                    src={session.video.thumbnail}
                    alt={session.video.title}
                    className="w-32 h-20 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="mb-1 line-clamp-2 text-gray-900">
                      {session.video.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      {session.video.author}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>
                        {session.timestamp.toLocaleDateString("zh-CN")}
                      </span>
                      <span className="ml-2">
                        {session.messages.length} 条对话
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="space-y-4">
            {/* Video Info */}
            <div className="flex gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
              <img
                src={selectedSession.video.thumbnail}
                alt={selectedSession.video.title}
                className="w-40 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <h4 className="mb-2 text-gray-900">
                  {selectedSession.video.title}
                </h4>
                <p className="text-sm text-gray-600 mb-1">
                  {selectedSession.video.author}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>
                    {selectedSession.timestamp.toLocaleString("zh-CN")}
                  </span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="h-[350px]">
              <div className="space-y-4 pr-4">
                {selectedSession.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.type === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg px-4 py-2 ${
                        message.type === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      {message.type === "ai" && (
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                            <span className="text-white text-xs">AI</span>
                          </div>
                        </div>
                      )}
                      <p className="text-sm whitespace-pre-wrap">
                        {message.content}
                      </p>
                      <p
                        className={`text-xs mt-1 ${
                          message.type === "user"
                            ? "text-blue-100"
                            : "text-gray-500"
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
              </div>
            </ScrollArea>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}