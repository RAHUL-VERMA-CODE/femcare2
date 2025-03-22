import { useState, useRef, useEffect } from "react";
import { X, MessageCircle, Send, Smile, Paperclip, Image, File } from "lucide-react";
import { useChat } from "ai/react";
import { femcareTrainingData } from "../../lib/constants";
import logoImg from "../../assets/chatbotImg.png"; // Import your chatbot logo image

export default function FemcareChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [uploadedFile, setUploadedFile] = useState(null);

  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const emojiPickerRef = useRef(null);

  // Predefined questions to show when the chatbot is opened
  const predefinedQuestions = [
    "How can I track my menstrual cycle with AI?",
    "Can I upload my medical report for instant analysis?",
    "How can yoga help improve my menstrual health?",
  ];

  // Use the useChat hook for chat functionality
  const { messages, input, handleInputChange, setInput, setMessages, handleSubmit } = useChat({
    initialMessages: [
      {
        id: "welcome-message",
        role: "assistant",
        content: "👋 Hello! I'm FemCare AI, your personal health assistant. How can I help you today?",
      },
    ],
    api: "/api/chat",
    onFinish: () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    },
  });

  // Toggle chat open/closed
  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setShowSuggestions(true); // Show suggestions when the chatbot is opened
    }
  };

  // Handle emoji selection
  const handleEmojiSelect = (emoji) => {
    setInput((prev) => prev + emoji);
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setUploadedFile(files[0]);
    }
  };

  // Trigger file input click
  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  // Remove uploaded file
  const removeFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle suggested question selection
  const handleQuestionSelect = (question) => {
    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: question,
    };

    setMessages((prev) => [...prev, userMessage]);

    // Find the response from the training data
    const matchedQuestion = femcareTrainingData.find((item) =>
      item.query.toLowerCase() === question.toLowerCase()
    );

    if (matchedQuestion) {
      // If matched, respond with the predefined answer
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: matchedQuestion.response,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } else {
      // If no match, fetch a response from the Gemini AI API
      fetchGeminiAIResponse(question).then((response) => {
        const assistantMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: response,
        };

        setMessages((prev) => [...prev, assistantMessage]);
      });
    }

    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    setShowSuggestions(false);
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!input.trim() && !uploadedFile) return;

    // Create user message
    const userContent = uploadedFile ? `${input.trim() ? input + " " : ""}[Uploaded file: ${uploadedFile.name}]` : input;

    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: userContent,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Check if the user's query matches any predefined question
    const matchedQuestion = femcareTrainingData.find((item) =>
      userContent.toLowerCase().includes(item.query.toLowerCase()),
    );

    if (matchedQuestion) {
      // If matched, respond with the predefined answer
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: matchedQuestion.response,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } else {
      // If no match, fetch a response from the Gemini AI API
      const response = await fetchGeminiAIResponse(userContent);

      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    }

    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    removeFile();
    setShowSuggestions(false);
  };

  // Fetch response from Gemini AI API
  const fetchGeminiAIResponse = async (query) => {
    const URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyAp9KcgJgyCUPAwaq0zzXejdqpLmWgO1PE";

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: query,
                },
              ],
            },
          ],
        }),
      });

      const data = await response.json();
      const generatedText = data.candidates[0].content.parts[0].text;

      // Format the response in points
      const formattedResponse = generatedText
        .split("\n") // Split by new lines
        .map((line) => line.trim()) // Trim each line
        .filter((line) => line.length > 0) // Remove empty lines
        .map((line) => `• ${line}`) // Add bullet points
        .join("\n"); // Join with new lines

      // Remove any ** from the response
      return formattedResponse.replace(/\*\*/g, "");
    } catch (error) {
      console.error("Error fetching response from Gemini AI:", error);
      return "Sorry, I couldn't process your request. Please try again later.";
    }
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target) &&
        !event.target.closest('[data-emoji-button="true"]')
      ) {
        setIsEmojiPickerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Emoji picker component
  const EmojiPicker = () => {
    const emojis = ["😊", "😂", "❤️", "👍", "🙏", "😍", "🥰", "😘", "💕", "🤗", "😢", "😭", "😩", "😫", "🤔", "🙄", "😬", "😰", "😱", "🤢"];

    return (
      <div
        ref={emojiPickerRef}
        className={`absolute bottom-14 right-0 bg-white rounded-lg shadow-lg p-2 transition-all border border-gray-200 w-64 z-10 ${
          isEmojiPickerOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="grid grid-cols-5 gap-2">
          {emojis.map((emoji) => (
            <button
              key={emoji}
              onClick={() => handleEmojiSelect(emoji)}
              className="text-xl hover:bg-gray-100 p-1 rounded"
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Suggested questions component
  const SuggestedQuestions = () => {
    return (
      <div className="flex flex-col gap-2 mb-4">
        <p className="text-sm text-teal-700 font-medium">Suggested questions:</p>
        <div className="flex flex-wrap gap-2">
          {predefinedQuestions.map((question) => (
            <button
              key={question}
              onClick={() => handleQuestionSelect(question)}
              className="bg-teal-50 hover:bg-teal-100 text-teal-700 text-sm py-1 px-3 rounded-full transition-colors"
            >
              {question}
            </button>
          ))}
        </div>
      </div>
    );
  };

  // File preview component
  const FilePreview = () => {
    if (!uploadedFile) return null;

    const isImage = uploadedFile.type.startsWith("image/");
    const [preview, setPreview] = useState(null);

    useEffect(() => {
      if (isImage) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(uploadedFile);
      }

      return () => {
        if (preview) URL.revokeObjectURL(preview);
      };
    }, [uploadedFile, isImage, preview]);

    return (
      <div className="flex items-center gap-2 p-2 bg-teal-50 rounded-md mb-2">
        <div className="flex-shrink-0">
          {isImage && preview ? (
            <div className="w-10 h-10 rounded overflow-hidden">
              <img src={preview || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-10 h-10 bg-teal-100 rounded flex items-center justify-center">
              {isImage ? (
                <Image size={20} className="text-teal-600" />
              ) : (
                <File size={20} className="text-teal-600" />
              )}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-700 truncate">{uploadedFile.name}</p>
          <p className="text-xs text-gray-500">{(uploadedFile.size / 1024).toFixed(1)} KB</p>
        </div>
        <button onClick={removeFile} className="text-gray-400 hover:text-red-500" aria-label="Remove file">
          <X size={16} />
        </button>
      </div>
    );
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className={`fixed right-6 bottom-6 rounded-full w-14 h-14 shadow-lg z-[1000] flex items-center justify-center transition-all duration-300 ${
          isOpen ? "bg-teal-600 text-white rotate-90" : "bg-teal-500 hover:bg-teal-600 text-white"
        }`}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Interface */}
      <div
        className={`fixed right-6 bottom-32 w-[320px] z-[999] transition-all duration-300 ease-in-out transform ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        <div className="overflow-hidden rounded-2xl shadow-2xl border border-teal-100 flex flex-col h-[450px] bg-white">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-teal-600 to-teal-500 text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              {/* Add your logo here */}
              <img
                src={logoImg} // Use the imported logo image
                alt="FemCare AI Logo"
                className="w-10 h-10 rounded-full object-cover" // Adjust height and width
              />
              <span className="font-medium">FemCare AI</span>
            </div>
            <button
              onClick={toggleChat}
              className="text-white hover:bg-teal-700/50 rounded-full p-1.5 transition-colors"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 custom-scrollbar">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`rounded-2xl px-4 py-2 max-w-[85%] shadow-sm ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-br-none"
                      : "bg-white border border-gray-200 text-gray-800 rounded-bl-none"
                  }`}
                >
                  {/* Format response in points */}
                  {message.role === "assistant" ? (
                    <div className="whitespace-pre-wrap">{message.content}</div>
                  ) : (
                    message.content
                  )}
                </div>
              </div>
            ))}

            {/* Show suggested questions after welcome message */}
            {showSuggestions && messages.length === 1 && <SuggestedQuestions />}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <form onSubmit={handleFormSubmit} className="p-3 bg-white border-t border-gray-200">
            <FilePreview />
            <div className="flex items-center gap-1 relative">
              <input
                value={input}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleFormSubmit(e);
                  }
                }}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-full py-2 text-black px-4 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-teal-50"
              />

              {/* Emoji picker */}
              <div className="relative">
                <button
                  type="button"
                  className="text-gray-400 hover:text-teal-600  rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Add emoji"
                  data-emoji-button="true"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEmojiPickerOpen(!isEmojiPickerOpen);
                  }}
                >
                  <Smile size={20} />
                </button>
                <EmojiPicker />
              </div>

              {/* File upload */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
                accept="image/*,.pdf,.doc,.docx"
              />
              <button
                type="button"
                className="text-gray-400 hover:text-teal-600  rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Attach file"
                onClick={handleFileButtonClick}
              >
                <Paperclip size={20} />
              </button>

              {/* Send button */}
              <button
                type="submit"
                className={`rounded-full p-1.5 text-white transition-colors ${
                  !input.trim() && !uploadedFile
                    ? "bg-teal-400 cursor-not-allowed"
                    : "bg-teal-600 hover:bg-teal-700"
                }`}
                disabled={!input.trim() && !uploadedFile}
              >
                <Send size={15} />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Custom Scrollbar Styling */}
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
        `}
      </style>
    </>
  );
}