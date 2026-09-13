import Link from "next/link";
import { ComponentPropsWithRef, forwardRef } from "react";
import clsx from "clsx";
import css from "./styles.module.css";

type ButtonVariant = "primary" | "filter" | "secondary" | "ghost" | "action";

interface BaseButtonProps {
  variant?: ButtonVariant;
}

interface LinkProps
  extends BaseButtonProps, ComponentPropsWithRef<typeof Link> {
  href: string;
}

interface NativeButtonProps
  extends BaseButtonProps, ComponentPropsWithRef<"button"> {
  href?: never;
}

type ButtonProps = LinkProps | NativeButtonProps;

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>((props, ref) => {
  const { children, variant = "primary", className, ...restProps } = props;

  const buttonClasses = clsx(css.btn, css[variant], className);

  if ("href" in restProps) {
    return (
      <Link
        className={buttonClasses}
        ref={ref as React.Ref<HTMLAnchorElement>}
        {...(restProps as any)}
      >
        {children}
      </Link>
    );
  }

  const { type = "button", ...buttonProps } = restProps as NativeButtonProps;

  return (
    <button
      type={type}
      className={buttonClasses}
      ref={ref as React.Ref<HTMLButtonElement>}
      {...buttonProps}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

//       {/* 1. На главной (как Ссылка для перехода к каталогу) */}
//       <Button variant="primary" href="/cars">
//         Смотреть каталог
//       </Button>

//       {/* 2. В фильтре (Обычная кнопка для отправки формы фильтрации) */}
//       <Button variant="filter" type="submit">
//         Применить
//       </Button>

//       {/* 3. В карточке машины (Ссылка на страницу конкретного авто) */}
//       <Button variant="outline" href="/cars/tesla-model-3">
//         Подробнее
//       </Button>

//       {/* 4. Загрузить больше (Обычная кнопка с функцией onClick) */}
//       <Button variant="ghost" onClick={() => console.log("Загрузка...")}>
//         Показать еще
//       </Button>

//       {/* 5. В форме оформления аренды (Кнопка отправки финальной формы) */}
//       <Button variant="action" type="submit">
//         Забронировать авто
//       </Button>
