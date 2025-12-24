import { IUserDoc } from "@/database/user.model";

interface HeaderContentProps {
  title: string;
  subtext: string;
  type?: string;
  user?: IUserDoc | null;
}

const HeaderContent = ({
  type,
  title,
  user = null,
  subtext,
}: HeaderContentProps) => {
  return (
    <div className="header-box">
      <h1 className="header-box-title">
        {title}
        {type === "greeting" && (
          <span className="text-sky-500">&nbsp;{user?.firstName}</span>
        )}
      </h1>
      <p className="header-box-subtext">{subtext}</p>
    </div>
  );
};

export default HeaderContent;
