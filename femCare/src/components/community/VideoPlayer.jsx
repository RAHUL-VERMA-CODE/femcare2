import { useState, useRef } from "react"
import ReactPlayer from "react-player"
import { Play, Pause, Volume2, VolumeX, Maximize, SkipForward, SkipBack, ChevronLeft, ChevronRight } from "lucide-react"

const VideoPlayer = ({ video, isPlaying, onPlayingChange, onNext, onPrevious }) => {
  const [volume, setVolume] = useState(0.5)
  const [muted, setMuted] = useState(false)
  const [played, setPlayed] = useState(0)
  const [seeking, setSeeking] = useState(false)
  const [duration, setDuration] = useState(0)
  const playerRef = useRef(null)

  // Format time in MM:SS format
  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "00:00"
    const date = new Date(seconds * 1000)
    const mm = date.getUTCMinutes()
    const ss = date.getUTCSeconds().toString().padStart(2, "0")
    return `${mm}:${ss}`
  }

  const currentTime = playerRef.current ? formatTime(playerRef.current.getCurrentTime()) : "00:00"
  const totalDuration = formatTime(duration)

  const handlePlayPause = () => {
    onPlayingChange(!isPlaying)
  }

  const handleVolumeChange = (e) => {
    const newVolume = Number.parseFloat(e.target.value)
    setVolume(newVolume)
    setMuted(newVolume === 0)
  }

  const handleToggleMute = () => {
    setMuted(!muted)
  }

  const handleProgress = (state) => {
    if (!seeking) {
      setPlayed(state.played)
    }
  }

  const handleSeekMouseDown = () => {
    setSeeking(true)
  }

  const handleSeekChange = (e) => {
    setPlayed(Number.parseFloat(e.target.value))
  }

  const handleSeekMouseUp = (e) => {
    setSeeking(false)
    if (playerRef.current) {
      playerRef.current.seekTo(Number.parseFloat(e.target.value))
    }
  }

  const handleSkipForward = () => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime()
      playerRef.current.seekTo(currentTime + 10)
    }
  }

  const handleSkipBackward = () => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime()
      playerRef.current.seekTo(currentTime - 10)
    }
  }

  const handleFullscreen = () => {
    const playerElement = document.querySelector(".react-player-container")
    if (playerElement) {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      } else {
        playerElement.requestFullscreen()
      }
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out w-full max-w-4xl mx-auto">
      <div className="relative aspect-video bg-purple-900 react-player-container">
        <ReactPlayer
          ref={playerRef}
          url={video.url}
          width="100%"
          height="100%"
          playing={isPlaying}
          volume={volume}
          muted={muted}
          onProgress={handleProgress}
          onDuration={setDuration}
          config={{
            youtube: {
              playerVars: {
                modestbranding: 1,
                controls: 0,
                showinfo: 0,
                rel: 0,
                iv_load_policy: 3,
              },
            },
          }}
          className="react-player"
        />
        <div className="absolute inset-0 flex items-center justify-center cursor-pointer" onClick={handlePlayPause}>
          {!isPlaying && (
            <div className="bg-white/80 rounded-full p-4 transform transition-transform hover:scale-110">
              <Play size={32} className="text-purple-700 fill-purple-700" />
            </div>
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="h-2 bg-purple-200 rounded-full mb-2 cursor-pointer relative" onClick={handleSeekMouseUp}>
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
              style={{ width: `${played * 100}%` }}
            />
            <input
              type="range"
              min={0}
              max={0.999999}
              step="any"
              value={played}
              onMouseDown={handleSeekMouseDown}
              onChange={handleSeekChange}
              onMouseUp={handleSeekMouseUp}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              aria-label="Seek"
            />
          </div>
          <div className="flex justify-between text-xs text-purple-100 mb-3">
            <span>{currentTime}</span>
            <span>{totalDuration}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button onClick={onPrevious} className="text-purple-100 hover:text-purple-300 transition-colors">
                <ChevronLeft size={24} />
              </button>
              <button onClick={handlePlayPause} className="text-purple-100 hover:text-purple-300 transition-colors">
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>
              <button onClick={onNext} className="text-purple-100 hover:text-purple-300 transition-colors">
                <ChevronRight size={24} />
              </button>
              <button onClick={handleSkipBackward} className="text-purple-100 hover:text-purple-300 transition-colors">
                <SkipBack size={20} />
              </button>
              <button onClick={handleSkipForward} className="text-purple-100 hover:text-purple-300 transition-colors">
                <SkipForward size={20} />
              </button>
            </div>
            <button onClick={handleFullscreen} className="text-purple-100 hover:text-purple-300 transition-colors">
              <Maximize size={20} />
            </button>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-purple-800">{video.title}</h3>
        <p className="text-purple-600 mt-1">{video.description}</p>
        <div className="mt-2">
          <span className="inline-block px-3 py-1 bg-purple-200 text-purple-800 rounded-full text-sm font-medium">
            {video.category}
          </span>
        </div>
      </div>
    </div>
  )
}

export default VideoPlayer