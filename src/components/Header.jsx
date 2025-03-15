import React, { useState, useEffect, useRef } from 'react';
import Menu from './Menu';
import useLogout from '../hooks/useLogout';
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { collection, query, where, getDocs, onSnapshot, orderBy, updateDoc, doc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import defaultProfileImage from '../images/profile.png';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImage, setProfileImage] = useState(defaultProfileImage);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();
  const profileRef = useRef(null);
  const notificationRef = useRef(null);
  const { handleLogout } = useLogout();
  const auth = getAuth();
  const user = auth.currentUser;

  // Update profile image from Firestore
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user?.email) {
        try {
          // Query Firestore for user profile
          const q = query(
            collection(firestore, "users"),
            where("email", "==", user.email)
          );
          const querySnapshot = await getDocs(q);
          
          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();    
            if (userData.profilePicUrl) {
              setProfileImage(userData.profilePicUrl);
            } else {
              setProfileImage(defaultProfileImage);
            }

            // Set up notifications listener
            const notificationsQuery = query(
              collection(firestore, "notifications"),
              where("toUserId", "==", userData.uid),
              orderBy("createdAt", "desc")
            );

            const unsubscribeNotifications = onSnapshot(notificationsQuery, (snapshot) => {
              const notificationsList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
              }));
              setNotifications(notificationsList);
              setUnreadCount(notificationsList.filter(n => !n.read).length);
            });

            return () => unsubscribeNotifications();
          }
        } catch (error) {
          console.error("Error fetching user profile in header:", error);
          setProfileImage(defaultProfileImage);
        }
      } else {
        setProfileImage(defaultProfileImage);
      }
    });

    return () => unsubscribe();
  }, []);

  // Check login state
  useEffect(() => {
    const updateLoginState = () => {
      const userInfo = localStorage.getItem('user-info');
     
      setIsLoggedIn(!!userInfo);
    };

    updateLoginState();
    window.addEventListener('storage', updateLoginState);

    return () => {
      window.removeEventListener('storage', updateLoginState);
    };
  }, []);

  // Close profile menu and notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Update the notification fetching logic
  useEffect(() => {
    if (!user) return;

    const fetchNotifications = async () => {
      try {
        // Get all posts where the current user is the owner
        const postsRef = collection(firestore, "forum_posts");
        const q = query(postsRef, where("userId", "==", user.uid));
        
        const unsubscribe = onSnapshot(q, async (snapshot) => {
          let newNotifications = [];
          
          for (const doc of snapshot.docs) {
            const post = doc.data();
            const postId = doc.id;

            // Get notifications from likes
            const likes = post.likes || [];
            const newLikes = likes.filter(userId => userId !== user.uid);

            // Get user info for each like
            for (const likeUserId of newLikes) {
              const userQuery = query(collection(firestore, "users"), where("uid", "==", likeUserId));
              const userSnapshot = await getDocs(userQuery);
              if (!userSnapshot.empty) {
                const likeUser = userSnapshot.docs[0].data();
                newNotifications.push({
                  id: `${postId}-like-${likeUserId}`,
                  type: 'like',
                  postId: postId,
                  fromUserId: likeUserId,
                  fromUserName: likeUser.displayName || 'Anonymous',
                  fromUserAvatar: likeUser.profilePicUrl || '/src/images/profile.png',
                  content: `${likeUser.displayName || 'Anonymous'} liked your post.`,
                  createdAt: post.createdAt,
                  read: false
                });
              }
            }

            // Get notifications from comments
            const comments = post.comments || [];
            const otherComments = comments.filter(comment => comment.userId !== user.uid);

            for (const comment of otherComments) {
              // Fetch commenter's profile picture from users collection
              const userQuery = query(collection(firestore, "users"), where("uid", "==", comment.userId));
              const userSnapshot = await getDocs(userQuery);
              const commenterData = userSnapshot.empty ? null : userSnapshot.docs[0].data();

              newNotifications.push({
                id: `${postId}-comment-${comment.createdAt}`,
                type: 'comment',
                postId: postId,
                fromUserId: comment.userId,
                fromUserName: comment.username,
                fromUserAvatar: commenterData?.profilePicUrl || '/src/images/profile.png',
                content: `${comment.username} commented on your post.`,
                createdAt: comment.createdAt,
                read: false
              });
            }
          }

          // Sort notifications by date
          newNotifications.sort((a, b) => 
            new Date(b.createdAt) - new Date(a.createdAt)
          );

          setNotifications(newNotifications);
          setUnreadCount(newNotifications.length);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, [user]);

  // Also add a useEffect to clear notifications when auth state changes
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        // Clear notifications when user logs out
        setNotifications([]);
        setUnreadCount(0);
        setNotificationOpen(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const toggleNotifications = () => setNotificationOpen((prev) => !prev);
  const closeProfileMenu = () => setProfileMenuOpen(false);

  const handleLogOut = () => {
    handleLogout();
    localStorage.removeItem('user-info');
    setIsLoggedIn(false);
    setProfileImage(defaultProfileImage);
    setNotifications([]); // Clear notifications array
    setUnreadCount(0); // Reset unread count
    setNotificationOpen(false); // Close notifications dropdown if open
    closeProfileMenu();
    navigate('/');
  };

  const handleLogIn = () => {
    closeProfileMenu();
    navigate('/role');
  };

  // Update the handleNotificationClick
  const handleNotificationClick = (notification) => {
    // Navigate to the post
    navigate(`/community?postId=${notification.postId}`);
    setNotificationOpen(false);
  };

  const styles = {
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 30px',
      backgroundColor: '#ffeef0',
      borderBottom: '1px solid #b12e34',
      width: '100%',
      height: '90px',
      position: 'fixed',
      top: 0,
      zIndex: 1000,
      boxSizing: 'border-box',
    },
    logoContainer: {
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
    },
    logo: { height: '40px' },
    menuIcon: { height: '20px', cursor: 'pointer' },
    features: {
      display: 'flex',
      gap: '25px',
      alignItems: 'center',
      position: 'relative',
    },
    featureIcon: { height: '30px', cursor: 'pointer', borderRadius: '100%'},
    featureIcon1: { height: '26px', cursor: 'pointer' },
    profileMenuContainer: {
      position: 'relative',
    },
    notificationContainer: {
      position: "relative",
    },
    notificationDropdown: {
      position: "absolute",
      top: "70px",
      right: "-60px",
      boxShadow: "0 0.5px 2px 1px rgba(0, 0, 0, 0.1)",
      borderRadius: "15px",
      backgroundColor: "#fff2f3",
      width: "300px",
      padding: "15px",
      transform: "scale(0.9)",
      opacity: 0,
      visibility: "hidden",
      transition: "transform 0.2s ease-out, opacity 0.2s ease-out",
      border: "1px solid #b12e34",
    },
    notificationDropdownOpen: {
      transform: "scale(1)",
      opacity: 1,
      visibility: "visible",
    },
    notificationItem: {
      padding: "10px 15px",
      display: "flex",
      alignItems: "center",
      gap: "12px",
      cursor: "pointer",
      borderRadius: "10px",
      marginBottom: "8px",
      transition: "background-color 0.2s ease",
    },
    notificationAvatar: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      objectFit: "cover",
      border: "1px solid #b12e34",
    },
    notificationContent: {
      flex: 1,
      textAlign: "left",
      fontSize: "14px",
      color: "#b12e34",
      fontFamily: "Verdana, Arial, Helvetica, sans-serif",
    },
    noNotifications: {
      padding: "15px",
      textAlign: "center",
      color: "#b12e34",
      fontSize: "14px",
      opacity: 0.7,
    },

    profileMenu: {
      position: 'absolute',
      top: '70px',
      right: 0,
      boxShadow: '0 0.5px 2px 1px rgba(0, 0, 0, 0.1)',
      borderRadius: '10px',
      backgroundColor: '#ffeef0',
      width: '160px',
      textAlign: 'center',
      padding: '2px 0',
      transform: 'scale(0.8)',
      transformOrigin: 'top',
      opacity: 0,
      visibility: 'hidden',
      transition: 'transform 0.2s ease-out, opacity 0.2s ease-out',
      border: '1px solid #b12e34',
    },
    profileMenuOpen: {
      transform: 'scale(1)',
      opacity: 1,
      visibility: 'visible',
    },
    profileMenuItem: {
      padding: '12px',
      cursor: 'pointer',
      fontSize: '14px',
      color: '#b12e34',
      fontWeight: 'normal',
      transition: 'background 0.3s ease-in-out, color 0.3s ease-in-out',
    },
    profileMenuItemHover: {
      color: '#b12e34',
      fontWeight: 'bold',
    },
    divider: {
      width: '80%',
      height: '1px',
      margin: 'auto',
      backgroundColor: '#b12e34',
    },
    notificationIconContainer: {
      position: 'relative',
    },
    notificationBadge: {
      position: 'absolute',
      top: '-5px',
      right: '-5px',
      backgroundColor: '#B12E34',
      color: 'white',
      borderRadius: '50%',
      width: '20px',
      height: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px',
      fontWeight: 'bold',
    },
    notificationText: {
      margin: 0,
      fontSize: '14px',
    },
    notificationTime: {
      fontSize: '12px',
      color: '#666',
      marginTop: '4px',
    },
  };

  return (
    <>
      <header style={styles.header}>
        <img
          src="src/images/menu.png"
          alt="Menu"
          style={styles.menuIcon}
          onClick={toggleMenu}
        />

        <div style={styles.logoContainer}>
          <img src="src/images/name.png" alt="Skinthesis Name" style={styles.logo} />
          <img src="src/images/logo.png" alt="Skinthesis Logo" style={styles.logo} />
        </div>

        <div style={styles.features}>
          <img 
            src="src/images/chatbot.png" 
            alt="Chatbot" 
            style={styles.featureIcon} 
            onClick={() => navigate('/chat')} 
          />
          
          <img 
            src="src/images/community.png" 
            alt="Community" 
            style={styles.featureIcon1} 
            onClick={() => navigate('/community')} 
          />

          {/* Notification Dropdown */}
          <div style={styles.notificationContainer} ref={notificationRef}>
            <div style={styles.notificationIconContainer}>
              <img
                src="src/images/notifications.png"
                alt="Notifications"
                style={styles.featureIcon}
                onClick={toggleNotifications}
              />
              {unreadCount > 0 && (
                <div style={styles.notificationBadge}>
                  {unreadCount}
                </div>
              )}
            </div>
            <div
              style={{
                ...styles.notificationDropdown,
                ...(notificationOpen ? styles.notificationDropdownOpen : {}),
              }}
            >
              {notifications.length === 0 ? (
                <div style={styles.noNotifications}>No notifications</div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    style={{
                      ...styles.notificationItem,
                      backgroundColor: notification.read ? 'transparent' : 'rgba(177, 46, 52, 0.05)',
                    }}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <img 
                      src={notification.fromUserAvatar} 
                      alt="User Avatar" 
                      style={styles.notificationAvatar}
                      onError={(e) => {
                        e.target.src = '/src/images/profile.png';
                      }}
                    />
                    <div style={styles.notificationContent}>
                      <span style={{ fontWeight: 'bold' }}>{notification.fromUserName}</span>
                      {notification.type === 'like' ? ' liked your post.' : ' commented on your post.'}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Profile Dropdown */}
          <div 
            style={styles.profileMenuContainer}
            ref={profileRef}
          >
            <img
              src={profileImage || defaultProfileImage}
              alt="Profile"
              style={styles.featureIcon}
              onClick={() => setProfileMenuOpen((prev) => !prev)}
              onError={(e) => {
                console.log("Failed to load profile image:", e.target.src);
                e.target.src = defaultProfileImage;
              }}
            />

            <div
              style={{
                ...styles.profileMenu,
                ...(profileMenuOpen ? styles.profileMenuOpen : {}),
              }}
            >
              {!isLoggedIn && (
                <div
                  style={styles.profileMenuItem}
                  onClick={handleLogIn}
                  onMouseEnter={(e) => {
                    e.target.style.color = styles.profileMenuItemHover.color;
                    e.target.style.fontWeight = styles.profileMenuItemHover.fontWeight;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = styles.profileMenuItem.color;
                    e.target.style.fontWeight = styles.profileMenuItem.fontWeight;
                  }}
                >
                  Log In
                </div>
              )}

              {isLoggedIn && (
                <>
                  <div
                    style={styles.profileMenuItem}
                    onClick={() => navigate('/profile')}
                    onMouseEnter={(e) => {
                      e.target.style.color = styles.profileMenuItemHover.color;
                      e.target.style.fontWeight = styles.profileMenuItemHover.fontWeight;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = styles.profileMenuItem.color;
                      e.target.style.fontWeight = styles.profileMenuItem.fontWeight;
                    }}
                  >
                    View Profile
                  </div>

                  <div style={styles.divider}></div>

                  <div
                    style={styles.profileMenuItem}
                    onClick={handleLogOut}
                    onMouseEnter={(e) => {
                      e.target.style.color = styles.profileMenuItemHover.color;
                      e.target.style.fontWeight = styles.profileMenuItemHover.fontWeight;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = styles.profileMenuItem.color;
                      e.target.style.fontWeight = styles.profileMenuItem.fontWeight;
                    }}
                  >
                    Log Out
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <Menu isOpen={menuOpen} setIsOpen={setMenuOpen} />
    </>
  );
}

export default Header;