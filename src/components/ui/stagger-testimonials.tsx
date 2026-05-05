import type React from "react"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const SQRT_5000 = Math.sqrt(5000)

// Fashion brand testimonials
const testimonials = [
  {
    tempId: 0,
    testimonial:
      "Заказала пальто из осенней коллекции — ношу его каждый день уже третий месяц. Качество потрясающее, не потеряло форму совсем. NOIR Studio — это надолго.",
    by: "Анна М., Москва",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=AnnaM&backgroundColor=3b82f6&textColor=ffffff",
  },
  {
    tempId: 1,
    testimonial:
      "Наконец-то нашла бренд, который понимает, что значит «просто и стильно». Никакой мишуры — только чистый крой и правильные материалы. Беру уже третью вещь.",
    by: "Марина К., Санкт-Петербург",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=MarinaK&backgroundColor=10b981&textColor=ffffff",
  },
  {
    tempId: 2,
    testimonial:
      "Купил свитер в подарок жене — она была в восторге. Теперь сам заказал брюки себе. Доставка быстрая, упаковка красивая, вещи — выше всяких ожиданий.",
    by: "Дмитрий В., Екатеринбург",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=DmitriyV&backgroundColor=8b5cf6&textColor=ffffff",
  },
  {
    tempId: 3,
    testimonial:
      "Ткань на ощупь просто невероятная — мягкая, но держит форму. Видно, что выбирали с умом. Не ожидала такого качества от онлайн-магазина. Буду возвращаться.",
    by: "Екатерина Л., Казань",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=EkaterinaL&backgroundColor=ef4444&textColor=ffffff",
  },
  {
    tempId: 4,
    testimonial:
      "Стиль NOIR Studio — это то, что я давно искала. Минимализм без скуки. Вещи легко сочетаются между собой, и каждый раз получается новый образ.",
    by: "Ольга Р., Новосибирск",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=OlgaR&backgroundColor=f59e0b&textColor=ffffff",
  },
  {
    tempId: 5,
    testimonial:
      "Брюки сели идеально с первого раза — и это онлайн! Размерная сетка точная, описания честные. Приятно покупать там, где не врут про товар.",
    by: "Алексей Н., Краснодар",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=AlekseyN&backgroundColor=6366f1&textColor=ffffff",
  },
  {
    tempId: 6,
    testimonial:
      "Взяла платье на вечер — получила комплименты от всех. Простой крой, но такой элегантный. NOIR Studio умеет делать из простого — особенное.",
    by: "Айгуль С., Уфа",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=AigulS&backgroundColor=ec4899&textColor=ffffff",
  },
  {
    tempId: 7,
    testimonial:
      "Сервис на уровне: отвечают быстро, помогли с выбором размера, доставили раньше срока. Вещи соответствуют фото. Это редкость — спасибо!",
    by: "Ирина Д., Ростов-на-Дону",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=IrinaD&backgroundColor=06b6d4&textColor=ffffff",
  },
  {
    tempId: 8,
    testimonial:
      "Стал постоянным покупателем после первого заказа. Каждая новая коллекция — это что-то свежее, но всё равно в духе бренда. Последовательность — редкое качество.",
    by: "Михаил П., Самара",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=MikhailP&backgroundColor=f97316&textColor=ffffff",
  },
  {
    tempId: 9,
    testimonial:
      "Наконец перестала тратить деньги на «дёшево и много». Лучше одна вещь из NOIR Studio, чем пять случайных из масс-маркета. Ношу — и радуюсь каждый раз.",
    by: "Наталья К., Воронеж",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=NatalyaK&backgroundColor=84cc16&textColor=ffffff",
  },
  {
    tempId: 10,
    testimonial:
      "Оформила возврат одной вещи — процесс был простой и без вопросов. Уже заказала взамен другую. Так и строится доверие к бренду.",
    by: "София Г., Пермь",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=SofiaG&backgroundColor=a855f7&textColor=ffffff",
  },
  {
    tempId: 11,
    testimonial:
      "Подарила маме жакет на день рождения — она в восторге. Говорит, что такого качества не видела давно. Буду дарить NOIR Studio всем и всегда.",
    by: "Тамара В., Омск",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=TamaraV&backgroundColor=059669&textColor=ffffff",
  },
  {
    tempId: 12,
    testimonial:
      "Подписалась на рассылку и не пожалела — узнала о новой коллекции первой. Взяла три вещи по предзаказу. Когда пришли — не разочаровалась ни в одной.",
    by: "Вера Т., Тюмень",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=VeraT&backgroundColor=0ea5e9&textColor=ffffff",
  },
  {
    tempId: 13,
    testimonial:
      "Стиль NOIR Studio — это то, как я хочу выглядеть каждый день. Не кричащий, но заметный. Ношу с удовольствием и получаю вопросы «где взяла?» постоянно.",
    by: "Кристина М., Хабаровск",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=KristinaM&backgroundColor=dc2626&textColor=ffffff",
  },
  {
    tempId: 14,
    testimonial:
      "Долго выбирала между несколькими брендами — остановилась на NOIR Studio из-за состава ткани. Не пожалела. Хлопок плотный, пошив аккуратный. Рекомендую.",
    by: "Людмила Ш., Волгоград",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=LyudmilaS&backgroundColor=7c3aed&textColor=ffffff",
  },
  {
    tempId: 15,
    testimonial:
      "Первый заказ — и сразу фанат. Водолазка из новой коллекции — буквально идеальная. Цвет, посадка, ощущение на теле. Буду брать все цвета.",
    by: "Рита П., Барнаул",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=RitaP&backgroundColor=ea580c&textColor=ffffff",
  },
  {
    tempId: 16,
    testimonial:
      "Обожаю, что у NOIR Studio нет скидок «50% каждую неделю». Это честный бренд с честными ценами. Знаешь, за что платишь — и это приятно.",
    by: "Зоя Ф., Иркутск",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=ZoyaF&backgroundColor=16a34a&textColor=ffffff",
  },
  {
    tempId: 17,
    testimonial:
      "Мужская линейка — отдельный восторг. Лаконично, строго, но с характером. Ношу рубашку на важные встречи и просто в выходной — одинаково хорошо.",
    by: "Роман А., Красноярск",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=RomanA&backgroundColor=2563eb&textColor=ffffff",
  },
  {
    tempId: 18,
    testimonial:
      "Купила пальто два года назад — до сих пор как новое. Это и есть настоящее качество. Новые вещи покупаю только здесь.",
    by: "Валерия Н., Челябинск",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=ValeriyaN&backgroundColor=be185d&textColor=ffffff",
  },
  {
    tempId: 19,
    testimonial:
      "Сайт удобный, фото честные, описания подробные. Всё пришло в срок и именно то, что ожидала. Вот так и должен работать онлайн-магазин одежды.",
    by: "Полина Е., Владивосток",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=PolinaE&backgroundColor=0891b2&textColor=ffffff",
  },
]

