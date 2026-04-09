import styles from "../cats-app.module.css";
import { tabs } from "./constants";
import type { TabId } from "./types";

type TabNavigationProps = {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
};

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <nav className={styles.tabs} aria-label="Навигация по котикам">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;

        return (
          <button
            key={tab.id}
            type="button"
            className={`${styles.tab} ${isActive ? styles.tabActive : ""}`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
}
