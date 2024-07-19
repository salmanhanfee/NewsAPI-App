import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Container, Typography, Card, CardContent, CardMedia, Box,Button, Toolbar, IconButton, AppBar } from '@mui/material';

interface Post {
  title: string;
  content: string;
  urlToImage: string;
  description: string;
  publishedAt: string;
  url: string;
}

const BlogPostDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const location = useLocation();
  const page = location.state?.page || 1;

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&page=${page}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`);
          console.log("The response from API :",response)
          const postIndex = parseInt(id, 10);
          if (!isNaN(postIndex) && response.data.articles[postIndex]) {
            setPost(response.data.articles[postIndex]);
          } else {
            setPost(null);
          }
        } catch (error) {
          console.error('Error fetching post data', error);
        }
      };

      fetchPost();
    }
  }, [id, page]);

  if (!post) return <div>Loading...</div>;

  return (
    <>
    <AppBar position="static">
    <Toolbar>
      <IconButton edge="start" color="inherit" aria-label="menu">
      </IconButton>
      <Typography variant="h6" style={{ flexGrow: 1 }}>
        News App
      </Typography>
      <Button color="inherit" component={Link} to="/NewsAPI-App">
        Back to list
      </Button>
    </Toolbar>
  </AppBar>
    <Container>
    <Card>
      <CardContent>
        <Typography variant="h4" component="div">
          {post.title}
        </Typography>
      {post.urlToImage && <CardMedia component="img" image={post.urlToImage} alt={post.title} />}
        <Typography variant="body1" color="text.secondary" paragraph>
          {post.content || post.description}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {new Date(post.publishedAt).toLocaleDateString()}
        </Typography>
      </CardContent>
    </Card>
    <Box marginTop={2}>
      <Button variant="contained" color="primary" component={Link} to="/NewsAPI-App">
        Back to list
      </Button>
    </Box>
  </Container>
  <Box component="footer" sx={{ py: 2, textAlign: 'center', backgroundColor: '#f0f0f0', marginTop: '2rem' }}>
        <Typography variant="body2" color="textSecondary">
          Made by Salman Hanafee
        </Typography>
      </Box>
  </>
  );
};

export default BlogPostDetails;
