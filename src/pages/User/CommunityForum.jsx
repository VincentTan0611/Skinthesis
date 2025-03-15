import React, { useState, useEffect } from 'react';
import { getAuth } from "firebase/auth";
import { collection, addDoc, getDocs, updateDoc, doc, serverTimestamp, query, orderBy, arrayUnion } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import useGetUserProfileByEmail from '../../hooks/useGetUserProfileByEmail';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { MdAttachFile } from "react-icons/md";
import { FaRegThumbsUp, FaThumbsUp, FaRegComment } from "react-icons/fa";

function CommunityForum() {
  const auth = getAuth();
  const user = auth.currentUser;
  const { userProfile } = useGetUserProfileByEmail(user?.email);
  const [previewPhoto, setPreviewPhoto] = useState(null);
  const [selectedOption, setSelectedOption] = useState('latest');
  const [content, setContent] = useState('');
  const [photo, setPhoto] = useState(null);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [uploadMessage, setUploadMessage] = useState('');

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

  // Fetch posts with comments
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsRef = collection(firestore, "forum_posts");
        const q = query(postsRef, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const fetchedPosts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          timeAgo: getTimeAgo(doc.data().createdAt),
          comments: doc.data().comments || [] // Ensure comments array exists
        }));
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Enforce a file size limit of 1MB
      if (file.size > 1024 * 1024) {
        alert("File size should be less than 1MB.");
        return;
      }
      setPhoto(file);
      setPreviewPhoto(URL.createObjectURL(file));
    }
  };

  const handlePostSubmit = async (event) => {
    event.preventDefault();
    if (!content.trim() && !photo) return;
    if (!user) {
      alert("Please log in to post");
      return;
    }
    try {
      let base64Photo = null;
      if (photo) {
        base64Photo = await convertToBase64(photo);
      }
      // Create new post document with correct avatar path
      const postData = {
        userId: user.uid,
        username: userProfile?.displayName || 'Anonymous',
        profilePhoto: userProfile?.profilePicUrl || '/src/images/profile.png',
        content,
        photo: base64Photo,
        createdAt: serverTimestamp(),
        likes: [],
        comments: []
      };
      // Add to Firestore
      const docRef = await addDoc(collection(firestore, "forum_posts"), postData);
      // Update local state with formatted time
      setPosts([{
        ...postData,
        id: docRef.id,
        timeAgo: 'Just now'
      }, ...posts]);
      // Clear form and reset preview
      setContent('');
      setPhoto(null);
      setPreviewPhoto(null);
      setUploadMessage("Your post has been uploaded!");
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Please try again.");
    }
  };

  // Helper function to convert file to base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleLike = async (postId) => {
    if (!user) {
      alert("Please log in to like posts");
      return;
    }
    try {
      const postRef = doc(firestore, "forum_posts", postId);
      const post = posts.find(p => p.id === postId);
      const likes = post.likes || [];
      
      // Simply toggle like without creating notification
      const newLikes = likes.includes(user.uid)
        ? likes.filter(id => id !== user.uid)
        : [...likes, user.uid];
      
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
    if (!user) {
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
        userId: user.uid,
        username: userProfile?.displayName || 'Anonymous',
        profilePhoto: userProfile?.profilePicUrl || '/src/images/profile.png',
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
            comments: [...post.comments, { ...newComment, timeAgo: 'Just now' }]
          };
        }
        return post;
      });

      setPosts(updatedPosts);
      setCommentText('');
      setSelectedPost(updatedPosts.find(p => p.id === selectedPost.id));
    } catch (error) {
      console.error("Error posting comment:", error);
      alert("Failed to post comment. Please try again.");
    }
  };  

  // Sort posts based on the selected option
  const sortedPosts = selectedOption === 'most liked'
    ? [...posts].sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0))
    : posts;

  return (
    <>
      <Header />
      <div style={styles.wrapper}>
        <div style={styles.container}>
          <main style={styles.main}>
            <aside style={styles.sidebar}>
              <h4 style={styles.sidebarTitle}>Sort posts by:</h4>
              <label style={styles.radioLabel}>
                <input
                  type="radio"
                  value="latest"
                  checked={selectedOption === 'latest'}
                  onChange={handleOptionChange}
                  style={{
                    ...styles.radio,
                    ...(selectedOption === 'latest' && styles.radioChecked),
                  }}
                />
                Latest
              </label>
              <label style={styles.radioLabel}>
                <input
                  type="radio"
                  value="most liked"
                  checked={selectedOption === 'most liked'}
                  onChange={handleOptionChange}
                  style={{
                    ...styles.radio,
                    ...(selectedOption === 'most liked' && styles.radioChecked),
                  }}
                />
                Most liked
              </label>
            </aside>
            <div style={styles.contentArea}>
              <p style={styles.myPosts}>
                <a href="/myposts" style={styles.clickHere}>Click here</a> to view all the posts you've made.
              </p>
              <div style={styles.uploadArea}>
                <textarea
                  value={content}
                  onChange={handleContentChange}
                  placeholder="Write something here..."
                  rows="3"
                  style={styles.textarea}
                />
                {previewPhoto && (
                  <div style={styles.imagePreviewContainer}>
                    <img src={previewPhoto} alt="Preview" style={styles.imagePreview} />
                    <button
                      style={styles.removeImageButton}
                      onClick={() => { setPhoto(null); setPreviewPhoto(null); }}
                    >
                      ✖
                    </button>
                  </div>
                )}
                <div style={styles.spacing}>
                  <div style={{ display: "flex", alignItems: "flex-end", gap: "8px" }}>
                    <label htmlFor="fileUpload" style={styles.attachFileIcon}>
                      <input
                        type="file"
                        id="fileUpload"
                        style={{ display: "none" }}
                        onChange={handlePhotoChange}
                      />
                      <MdAttachFile />
                    </label>
                  </div>
                  <button
                    style={styles.uploadButton}
                    onClick={handlePostSubmit}
                    onMouseEnter={(e) => e.target.style.opacity = "0.7"}
                    onMouseLeave={(e) => e.target.style.opacity = "1"}
                  >
                    Upload
                  </button>
                </div>
              </div>
              {uploadMessage && (
                <p style={styles.uploadSuccess}>{uploadMessage}</p>
              )}
              {sortedPosts.map(post => (
                <div key={post.id} style={styles.post}>
                  <div style={styles.postHeader}>
                    <img src={post.profilePhoto} alt="Profile" style={styles.profilePhoto} />
                    <h4 style={styles.username}>{post.username}</h4>
                    <span style={styles.timePosted}>{post.timeAgo}</span>
                  </div>
                  <p style={styles.postContent}>{post.content}</p>
                  {post.photo && <img src={post.photo} alt="User upload" style={styles.postImage} />}
                  <div style={styles.actions}>
                    <span style={styles.likeButton} onClick={() => handleLike(post.id)}>
                      {post.likes.includes(user?.uid) ? <FaThumbsUp color="#B12E34" size={18} /> : <FaRegThumbsUp size={18} />}
                      <span style={{ ...styles.likeCount, color: post.likes.includes(user?.uid) ? "#B12E34" : "#333" }}>
                        {post.likes.length}
                      </span>
                    </span>
                    <span style={styles.commentButton} onClick={() => handleOpenComments(post)}>
                      <FaRegComment size={18} />
                      <span style={styles.commentCount}>{post.comments.length}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
      {showCommentModal && selectedPost && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3 style={styles.modalTitle}>Comments</h3>
            <hr /><br />
            <button
              style={{ ...styles.closeButton, opacity: '1' }}
              onClick={handleCloseComments}
              onMouseEnter={(e) => e.target.style.opacity = "0.7"}
              onMouseLeave={(e) => e.target.style.opacity = "1"}
            >
              ✖
            </button>
            <div style={styles.commentContainer}>
              {selectedPost.comments && selectedPost.comments.map((comment, index) => (
                <div key={index} style={styles.comment}>
                  <div style={styles.commentHeader}>
                    <img
                      src={comment.profilePhoto || '/src/images/profile.png'}
                      alt="Profile"
                      style={styles.commentProfilePhoto}
                    />
                    <strong style={styles.commentUsername}>
                      {comment.username || 'Anonymous'}
                    </strong>
                  </div>
                  <p style={styles.commentContent}>{comment.content}</p>
                </div>
              ))}
            </div>
            <div style={styles.commentInputContainer}>
              <form
                style={{ display: 'flex', gap: '8px', flex: 1 }}
                onSubmit={(e) => { e.preventDefault(); handlePostComment(); }}
              >
                <input
                  type="text"
                  placeholder="Type your comment here..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  style={styles.commentInput}
                />
                <button
                  type="submit"
                  style={styles.commentPostButton}
                  onMouseEnter={(e) => e.target.style.opacity = "0.7"}
                  onMouseLeave={(e) => e.target.style.opacity = "1"}
                >
                  Post
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

const styles = {
  wrapper: {
    maxWidth: '1200px',
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    padding: '20px',
    minHeight: '81vh',
  },
  container: {
    display: 'flex',
    gap: '20px',
    flex: 1,
    flexDirection: 'column',
  },
  main: {
    flex: 1,
    display: 'flex',
    marginTop: '80px',
  },
  sidebar: {
    width: '200px',
    paddingTop: '14px',
    borderRadius: '8px',
  },
  sidebarTitle: {
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  radioLabel: {
    display: 'block',
    marginBottom: '10px',
    fontSize: '14px',
  },
  radio: {
    width: '17px',
    height: '17px',
    appearance: 'none',
    border: '2px solid #E2E8F0',
    borderRadius: '50%',
    backgroundColor: 'white',
    position: 'relative',
    cursor: 'pointer',
    outline: 'none',
    marginRight: '10px',
  },
  radioChecked: {
    border: '5.5px solid #B12E34',
    backgroundColor: 'white',
  },
  contentArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  myPosts: {
    textAlign: 'right',
    fontSize: '12px',
    paddingBottom: '2px',
  },
  clickHere: {
    color: '#b12e34',
    fontWeight: 'bold',
  },
  uploadArea: {
    padding: '12px 20px',
    border: '2px solid #000000',
    borderRadius: '15px',
    marginBottom: '15px',
  },
  textarea: {
    width: '98%',
    height: '80px',
    borderRadius: '5px',
    marginBottom: '5px',
    fontSize: '14px',
    outline: 'none',
    resize: 'none',
    backgroundColor: 'white',
  },
  spacing: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fileInput: {
    position: 'relative',
    display: 'none',
  },
  attachFileIcon: {
    cursor: 'pointer',
    fontSize: '28px',
    color: 'black',
  },
  uploadButton: {
    padding: '10px 20px',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#b12e34',
    borderRadius: '10px',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'opacity 0.3s',
  },
  uploadSuccess: {
    color: '#b12e34',
    fontWeight: 'bold',
    marginTop: '-10px',
    marginBottom: '5px',
    textAlign: 'left',
    fontSize: '12px'
  },
  post: {
    backgroundColor: '#f7eaeb',
    padding: '25px',
    borderRadius: '15px',
    position: 'relative',
    marginBottom: '15px',
  },
  postHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profilePhoto: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    marginRight: '10px',
    objectFit: 'cover'
  },
  username: {
    fontWeight: 'bold',
    marginRight: 'auto',
  },
  timePosted: {
    fontSize: '12px',
    color: 'gray',
    marginTop: '-40px',
  },
  postContent: {
    fontSize: '14px',
    marginBottom: '12px',
    marginLeft: '50px',
    marginRight: '20px',
  },
  postImage: {
    maxHeight: '200px',
    borderRadius: '5px',
    marginBottom: '12px',
    marginLeft: '50px',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '10px',
  },
  likeButton: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontWeight: 'bold',
  },
  likeCount: {
    fontSize: '12px',
    color: '#333',
  },
  commentButton: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontWeight: 'bold',
    color: '#333',
    marginLeft: '5px',
  },
  commentCount: {
    fontSize: '12px',
    color: '#333',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#fff',
    padding: '20px 40px',
    borderRadius: '15px',
    width: '1000px',
    height: '600px',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column'
  },
  modalTitle: {
    textAlign: 'center',
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '15px',
  },
  commentContainer: {
    flex: 1,
    overflowY: 'auto',
    maxHeight: '400px',
  },
  closeButton: {
    position: 'absolute',
    top: '15px',
    right: '25px',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    fontSize: '16px',
  },
  comment: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '16px', 
    gap: '5px',
  },
  commentHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  commentProfilePhoto: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
  },
  commentContent: {
    fontSize: '14px',
    paddingLeft: '55px',
    paddingBottom: '20px',
  },
  commentInputContainer: {
    display: 'flex',
    gap: '8px',
    position: 'absolute',
    bottom: '20px',
    left: '20px',
    right: '20px',
    backgroundColor: 'white',
    padding: '10px',
    alignItems: 'center',
  },
  commentInput: {
    flex: 1,
    padding: '10px 15px',
    borderRadius: '15px',
    border: '2px solid black',
    fontSize: '14px',
    height: '40px',
    backgroundColor: 'white',
  },
  commentPostButton: {
    padding: '10px 20px',
    fontSize: '13px',
    fontWeight: 'bold',
    height: '40px',
    color: '#fff',
    backgroundColor: 'rgba(177, 46, 52)',
    border: 'none',
    borderRadius: '15px',
    cursor: 'pointer',
    textAlign: 'center',
    display: 'block',
    transition: 'opacity 0.3s',
  },
  imagePreview: {
    maxWidth: "100%",
    maxHeight: "150px",
    objectFit: "contain",
    marginTop: "10px",
    borderRadius: "10px",
    display: "block",
    marginBottom: "10px"
  },
  imagePreviewContainer: {
    position: "relative",
    display: "inline-block",
  },
  removeImageButton: {
    position: "absolute",
    top: "5px",
    right: "-10px",
    backgroundColor: "rgba(0,0,0,0.5)",
    border: "none",
    borderRadius: "50%",
    color: "#fff",
    width: "24px",
    height: "24px",
    cursor: "pointer",
    display: "flex",
    alignItems: "right",
    justifyContent: "center",
  }
};

export default CommunityForum;