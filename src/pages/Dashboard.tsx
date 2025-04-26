
import React, { useState } from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import { Button } from '@/components/ui/button';
import Analytics from '@/components/Analytics';
import PostGrid, { Post } from '@/components/PostGrid';
import CreatePostModal from '@/components/CreatePostModal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Dashboard: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      imageUrl: 'https://images.unsplash.com/photo-1610222034376-8dd1149e0e60',
      caption: 'Beautiful sunset at the beach #sunset #beach #summer',
      likes: 243,
      comments: 15,
      isVideo: false,
      date: '2025-04-25'
    },
    {
      id: '2',
      imageUrl: 'https://images.unsplash.com/photo-1576828831022-ca381280481a',
      caption: 'Morning coffee vibes ☕️ #coffee #morning #routine',
      likes: 187,
      comments: 8,
      isVideo: false,
      date: '2025-04-23'
    },
    {
      id: '3',
      imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438',
      caption: 'City lights at night 🌃 #cityscape #night #urban',
      likes: 532,
      comments: 32,
      isVideo: true,
      views: 1240,
      date: '2025-04-21'
    },
    {
      id: '4',
      imageUrl: 'https://images.unsplash.com/photo-1675789652972-ee2d91ae0830',
      caption: 'Weekend hike with friends #nature #hiking #adventure',
      likes: 421,
      comments: 24,
      isVideo: false,
      date: '2025-04-19'
    },
    {
      id: '5',
      imageUrl: 'https://images.unsplash.com/photo-1604431696980-07e518647aec',
      caption: 'Trying out new recipes in the kitchen 👨‍🍳 #cooking #foodie',
      likes: 298,
      comments: 19,
      isVideo: true,
      views: 863,
      date: '2025-04-17'
    },
    {
      id: '6',
      imageUrl: 'https://images.unsplash.com/photo-1682687982502-1529b3b4a85b',
      caption: 'Working from the new cafe downtown #workremote #coffee',
      likes: 176,
      comments: 11,
      isVideo: false,
      date: '2025-04-15'
    }
  ]);

  const handlePostCreated = (newPost: Post) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <main className="container mx-auto py-6 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button onClick={() => setIsCreateModalOpen(true)}>Create Post</Button>
        </div>
        
        <Tabs defaultValue="analytics" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="posts">Posts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="analytics" className="animate-fade-in">
            <Analytics />
          </TabsContent>
          
          <TabsContent value="posts" className="animate-fade-in">
            {posts.length > 0 ? (
              <PostGrid posts={posts} />
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No posts yet</h3>
                <p className="text-gray-500 mb-4">Create your first post to get started</p>
                <Button onClick={() => setIsCreateModalOpen(true)}>Create Post</Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
      
      <CreatePostModal 
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        onPostCreated={handlePostCreated}
      />
    </div>
  );
};

export default Dashboard;
