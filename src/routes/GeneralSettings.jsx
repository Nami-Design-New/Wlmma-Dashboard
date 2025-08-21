import { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import SettingTab from "../components/general-settings/SettingTab";
import AppSlidersTab from "./../components/general-settings/AppSlidersTab";
import FaqsTab from "../components/general-settings/FaqsTab";

export default function GeneralSettings() {
  const [key, setKey] = useState("about-us");

  return (
    <section className="form_ui">
      <div className="page_head">
        <h1>General Settings</h1>
        <p>Manage app settings and public content</p>
      </div>

      <Tabs
        id="general-settings-tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="about-us" title="About Us">
          <SettingTab title="About Us" type={1} />
        </Tab>

        <Tab eventKey="privacy-policy" title="Privacy Policy">
          <SettingTab title="Privacy Policy" type={2} />
        </Tab>

        <Tab eventKey="terms-conditions" title="Terms & Conditions">
          <SettingTab title="Terms & Conditions" type={3} />
        </Tab>

        <Tab eventKey="faqs" title="FAQs">
          <FaqsTab />
        </Tab>

        <Tab eventKey="app-sliders" title="App Sliders">
          <AppSlidersTab />
        </Tab>
      </Tabs>
    </section>
  );
}
