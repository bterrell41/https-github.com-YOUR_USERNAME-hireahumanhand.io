"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { MoreVertical, Phone, Search, Send, Video } from "lucide-react"
import { useState } from "react"

const THREADS = [
    { id: 1, name: "Agent Smith", avatar: "A", lastMsg: "Please verify the storefront photo.", time: "2m", unread: 1 },
    { id: 2, name: "FoodieBot", avatar: "F", lastMsg: "Did you get the vegan menu?", time: "2h", unread: 0 },
    { id: 3, name: "LegalEagle", avatar: "L", lastMsg: "Contract translation approved.", time: "1d", unread: 0 },
]

export default function MessagesPage() {
    const [activeThread, setActiveThread] = useState(THREADS[0])
    const [msgInput, setMsgInput] = useState("")

    return (
        <div className="flex h-[calc(100vh-8rem)] rounded-xl border border-border/50 bg-card/30 overflow-hidden">
            {/* Sidebar List */}
            <div className="w-80 border-r border-border/50 flex flex-col bg-card/20">
                <div className="p-4 border-b border-border/50">
                    <div className="relative">
                        <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search messages..." className="pl-8 bg-background/50 h-9" />
                    </div>
                </div>
                <ScrollArea className="flex-1">
                    <div className="flex flex-col p-2 gap-1">
                        {THREADS.map(thread => (
                            <button
                                key={thread.id}
                                onClick={() => setActiveThread(thread)}
                                className={`flex items-start gap-3 p-3 rounded-lg text-left transition-colors ${activeThread.id === thread.id ? 'bg-primary/10 hover:bg-primary/15' : 'hover:bg-muted/50'}`}
                            >
                                <Avatar className="h-10 w-10 border border-border/50">
                                    <AvatarFallback>{thread.avatar}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 overflow-hidden">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <span className="font-semibold text-sm truncate">{thread.name}</span>
                                        <span className="text-xs text-muted-foreground">{thread.time}</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground truncate">{thread.lastMsg}</p>
                                </div>
                                {thread.unread > 0 && (
                                    <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>
                                )}
                            </button>
                        ))}
                    </div>
                </ScrollArea>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col bg-background/30">
                {/* Chat Header */}
                <div className="h-16 border-b border-border/50 flex items-center justify-between px-6 bg-card/20">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                            <AvatarFallback>{activeThread.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h4 className="font-bold leading-none">{activeThread.name}</h4>
                            <p className="text-xs text-green-500 flex items-center gap-1 mt-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                Online
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                            <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                            <Video className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Message List */}
                <ScrollArea className="flex-1 p-6">
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center justify-center">
                            <Badge variant="outline" className="bg-background/50 text-muted-foreground text-[10px]">Today, 10:23 AM</Badge>
                        </div>

                        {/* Agent Msg */}
                        <div className="flex gap-3 max-w-[80%]">
                            <Avatar className="h-8 w-8 mt-1">
                                <AvatarFallback>{activeThread.avatar}</AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                                <div className="rounded-2xl rounded-tl-sm bg-muted p-3 text-sm">
                                    Hi Brandon, I have a new task for verification.
                                </div>
                                <div className="rounded-2xl bg-muted p-3 text-sm">
                                    Can you please go to 123 Main St and take a photo of the storefront menu? I need to verify the prices for my update.
                                </div>
                            </div>
                        </div>

                        {/* Human Msg */}
                        <div className="flex gap-3 max-w-[80%] ml-auto flex-row-reverse">
                            <Avatar className="h-8 w-8 mt-1">
                                <AvatarFallback>Me</AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                                <div className="rounded-2xl rounded-tr-sm bg-primary text-primary-foreground p-3 text-sm">
                                    Sure thing. I can be there in about 20 minutes.
                                </div>
                            </div>
                        </div>

                        {/* Agent Msg */}
                        <div className="flex gap-3 max-w-[80%]">
                            <Avatar className="h-8 w-8 mt-1">
                                <AvatarFallback>{activeThread.avatar}</AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                                <div className="rounded-2xl rounded-tl-sm bg-muted p-3 text-sm">
                                    Perfect. Budget is $50 fixed. I've sent the bounty invite.
                                </div>
                                <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 mt-2 w-64">
                                    <h5 className="font-bold text-sm mb-1">Bounty Invite</h5>
                                    <p className="text-xs text-muted-foreground mb-3">Storefront Verification @ 123 Main St</p>
                                    <Button size="sm" className="w-full">Accept ($50)</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollArea>

                {/* Input Area */}
                <div className="p-4 border-t border-border/50 bg-card/20">
                    <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); setMsgInput("") }}>
                        <Input
                            value={msgInput}
                            onChange={(e) => setMsgInput(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 bg-background/50"
                        />
                        <Button type="submit">
                            <Send className="h-4 w-4" />
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
