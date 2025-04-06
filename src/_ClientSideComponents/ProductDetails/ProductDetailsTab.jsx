import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

export function ProductDetailsTab({ details }) {
  const [activeTab, setActiveTab] = React.useState("details");
  const data = [
    {
      label: "Details",
      value: "details",
      desc: `It really matters and then like it really doesn't matter.
      What matters is the people who are sparked by it. And the people 
      who are like offended by it, it doesn't matter.`,
    },
    {
      label: "Review",
      value: "review",
      desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
    }
  ];
  return (
    <Tabs value={activeTab} className='mt-16'>
      <TabsHeader
        className=" rounded-none  border-b  bg-transparent p-0 "
        indicatorProps={{
          className:
            "bg-transparent border-b-2 border-pale-red  shadow-none rounded-none ",
        }}
      >
        {data.map(({ label, value }) => (
          <Tab
            key={value}
            value={value}
            onClick={() => setActiveTab(value)}
            className={`${activeTab === value ? "text-pale-red" : ""} `}
          >
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}
