import board from "../content/board/board.json";
import { Polaroid, PolaroidGrid } from "../components/Polaroid";

export default function Board() {
  const members = Array.isArray(board) ? board : board.members || [];

  return (
    <div className="page-wrapper">
      <h2>Meet the Board</h2>

      <PolaroidGrid>
        {members.map((member) => (
          <Polaroid
            key={member.name}
            src={member.photo}
            alt={member.name}
            caption={`${member.name} — ${member.role}`}
          />
        ))}
      </PolaroidGrid>
    </div>
  );
}
