import styles from "../cats-app.module.css";
import { HeartIcon } from "./heart-icon";
import type { Cat } from "./types";

type CatCardProps = {
  cat: Cat;
  isFavorite: boolean;
  onToggleFavorite: (cat: Cat) => void;
};

export function CatCard({ cat, isFavorite, onToggleFavorite }: CatCardProps) {
  return (
    <article className={styles.card}>
      <img className={styles.image} src={cat.url} alt="Котик" loading="lazy" />
      <button
        type="button"
        className={`${styles.favoriteButton} ${isFavorite ? styles.favoriteButtonActive : ""}`}
        onClick={() => onToggleFavorite(cat)}
        aria-label={isFavorite ? "Убрать из любимых" : "Добавить в любимые"}
        aria-pressed={isFavorite}
        data-favorite={isFavorite ? "true" : "false"}
      >
        <HeartIcon filled={isFavorite} />
      </button>
    </article>
  );
}
