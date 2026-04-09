"use client";

import styles from "./cats-app.module.css";
import { CatsGrid } from "./cats/cats-grid";
import { TabNavigation } from "./cats/tab-navigation";
import { useCatsFeed } from "./cats/use-cats-feed";

export function CatsApp() {
  const {
    activeTab,
    setActiveTab,
    favoritesMap,
    visibleCats,
    loaderRef,
    isLoading,
    error,
    emptyStateMessage,
    handleToggleFavorite
  } = useCatsFeed();

  return (
    <main className={styles.page}>
      <section className={styles.shell}>
        <header className={styles.header}>
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        </header>

        <div className={styles.content}>
          {error ? <p className={styles.message}>{error}</p> : null}

          {!error && visibleCats.length === 0 && !isLoading ? (
            <p className={styles.message}>{emptyStateMessage}</p>
          ) : null}

          <CatsGrid
            ref={loaderRef}
            cats={visibleCats}
            favoritesMap={favoritesMap}
            onToggleFavorite={handleToggleFavorite}
            showLoaderTrigger={activeTab === "all"}
            alignLeft={activeTab === "favorites"}
          />

          {isLoading ? <p className={styles.loading}>... загружаем ещё котиков ...</p> : null}
        </div>
      </section>
    </main>
  );
}
