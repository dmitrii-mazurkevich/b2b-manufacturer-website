/* ==========================================================================
   Ferrolit - product series. In a WordPress build: a "Series" post type with
   ACF fields for the spec table, exported to the RFQ form through the REST API.
   ========================================================================== */

(function () {
  'use strict';

  var TYPES = {
    ball:      { en: 'Ball valves',      ru: 'Шаровые краны' },
    gate:      { en: 'Gate valves',      ru: 'Задвижки' },
    butterfly: { en: 'Butterfly valves', ru: 'Затворы дисковые' },
    check:     { en: 'Check valves',     ru: 'Обратные клапаны' },
    safety:    { en: 'Safety valves',    ru: 'Предохранительные клапаны' },
    strainer:  { en: 'Strainers',        ru: 'Фильтры' },
    actuator:  { en: 'Actuators',        ru: 'Приводы' }
  };
  var MATERIALS = {
    cs:  { en: 'Carbon steel',   ru: 'Углеродистая сталь' },
    ss:  { en: 'Stainless AISI 316', ru: 'Нержавеющая AISI 316' },
    ci:  { en: 'Cast iron',      ru: 'Чугун' },
    di:  { en: 'Ductile iron',   ru: 'Высокопрочный чугун' },
    al:  { en: 'Aluminium',      ru: 'Алюминий' }
  };
  var MEDIA = {
    water: { en: 'Water',          ru: 'Вода' },
    oil:   { en: 'Oil and gas',    ru: 'Нефть и газ' },
    steam: { en: 'Steam',          ru: 'Пар' },
    chem:  { en: 'Chemicals',      ru: 'Химия' }
  };

  function s(id, type, mat, dn, pn, temp, conn, media, std, en, ru) {
    return { id: id, type: type, mat: mat, dn: dn, pn: pn, temp: temp, conn: conn, media: media, std: std, en: en, ru: ru };
  }

  var SERIES = [
    s('BV-100', 'ball', 'cs', [15, 300], [16, 25, 40], [-40, 200], { en: 'Flanged, welded', ru: 'Фланцевый, под приварку' }, ['water', 'oil', 'steam'], 'GOST 28343, EN 13709',
      { name: 'Full-bore ball valve', desc: 'Two-piece body, floating ball up to DN100 and trunnion-mounted above. Fire-safe design, anti-static device, locking handle.' },
      { name: 'Полнопроходной шаровой кран', desc: 'Двухсоставной корпус, плавающий шар до DN100 и шар в опорах выше. Огнестойкое исполнение, антистатика, ручка с фиксатором.' }),
    s('BV-200', 'ball', 'ss', [15, 200], [16, 40, 63], [-60, 220], { en: 'Flanged, threaded', ru: 'Фланцевый, муфтовый' }, ['water', 'chem', 'oil'], 'EN 12266, ISO 17292',
      { name: 'Stainless ball valve', desc: 'AISI 316 body and ball, PTFE seats. For food, pharma and aggressive media, ISO 5211 mounting pad for an actuator.' },
      { name: 'Шаровой кран из нержавеющей стали', desc: 'Корпус и шар из AISI 316, седла из PTFE. Для пищевых, фармацевтических и агрессивных сред, площадка ISO 5211 под привод.' }),
    s('GV-300', 'gate', 'ci', [50, 600], [10, 16], [-10, 120], { en: 'Flanged', ru: 'Фланцевая' }, ['water'], 'GOST 5762, EN 1171',
      { name: 'Resilient-seated gate valve', desc: 'Epoxy-coated body, EPDM-encapsulated wedge, non-rising stem. Standard choice for water supply networks.' },
      { name: 'Задвижка с обрезиненным клином', desc: 'Корпус с эпоксидным покрытием, клин в EPDM, невыдвижной шпиндель. Стандарт для сетей водоснабжения.' }),
    s('BF-400', 'butterfly', 'di', [50, 1200], [10, 16], [-20, 130], { en: 'Wafer, lug', ru: 'Межфланцевый, с проушинами' }, ['water', 'chem'], 'EN 593, ISO 5752',
      { name: 'Butterfly valve, wafer type', desc: 'Short face-to-face, replaceable EPDM or NBR liner, stainless disc. Lever, gearbox or actuator.' },
      { name: 'Дисковый затвор межфланцевый', desc: 'Малая строительная длина, сменная манжета EPDM или NBR, диск из нержавеющей стали. Рукоятка, редуктор или привод.' }),
    s('CV-500', 'check', 'cs', [15, 400], [16, 25, 40], [-40, 300], { en: 'Flanged, wafer', ru: 'Фланцевый, межфланцевый' }, ['water', 'oil', 'steam'], 'GOST 33423, EN 16767',
      { name: 'Swing check valve', desc: 'Prevents back-flow in pumping lines. Metal or soft seat, horizontal and vertical installation.' },
      { name: 'Обратный поворотный клапан', desc: 'Защищает насосные линии от обратного потока. Металлическое или мягкое уплотнение, горизонтальный и вертикальный монтаж.' }),
    s('SV-600', 'safety', 'cs', [15, 150], [16, 40, 63, 100], [-40, 450], { en: 'Flanged', ru: 'Фланцевый' }, ['steam', 'oil', 'water'], 'GOST 12.2.085, ISO 4126',
      { name: 'Spring safety relief valve', desc: 'Set pressure adjusted and sealed at the factory, test report with every valve. Open or closed bonnet.' },
      { name: 'Пружинный предохранительный клапан', desc: 'Давление настройки выставляется и пломбируется на заводе, протокол испытаний с каждым клапаном. Открытая или закрытая крышка.' }),
    s('ST-700', 'strainer', 'cs', [15, 300], [16, 25, 40], [-40, 300], { en: 'Flanged, threaded', ru: 'Фланцевый, муфтовый' }, ['water', 'oil', 'steam', 'chem'], 'EN 12266-1',
      { name: 'Y-strainer', desc: 'Stainless mesh from 0.25 mm, drain plug, cover with full access to the screen. Protects pumps and control valves.' },
      { name: 'Сетчатый фильтр', desc: 'Сетка из нержавеющей стали от 0,25 мм, сливная пробка, крышка с полным доступом к сетке. Защищает насосы и регуляторы.' }),
    s('AC-800', 'actuator', 'al', null, null, [-40, 70], { en: 'ISO 5211 flange', ru: 'Фланец ISO 5211' }, ['water', 'oil', 'steam', 'chem'], 'IP67, EN 15714',
      { name: 'Electric quarter-turn actuator', desc: 'Torque 50-2000 Nm, 24 V or 230 V, position feedback 4-20 mA and Modbus. Manual override handwheel.' },
      { name: 'Электропривод неполноповоротный', desc: 'Крутящий момент 50-2000 Нм, 24 или 230 В, обратная связь 4-20 мА и Modbus. Ручной дублёр.' })
  ];

  window.FV = { types: TYPES, materials: MATERIALS, media: MEDIA, series: SERIES };
})();
