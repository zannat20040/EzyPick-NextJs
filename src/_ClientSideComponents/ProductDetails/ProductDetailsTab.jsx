import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

export function ProductDetailsTab({ details, review }) {
  return (
    <div class="tabs tabs-lift mt-10">
      <input
        type="radio"
        name="my_tabs_3"
        class="tab checked:text-pale-red "
        aria-label="Details"
        defaultChecked
      />
      <div class="tab-content bg-base-100 border-base-300 p-6  border-t border-0">
        {details}
      </div>

      <input
        type="radio"
        name="my_tabs_3"
        class="tab checked:text-pale-red "
        aria-label="Review"
      />
      <div class="tab-content bg-base-100 border-base-300 p-6 border-t border-0">
        Tab content 2
      </div>
    </div>
  );
}
