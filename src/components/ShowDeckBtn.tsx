export interface ShowDeckBtnProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const ShowDeckBtn = ({isOpen, setIsOpen}: ShowDeckBtnProps) => {
  return (
      <div>
        <button
            className={`${isOpen ? "hidden" : ""} font-michroma font-bold fixed z-10 bg-white cursor-pointer top-67.5 right-0 border-gray-500 border-t-2 border-l-2 border-b-2 py-2 px-4 rounded-tl-md rounded-bl-md`}
            onClick={() => setIsOpen(true)}>DECK
        </button>
      </div>
  )
}