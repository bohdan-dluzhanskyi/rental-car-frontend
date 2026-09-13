"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import css from "./RentalForm.module.css";

export function RentalForm() {
  const [formData, setFormData] = useState({ name: "", phone: "", date: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `Заявку надіслано! ${formData.name}, ми зателефонуємо вам на номер ${formData.phone}`,
    );
    setFormData({ name: "", phone: "", date: "" });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <h3 className={css.formTitle}>Забронювати автомобіль</h3>

      <div className={css.inputGroup}>
        <label className={css.label}>Ваше ім'я</label>
        <input
          type="text"
          required
          className={css.input}
          placeholder="Олександр"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div className={css.inputGroup}>
        <label className={css.label}>Телефон</label>
        <input
          type="tel"
          required
          className={css.input}
          placeholder="+380"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
      </div>

      <div className={css.inputGroup}>
        <label className={css.label}>Дата оренди</label>
        <input
          type="date"
          required
          className={css.input}
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />
      </div>

      <Button type="submit" variant="action" className={css.submitBtn}>
        Оформити оренду
      </Button>
    </form>
  );
}
