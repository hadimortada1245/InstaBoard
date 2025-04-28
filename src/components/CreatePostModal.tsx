
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from 'sonner';
import { Post } from './PostGrid';

interface CreatePostModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPostCreated: (post: Post) => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ open, onOpenChange, onPostCreated }) => {
  const [caption, setCaption] = useState('');
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [isVideo, setIsVideo] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Check if file is video or image
    const isVideoFile = file.type.startsWith('video/');
    setIsVideo(isVideoFile);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setMediaPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    
    setMediaFile(file);
  };

  const handleSubmit = async () => {
    if (!mediaFile || !caption) {
      toast.error("Please add both media and caption");
      return;
    }

    setIsUploading(true);

    setTimeout(() => {

      const newPost: Post = {
        id: `post-${Date.now()}`,
        imageUrl: mediaPreview as string,
        caption,
        likes: 0,
        comments: 0,
        isVideo,
        views: isVideo ? 0 : undefined,
        date: new Date().toLocaleString()
      };
      
      onPostCreated(newPost);
      toast.success("Post created successfully!");
      setIsUploading(false);
      resetForm();
      onOpenChange(false);
    }, 2000);
  };

  const resetForm = () => {
    setCaption('');
    setMediaFile(null);
    setMediaPreview(null);
    setIsVideo(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
          <DialogDescription>
            Upload and share a new post to Instagram and your dashboard
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="upload">Upload Media</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="space-y-4">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="media">Select Image or Video</Label>
                <Input 
                  id="media" 
                  type="file" 
                  accept="image/*,video/*" 
                  onChange={handleFileChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="caption">Caption</Label>
                <Textarea 
                  id="caption" 
                  placeholder="Write a caption..." 
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="preview">
            {mediaPreview ? (
              <div className="space-y-4">
                <div className="border rounded-md overflow-hidden">
                  {isVideo ? (
                    <video src={mediaPreview} controls className="w-full" />
                  ) : (
                    <img src={mediaPreview} alt="Preview" className="w-full" />
                  )}
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="font-semibold">Caption:</p>
                  <p className="text-gray-700">{caption || "No caption added yet"}</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-40">
                <p className="text-gray-500">No media selected</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isUploading}>
            {isUploading ? "Uploading..." : "Post to Instagram"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostModal;
