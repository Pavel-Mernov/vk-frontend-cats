import { forwardRef } from "react";
import styles from "../cats-app.module.css";
import { CatCard } from "./cat-card";
import type { Cat } from "./types";

type CatsGridProps = {
  cats: Cat[];
  favoritesMap: Record<string, Cat>;
  onToggleFavorite: (cat: Cat) => void;
  showLoaderTrigger: boolean;
  alignLeft?: boolean;
};

export const CatsGrid = forwardRef<HTMLDivElement, CatsGridProps>(function CatsGrid(
  { cats, favoritesMap, onToggleFavorite, showLoaderTrigger, alignLeft = false },
  ref
) {
  return (
    <>
      <div className={`${styles.grid} ${alignLeft ? styles.gridAlignLeft : ""}`}>
        {cats.map((cat) => (
          <CatCard
            key={cat.id}
            cat={cat}
            isFavorite={Boolean(favoritesMap[cat.id])}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>

      {showLoaderTrigger ? <div ref={ref} className={styles.loaderTrigger} /> : null}
    </>
  );
});
