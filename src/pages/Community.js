import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Community.css";

const Community = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [discussions, setDiscussions] = useState([]);
  const [replyText, setReplyText] = useState({});

  useEffect(() => {
    fetchDiscussions();
  }, []);

  const fetchDiscussions = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/discussions");
      setDiscussions(res.data);
    } catch (err) {
      console.error("Error fetching discussions:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/discussions", {
        title,
        content,
        user: "Anonymous", // Replace this with actual logged-in user info if available
      });

      setTitle("");
      setContent("");
      fetchDiscussions();
    } catch (err) {
      console.error("Error posting discussion:", err);
    }
  };

  const handleReply = async (id) => {
    const replyContent = replyText[id];
    if (!replyContent) return;

    try {
      await axios.post(`http://localhost:5000/api/discussions/${id}/replies`, {
        content: replyContent,
        username: "Anonymous", // Replace this with actual user info if available
      });

      setReplyText((prev) => ({ ...prev, [id]: "" }));
      fetchDiscussions(); // Refresh discussions to show new reply
    } catch (err) {
      console.error("Error posting reply:", err);
    }
  };

  return (
    <div className="community-container">
    <h2 className="community-title">Community Discussions</h2>

    <div className="discussion-list">
      {discussions.map((d) => (
        <div key={d._id} className="discussion-card">
          <div className="discussion-header">
            <img
              src="https://i.pravatar.cc/40"
              alt="avatar"
              className="avatar"
            />
            <div>
              <div className="discussion-title">{d.title}</div>
              <div className="discussion-meta">
                Posted by {d.user || "Anonymous"} on{" "}
                {new Date(d.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
          <div className="discussion-content">{d.content}</div>

          {/* Reply Section */}
          <div className="reply-section">
            <input
              className="input-field"
              type="text"
              placeholder="Write a reply..."
              value={replyText[d._id] || ""}
              onChange={(e) =>
                setReplyText((prev) => ({
                  ...prev,
                  [d._id]: e.target.value,
                }))
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") handleReply(d._id);
              }}
            />
            <button
              className="reply-button"
              onClick={() => handleReply(d._id)}
              disabled={!replyText[d._id]?.trim()}
            >
              Reply
            </button>
          </div>

          {/* Display replies */}
          {d.replies?.length > 0 && (
            <div className="replies">
              <h4>Replies</h4>
              {d.replies.map((r, index) => (
                <div key={index} className="reply">
                  <strong>{r.username || "Anonymous"}:</strong> {r.content}
                  <div className="reply-meta">
                    <small>{new Date(r.createdAt).toLocaleString()}</small>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>

    {/* Sticky Discussion Post Form at Bottom */}
    <form onSubmit={handleSubmit} className="discussion-form sticky-form">
      <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
        <img
          src="https://i.pravatar.cc/40"
          alt="avatar"
          className="avatar"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
        <div style={{ flex: 1 }}>
          <input
            className="input-field"
            type="text"
            placeholder="Discussion Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ marginBottom: "0.5rem" }}
          />
          <textarea
            className="input-field"
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="3"
            required
          ></textarea>
          <button type="submit" className="post-button" style={{ marginTop: "0.75rem" }}>
            Post Discussion
          </button>
        </div>
      </div>
    </form>
  </div>
);
};

export default Community;
