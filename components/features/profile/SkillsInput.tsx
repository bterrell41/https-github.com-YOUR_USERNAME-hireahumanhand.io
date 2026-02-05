"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"
import { useState } from "react"

export const SkillsInput = ({ initialSkills = [] }: { initialSkills?: string[] }) => {
    const [skills, setSkills] = useState<string[]>(initialSkills)
    const [inputValue, setInputValue] = useState("")

    const addSkill = () => {
        if (inputValue.trim() && !skills.includes(inputValue.trim())) {
            setSkills([...skills, inputValue.trim()])
            setInputValue("")
        }
    }

    const removeSkill = (skillToRemove: string) => {
        setSkills(skills.filter(s => s !== skillToRemove))
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            addSkill()
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex gap-2">
                <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a skill and press enter..."
                    className="bg-background/50"
                />
                <Button onClick={addSkill} type="button" variant="secondary">Add</Button>
            </div>

            <div className="flex flex-wrap gap-2 min-h-[40px] p-4 rounded-lg border border-border/50 bg-background/20">
                {skills.length === 0 && <span className="text-sm text-muted-foreground">No skills added yet.</span>}
                {skills.map(skill => (
                    <Badge key={skill} variant="secondary" className="pl-3 pr-1 py-1 gap-1 text-sm">
                        {skill}
                        <button onClick={() => removeSkill(skill)} type="button" className="hover:text-destructive">
                            <X className="w-3 h-3" />
                        </button>
                    </Badge>
                ))}
            </div>
        </div>
    )
}
