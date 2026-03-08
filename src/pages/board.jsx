import board from "../content/board/board.json";
import { Polaroid, PolaroidGrid } from "../components/Polaroid";
import ScrollReveal from "../components/ScrollReveal";

export default function Board() {
  const members = Array.isArray(board) ? board : board.members || [];

  return (
    <div className="page-wrapper">
      <h2 className="animate-fade-up">Meet the Board</h2>

      <ScrollReveal>
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
      </ScrollReveal>
    </div>
  );
}
