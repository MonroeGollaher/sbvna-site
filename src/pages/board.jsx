import { useState } from "react";
import board from "../content/board/board.json";
import { Polaroid, PolaroidGrid } from "../components/Polaroid";
import ScrollReveal from "../components/ScrollReveal";
import Modal from "../components/Modal";
import "../styles/board.css";

export default function Board() {
  const members = Array.isArray(board) ? board : board.members || [];
  const [selected, setSelected] = useState(null);

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
              onClick={() => setSelected(member)}
            />
          ))}
        </PolaroidGrid>
      </ScrollReveal>

      {selected ? (
        <Modal onClose={() => setSelected(null)} className="board-modal">
          <div className="board-modal__header">
            <img
              className="board-modal__photo"
              src={selected.photo}
              alt={selected.name}
            />
            <div>
              <h3 className="board-modal__name">{selected.name}</h3>
              <p className="board-modal__role">{selected.role}</p>
            </div>
          </div>
          {selected.bio ? (
            <div className="board-modal__bio">
              {selected.bio.split("\n\n").map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          ) : null}
        </Modal>
      ) : null}
    </div>
  );
}
