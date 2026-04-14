import ProfileAvatar from "../../ProfileComponents/ProfileAvatar/ProfileAvatar";
import "./SharedAlbumMemberAvatars.css";

interface Props {
  memberIds: number[];
  container?: boolean;
}

export default function SharedAlbumMemberAvatars({
  memberIds,
  container = false,
}: Props) {
  const MAX_VISIBLE = 5;
  return (
    <>
      {memberIds && (
        <div
          className={
            container ? `album-container__members` : `shared-album__members`
          }
        >
          {memberIds.slice(0, MAX_VISIBLE).map((id) => (
            <ProfileAvatar key={id} id={id} />
          ))}
          {memberIds.length > MAX_VISIBLE && (
            <span className="members-count">
              {memberIds.length - MAX_VISIBLE}+
            </span>
          )}
        </div>
      )}
    </>
  );
}
