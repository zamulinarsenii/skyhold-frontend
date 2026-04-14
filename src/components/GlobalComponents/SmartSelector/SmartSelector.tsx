// SmartSelector.tsx
import { useState, useRef, useEffect } from "react";
import { IoChevronDown, IoClose } from "react-icons/io5";
import "./SmartSelector.css";

interface Item {
  text: string;
  value: string;
}

interface SmartSelectorProps {
  items: Item[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  showSearch?: boolean;
  clearable?: boolean;
  name?: string;
}

export default function SmartSelector({
  items,
  value,
  onChange,
  placeholder = "Выберите...",
  disabled = false,
  showSearch = false,
  clearable = false,
  name,
}: SmartSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedItem = items.find((item) => item.value === value);

  const filteredItems = items.filter((item) =>
    item.text.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSelect = (item: Item) => {
    onChange(item.value);
    setIsOpen(false);
    setSearch("");
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
    setSearch("");
  };

  // Закрытие при клике вне компонента
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

  // Закрытие по Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Фокус на поле поиска при открытии
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div className="smart-selector" ref={containerRef}>
      {name && <span className="smart-selector__name">{name}</span>}
      <div
        className={`smart-selector__trigger ${disabled ? "disabled" : ""} ${isOpen ? "focused" : ""}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span className={selectedItem ? "selected-text" : "placeholder"}>
          {selectedItem ? selectedItem.text : placeholder}
        </span>
        <div className="smart-selector__icons">
          {clearable && value && (
            <IoClose className="clear-icon" onClick={handleClear} />
          )}
          <IoChevronDown className={`arrow-icon ${isOpen ? "open" : ""}`} />
        </div>
      </div>

      {isOpen && !disabled && (
        <div className="smart-selector__dropdown">
          {showSearch && (
            <div className="smart-selector__search">
              <input
                ref={inputRef}
                type="text"
                placeholder="Поиск..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}

          <div className="smart-selector__options">
            {filteredItems.length === 0 ? (
              <div className="no-options">Ничего не найдено</div>
            ) : (
              filteredItems.map((item) => (
                <div
                  key={item.value}
                  className={`smart-selector__option ${
                    item.value === value ? "selected" : ""
                  }`}
                  onClick={() => handleSelect(item)}
                >
                  {item.text}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
