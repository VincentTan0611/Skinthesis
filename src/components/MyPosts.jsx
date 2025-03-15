import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, onSnapshot, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  Icon,
  Image
} from '@chakra-ui/react';
import { FaThumbsUp, FaRegThumbsUp, FaRegComment } from 'react-icons/fa';
import { MdAttachFile } from 'react-icons/md';
import Header from '../components/Header';
import Footer from '../components/Footer';

function MyPosts() {
  const auth = getAuth();
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [commentText, setCommentText] = useState('');

  // Format timestamp to relative time
  const getTimeAgo = (timestamp) => {
    if (!timestamp) return '';
    const seconds = Math.floor((new Date() - timestamp.toDate()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + ' years ago';
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + ' months ago';
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + ' days ago';
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + ' hours ago';
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + ' minutes ago';
    return Math.floor(seconds) + ' seconds ago';
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribeAuth();
  }, [auth]);

  // Fetch posts by the current user
  useEffect(() => {
    if (currentUser) {
      const postsRef = collection(firestore, 'forum_posts');
      const q = query(postsRef, where('userId', '==', currentUser.uid));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const fetchedPosts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          timeAgo: getTimeAgo(doc.data().createdAt)
        }));
        setPosts(fetchedPosts);
      });

      return () => unsubscribe();
    }
  }, [currentUser]);

  const handleLike = async (postId) => {
    if (!currentUser) {
      alert("Please log in to like posts");
      return;
    }
    try {
      const postRef = doc(firestore, "forum_posts", postId);
      const post = posts.find(p => p.id === postId);
      const likes = post.likes || [];
      
      const newLikes = likes.includes(currentUser.uid)
        ? likes.filter(id => id !== currentUser.uid)
        : [...likes, currentUser.uid];
      
      await updateDoc(postRef, { likes: newLikes });
      setPosts(posts.map(post =>
        post.id === postId ? { ...post, likes: newLikes } : post
      ));
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  const handleOpenComments = (post) => {
    setSelectedPost(post);
    setShowCommentModal(true);
  };

  const handleCloseComments = () => {
    setShowCommentModal(false);
    setSelectedPost(null);
    setCommentText('');
  };

  const handlePostComment = async () => {
    if (!currentUser) {
      alert("Please log in to comment");
      return;
    }
    if (!commentText.trim()) {
      alert("Please enter a comment.");
      return;
    }
    if (!selectedPost) {
      alert("No post selected for commenting.");
      return;
    }
    try {
      const newComment = {
        userId: currentUser.uid,
        username: currentUser.displayName || 'Anonymous',
        profilePhoto: currentUser.photoURL || '/src/images/profile.png',
        content: commentText.trim(),
        createdAt: new Date().toISOString()
      };
  
      const postRef = doc(firestore, "forum_posts", selectedPost.id);
      await updateDoc(postRef, {
        comments: arrayUnion(newComment)
      });
  
      const updatedPosts = posts.map(post => {
        if (post.id === selectedPost.id) {
          return {
            ...post,
            comments: [...(post.comments || []), { ...newComment, timeAgo: 'Just now' }]
          };
        }
        return post;
      });
  
      setPosts(updatedPosts);
      setCommentText('');
      setSelectedPost(updatedPosts.find(p => p.id === selectedPost.id));
    } catch (error) {
      console.error("Error posting comment:", error.message);
      alert("Failed to post comment. Please try again.");
    }
  };

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header />
      
      <Box bg="#ffffff" flex="1" py="6">
        <Container maxW="container.lg" pt="100px">
          <Heading as="h2" fontSize="2xl" color="black" textAlign="center" mb="6">
            My Posts
          </Heading>
          {posts.length === 0 ? (
            <Text textAlign="center" color="grey" fontSize={14}>No posts found.</Text>
          ) : (
            posts.map((post) => (
              <Box
                key={post.id}
                bg="#B12E341A"
                borderRadius="10px"
                p="6"
                maxW="80%"
                mx="auto"
                mb="6"
              >
                <Flex align="center" justify="space-between" mb="3">
                  <Flex align="center">
                    <Image
                      src={post.profilePhoto || '/src/images/profile.png'}
                      alt="Profile"
                      boxSize="40px"
                      borderRadius="full"
                      mr="3"
                    />
                    <Text fontWeight="bold" fontSize="lg" color="#333">
                      {post.username || 'Anonymous'}
                    </Text>
                  </Flex>
                  <Text fontSize="12px" color="gray">
                    {post.timeAgo}
                  </Text>
                </Flex>
                <Text fontSize="14px" color="#333" mb="4" lineHeight="1.5" pl="55px">
                  {post.content}
                </Text>
                {post.photo && (
                  <Image
                    src={post.photo}
                    alt="Post"
                    maxH="200px"
                    borderRadius="5px"
                    ml="50px"
                    mb="4"
                  />
                )}
                <Flex justify="flex-end" gap="3" mt="2">
                  <Flex
                    align="center"
                    cursor="pointer"
                    onClick={() => handleLike(post.id)}
                  >
                    <Icon
                      as={post.likes?.includes(currentUser?.uid) ? FaThumbsUp : FaRegThumbsUp}
                      color={post.likes?.includes(currentUser?.uid) ? "#B12E34" : "#333"}
                      boxSize="18px"
                      mr="1"
                    />
                    <Text fontSize="12px" color={post.likes?.includes(currentUser?.uid) ? "#B12E34" : "#333"}>
                      {post.likes?.length || 0}
                    </Text>
                  </Flex>
                  <Flex
                    align="center"
                    cursor="pointer"
                    onClick={() => handleOpenComments(post)}
                  >
                    <Icon
                      as={FaRegComment}
                      color="#333"
                      boxSize="18px"
                      mr="1"
                    />
                    <Text fontSize="12px" color="#333">
                      {post.comments?.length || 0}
                    </Text>
                  </Flex>
                </Flex>
              </Box>
            ))
          )}
        </Container>
      </Box>

      {showCommentModal && selectedPost && (
        <Box
          position="fixed"
          top="0"
          left="0"
          w="100%"
          h="100%"
          bg="rgba(0, 0, 0, 0.5)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex={1000}
        >
          <Box
            bg="white"
            p="6"
            borderRadius="15px"
            w="1000px"
            h="600px"
            position="relative"
          >
            <Heading as="h3" textAlign="center" fontSize="20px" mb="4">
              Comments
            </Heading>
            <Box
              as="button"
              position="absolute"
              top="15px"
              right="25px"
              onClick={handleCloseComments}
              bg="transparent"
              border="none"
              cursor="pointer"
              fontSize="16px"
              _hover={{ opacity: 0.7 }}
            >
              ✖
            </Box>
            <Box flex="1" overflowY="auto" maxH="400px" mt="4">
              {selectedPost.comments?.map((comment, index) => (
                <Box key={index} mb="4">
                  <Flex align="center" gap="3">
                    <Image
                      src={comment.profilePhoto || '/src/images/profile.png'}
                      alt="Profile"
                      boxSize="40px"
                      borderRadius="full"
                    />
                    <Text fontWeight="bold">
                      {comment.username || 'Anonymous'}
                    </Text>
                  </Flex>
                  <Text fontSize="14px" pl="55px" pb="5">
                    {comment.content}
                  </Text>
                </Box>
              ))}
            </Box>
            <Flex
              position="absolute"
              bottom="20px"
              left="20px"
              right="20px"
              gap="2"
              bg="white"
              p="3"
            >
              <Box
                as="input"
                flex="1"
                p="3"
                borderRadius="15px"
                border="2px solid black"
                fontSize="14px"
                h="40px"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Type your comment here..."
              />
              <Box
                as="button"
                px="5"
                fontSize="13px"
                fontWeight="bold"
                h="40px"
                color="white"
                bg="#B12E34"
                border="none"
                borderRadius="15px"
                cursor="pointer"
                onClick={handlePostComment}
                _hover={{ opacity: 0.7 }}
              >
                Post
              </Box>
            </Flex>
          </Box>
        </Box>
      )}

      <Footer />
    </Box>
  );
}

export default MyPosts;