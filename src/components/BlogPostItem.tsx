import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';

interface Post {
  title: string;
  description: string;
  publishedAt: string;
  url: string;
}

interface Props {
  post: Post;
  index: number;
}

const BlogPostItem: React.FC<Props> = ({ post, index }) => {
  return (
    <Card>
    <CardContent>
      <Typography variant="h5" component="div">
        {post.title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {post.description}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {new Date(post.publishedAt).toLocaleDateString()}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small" component={Link} to={{ pathname: `/NewsAPI-App/post/${index}` }}>
        Read More
      </Button>
    </CardActions>
  </Card>
  );
};

export default BlogPostItem;
