import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogPostItem from "./BlogPostItem";
import { Container, Grid, Typography, Button, Toolbar, IconButton, AppBar, Box } from '@mui/material';
interface Post {
  title: string;
  description: string;
  publishedAt: string;
  url: string;
}

const BlogPostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);

  const fetchPosts = async (page: number) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=us&page=${page}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
      );
      setPosts(response.data.articles);
      setLoading(false);
    } catch (error) {
      setError("Error fetching posts");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            News App
          </Typography>
          <Button color="inherit" onClick={handlePrevPage} disabled={page === 1}>
            Previous
          </Button>
          <Button color="inherit" onClick={handleNextPage}>
            Next
          </Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Grid container spacing={4} style={{ marginTop: '1rem' }}>
          {posts.map((post, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <BlogPostItem post={post} index={index} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Box component="footer" sx={{ py: 2, textAlign: 'center', backgroundColor: '#f0f0f0', marginTop: '2rem' }}>
        <Typography variant="body2" color="textSecondary">
          Made by Salman Hanafee
        </Typography>
      </Box>
    </>
  );
};

export default BlogPostList;
