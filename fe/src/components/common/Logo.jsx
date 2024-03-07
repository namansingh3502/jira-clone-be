import logoIcon from "~/src/images/icon_logo.png";
import logoName from "~/src/images/name_logo.png";

export default function Logo() {
  return (
    <div className={"flex h-16 items-center space-x-2"}>
      <img className={"h-14"} src={logoIcon} alt={"Logo Icon"}></img>
      <img className={"h-10"} src={logoName} alt={"Logo Name"}></img>
    </div>
  );
}
