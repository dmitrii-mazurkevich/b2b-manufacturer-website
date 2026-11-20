/* ==========================================================================
   i18n - EN in the markup, RU below. Same engine as the portfolio hub.
   ========================================================================== */

(function () {
  'use strict';

  var LANGS = ['en', 'ru'];
  var DEFAULT = 'en';

  var DICT = {
    ru: {
      'nav.skip': 'Перейти к содержимому',
      'nav.home': 'Главная',
      'nav.products': 'Продукция',
      'nav.company': 'О компании',
      'nav.certs': 'Сертификаты',
      'nav.careers': 'Вакансии',
      'nav.rfq': 'Запросить КП',
      'nav.menuBtn': 'Открыть меню',
      'demo.text': ' Запросы никуда не отправляются.',
      'demo.link': 'Вернуться в портфолио',
      'util.hours': 'Пн-Пт 8:00-18:00',
      'foot.about': 'Промышленная трубопроводная арматура с 1998 года. Проектирование, литьё, механообработка и испытания на одной площадке.',
      'foot.products': 'Продукция',
      'foot.ball': 'Шаровые краны',
      'foot.gate': 'Задвижки',
      'foot.butterfly': 'Дисковые затворы',
      'foot.actuator': 'Приводы',
      'foot.company': 'Компания',
      'foot.legal': 'Реквизиты',
      'foot.contact': 'Отдел продаж',
      'foot.concept': 'Концепт-демо, автор - <a href="https://github.com/dmitrii-mazurkevich">Дмитрий Мазуркевич</a>.',

      'home.metaTitle': 'Ferrolit - производитель трубопроводной арматуры',
      'home.metaDesc': 'Шаровые краны, задвижки, дисковые затворы, обратные и предохранительные клапаны DN 15-1200, PN до 100. Свой литейный цех и стенд, сертификаты, поставки в 40 стран. Запрос КП онлайн.',
      'home.eyebrow': 'Производитель трубопроводной арматуры',
      'home.title': 'Арматура, которая проходит испытания <em>до отгрузки</em>',
      'home.lede': 'Шаровые краны, задвижки, затворы, обратные и предохранительные клапаны для водоканалов, нефтегаза, энергетики и химических производств. Каждое изделие испытывается давлением на нашем стенде и уезжает с протоколом.',
      'home.cta1': 'Открыть каталог',
      'home.cta2': 'Запросить КП',
      'home.k1': 'на рынке',
      'home.k1v': '28 лет',
      'home.k2': 'стран поставок',
      'home.k3': 'изделий в год',
      'home.k3v': '120 000',
      'home.k4': 'на ответ по КП',
      'home.k4v': '24 ч',
      'home.linesTitle': 'Линейки продукции',
      'home.allSeries': 'Все 8 серий с характеристиками',
      'home.l_ball': 'Шаровые краны',
      'home.l_gate': 'Задвижки',
      'home.l_butterfly': 'Дисковые затворы',
      'home.l_actuator': 'Приводы',
      'home.indTitle': 'Для каких отраслей',
      'home.i1': 'Водоснабжение и водоотведение',
      'home.i1d': 'задвижки и затворы для городских сетей и насосных станций',
      'home.i2': 'Нефть и газ',
      'home.i2d': 'огнестойкие шаровые краны, обратные клапаны, фильтры',
      'home.i3': 'Энергетика и теплоснабжение',
      'home.i3d': 'предохранительные клапаны для пара до 450 °C',
      'home.i4': 'Химия и пищевое производство',
      'home.i4d': 'арматура из нержавеющей стали с седлами из PTFE',
      'home.whyTitle': 'Почему снабженцы остаются с нами',
      'home.whyLede': 'Большинство клиентов пришли под один проект и заказывают уже годами. Чаще всего называют три причины.',
      'home.w1': 'КП за один рабочий день',
      'home.w1d': 'с ценами, сроками и документами, которые требует ваш тендер',
      'home.w2': 'Испытания 100% изделий',
      'home.w2d': 'прочность корпуса и герметичность затвора у каждого изделия, а не у выборки из партии',
      'home.w3': 'Исполнения под заказ',
      'home.w3d': 'особая строительная длина, материалы или площадка под привод от 10 штук',
      'home.ctaTitle': 'Есть спецификация или тендерный список?',
      'home.ctaText': 'Добавьте позиции из каталога или пришлите свой список. Инженер ответит в течение рабочего дня.',

      'prod.metaTitle': 'Продукция и характеристики - Ferrolit',
      'prod.metaDesc': 'Восемь серий арматуры: DN, PN, материал, температура и присоединение. Отберите по своим требованиям и добавьте позиции в запрос КП.',
      'prod.title': 'Продукция и характеристики',
      'prod.lede': 'Укажите параметры из спецификации, и мы покажем серии, которые их закрывают. Нужные добавляются в запрос КП одной кнопкой.',
      'prod.filtersAria': 'Отбор по параметрам',
      'prod.toRfq': 'Перейти к запросу КП',
      'prod.note': 'DN - условный диаметр в мм, PN - условное давление в барах. Полные паспорта и 3D-модели высылаем вместе с КП.',

      'rfq.metaTitle': 'Запрос коммерческого предложения - Ferrolit',
      'rfq.metaDesc': 'Запрос КП на трубопроводную арматуру: позиции, данные проекта и контакты. Ответ в течение рабочего дня.',
      'rfq.title': 'Запрос коммерческого предложения',
      'rfq.lede': 'Три коротких шага. Чем точнее позиции, тем точнее цена, но примерный список тоже подойдёт.',
      'rfq.stepsAria': 'Шаги',
      'rfq.s1': 'Позиции',
      'rfq.s2': 'Проект',
      'rfq.s3': 'Контакты',
      'rfq.s1h': 'Что нужно?',
      'rfq.fromCat': 'Добавить из каталога',
      'rfq.addCustom': 'Добавить свою позицию',
      'rfq.next': 'Дальше',
      'rfq.back': 'Назад',
      'rfq.s2h': 'О проекте',
      'rfq.industry': 'Отрасль',
      'rfq.choose': 'Выберите',
      'rfq.other': 'Другое',
      'rfq.country': 'Страна поставки',
      'rfq.deadline': 'Нужно к',
      'rfq.optional': '(необязательно)',
      'rfq.tender': 'Номер тендера или проекта',
      'rfq.docs': 'Какие документы приложить',
      'rfq.d1': 'Сертификат соответствия',
      'rfq.d2': 'Паспорт изделия и протокол испытаний',
      'rfq.d3': 'Чертежи и 3D-модели',
      'rfq.d4': 'Сертификат взрывозащиты на приводы',
      'rfq.s3h': 'Куда отправить предложение',
      'rfq.company': 'Компания',
      'rfq.taxid': 'ИНН',
      'rfq.person': 'Контактное лицо',
      'rfq.email': 'Рабочий email',
      'rfq.phone': 'Телефон',
      'rfq.comment': 'Комментарий',
      'rfq.privacy': 'Используем эти данные только чтобы подготовить и отправить предложение.',
      'rfq.send': 'Отправить запрос',
      'rfq.backCat': 'Вернуться в каталог',

      'co.metaTitle': 'О компании, сертификаты и реквизиты - Ferrolit',
      'co.metaDesc': 'Ferrolit с 1998 года: история, производство, сертификаты ISO 9001, ISO 14001, PED, география поставок и реквизиты.',
      'co.title': 'О компании',
      'co.lede': 'Семейная компания, которая выросла из ремонтной мастерской в завод полного цикла: проектирование, литьё, механообработка, сборка и испытания в одном месте.',
      'co.histTitle': 'История',
      'co.h1': 'Мастерская по ремонту арматуры, шесть человек.',
      'co.h2': 'Первая своя серия: чугунные задвижки для водоканалов.',
      'co.h3': 'Свой литейный цех и испытательный стенд до PN 160.',
      'co.h4': 'ISO 9001 и первый экспорт, шаровые краны для нефтегаза.',
      'co.h5': 'Электроприводы своей разработки, поставки в 40 стран.',
      'co.certTitle': 'Сертификаты и документы',
      'co.c_doc': 'Документ',
      'co.c_scope': 'Область',
      'co.c_no': 'Номер',
      'co.c_valid': 'Действует до',
      'co.c1': 'Менеджмент качества, проектирование и производство',
      'co.c2': 'Экологический менеджмент',
      'co.c3': 'Оборудование под давлением для рынка ЕС',
      'co.c4': 'Машины и оборудование под давлением, ЕАЭС',
      'co.c5': 'Шаровые и обратные клапаны для трубопроводов',
      'co.certNote': 'Копии прикладываем к каждому КП. Номера на демо-сайте - заглушки.',
      'co.geoTitle': 'Где работает наша арматура',
      'co.geoLede': '40 стран, в основном через постоянных дистрибьюторов, которые держат на складе ходовые размеры.',
      'co.g1': 'Европа',
      'co.g2': 'Центральная Азия и Кавказ',
      'co.g3': 'Ближний Восток',
      'co.g4': 'Африка',
      'co.g5': 'Латинская Америка',
      'co.legalTitle': 'Реквизиты',
      'co.l1': 'Полное наименование',
      'co.demo': '(демо)',
      'co.l2': 'Регистрационный номер',
      'co.l3': 'ИНН / VAT',
      'co.l4': 'Юридический адрес',
      'co.l4v': 'Литейная улица, 1, промышленный парк, г. Пример',
      'co.l5': 'Банковские реквизиты',
      'co.l5v': 'Указываются в счёте',

      'car.metaTitle': 'Вакансии - Ferrolit',
      'car.metaDesc': 'Вакансии Ferrolit: инженер-конструктор, оператор ЧПУ, инженер по продажам. Отклик онлайн.',
      'car.title': 'Вакансии',
      'car.lede': 'На заводе работает 280 человек. Учим на месте, платим вовремя и растим своих: большинство мастеров начинали операторами.',
      'car.j1': 'Инженер-конструктор арматуры',
      'car.j1m': 'Конструкторский отдел · полная занятость · на заводе',
      'car.j1d': 'Разработка новых серий и исполнений под заказ в SolidWorks, чертежи и расчёты, работа с литейным цехом и стендом. Опыт с трубопроводной арматурой или оборудованием под давлением - большой плюс.',
      'car.j2': 'Оператор станков с ЧПУ',
      'car.j2m': 'Производство · сменный график · на заводе',
      'car.j2d': 'Обработка корпусов и шаров на токарных станках и обрабатывающих центрах с ЧПУ. Обучаем на нашем оборудовании, доплата за смены и транспорт из города.',
      'car.j3': 'Инженер по продажам',
      'car.j3m': 'Продажи · полная занятость · гибрид',
      'car.j3d': 'Подготовка КП по спецификациям заказчиков, подбор арматуры по параметрам, поддержка дистрибьюторов. Нужно техническое образование.',
      'car.apply': 'Откликнуться',
      'car.formTitle': 'Отклик',
      'car.position': 'Вакансия',
      'car.name': 'Имя',
      'car.email': 'Email',
      'car.cv': 'Резюме',
      'car.cvHint': '(PDF или DOC, до 5 МБ, необязательно)',
      'car.send': 'Отправить отклик'
    }
  };

  /* ---------- engine --------------------------------------------------- */

  var root = document.documentElement;
  var originals = null;

  function selectorNodes() {
    return document.querySelectorAll('[data-i18n], [data-i18n-html], [data-i18n-attr]');
  }

  function cacheOriginals() {
    if (originals) return;
    originals = [];
    Array.prototype.forEach.call(selectorNodes(), function (el) {
      var rec = { el: el };
      if (el.hasAttribute('data-i18n')) rec.text = el.textContent;
      if (el.hasAttribute('data-i18n-html')) rec.html = el.innerHTML;
      if (el.hasAttribute('data-i18n-attr')) {
        rec.attrs = {};
        el.getAttribute('data-i18n-attr').split('|').forEach(function (pair) {
          var attr = pair.split(':')[0].trim();
          rec.attrs[attr] = el.getAttribute(attr);
        });
      }
      originals.push(rec);
    });
  }

  function restore() {
    originals.forEach(function (rec) {
      if (rec.text !== undefined) rec.el.textContent = rec.text;
      if (rec.html !== undefined) rec.el.innerHTML = rec.html;
      if (rec.attrs) {
        Object.keys(rec.attrs).forEach(function (attr) {
          if (rec.attrs[attr] !== null) rec.el.setAttribute(attr, rec.attrs[attr]);
        });
      }
    });
  }

  function translate(lang) {
    var dict = DICT[lang] || {};
    Array.prototype.forEach.call(selectorNodes(), function (el) {
      var key = el.getAttribute('data-i18n');
      if (key && dict[key] !== undefined) el.textContent = dict[key];

      var htmlKey = el.getAttribute('data-i18n-html');
      if (htmlKey && dict[htmlKey] !== undefined) el.innerHTML = dict[htmlKey];

      var attrSpec = el.getAttribute('data-i18n-attr');
      if (attrSpec) {
        attrSpec.split('|').forEach(function (pair) {
          var parts = pair.split(':');
          var attr = parts[0].trim(), k = (parts[1] || '').trim();
          if (dict[k] !== undefined) el.setAttribute(attr, dict[k]);
        });
      }
    });
  }

  function apply(lang, persist) {
    if (LANGS.indexOf(lang) === -1) lang = DEFAULT;
    cacheOriginals();
    restore();
    if (lang !== DEFAULT) translate(lang);

    root.setAttribute('lang', lang);
    root.setAttribute('data-lang', lang);
    root.classList.remove('i18n-pending');

    document.querySelectorAll('.lang button[data-lang]').forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn.getAttribute('data-lang') === lang));
    });

    if (persist) { try { localStorage.setItem('fv-lang', lang); } catch (e) {} }

    // Keep the URL honest so a shared link opens in the same language.
    if (window.history && history.replaceState) {
      var url = new URL(location.href);
      if (lang === DEFAULT) { url.searchParams.delete('lang'); }
      else { url.searchParams.set('lang', lang); }
      history.replaceState(null, '', url.toString());
    }

    document.dispatchEvent(new CustomEvent('languagechange', { detail: { lang: lang } }));
  }

  function current() {
    return root.getAttribute('data-lang') || DEFAULT;
  }

  // Initial application — the inline head script already picked the language.
  apply(current(), false);

  document.querySelectorAll('.lang button[data-lang]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      apply(btn.getAttribute('data-lang'), true);
    });
  });

  window.I18N = { apply: apply, current: current, langs: LANGS, dict: DICT };
})();
