import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { Video } from "./video-card";
import { Star, Clock, User, Tag } from "lucide-react";
import { Badge } from "./ui/badge";

interface VideoDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  video: Video | null;
}

export function VideoDetailDialog({
  isOpen,
  onClose,
  video,
}: VideoDetailDialogProps) {
  if (!video) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-gray-900">
            {video.title}
          </DialogTitle>
          <DialogDescription>观看视频详情和相关信息</DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-6">
            {/* Video Player Placeholder */}
            <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center cursor-pointer hover:bg-white transition-colors">
                  <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-blue-600 border-b-8 border-b-transparent ml-1"></div>
                </div>
              </div>
            </div>

            {/* Video Info */}
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl mb-2 text-gray-900">{video.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{video.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{video.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{video.rating}</span>
                    </div>
                  </div>
                </div>
                <Badge className="bg-blue-600">{video.category}</Badge>
              </div>

              {/* Tags */}
              <div className="flex items-center gap-2 flex-wrap">
                <Tag className="w-4 h-4 text-gray-500" />
                {video.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Description */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="mb-2 text-gray-900">视频简介</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  本视频深入探讨了{video.title}的核心概念和实践应用。
                  {video.author}
                  将通过丰富的案例和实战经验，为您详细讲解相关技术要点。适合对{" "}
                  {video.tags.join("、")} 感兴趣的开发者和研究人员观看学习。
                </p>
              </div>

              {/* Chapters */}
              <div>
                <h4 className="mb-3 text-gray-900">章节目录</h4>
                <div className="space-y-2">
                  {[
                    { time: "00:00", title: "开场介绍" },
                    { time: "02:30", title: "核心概念讲解" },
                    { time: "05:45", title: "实战案例演示" },
                    { time: "09:20", title: "常见问题解答" },
                    { time: "11:15", title: "总结与展望" },
                  ].map((chapter, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors"
                    >
                      <span className="text-sm text-blue-600 font-medium min-w-[50px]">
                        {chapter.time}
                      </span>
                      <span className="text-sm text-gray-700">
                        {chapter.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
