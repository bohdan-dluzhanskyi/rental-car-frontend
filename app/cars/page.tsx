"use client";

import React, { useTransition } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { fetchCars } from "@/services/api";
import { CarCard } from "@/components/CarCard/CarCard";
import Filters from "@/components/Filters/Filters";
import { Button } from "@/components/ui/Button";
import css from "./page.module.css";
import Image from "next/image";

export default function CatalogPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();

  const filters = {
    brand: searchParams.get("brand") || undefined,
    maxPrice: searchParams.get("maxPrice") || undefined,
    minMileage: searchParams.get("minMileage") || undefined,
    maxMileage: searchParams.get("maxMileage") || undefined,
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["cars", filters],
      queryFn: ({ pageParam }) => fetchCars({ pageParam, filters }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        const currentLimit = allPages.length * 12;
        return lastPage.length < currentLimit ? undefined : allPages.length + 1;
      },
    });

  const carsToRender = data?.pages.flatMap((page) => page) || [];

  const handleResetFilters = () => {
    startTransition(() => {
      router.replace(pathname);
    });
  };

  return (
    <div className={css.container}>
      <Filters />

      {status === "pending" && (
        <p className={css.infoMessage}>Завантажуємо свіжі автомобілі...</p>
      )}
      {status === "error" && (
        <p className={css.errorMessage}>
          Упс, сталася помилка завантаження даних.
        </p>
      )}

      {status === "success" && (
        <>
          {carsToRender.length > 0 ? (
            <div className={css.grid}>
              {carsToRender.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          ) : (
            <div className={css.noCarsContainer}>
              <Image
                src="/image 12.svg"
                width={414}
                height={388}
                alt="No cars found"
              />
              <h2 className={css.noCarsTitle}>No cars found</h2>
              <p className={css.noCarsText}>
                We couldn`t find any cars that match your current filters. Try
                changing your search criteria or reset the filters.
              </p>
              <Button
                variant="ghost"
                type="button"
                onClick={handleResetFilters}
              >
                Reset filters
              </Button>
            </div>
          )}

          {hasNextPage && carsToRender.length > 0 && (
            <div className={css.loadMoreContainer}>
              <Button
                variant="ghost"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
              >
                {isFetchingNextPage ? "Loading..." : "Load More"}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
