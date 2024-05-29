"use client"

import React, {useEffect, useState} from "react";
import {ClientMessage} from "@/lib/ai-actions";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {CornerDownLeft} from "lucide-react";
import {useActions, useUIState} from "ai/rsc";

export default function Page() {
  const [conversation, setConversation] = useUIState();
  const [inputMessage, setInputMessage] = useState<string>("");
  const { continueConversation } = useActions();

  async function handleSubmission() {
    if (!inputMessage.trim()) return;

    setConversation((currentMessages: ClientMessage[]) => [
      ...currentMessages,
      { role: "user", display: inputMessage },
    ]);

    const _inputMessage = inputMessage;
    setInputMessage("");
    const message = await continueConversation(_inputMessage);

    setConversation((currentMessages: ClientMessage[]) => [
      ...currentMessages,
      { role: "assistant", display: message.display },
    ]);
  }

  async function initialMessage() {
    setConversation((currentMessages: ClientMessage[]) => [
      ...currentMessages,
      { role: "assistant", display: <div>Salut! Cum te pot ajuta?</div> },
    ]);
  }

  useEffect(() => {
    initialMessage().then();
  }, []);

  return (
      <main className="flex h-screen">
        <div className="relative flex h-full flex-col rounded-xl bg-muted/50 p-4 w-full justify-center items-center">
          <div className="flex-1 w-3/4 overflow-y-auto">
              {conversation.map(({role, display}: ClientMessage, index: number) => (
                  <div
                      key={index}
                      className={`flex gap-2 w-full ${
                          role === "user"
                              ? "justify-end"
                              : "justify-start"
                      }`}
                  >
                    <div
                        className={`p-3 mx-2 rounded-lg w-full my-4  ${
                            role === "user"
                                ? "bg-primary text-black"
                                : "bg-background border"
                        }`}
                    >
                      <p className={`font-semibold text-sm mb-1`}>
                        {role === "user" ? "Tu" : "Asistentul"}
                      </p>
                      {display}
                    </div>
                  </div>
              ))}
          </div>
          <form
              className="relative overflow-hidden rounded-lg w-3/4 border bg-background focus-within:ring-1 focus-within:ring-ring"
              onSubmit={async (e) => {
                e.preventDefault();
                await handleSubmission();
              }}
          >
            <Label htmlFor="message" className="sr-only">
              Mesaj
            </Label>
            <Textarea
                onKeyDown={async (e) => {
                  if (e.key === "Enter" && !e.shiftKey)
                    await handleSubmission();
                }}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                id="message"
                placeholder="Scrie un mesaj aici..."
                className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
            />
            <div className="flex items-center p-3 pt-0">
              <Button type="submit" size="sm" className="ml-auto gap-1.5">
                Scrie un mesaj
                <CornerDownLeft className="size-3.5"/>
              </Button>
            </div>
          </form>
        </div>
      </main>)
}