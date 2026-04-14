import { useState, useRef, useEffect } from "react";
import { IoChevronDown, IoClose } from "react-icons/io5";
import "./MembersSelector.css";
import { Friend } from "../../../interfaces/friends";
import ProfileAvatar from "../../ProfileComponents/ProfileAvatar/ProfileAvatar";

interface MembersSelectorProps {
  friends: Friend[];
  onChange: (value: number[]) => void;
  placeholder?: string;
  disabled?: boolean;
  showSearch?: boolean;
  clearable?: boolean;
  value: number[];
  name?: string;
}

export default function MembersSelector({
  friends,
  onChange,
  value,
  placeholder = "Выберите...",
  disabled = false,
  showSearch = false,
  clearable = false,
  name,
}: MembersSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredItems = friends.filter((friend) =>
    friend.login.toLowerCase().includes(search.toLowerCase()),
  );

  const toggleSelect = (id: number) => {
    if (value.includes(id)) {
      onChange(value.filter((v) => v !== id));
    } else {
      onChange([...value, id]);
    }
  };

  const removeItem = (id: number) => {
    onChange(value.filter((v) => v !== id));
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange([]);
    setSearch("");
  };

  const selectedFriends = friends.filter((f) => value.includes(f.id));

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div className="members-selector" ref={containerRef}>
      {name && <span className="members-selector__name">{name}</span>}
      <div
        className={`members-selector__trigger ${disabled ? "disabled" : ""} ${
          isOpen ? "focused" : ""
        }`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <div className="selected-container">
          {selectedFriends.length === 0 ? (
            <span className="placeholder">{placeholder}</span>
          ) : (
            <div className="tags">
              {selectedFriends.map((f) => (
                <div key={f.id} className="tag">
                  {f.login}
                  <IoClose
                    onClick={(e) => {
                      e.stopPropagation();
                      removeItem(f.id);
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="members-selector__icons">
          {clearable && value.length > 0 && (
            <IoClose className="clear-icon" onClick={handleClear} />
          )}
          <IoChevronDown className={`arrow-icon ${isOpen ? "open" : ""}`} />
        </div>
      </div>

      {isOpen && !disabled && (
        <div className="members-selector__dropdown">
          {showSearch && (
            <div className="members-selector__search">
              <input
                ref={inputRef}
                type="text"
                placeholder="Поиск..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          )}

          <div className="members-selector__options">
            {filteredItems.length === 0 ? (
              <div className="no-options">Ничего не найдено</div>
            ) : (
              filteredItems.map((item) => {
                const isSelected = value.includes(item.id);

                return (
                  <div
                    key={item.id}
                    className={`members-selector__option ${
                      isSelected ? "selected" : ""
                    }`}
                    onClick={() => toggleSelect(item.id)}
                  >
                    <ProfileAvatar id={item.id} />
                    {item.login}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