interface TestimonialCardProps {
  position: number
  testimonial: (typeof testimonials)[0]
  handleMove: (steps: number) => void
  cardSize: number
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ position, testimonial, handleMove, cardSize }) => {
  const isCenter = position === 0
  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-8 transition-all duration-500 ease-in-out",
        isCenter
          ? "z-10 bg-gray-900 text-white border-gray-900"
          : "z-0 bg-white text-gray-900 border-gray-200 hover:border-gray-400",
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter ? "0px 8px 0px 4px hsl(var(--border))" : "0px 0px 0px 0px transparent",
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45 bg-gray-300"
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2,
        }}
      />
      <img
        src={testimonial.imgSrc || "/placeholder.svg"}
        alt={`${testimonial.by.split(",")[0]}`}
        className="mb-4 h-14 w-12 bg-gray-100 object-cover object-top"
        style={{
          boxShadow: "3px 3px 0px hsl(var(--background))",
        }}
      />
      <h3 className={cn("text-base sm:text-xl font-medium", isCenter ? "text-white" : "text-gray-900")}>
        "{testimonial.testimonial}"
      </h3>
      <p
        className={cn(
          "absolute bottom-8 left-8 right-8 mt-2 text-sm italic",
          isCenter ? "text-gray-300" : "text-gray-600",
        )}
      >
        - {testimonial.by}
      </p>
    </div>
  )
}

export const StaggerTestimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(365)
  const [testimonialsList, setTestimonialsList] = useState(testimonials)

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList]
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift()
        if (!item) return
        newList.push({ ...item, tempId: Math.random() })
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop()
        if (!item) return
        newList.unshift({ ...item, tempId: Math.random() })
      }
    }
    setTestimonialsList(newList)
  }

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)")
      setCardSize(matches ? 365 : 290)
    }
    updateSize()
    window.addEventListener("resize", updateSize)
    return () => window.removeEventListener("resize", updateSize)
  }, [])

  return (
    <div className="relative w-full overflow-hidden bg-white" style={{ height: 600 }}>
      {testimonialsList.map((testimonial, index) => {
        const position =
          testimonialsList.length % 2 ? index - (testimonialsList.length + 1) / 2 : index - testimonialsList.length / 2
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        )
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
            "bg-white border-2 border-gray-300 hover:bg-gray-900 hover:text-white",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2",
          )}
          aria-label="Предыдущий отзыв"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
            "bg-white border-2 border-gray-300 hover:bg-gray-900 hover:text-white",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2",
          )}
          aria-label="Следующий отзыв"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  )
}