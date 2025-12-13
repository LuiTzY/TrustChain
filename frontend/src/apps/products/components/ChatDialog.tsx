import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/apps/users/context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { User as UserType } from "@/apps/users/types/user.types";



/*
Cambiar a localhost en caso de no tener docker: const WEB_SOCKET_URL = "ws://localhost:8000/api/chat/";

*/
const WEB_SOCKET_URL = "ws://host.docker.internal:8000/api/chat/";

interface Message {
  id: string;
  text: string;
  username: string;
  isMe: boolean;
  timestamp: Date;
}

interface ChatDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productTitle: string;
  productId: number;
}

export const ChatDialog = ({
  open,
  onOpenChange,
  productTitle,
  productId,
}: ChatDialogProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const ws = useRef<WebSocket | null>(null);

  const { user } = useAuth();

  const user_data: UserType = jwtDecode(user);
  const myUsername = user_data.username;

  useEffect(() => {
    if (!open) return;

    ws.current = new WebSocket(WEB_SOCKET_URL);

    ws.current.onopen = () => {
      console.log("Conectado al chat:");
      ws.current?.send(
        JSON.stringify({
          type: "join",
          userId: myUsername,
        })
      );
    };

    ws.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        let messageData;
        
        if (data.message) {
          // Si viene como string JSON en data.message, parsearlo
          messageData = typeof data.message === 'string' 
            ? JSON.parse(data.message) 
            : data.message;
        } else {
          // Si viene directamente
          messageData = data;
        }


        const newMsg: Message = {
          id: messageData.id || data.id || `msg_${Date.now()}_${Math.random()}`,
          text: messageData.text,
          username: messageData.userId || "Usuario",
          isMe: messageData.userId === myUsername,
          timestamp: new Date(),
        };

        console.log("💬 Agregando mensaje:", newMsg);

        setMessages((prev) => [...prev, newMsg]);
      } catch (error) {
        console.error("Error al procesar mensaje:", error);
      }
    };

    ws.current.onerror = (error) => {
      console.error("Error WebSocket:", error);
    };

    ws.current.onclose = () => {
      console.log("Conexion WebSocket cerrado");
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
      setMessages([]);
    };
  }, [open, myUsername]);

  // Auto-scroll al último mensaje
  useEffect(() => {
    if (scrollRef.current) {
      const scrollElement = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const messageData = {
      type: "message",
      userId: myUsername,
      text: newMessage.trim(),
    };

    console.log("Enviandomensaje:", messageData);

    ws.current?.send(JSON.stringify(messageData));
    setNewMessage("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg glass-card border-primary/20 h-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl text-foreground">
            Chat del producto
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {productTitle}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4" ref={scrollRef}>
          <div className="space-y-4 p-4 min-h-full">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-muted-foreground text-sm py-8">
                  <p className="text-lg mb-2">💬</p>
                  <p>Inicia la conversación</p>
                </div>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex flex-col ${
                    message.isMe ? "items-end" : "items-start"
                  }`}
                >
                  {/* Nombre del usuario */}
                  {!message.isMe && (
                    <span className="text-xs text-muted-foreground mb-1 px-2 font-medium">
                      {message.username}
                    </span>
                  )}

                  {/* Burbuja del mensaje */}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${
                      message.isMe
                        ? "bg-primary text-primary-foreground"
                        : "bg-card border border-border text-foreground"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">
                      {message.text}
                    </p>
                    <p
                      className={`text-xs mt-1 ${
                        message.isMe
                          ? "text-primary-foreground/70"
                          : "text-muted-foreground"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>

        <div className="flex gap-2 pt-4 border-t border-border">
          <Input
            placeholder="Escribe un mensaje..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            className="flex-1 bg-background text-foreground"
          />
          <Button
            onClick={handleSendMessage}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            disabled={!newMessage.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};