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

interface Message {
  id: string;
  text: string;
  isMe: boolean;
  timestamp: Date;
}

interface ChatDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productTitle: string;
  productId: number;
  userId: string;
}

export const ChatDialog = ({
  open,
  onOpenChange,
  productTitle,
  productId,
  userId,
}: ChatDialogProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const ws = useRef<WebSocket | null>(null);

  const chatRoomId = `chat_${productId}`;

  useEffect(() => {
    if (!open) return;

    ws.current = new WebSocket(`ws://localhost:8000/api/chat/`);

    //Mensaje enviado al server al momento de conectarse
    ws.current.onopen = () => {
      ws.current?.send(JSON.stringify({
        type: "join",
        chatRoomId,
        userId,
      }));
    };

    //Accion a ejecutarse al momento de recibir un mensaje 
    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log()
      setMessages((prev) => [
        ...prev,
        {
          id: data.id,
          text: data.text,
          isMe: data.userId === userId,
          timestamp: new Date(),
        },
      ]);
    };

    return () => {
      ws.current?.close();
      setMessages([]); // Limpiar mensajes al cerrar
    };
  }, [open, chatRoomId, userId]);

  //Funcion para el envio de mensajes
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    ws.current?.send(
      JSON.stringify({
        type: "message",
        chatRoomId,
        userId,
        text: newMessage,
      })
    );

    setNewMessage("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg glass-card border-primary/20 h-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl">Chat sobre el producto</DialogTitle>
          <DialogDescription className="text-sm">{productTitle}</DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground text-sm py-8">
                Inicia la conversación
              </div>
            )}
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    message.isMe
                      ? "bg-primary text-primary-foreground"
                      : "glass-card border border-border"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="flex gap-2 pt-4 border-t border-border">
          <Input
            placeholder="Escribe un mensaje..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} className="gradient-primary hover:opacity-90">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};