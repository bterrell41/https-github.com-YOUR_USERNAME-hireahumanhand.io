"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { SkillsInput } from "@/components/features/profile/SkillsInput"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ProfilePage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight">Profile & Skills</h1>
                    <p className="text-muted-foreground">Manage your public appearance for agents and humans.</p>
                </div>
                <Button>Save Changes</Button>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
                {/* Main Info */}
                <div className="md:col-span-2 space-y-8">
                    <Card className="bg-card/50 border-border/50">
                        <CardHeader>
                            <CardTitle>Basic Information</CardTitle>
                            <CardDescription>How you appear in search results.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-3">
                                <Label>Display Name</Label>
                                <Input defaultValue="Brandon Terrell" className="bg-background/50" />
                            </div>

                            <div className="grid gap-3">
                                <Label>Headline</Label>
                                <Input defaultValue="AI Automation Architect | Lead Gen" className="bg-background/50" />
                            </div>

                            <div className="grid gap-3">
                                <Label>Bio</Label>
                                <div className="text-xs text-muted-foreground text-right w-full">0/500</div>
                                <Textarea
                                    className="bg-background/50 min-h-[120px]"
                                    placeholder="Describe your capabilities for an AI agent. Be literal and specific."
                                    defaultValue="I design, build, and deploy AI-powered agents that replace manual work and generate real revenue."
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-3">
                                    <Label>City</Label>
                                    <Input defaultValue="Dallas" className="bg-background/50" />
                                </div>
                                <div className="grid gap-3">
                                    <Label>State</Label>
                                    <Input defaultValue="Texas" className="bg-background/50" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-card/50 border-border/50">
                        <CardHeader>
                            <CardTitle>Capabilities</CardTitle>
                            <CardDescription>Tags help agents find you via semantic search.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-3">
                                <Label>Skills</Label>
                                <SkillsInput initialSkills={["AI Automation", "Lead Generation", "Python", "Business Process Automation"]} />
                            </div>
                            <div className="grid gap-3">
                                <Label>Rate ($/hr)</Label>
                                <Input type="number" defaultValue="150" className="bg-background/50 w-32" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar Settings */}
                <div className="space-y-8">
                    <Card className="bg-card/50 border-border/50">
                        <CardHeader>
                            <CardTitle>Availability</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between space-x-2">
                                <Label htmlFor="available" className="flex flex-col space-y-1">
                                    <span>Available to hire</span>
                                    <span className="font-normal text-xs text-muted-foreground">Accepting new tasks</span>
                                </Label>
                                <Switch id="available" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between space-x-2">
                                <Label htmlFor="remote" className="flex flex-col space-y-1">
                                    <span>Remote Only</span>
                                    <span className="font-normal text-xs text-muted-foreground">No physical tasks</span>
                                </Label>
                                <Switch id="remote" defaultChecked />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-card/50 border-border/50">
                        <CardHeader>
                            <CardTitle>Avatar</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center gap-4">
                            <Avatar className="w-24 h-24">
                                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Brandon" />
                                <AvatarFallback>BT</AvatarFallback>
                            </Avatar>
                            <Button variant="outline" size="sm">Upload New</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
