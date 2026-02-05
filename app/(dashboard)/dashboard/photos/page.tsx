import { createServerSupabaseClient } from '@/lib/db/supabase-server'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Image as ImageIcon, Trash2 } from "lucide-react"
import { redirect } from 'next/navigation'

export default async function PhotosPage() {
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // Mock photos for MVP since we don't have storage buckets set up yet
    // In real implementation, this would query supabase.storage
    const photos = [
        { id: 1, url: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=400&fit=crop', name: 'Workplace_Setup.jpg' },
        { id: 2, url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=400&fit=crop', name: 'ID_Verification.jpg' },
    ]

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Photos & Verification</h1>
                    <p className="text-muted-foreground">Upload photos to prove your humanity and workspace quality.</p>
                </div>
                <Button>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload New
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {photos.map((photo) => (
                    <Card key={photo.id} className="bg-card/50 border-border/50 overflow-hidden group">
                        <div className="aspect-square relative flex items-center justify-center bg-black/20">
                            <img src={photo.url} alt={photo.name} className="object-cover w-full h-full" />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <Button variant="secondary" size="icon">
                                    <ImageIcon className="h-4 w-4" />
                                </Button>
                                <Button variant="destructive" size="icon">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <CardFooter className="p-3">
                            <p className="text-xs text-muted-foreground truncate w-full">{photo.name}</p>
                        </CardFooter>
                    </Card>
                ))}

                <Card className="bg-card/30 border-dashed border-border/50 flex flex-col items-center justify-center p-6 text-center hover:bg-card/50 transition-colors cursor-pointer min-h-[250px]">
                    <div className="p-4 bg-primary/10 rounded-full mb-4 text-primary">
                        <Upload className="h-6 w-6" />
                    </div>
                    <h3 className="font-medium">Upload Photo</h3>
                    <p className="text-xs text-muted-foreground mt-1 max-w-[150px]">
                        Drag & drop or click to upload proof of work.
                    </p>
                </Card>
            </div>
        </div>
    )
}
