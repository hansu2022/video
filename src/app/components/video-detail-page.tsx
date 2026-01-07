import { ArrowLeft, Star, Clock, User, Tag, Play } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Video } from "./video-card";

interface VideoDetailPageProps {
  video: Video;
  onBack: () => void;
}

export function VideoDetailPage({ video, onBack }: VideoDetailPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              返回
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <span className="text-white">V</span>
              </div>
              <span className="text-gray-900">视频详情</span>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Video Player */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="relative aspect-video bg-gray-900">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/20 transition-colors cursor-pointer group">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                      <Play className="w-10 h-10 text-blue-600 ml-1" fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black/80 text-white px-3 py-1 rounded text-sm flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {video.duration}
                  </div>
                </div>
              </div>

              {/* Video Info */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h1 className="text-3xl mb-3 text-gray-900">
                      {video.title}
                    </h1>
                    <div className="flex items-center gap-6 text-gray-600">
                      <div className="flex items-center gap-2">
                        <User className="w-5 h-5" />
                        <span className="text-lg">{video.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span className="text-lg">{video.rating}</span>
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-blue-600 text-base px-4 py-2">
                    {video.category}
                  </Badge>
                </div>

                {/* Tags */}
                <div className="flex items-center gap-2 flex-wrap mb-6">
                  <Tag className="w-5 h-5 text-gray-500" />
                  {video.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-sm text-blue-600 bg-blue-50 px-4 py-2 rounded-full hover:bg-blue-100 transition-colors cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <div className="border-t pt-6">
                  <h2 className="text-xl mb-3 text-gray-900">视频简介</h2>
                  <p className="text-gray-700 leading-relaxed">
                    本视频深入探讨了{video.title}的核心概念和实践应用。
                    {video.author}
                    将通过丰富的案例和实战经验，为您详细讲解相关技术要点。
                  </p>
                  <p className="text-gray-700 leading-relaxed mt-3">
                    课程涵盖了从基础理论到高级应用的完整知识体系，适合对{" "}
                    {video.tags.join("、")} 感兴趣的开发者和研究人员观看学习。
                    通过本课程的学习，您将能够深入理解{video.category}
                    领域的核心技术，并掌握实际项目开发中的最佳实践。
                  </p>
                </div>
              </div>

              {/* Chapters */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl mb-4 text-gray-900">章节目录</h2>
                <div className="space-y-3">
                  {[
                    { time: "00:00", title: "开场介绍", duration: "2分30秒" },
                    {
                      time: "02:30",
                      title: "核心概念讲解",
                      duration: "3分15秒",
                    },
                    {
                      time: "05:45",
                      title: "实战案例演示",
                      duration: "3分35秒",
                    },
                    {
                      time: "09:20",
                      title: "常见问题解答",
                      duration: "1分55秒",
                    },
                    { time: "11:15", title: "总结与展望", duration: "1分15秒" },
                  ].map((chapter, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 hover:bg-blue-50 rounded-lg cursor-pointer transition-colors group"
                    >
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <Play className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-blue-600 font-medium">
                            {chapter.time}
                          </span>
                          <span className="text-gray-900 font-medium">
                            {chapter.title}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {chapter.duration}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Stats */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg mb-4 text-gray-900">课程统计</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">观看次数</span>
                    <span className="text-gray-900 font-medium">1.2万</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">点赞数</span>
                    <span className="text-gray-900 font-medium">856</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">收藏数</span>
                    <span className="text-gray-900 font-medium">423</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">发布时间</span>
                    <span className="text-gray-900 font-medium">
                      2024-12-10
                    </span>
                  </div>
                </div>
              </div>

              {/* Author Info */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg mb-4 text-gray-900">讲师信息</h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-lg">
                      {video.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium">{video.author}</p>
                    <p className="text-sm text-gray-500">资深技术专家</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  专注于{video.category}
                  领域多年，拥有丰富的项目经验和教学经验，致力于帮助学习者快速掌握核心技术。
                </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  + 关注
                </Button>
              </div>

              {/* Related Videos */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg mb-4 text-gray-900">相关推荐</h3>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                    >
                      <img
                        src={video.thumbnail}
                        alt="相关视频"
                        className="w-32 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 line-clamp-2 mb-1">
                          {video.category}相关课程 {i}
                        </p>
                        <p className="text-xs text-gray-500">
                          {video.author}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
