import { Star, Clock, User, Sparkles } from "lucide-react";
import { Badge } from "./ui/badge";

export interface Video {
  id: string;
  title: string;
  author: string;
  rating: number;
  duration: string;
  thumbnail: string;
  tags: string[];
  category: string;
  matchedSegments?: number;
}

interface VideoCardProps {
  video: Video;
  onClick?: () => void;
  showMatches?: boolean;
}

export function VideoCard({ video, onClick, showMatches = false }: VideoCardProps) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:-translate-y-1"
    >
      <div className="relative aspect-video overflow-hidden bg-gray-100">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-3 right-3 bg-black/80 text-white px-2.5 py-1 rounded-lg text-xs font-medium backdrop-blur-sm flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          {video.duration}
        </div>
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-gray-900 px-2.5 py-1 rounded-lg text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            {video.rating}
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-gray-900 mb-2 line-clamp-2 min-h-[3rem] group-hover:text-blue-600 transition-colors">
          {video.title}
        </h3>
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <span className="flex items-center gap-1.5 truncate">
            <User className="w-3.5 h-3.5 shrink-0" />
            {video.author}
          </span>
        </div>
        
        {/* Matched Segments - Professional Style */}
        {showMatches && video.matchedSegments && (
          <div className="mb-3 flex items-center gap-1.5 text-xs text-purple-600 font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI 找到了 {video.matchedSegments} 个相关片段</span>
          </div>
        )}
        
        <div className="flex items-center gap-2">
          <Badge className="bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border-0 text-xs px-2.5 py-0.5">
            {video.category}
          </Badge>
          <div className="flex items-center gap-1 text-yellow-500 text-sm">
            <Star className="w-3.5 h-3.5 fill-yellow-400" />
            <span className="text-gray-700 font-medium">{video.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
}