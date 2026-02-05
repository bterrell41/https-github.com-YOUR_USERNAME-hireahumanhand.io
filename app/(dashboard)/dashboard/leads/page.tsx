"use client"

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/db/supabase'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Activity, AlertTriangle, CheckCircle2, MapPin } from 'lucide-react'

type Lead = {
    id: string
    source: string
    vertical: string
    city: string | null
    state: string | null
    evidence_url: string | null
    intent_score: number | null
    risk_flags: string[] | null
    created_at: string
}

export default function LeadsPage() {
    const [leads, setLeads] = useState<Lead[]>([])
    const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'error'>('connecting')

    useEffect(() => {
        const supabase = createClient()

        // Initial fetch (if we want history, but user said DO NOT SELECT for publisher, 
        // but this is subscriber so we might want recent ones. For now, empty start is fine or fetch last 50)
        const fetchLeads = async () => {
            const { data, error } = await supabase
                .from('leads')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(50)

            if (!error && data) {
                setLeads(data)
                setConnectionStatus('connected')
            } else {
                console.error(error)
                // Even if fetch fails (RLS?), we might still get realtime events if allowed?
                // But usually RLS blocks both. Assuming user sets RLS correctly.
            }
        }

        fetchLeads()

        const channel = supabase
            .channel('public:leads')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'leads' },
                (payload) => {
                    console.log('New lead:', payload.new)
                    setLeads((current) => [payload.new as Lead, ...current])
                }
            )
            .subscribe((status) => {
                if (status === 'SUBSCRIBED') {
                    setConnectionStatus('connected')
                }
            })

        return () => {
            supabase.removeChannel(channel)
        }
    }, [])

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Live Leads</h1>
                    <div className="flex items-center gap-2 mt-2">
                        <span className={`h-2 w-2 rounded-full ${connectionStatus === 'connected' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                        <p className="text-sm text-muted-foreground">
                            {connectionStatus === 'connected' ? 'Listening for new opportunities...' : 'Connecting...'}
                        </p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-2xl font-mono font-bold">{leads.length}</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest">Leads Found</p>
                </div>
            </div>

            <ScrollArea className="h-[calc(100vh-12rem)] rounded-xl border border-border/50 bg-card/30 p-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {leads.map((lead) => (
                        <Card key={lead.id} className="overflow-hidden border-border/50 bg-card/40 hover:bg-card/60 transition-colors animate-in fade-in slide-in-from-top-4 duration-500">
                            <div className={`h-1 w-full ${lead.intent_score && lead.intent_score > 0.8 ? 'bg-green-500' : 'bg-primary/20'}`}></div>
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <Badge variant="outline" className="text-[10px] font-mono">{lead.vertical}</Badge>
                                    <span className="text-xs text-muted-foreground font-mono">
                                        {new Date(lead.created_at).toLocaleTimeString()}
                                    </span>
                                </div>
                                <CardTitle className="text-base truncate" title={lead.evidence_url || ''}>
                                    {lead.evidence_url ? new URL(lead.evidence_url).hostname : 'No Source'}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <MapPin className="h-3 w-3" />
                                    {lead.city}, {lead.state}
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase text-muted-foreground">Intent</span>
                                        <span className={`font-bold ${lead.intent_score && lead.intent_score > 0.8 ? 'text-green-500' : 'text-foreground'}`}>
                                            {lead.intent_score ? Math.round(lead.intent_score * 100) : 0}%
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-[10px] uppercase text-muted-foreground">Source</span>
                                        <span className="font-bold">{lead.source}</span>
                                    </div>
                                </div>

                                {lead.risk_flags && lead.risk_flags.length > 0 && (
                                    <div className="flex flex-wrap gap-1 pt-2">
                                        {lead.risk_flags.map((flag, i) => (
                                            <Badge key={i} variant="destructive" className="h-5 px-1.5 text-[10px]">
                                                <AlertTriangle className="h-3 w-3 mr-1" />
                                                {flag}
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}

                    {leads.length === 0 && (
                        <div className="col-span-full h-40 flex flex-col items-center justify-center text-muted-foreground border border-dashed border-border/50 rounded-lg">
                            <Activity className="h-8 w-8 mb-2 opacity-20" />
                            <p>Waiting for incoming data...</p>
                        </div>
                    )}
                </div>
            </ScrollArea>
        </div>
    )
}
