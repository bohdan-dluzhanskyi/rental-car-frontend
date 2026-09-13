"use client";

import React, { use } from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { fetchCarById } from "@/services/api";
import { RentalForm } from "@/components/RentalForm/RentalForm";
import css from "./CarDetails.module.css";

interface PageProps {
  params: Promise<{ carId: string }>;
}

export default function CarDetailsPage({ params }: PageProps) {
  const { carId } = use(params);

  const { data: car, status } = useQuery({
    queryKey: ["car", carId],
    queryFn: () => fetchCarById(carId),
  });

  if (status === "pending") {
    return (
      <div className="container">
        <p className={css.message}>Завантаження інформації про авто...</p>
      </div>
    );
  }

  if (status === "error" || !car) {
    return (
      <div className="container">
        <p className={css.errorMessage}>Не вдалося знайти такий автомобіль.</p>
      </div>
    );
  }

  const conditions = car.rentalConditions || [];

  return (
    <div
      className="container"
      style={{ paddingTop: "120px", paddingBottom: "80px" }}
    >
      <div className={css.layout}>
        <div className={css.mainInfo}>
          <div className={css.imageWrapper}>
            <Image
              src={car.img || "/placeholder-car.jpg"}
              alt={`${car.brand} ${car.model}`}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 65vw"
              className={css.image}
            />
          </div>

          <h1 className={css.title}>
            {car.brand} <span className={css.model}>{car.model}</span>,{" "}
            {car.year}
          </h1>

          <p className={css.description}>{car.description}</p>

          <div className={css.techSpecs}>
            <h2 className={css.sectionTitle}>Технічні характеристики</h2>
            <ul className={css.specsList}>
              <li>
                <strong>Тип кузова:</strong> {car.type}
              </li>
              <li>
                <strong>Двигун:</strong> {car.engine}
              </li>
              <li>
                <strong>Витрата пального:</strong> {car.fuelConsumption} л / 100
                км
              </li>
              <li>
                <strong>Пробіг:</strong> {car.mileage.toLocaleString("uk-UA")}{" "}
                км
              </li>
              <li>
                <strong>Ціна оренди:</strong> ${car.rentalPrice} / год
              </li>
            </ul>
          </div>

          <div className={css.featuresBlock}>
            <h2 className={css.sectionTitle}>Комплектація та особливості</h2>
            <div className={css.featuresGrid}>
              {car.features?.map((feature, idx) => (
                <span key={idx} className={css.featureTag}>
                  ✓ {feature}
                </span>
              ))}
            </div>
          </div>

          <div className={css.conditionsBlock}>
            <h2 className={css.sectionTitle}>Умови оренди</h2>
            <div className={css.conditionsGrid}>
              {conditions.map((condition, idx) => (
                <span key={idx} className={css.conditionTag}>
                  {condition}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className={css.sidebar}>
          <RentalForm />
        </div>
      </div>
    </div>
  );
}
