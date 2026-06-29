import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

function Profile({ user }) {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    setProfile(null);

    if (id) {
      axios
        .get(`http://localhost:5000/users/${id}`)
        .then((res) => setProfile(res.data))
        .catch((err) => console.log(err));
      return;
    }

    if (user) {
      setProfile(user);
    } else {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        setProfile(storedUser);
      }
    }
  }, [user, id]);

  if (!profile) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>No profile loaded</h2>
        <p>Please try logging in again.</p>
        <Link to="/login">Go to Login</Link>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "850px",
        margin: "0 auto",
        padding: "25px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "30px",
          marginBottom: "30px",
        }}
      >
        <img
          src={profile.profilePic || "https://via.placeholder.com/150"}
          alt="Profile"
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "4px solid white",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        />

        <div style={{ flex: 1 }}>
          <h1 style={{ marginBottom: "8px" }}>{profile.name}</h1>

          <p
            style={{
              color: "var(--text)",
              marginBottom: "15px",
            }}
          >
            Electronics Engineering Student
          </p>

          <div
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            {loggedInUser?.email === profile.email ? (
              <Link to="/profile/edit" style={styles.editBtn}>
                Edit Profile
              </Link>
            ) : (
              <button style={styles.connectBtn}>
                Connect
              </button>
            )}

            {profile.resume && (
              <a
                href={profile.resume}
                download="My_Resume.pdf"
                style={styles.resumeBtn}
              >
                Download Resume
              </a>
            )}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              maxWidth: "420px",
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              padding: "18px",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <h3 style={{ margin: 0 }}>0</h3>
              <span style={{ color: "var(--text)" }}>
                Connections
              </span>
            </div>

            <div style={{ textAlign: "center" }}>
              <h3 style={{ margin: 0 }}>0</h3>
              <span style={{ color: "var(--text)" }}>
                Posts
              </span>
            </div>

            <div style={{ textAlign: "center" }}>
              <h3 style={{ margin: 0 }}>0</h3>
              <span style={{ color: "var(--text)" }}>
                Likes
              </span>
            </div>
          </div>
        </div>
      </div>

      <hr style={{ margin: "30px 0" }} />
            <h2 style={{ marginBottom: "15px" }}>About</h2>

      <div
        style={{
          background: "var(--card)",
          border: "1px solid var(--border)",
          padding: "18px",
          borderRadius: "10px",
          marginBottom: "30px",
        }}
      >
        <p style={{ color: "var(--text)", margin: 0 }}>
          {profile.bio || "No info added yet."}
        </p>
      </div>

      <h2 style={{ marginBottom: "15px" }}>Placement Roadmap</h2>

      <div
        style={{
          background: "var(--card)",
          border: "1px solid var(--border)",
          padding: "18px",
          borderRadius: "10px",
          marginBottom: "30px",
        }}
      >
        {profile.roadmap && profile.roadmap.length > 0 ? (
          profile.roadmap.map((step, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "15px",
              }}
            >
              <span
                style={{
                  background:
                    step.status === "Placed"
                      ? "#d1fae5"
                      : step.status === "Interview"
                      ? "#fef3c7"
                      : "#e0e7ff",
                  color:
                    step.status === "Placed"
                      ? "#065f46"
                      : step.status === "Interview"
                      ? "#92400e"
                      : "#3730a3",
                  padding: "4px 12px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  marginRight: "15px",
                  minWidth: "90px",
                  textAlign: "center",
                }}
              >
                {step.status}
              </span>

              <span style={{ color: "var(--text)" }}>
                {step.title}
              </span>
            </div>
          ))
        ) : (
          <p style={{ color: "var(--text)", margin: 0 }}>
            No info added yet.
          </p>
        )}
      </div>

      <h2 style={{ marginBottom: "15px" }}>Previous Experience</h2>

      <div
        style={{
          background: "var(--card)",
          border: "1px solid var(--border)",
          padding: "18px",
          borderRadius: "10px",
          marginBottom: "30px",
        }}
      >
        <p style={{ color: "var(--text)", margin: 0 }}>
          No info added yet.
        </p>
      </div>

      <h2 style={{ marginBottom: "15px" }}>Clubs & Committees</h2>

      <div
        style={{
          background: "var(--card)",
          border: "1px solid var(--border)",
          padding: "18px",
          borderRadius: "10px",
          marginBottom: "30px",
        }}
      >
        <p style={{ color: "var(--text)", margin: 0 }}>
          No info added yet.
        </p>
      </div>

      <h2 style={{ marginBottom: "15px" }}>Skills</h2>

      <div
        style={{
          background: "var(--card)",
          border: "1px solid var(--border)",
          padding: "18px",
          borderRadius: "10px",
          marginBottom: "30px",
        }}
      >
        <p style={{ color: "var(--text)", margin: 0 }}>
          No info added yet.
        </p>
      </div>
    </div>
  );
}

const styles = {
  editBtn: {
    textDecoration: "none",
    background: "#2563eb",
    color: "white",
    padding: "8px 16px",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "500",
  },

  connectBtn: {
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
  },

  resumeBtn: {
    textDecoration: "none",
    background: "#10b981",
    color: "white",
    padding: "8px 16px",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "500",
  },
};

export default Profile;