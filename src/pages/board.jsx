import { useState } from "react";
import board from "../content/board/board.json";
import { Polaroid, PolaroidGrid } from "../components/Polaroid";
import ScrollReveal from "../components/ScrollReveal";
import Modal from "../components/Modal";
import usePageMeta from "../utils/usePageMeta";
import "../styles/board.css";

export default function Board() {
  usePageMeta({
    title: "Meet the Board",
    description:
      "Meet the volunteer board members of the South Boise Village Neighborhood Association."
  });

  const members = Array.isArray(board) ? board : board.members || [];
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showFullPhoto, setShowFullPhoto] = useState(false);
  const selected = selectedIndex === null ? null : members[selectedIndex];

  function navigateMember(direction) {
    setShowFullPhoto(false);
    setSelectedIndex((index) =>
      index === null ? null : (index + direction + members.length) % members.length
    );
  }

  function handleModalKeyDown(event) {
    if (
      members.length < 2 ||
      event.defaultPrevented ||
      event.altKey || event.ctrlKey || event.metaKey || event.shiftKey ||
      event.target.closest("input, textarea, select, [contenteditable]")
    ) return;

    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      navigateMember(event.key === "ArrowLeft" ? -1 : 1);
    }
  }

  return (
    <div className="page-wrapper">
      <h1 className="animate-fade-up">Meet the Board</h1>

      <ScrollReveal>
        <PolaroidGrid>
          {members.map((member, index) => (
            <Polaroid
              key={member.name}
              src={member.photo}
              alt={member.name}
              caption={`${member.name} — ${member.role}`}
              onClick={() => {
                setShowFullPhoto(false);
                setSelectedIndex(index);
              }}
            />
          ))}
        </PolaroidGrid>
      </ScrollReveal>

      {selected ? (
        <Modal
          onClose={() => setSelectedIndex(null)}
          className="board-modal"
          label={`${selected.name} — ${selected.role}`}
          onKeyDown={handleModalKeyDown}
          bodyKey={selectedIndex}
          footer={members.length > 1 ? (
            <nav className="board-modal__nav" aria-label="Board member navigation">
              <button
                type="button"
                className="board-modal__arrow"
                aria-label="Previous board member"
                onClick={() => navigateMember(-1)}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="m14 6-6 6 6 6" />
                </svg>
              </button>
              <span className="board-modal__counter" role="status" aria-atomic="true">
                <span className="board-modal__counter-name">{selected.name}</span>
                <span>{selectedIndex + 1} of {members.length}</span>
              </span>
              <button
                type="button"
                className="board-modal__arrow"
                aria-label="Next board member"
                onClick={() => navigateMember(1)}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="m10 6 6 6-6 6" />
                </svg>
              </button>
            </nav>
          ) : null}
        >
          <div className={`board-modal__media${showFullPhoto ? " board-modal__media--fit" : ""}`}>
            <img
              className="board-modal__photo"
              src={selected.photo}
              alt={selected.name}
            />
            <button
              type="button"
              className="board-modal__photo-toggle"
              aria-label={showFullPhoto ? "Fill photo frame" : "Show full photo"}
              title={showFullPhoto ? "Fill photo frame" : "Show full photo"}
              aria-pressed={showFullPhoto}
              onClick={() => setShowFullPhoto((value) => !value)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                {!showFullPhoto ? (
                  <path d="M13 3v8h8V8h-3l4-4-2-2-4 4V3h-3ZM3 13v3h3l-4 4 2 2 4-4v3h3v-8H3Z" />
                ) : (
                  <path d="M14 3v3h3l-5 5 2 2 5-5v3h3V3h-8ZM10 21v-3H7l5-5-2-2-5 5v-3H2v8h8Z" />
                )}
              </svg>
            </button>
          </div>
          <div className="board-modal__content">
            <p className="board-modal__role">{selected.role}</p>
            <h2 className="board-modal__name">{selected.name}</h2>
            {selected.bio ? (
              <div className="board-modal__bio">
                {selected.bio.split("\n\n").map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            ) : null}
          </div>
        </Modal>
      ) : null}
    </div>
  );
}
