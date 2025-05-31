import { FiUser, FiMail, FiUsers, FiCreditCard } from "react-icons/fi";
import {
  AiOutlineFundProjectionScreen,
  AiOutlineProject,
} from "react-icons/ai";
// import { Card } from "./ui/card";

const ProfileTabs = ({ setActiveTab }) => {
  return (
    <div className="lg:mx-5 lg:p-4 w-fulln">
      <div className="overflow-x-auto scrollbar-hide w-full">
        <div className="lg:grid gap-2 lg:gap-4 grid-cols-4 flex min-w-max">
          <Card
            title="Overview"
            href="/"
            Icon={AiOutlineFundProjectionScreen}
            setActiveTab={setActiveTab}
          />
          <Card
            title="Projects"
            href="/"
            Icon={AiOutlineProject}
            setActiveTab={setActiveTab}
          />
          <Card
            title="About"
            hre="/"
            Icon={FiUser}
            setActiveTab={setActiveTab}
          />
        </div>
      </div>
    </div>
  );
};

const Card = ({ title, subtitle, Icon, href, setActiveTab }) => {
  return (
    <button
      onClick={() => {
        setActiveTab(title);
      }}
      href={href}
      className="cursor-pointer w-full py-1 px-2 rounded border-[1px] border-slate-300 relative overflow-hidden group bg-blue-50 dark:bg-blue-1-dark flex gap-2 items-center"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-1 to-blue-2 dark:from-blue-50 dark:to-blue-200 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" />
      {/* from-violet-60 to-indigo-600 */}
      <Icon className="absolute z-10 -top-12 -right-12 text-9xl text-slate-200 dark:text-blue-2-dark group-hover:text-blue-3 dark:group-hover:text-blue-250 group-hover:rotate-12 transition-transform duration-300" />
      <Icon className="text-2xl text-blue-1 dark:text-blue-50 group-hover:text-white dark:group-hover:text-blue-1-dark transition-colors relative z-10 duration-300" />
      <h3 className="font-medium text-lg text-blue-1 dark:text-blue-50 group-hover:text-white dark:group-hover:text-blue-1-dark relative z-10 duration-300">
        {title}
      </h3>
      {/* <p className="text-slate-400 group-hover:text-violet-200 relative z-10 duration-300">
        {subtitle}
      </p> */}
    </button>
  );
};

export default ProfileTabs;
