import { Play } from "lucide-react";

const VideoCard = ({ video, isActive, onSelect, variant = "carousel" }) => {
  const getYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = getYouTubeId(video.url);
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : "/placeholder.svg";

  return (
    <div
      className={`group cursor-pointer transition-all duration-300 ease-in-out bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transform hover:-translate-y-1 ${
        isActive ? "ring-2 ring-purple-500" : ""
      } ${variant === "carousel" ? "w-72" : "h-full"}`}
      onClick={onSelect}
    >
      <div className="relative aspect-video">
        <img src={thumbnailUrl || "/placeholder.svg"} alt={video.title} className="object-cover w-full h-full" />
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="bg-white/90 rounded-full p-3 transform scale-90 group-hover:scale-100 transition-transform">
            <Play size={24} className="text-purple-700 fill-purple-700" />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-white">
          <span className="inline-block px-2 py-1 bg-purple-600 rounded-full text-xs font-medium mb-1">
            {video.category}
          </span>
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-medium text-purple-900 line-clamp-1">{video.title}</h3>
        <p className="text-sm text-purple-600 mt-1 line-clamp-2">{video.description}</p>
      </div>
    </div>
  );
};

export default VideoCard;