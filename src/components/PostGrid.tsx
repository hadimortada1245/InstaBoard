
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export interface Post {
  id: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  isVideo: boolean;
  views?: number;
  date: string;
}

interface PostGridProps {
  posts: Post[];
}

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <Card className="overflow-hidden group">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={post.imageUrl}
          alt={post.caption}
          className="object-cover w-full h-full transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex gap-4 text-white">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
              {post.likes}
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" /></svg>
              {post.comments}
            </div>
            {post.isVideo && post.views && (
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                {post.views}
              </div>
            )}
          </div>
        </div>
        {post.isVideo && (
          <div className="absolute top-2 right-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3" /></svg>
          </div>
        )}
      </div>
      <CardContent className="p-3">
        <p className="text-sm text-gray-600 line-clamp-2">{post.caption}</p>
        <p className="text-xs text-gray-400 mt-1">{post.date}</p>
      </CardContent>
    </Card>
  );
};

const PostGrid: React.FC<PostGridProps> = ({ posts }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostGrid;
