import board from "../content/board/board.json";

export default function Board() {
  const members = Array.isArray(board) ? board : board.members || [];

  return (
    <div className="page-wrapper">
      <h2>Meet the Board</h2>

      <div
        style={{
          display: "grid",
          gap: 16,
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))"
        }}
      >
        {members.map((member) => (
          <article
            key={member.name}
            style={{
              border: "1px solid #ddd",
              borderRadius: 12,
              padding: 16,
              background: "#fff"
            }}
          >
            {member.photo ? (
              <img
                src={member.photo}
                alt={member.name}
                loading="lazy"
                style={{
                  width: "100%",
                  height: 240,
                  objectFit: "cover",
                  borderRadius: 10,
                  marginBottom: 12
                }}
              />
            ) : null}

            <h3 style={{ margin: "0 0 4px 0" }}>{member.name}</h3>
            <p style={{ margin: "0 0 12px 0", color: "#666", fontWeight: 500 }}>
              {member.role}
            </p>

            {member.bio ? (
              <p style={{ whiteSpace: "pre-wrap", lineHeight: 1.5 }}>
                {member.bio}
              </p>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}
