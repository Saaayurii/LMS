import React from "react";

const footer = () => {
  return (
    <footer class="bg-gradient-to-r text-primary-foreground pb-9 pt-32">
      <div class="container mx-auto px-32">
        <div class="flex flex-col items-center md:flex-row md:justify-between">
          <div class="text-2xl font-bold">
            <a href="/" class="text-secondary-foreground hover:text-cyan-600">
              LMS Платформа
            </a>
          </div>

          <div class="mt-4 md:mt-0">
            <ul class="flex space-x-6">
              <li>
                <a
                  href="/about"
                  class="text-secondary-foreground hover:text-cyan-600"
                >
                  О нас
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  class="text-secondary-foreground hover:text-cyan-600"
                >
                  Контакты
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  class="text-secondary-foreground hover:text-cyan-600"
                >
                  Условия использования
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  class="text-secondary-foreground hover:text-cyan-600"
                >
                  Политика конфиденциальности
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="text-center mt-6 text-sm text-muted-foreground">
          <p>&copy; 2025 LMS Платформа. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default footer;
