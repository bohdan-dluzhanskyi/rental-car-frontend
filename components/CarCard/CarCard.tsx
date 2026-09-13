import Image from "next/image";
import { Car } from "@/types/car";
import { Button } from "@/components/ui/Button";
import css from "./CarCard.module.css";

interface CarCardProps {
  car: Car;
}

export function CarCard({ car }: CarCardProps) {
  return (
    <div className={css.card}>
      <div className={css.imageWrapper}>
        <Image
          src={car.img || "/placeholder-car.jpg"}
          alt={`${car.brand} ${car.model}`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className={css.image}
        />
      </div>

      <div className={css.content}>
        <div className={css.header}>
          <h3 className={css.title}>
            {car.brand} <span className={css.model}>{car.model}</span>,{" "}
            {car.year}
          </h3>
          <span className={css.price}>${car.rentalPrice}</span>
        </div>

        <p className={css.tags}>
          {car.location.city} <span className={css.separator}>|</span>{" "}
          {car.location.country} <span className={css.separator}>|</span>{" "}
          {car.rentalCompany} <span className={css.separator}>|</span>{" "}
          {car.type} <span className={css.separator}>|</span> {car.mileage}
        </p>

        <div className={css.buttonSpace}>
          <Button
            variant="secondary"
            href={`/cars/${car.id}`}
            rel="noopener noreferrer"
          >
            Read more
          </Button>
        </div>
      </div>
    </div>
  );
}
