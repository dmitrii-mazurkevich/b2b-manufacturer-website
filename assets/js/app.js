/* ==========================================================================
   Ferrolit - catalogue with technical filters, RFQ list, multi-step RFQ,
   careers form. Vanilla JS. Re-renders on language change.
   ========================================================================== */

(function () {
  'use strict';

  var F = window.FV;
  var root = document.documentElement;
  var page = document.body.getAttribute('data-page');

  var STR = {
    en: {
      dn: 'DN', pn: 'PN', temp: 'Temp., °C', conn: 'Connection', mat: 'Material', std: 'Standards', media: 'Media',
      add: 'Add to RFQ', inRfq: 'In RFQ', details: 'Details', results: '{n} series match', none: 'No series match these requirements. Send us an RFQ anyway: we make custom versions.',
      reset: 'Reset', any: 'Any', torque: '50-2000 Nm', rfqCount: 'RFQ list', remove: 'Remove', qty: 'Qty', note: 'Note',
      emptyList: 'The list is empty. Add series from the catalogue or a custom line below.', custom: 'Custom item',
      required: 'Please fill this in.', email: 'Please enter a valid business email.', needLine: 'Add at least one position.',
      sent: 'Request {n} received', sentD: 'An engineer will reply within one working day with prices, lead times and documents.',
      file: 'File is too large: up to 5 MB.', applied: 'Thank you, your application is in. We reply to every candidate within a week.',
      series: 'Series', positions: 'Positions in the request: {n}.'
    },
    ru: {
      dn: 'DN', pn: 'PN', temp: 'Темп., °C', conn: 'Присоединение', mat: 'Материал', std: 'Стандарты', media: 'Среды',
      add: 'В запрос КП', inRfq: 'В запросе', details: 'Подробнее', results: 'Подходит серий: {n}', none: 'Под эти требования серий нет. Всё равно пришлите запрос: делаем исполнения под заказ.',
      reset: 'Сбросить', any: 'Любой', torque: '50-2000 Нм', rfqCount: 'Запрос КП', remove: 'Удалить', qty: 'Кол-во', note: 'Примечание',
      emptyList: 'Список пуст. Добавьте серии из каталога или свою позицию ниже.', custom: 'Своя позиция',
      required: 'Заполните это поле.', email: 'Укажите рабочий email.', needLine: 'Добавьте хотя бы одну позицию.',
      sent: 'Запрос {n} принят', sentD: 'Инженер ответит в течение рабочего дня: цены, сроки и документы.',
      file: 'Файл слишком большой: до 5 МБ.', applied: 'Спасибо, отклик получен. Отвечаем каждому кандидату в течение недели.',
      series: 'Серия', positions: 'Позиций в запросе: {n}.'
    }
  };
  function lang() { return root.getAttribute('data-lang') === 'ru' ? 'ru' : 'en'; }
  function s(k, n) { var v = STR[lang()][k] || STR.en[k] || k; return n !== undefined ? v.replace('{n}', n) : v; }
  function L(o) { return o[lang()] || o.en; }
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function $(q, c) { return (c || document).querySelector(q); }
  function $$(q, c) { return Array.prototype.slice.call((c || document).querySelectorAll(q)); }
  function byId(id) { return F.series.filter(function (x) { return x.id === id; })[0]; }

  /* ---------- RFQ list (localStorage) ------------------------------------ */

  function load() { try { var v = JSON.parse(localStorage.getItem('fv-rfq')); return Array.isArray(v) ? v : []; } catch (e) { return []; } }
  function save() { try { localStorage.setItem('fv-rfq', JSON.stringify(rfq)); } catch (e) {} }
  var rfq = load().filter(function (l) { return l && (byId(l.series) || l.custom); });

  function badge() {
    $$('[data-rfq-count]').forEach(function (el) { el.textContent = String(rfq.length); el.hidden = !rfq.length; });
  }
  function inList(id) { return rfq.some(function (l) { return l.series === id; }); }
  function addSeries(id) {
    if (inList(id)) return;
    var x = byId(id);
    rfq.push({ series: id, dn: x.dn ? String(x.dn[0]) : '', pn: x.pn ? String(x.pn[0]) : '', qty: 1, note: '' });
    save(); badge();
  }

  /* ---------- catalogue -------------------------------------------------- */

  var fs = { type: '', mat: '', media: '', dn: '', pn: '' };

  function matches(x) {
    if (fs.type && x.type !== fs.type) return false;
    if (fs.mat && x.mat !== fs.mat) return false;
    if (fs.media && x.media.indexOf(fs.media) === -1) return false;
    var dn = parseInt(fs.dn, 10);
    if (dn && (!x.dn || dn < x.dn[0] || dn > x.dn[1])) return false;
    var pn = parseInt(fs.pn, 10);
    if (pn && (!x.pn || Math.max.apply(null, x.pn) < pn)) return false;
    return true;
  }

  function options(map, sel) {
    return '<option value="">' + s('any') + '</option>' + Object.keys(map).map(function (k) {
      return '<option value="' + k + '"' + (k === sel ? ' selected' : '') + '>' + esc(L(map[k])) + '</option>';
    }).join('');
  }

  function renderFilters() {
    var box = $('[data-cat-filters]');
    if (!box) return;
    var lab = lang() === 'ru'
      ? { type: 'Тип', mat: 'Материал', media: 'Рабочая среда', dn: 'Нужный DN, мм', pn: 'Давление от, PN' }
      : { type: 'Type', mat: 'Material', media: 'Medium', dn: 'Required DN, mm', pn: 'Pressure from, PN' };
    box.innerHTML =
      '<div class="f"><label for="f-type">' + lab.type + '</label><select id="f-type" name="type">' + options(F.types, fs.type) + '</select></div>' +
      '<div class="f"><label for="f-mat">' + lab.mat + '</label><select id="f-mat" name="mat">' + options(F.materials, fs.mat) + '</select></div>' +
      '<div class="f"><label for="f-media">' + lab.media + '</label><select id="f-media" name="media">' + options(F.media, fs.media) + '</select></div>' +
      '<div class="f"><label for="f-dn">' + lab.dn + '</label><input id="f-dn" name="dn" type="number" inputmode="numeric" min="10" max="1400" step="1" placeholder="100" value="' + esc(fs.dn) + '"></div>' +
      '<div class="f"><label for="f-pn">' + lab.pn + '</label><select id="f-pn" name="pn"><option value="">' + s('any') + '</option>' +
        [10, 16, 25, 40, 63, 100].map(function (p) { return '<option value="' + p + '"' + (String(p) === fs.pn ? ' selected' : '') + '>PN ' + p + '</option>'; }).join('') + '</select></div>' +
      '<div class="f f--btn"><button type="button" class="btn btn--ghost" data-reset>' + s('reset') + '</button></div>';
  }

  function range(r, unit) { return r ? r[0] + '-' + r[1] + (unit || '') : '-'; }

  function renderCatalog() {
    var box = $('[data-catalog]');
    if (!box) return;
    var list = F.series.filter(matches);
    $('[data-results]').textContent = s('results', list.length);
    if (!list.length) { box.innerHTML = '<p class="empty">' + s('none') + ' <a href="rfq.html">RFQ</a></p>'; return; }
    box.innerHTML = '<div class="table-wrap" tabindex="0" role="region" aria-label="' + s('series') + '"><table class="specs"><thead><tr>' +
      '<th scope="col">' + s('series') + '</th><th scope="col">' + s('dn') + '</th><th scope="col">' + s('pn') + '</th><th scope="col">' + s('mat') + '</th>' +
      '<th scope="col">' + s('temp') + '</th><th scope="col">' + s('conn') + '</th><th scope="col"><span class="visually-hidden">RFQ</span></th></tr></thead><tbody>' +
      list.map(function (x) {
        var t = L(x), on = inList(x.id);
        return '<tr id="s-' + x.id + '"><th scope="row"><span class="code">' + x.id + '</span><span class="sname">' + esc(t.name) + '</span><span class="stype">' + esc(L(F.types[x.type])) + '</span></th>' +
          '<td data-l="' + s('dn') + '">' + (x.dn ? range(x.dn) : s('torque')) + '</td>' +
          '<td data-l="' + s('pn') + '">' + (x.pn ? x.pn.join(' / ') : '-') + '</td>' +
          '<td data-l="' + s('mat') + '">' + esc(L(F.materials[x.mat])) + '</td>' +
          '<td data-l="' + s('temp') + '">' + range(x.temp) + '</td>' +
          '<td data-l="' + s('conn') + '">' + esc(L(x.conn)) + '</td>' +
          '<td class="act"><button type="button" class="btn btn--sm' + (on ? ' btn--done' : '') + '" data-add="' + x.id + '"' + (on ? ' aria-pressed="true"' : ' aria-pressed="false"') + '>' + (on ? '✓ ' + s('inRfq') : s('add')) + '</button>' +
            '<details class="more"><summary>' + s('details') + '</summary><p>' + esc(t.desc) + '</p><p class="muted"><b>' + s('std') + ':</b> ' + esc(x.std) + '. <b>' + s('media') + ':</b> ' +
            x.media.map(function (m) { return esc(L(F.media[m])); }).join(', ') + '.</p></details></td></tr>';
      }).join('') + '</tbody></table></div>';
  }

  function initCatalog() {
    var u = new URLSearchParams(location.search);
    ['type', 'mat', 'media', 'dn', 'pn'].forEach(function (k) { if (u.get(k)) fs[k] = u.get(k).slice(0, 12); });
    renderFilters(); renderCatalog();
    var box = $('[data-cat-filters]');
    var sync = function () {
      var p = new URLSearchParams(location.search);
      Object.keys(fs).forEach(function (k) { if (fs[k]) p.set(k, fs[k]); else p.delete(k); });
      var q = p.toString(); history.replaceState(null, '', location.pathname + (q ? '?' + q : ''));
      renderCatalog();
    };
    box.addEventListener('change', function (e) { if (e.target.name) { fs[e.target.name] = e.target.value; sync(); } });
    box.addEventListener('input', function (e) { if (e.target.name === 'dn') { fs.dn = e.target.value.replace(/\D/g, ''); sync(); } });
    box.addEventListener('click', function (e) {
      if (!e.target.closest('[data-reset]')) return;
      fs = { type: '', mat: '', media: '', dn: '', pn: '' }; renderFilters(); sync();
    });
    $('[data-catalog]').addEventListener('click', function (e) {
      var b = e.target.closest('[data-add]');
      if (!b) return;
      addSeries(b.getAttribute('data-add'));
      var id = b.getAttribute('data-add');
      renderCatalog();
      var nb = $('[data-add="' + id + '"]'); if (nb) nb.focus();
    });
  }

  /* ---------- RFQ form ----------------------------------------------------- */

  var step = 1;

  function lineRow(l, i) {
    var x = l.series ? byId(l.series) : null;
    var title = x ? '<span class="code">' + x.id + '</span> ' + esc(L(x).name) : '<input class="inl" name="custom-' + i + '" data-field="custom" data-i="' + i + '" value="' + esc(l.custom || '') + '" placeholder="' + s('custom') + '" aria-label="' + s('custom') + '">';
    var dnSel = x && x.dn ? '<select data-field="dn" data-i="' + i + '" aria-label="DN">' + [15, 20, 25, 32, 40, 50, 65, 80, 100, 125, 150, 200, 250, 300, 400, 500, 600, 800, 1000, 1200]
      .filter(function (d) { return d >= x.dn[0] && d <= x.dn[1]; }).map(function (d) { return '<option' + (String(d) === l.dn ? ' selected' : '') + '>' + d + '</option>'; }).join('') + '</select>'
      : '<input class="inl inl--sm" data-field="dn" data-i="' + i + '" value="' + esc(l.dn || '') + '" aria-label="DN" placeholder="DN">';
    var pnSel = x && x.pn ? '<select data-field="pn" data-i="' + i + '" aria-label="PN">' + x.pn.map(function (p) { return '<option' + (String(p) === l.pn ? ' selected' : '') + '>' + p + '</option>'; }).join('') + '</select>'
      : '<input class="inl inl--sm" data-field="pn" data-i="' + i + '" value="' + esc(l.pn || '') + '" aria-label="PN" placeholder="PN">';
    return '<li class="rline">' +
      '<div class="rline__title">' + title + '</div>' +
      '<label class="rline__f"><span>DN</span>' + dnSel + '</label>' +
      '<label class="rline__f"><span>PN</span>' + pnSel + '</label>' +
      '<label class="rline__f"><span>' + s('qty') + '</span><input type="number" min="1" max="99999" inputmode="numeric" data-field="qty" data-i="' + i + '" value="' + (l.qty || 1) + '"></label>' +
      '<button type="button" class="rline__rm" data-rm="' + i + '" aria-label="' + s('remove') + '">×</button>' +
    '</li>';
  }

  function renderLines() {
    var box = $('[data-lines]');
    if (!box) return;
    box.innerHTML = rfq.length ? rfq.map(lineRow).join('') : '<li class="empty">' + s('emptyList') + '</li>';
    badge();
  }

  function showStep(n) {
    step = n;
    $$('[data-step]').forEach(function (p) { p.hidden = parseInt(p.getAttribute('data-step'), 10) !== n; });
    $$('.progress li').forEach(function (li, i) {
      li.classList.toggle('is-done', i + 1 < n);
      if (i + 1 === n) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current');
    });
    var h = $('[data-step="' + n + '"] h2'); if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); }
    var top = $('.progress'); if (top && window.scrollY > top.offsetTop) top.scrollIntoView({ behavior: 'smooth' });
  }

  function err(input, msg) {
    var w = input.closest('.field'); var e = w && w.querySelector('.error');
    if (e) e.textContent = msg || '';
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    return !msg;
  }
  function checkPanel(n) {
    var panel = $('[data-step="' + n + '"]'), ok = true, first = null;
    if (n === 1) {
      var m = $('[data-lines-error]');
      var real = rfq.filter(function (l) { return l.series || (l.custom && l.custom.trim()); });
      m.textContent = real.length ? '' : s('needLine');
      if (!real.length) { ok = false; first = $('[data-add-custom]'); }
    }
    $$('[required]', panel).forEach(function (f) {
      var v = f.value.trim(), msg = !v ? s('required') : (f.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? s('email') : '');
      if (!err(f, msg)) { ok = false; first = first || f; }
    });
    if (first) first.focus();
    return ok;
  }

  function initRfq() {
    var form = $('[data-rfq]');
    if (!form) return;
    renderLines();
    var lines = $('[data-lines]');
    lines.addEventListener('input', function (e) {
      var i = e.target.getAttribute('data-i'), f = e.target.getAttribute('data-field');
      if (i === null || !rfq[i]) return;
      rfq[i][f] = f === 'qty' ? Math.max(1, parseInt(e.target.value, 10) || 1) : e.target.value;
      save();
    });
    lines.addEventListener('change', function (e) { var i = e.target.getAttribute('data-i'); if (i !== null && rfq[i]) { rfq[i][e.target.getAttribute('data-field')] = e.target.value; save(); } });
    lines.addEventListener('click', function (e) {
      var b = e.target.closest('[data-rm]'); if (!b) return;
      rfq.splice(parseInt(b.getAttribute('data-rm'), 10), 1); save(); renderLines();
      var next = $('[data-rm]') || $('[data-add-custom]'); if (next) next.focus();
    });
    $('[data-add-custom]').addEventListener('click', function () {
      rfq.push({ custom: '', dn: '', pn: '', qty: 1 }); save(); renderLines();
      var inp = $$('[data-field="custom"]').pop(); if (inp) inp.focus();
    });
    form.addEventListener('click', function (e) {
      if (e.target.closest('[data-next]') && checkPanel(step)) showStep(step + 1);
      if (e.target.closest('[data-prev]')) showStep(step - 1);
    });
    form.addEventListener('input', function (e) { if (e.target.getAttribute('aria-invalid') === 'true') err(e.target, ''); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (step !== 3 || !checkPanel(3)) return;
      var no = 'RFQ-' + new Date().getFullYear() + '-' + String(Math.floor(1000 + Math.random() * 9000));
      var done = $('[data-rfq-done]');
      $('[data-done-title]', done).textContent = s('sent', no);
      $('[data-done-text]', done).textContent = s('positions', rfq.length) + ' ' + s('sentD');
      form.hidden = true; $('.progress').hidden = true; done.hidden = false;
      rfq = []; save(); badge();
      var h = $('[data-done-title]', done); h.setAttribute('tabindex', '-1'); h.focus();
    });
  }

  /* ---------- careers ------------------------------------------------------ */

  function initCareers() {
    var form = $('[data-apply]');
    if (!form) return;
    $$('[data-apply-for]').forEach(function (b) {
      b.addEventListener('click', function () {
        var t = b.closest('.job').querySelector('summary b');
        form.elements.position.value = t ? t.textContent.trim() : b.getAttribute('data-apply-for');
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(function () { form.elements.cname.focus({ preventScroll: true }); }, 350);
      });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true, first = null;
      $$('[required]', form).forEach(function (f) {
        var v = f.value.trim(), msg = !v ? s('required') : (f.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? s('email') : '');
        if (!err(f, msg)) { ok = false; first = first || f; }
      });
      var file = form.elements.cv;
      if (file.files[0] && file.files[0].size > 5 * 1024 * 1024) { err(file, s('file')); ok = false; first = first || file; }
      if (!ok) { if (first) first.focus(); return; }
      var done = $('[data-apply-done]'); done.textContent = s('applied'); done.hidden = false;
      form.reset(); done.setAttribute('tabindex', '-1'); done.focus();
    });
  }

  /* ---------- boot --------------------------------------------------------- */

  function renderAll() { badge(); if (page === 'products') { renderFilters(); renderCatalog(); } if (page === 'rfq') renderLines(); }
  if (page === 'products') initCatalog();
  if (page === 'rfq') initRfq();
  if (page === 'careers') initCareers();
  renderAll();
  document.addEventListener('languagechange', renderAll);

  var tg = $('.menu-toggle'), mn = $('#menu');
  if (tg && mn) {
    var set = function (o) { mn.classList.toggle('is-open', o); tg.setAttribute('aria-expanded', String(o)); };
    tg.addEventListener('click', function () { set(!mn.classList.contains('is-open')); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') set(false); });
  }
})();
