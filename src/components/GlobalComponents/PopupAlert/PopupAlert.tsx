// components/PopupAlert/PopupAlert.tsx
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { removeLogEntry } from "../../../store/slices/logsSlice";
import { IoClose } from "react-icons/io5";
import "./PopupAlert.css";

export default function PopupAlert() {
  const logs = useSelector((state: RootState) => state.logs.entries);
  const dispatch = useDispatch();
  const [fadingIds, setFadingIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    logs.forEach((log) => {
      if (!fadingIds.has(log.id)) {
        const fadeTimer = setTimeout(() => {
          setFadingIds((prev) => new Set(prev).add(log.id));
        }, 4500);
        const removeTimer = setTimeout(() => {
          dispatch(removeLogEntry(log.id));
          setFadingIds((prev) => {
            const next = new Set(prev);
            next.delete(log.id);
            return next;
          });
        }, 5000);

        return () => {
          clearTimeout(fadeTimer);
          clearTimeout(removeTimer);
        };
      }
    });
  }, [logs, dispatch, fadingIds]);

  if (logs.length === 0) return null;

  return (
    <div className="popup-alert__container">
      {logs.map((log) => (
        <div
          key={log.id}
          className={`alert alert-${log.type} ${fadingIds.has(log.id) ? "fade-out" : ""}`}
        >
          <span className="popup-alert__message">{log.message}</span>
          <IoClose
            className="popup-alert__close"
            onClick={() => dispatch(removeLogEntry(log.id))}
          />
        </div>
      ))}
    </div>
  );
}
