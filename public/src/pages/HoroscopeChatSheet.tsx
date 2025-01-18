import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Send, Stars, Moon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { apiUrl } from "@/utils";

const messages = [
  {
    type: "ai",
    content:
      "Welcome, seeker of celestial wisdom. What guidance do you seek from the stars?",
  },
  { type: "user", content: "Will I find success in my career?" },
  {
    type: "ai",
    content:
      "The alignment of Jupiter in your house of career suggests a powerful transformation ahead. Stay vigilant for opportunities in the next lunar cycle.",
  },
];

const ChatMessage = ({ message, type }) => (
  <div
    className={`flex ${type === "user" ? "justify-end" : "justify-start"} mb-4`}
  >
    <div
      className={`p-4 rounded-2xl max-w-[80%] ${
        type === "user"
          ? "bg-purple-600 bg-opacity-50 ml-12"
          : "bg-indigo-900 bg-opacity-30 mr-12"
      } backdrop-blur-sm border border-purple-500/30 shadow-lg
      ${type === "ai" ? "animate-slide-right" : "animate-slide-left"}`}
    >
      <div className="flex items-center gap-2 mb-2">
        {type === "ai" ? (
          <Moon className="w-4 h-4 text-purple-300" />
        ) : (
          <Stars className="w-4 h-4 text-purple-300" />
        )}
        <span className="text-purple-300 text-sm">
          {type === "ai" ? "Mystic Oracle" : "Seeker"}
        </span>
      </div>
      <p className="text-purple-100">{message}</p>
    </div>
  </div>
);

export function HoroscopeChatSheet() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState(messages);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const newMessage = { type: "user", content: inputMessage };
    setChatMessages([...chatMessages, newMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Send message to API
    try {
      const response = await fetch(`${apiUrl}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          birthDate: "2004-04-28T10:53:00Z",
          city: "Chennai",
          state: "Tamil Nadu",
          prompt: inputMessage
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const aiResponse = {
        type: "ai",
        content: data.response,
      };
      setChatMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error:', error);
      const errorResponse = {
        type: "ai",
        content: "I apologize, but I'm unable to connect with the celestial energies at the moment.",
      };
      setChatMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="bg-purple-900/50 border-purple-500/50 text-purple-100 hover:bg-purple-800/50"
        >
          <Stars className="w-4 h-4 mr-2" />
          Consult the Oracle
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg bg-gradient-to-b from-purple-900/95 to-black/95 border-purple-500/30 text-purple-100">
        <SheetHeader>
          <SheetTitle className="text-purple-100 flex items-center gap-2">
            <Moon className="w-6 h-6" />
            Celestial Oracle
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-[calc(100vh-8rem)] mt-6">
          <div className="flex-1 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-purple-500/30 scrollbar-track-transparent pr-4">
            {chatMessages.map((msg, idx) => (
              <ChatMessage key={idx} message={msg.content} type={msg.type} />
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="mt-4 relative">
            <Input
              placeholder="Ask the stars..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="bg-purple-900/20 border-purple-500/30 text-purple-100 placeholder:text-purple-300/50 pr-12"
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-2 top-2 h-8 w-8 bg-transparent hover:bg-purple-500/20"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin text-purple-300" />
              ) : (
                <Send className="h-4 w-4 text-purple-300" />
              )}
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default HoroscopeChatSheet;
