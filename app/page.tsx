import { Button } from "@/components/ui/Button";
import css from "./page.module.css";

export default function Home() {
  return (
    <section className={css.hero}>
      <div className={css.heroContent}>
        <h1>Find your perfect rental car</h1>
        <p>Reliable and budget-friendly rentals for any journey</p>
        <Button variant="primary" href="/cars">
          View Catalog
        </Button>
      </div>
    </section>
  );
}
