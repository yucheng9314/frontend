import { Avatar } from "@material-ui/core";
import { useEffect, useState } from "react";

const ContentHeader = ({ address }) => {
  const [header, setHeader] = useState("");

  const user = address.user.avatar;

  useEffect(() => {
    setHeader(address.user.avatar);
  }, []);

  return (
    <div>
      <Avatar src={address.user.avatar} />
    </div>
  );
};

export default ContentHeader;
