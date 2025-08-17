import BigSearchBox, {
  BigSearchBoxProps,
} from "@/components/atoms/bigSearchBox";
import Tab, { TabProps } from "@/components/atoms/tab";
import "./searchBoxMain.css";

type Props = {
  title: string;
  bigSearchBox: BigSearchBoxProps;
  tabs: TabProps[];
};

export default function SearchBoxMain({ title, bigSearchBox, tabs }: Props) {
  return (
    <div className="searchBoxMainBox">
      {/* Tabs Section */}
      <div className="searchBoxMainTabs">
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            title={tab.title}
            backgroundColor={tab.backgroundColor}
            color={tab.color}
            onClick={tab.onClick}
            notSelected={tab.notSelected}
          />
        ))}
      </div>

      {/* Big Search Box */}
      <BigSearchBox {...bigSearchBox} />
    </div>
  );
}
