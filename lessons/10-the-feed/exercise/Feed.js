import React, { useEffect, useState } from "react"
import FeedPost from "app/FeedPost"
import { loadFeedPosts, subscribeToNewFeedPosts } from "app/utils"
import { stat } from "fs";
// import FeedFinal from './Feed.final'
// export default FeedFinal
export default Feed

const PER_PAGE = 3;

function Feed() {
  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(3);
  const [time, setTime] = useState(Date.now());
  const [newPosts, setNewPosts] = useState([]);

  // Promises
  useEffect(() => {
    let isFresh = true;

    loadFeedPosts(time, limit).then(posts => {
      if (isFresh) setPosts(posts);
    });

    return () => {
      isFresh = false;
    };
  }, [time, limit]);

  // Async example - Async always returns a promise
  // useEffect(() => {
  //   let isFresh = true;

  //   (async () => {
  //     const posts = await loadFeedPosts(time, limit);
  //     if (isFresh) setPosts(posts);;
  //   })();

  //   return () => {
  //     isFresh = false;
  //   };
  // }, [time, limit]);

  useEffect(() => {
    return subscribeToNewFeedPosts(time, (posts) => {
      setNewPosts(posts);
    });
  }, [time]);

  const handleViewMore = () => {
    setLimit(limit + PER_PAGE);
  };

  const handleViewNewPosts = () => {
    setLimit(limit + newPosts.length);
    setTime(Date.now());
  };

  return posts ? (
    <div className="Feed">
      {newPosts.length > 0 && (
        <div className="Feed_button_wrapper">
          <button className="Feed_new_posts_button icon_button" onClick={handleViewNewPosts}>
            View {newPosts.length} New Posts
          </button>
        </div>
      )}
      
      {posts.map((post) => (
        <FeedPost key={post.id} post={post} />
      ))}
      
      <div className="Feed_button_wrapper">
        <button onClick={handleViewMore} className="Feed_new_posts_button icon_button">View More</button>
      </div>
    </div>
  ) : null
}

// you can delete this
const fakePost = {
  createdAt: Date.now() - 10000,
  date: "2019-03-30",
  message: "Went for a run",
  minutes: 45,
  uid: "0BrC0fB6r2Rb5MNxyQxu5EnYacf2"
}

