/* Handball-Tracker language toggle.

   Dutch is the real page: it lives in the HTML, so it is what search engines
   index and what shows with JavaScript off, with no flash. English is a layer
   applied on top from the dictionary below. Nothing here runs until the DOM is
   parsed; if the script never runs, the Dutch page stands on its own.

   Markup contract:
     data-i18n="key"        swap textContent
     data-i18n-html="key"   swap innerHTML (nodes with inline <strong>/<a>)
     data-i18n-alt="key"    swap the alt attribute
     data-i18n-aria="key"   swap the aria-label attribute
   Title and meta description come from data-title-en / data-desc-en on <html>.

   The dictionary holds English only. Dutch is read from the DOM at load and
   cached, so the Dutch text has one home (the HTML) and cannot drift. */

(function () {
  'use strict';

  var STORE = 'ht-lang';
  var DEFAULT = 'nl';

  var EN = {
    /* nav + shared */
    'skip': 'Skip to content',
    'nav.tracking': 'Tracking',
    'nav.live': 'Live',
    'nav.stats': 'Statistics',
    'nav.plans': 'Plans',
    'cta.request': 'Request access',

    /* footer */
    'foot.overview': 'Overview',
    'foot.plans': 'Plans',
    'foot.privacy': 'Privacy',
    'foot.signin': 'Sign in',
    'foot.contact': 'Contact',

    /* ---- index: hero ---- */
    'hero.stamp': '00:00 &middot; THROW-OFF',
    'hero.h1': 'Keep the whole match. Not just the score.',
    'hero.lede': 'Handball-Tracker records every shot, save, card and two-minute suspension as it happens, then adds your season up on its own. Built for the coach on the sideline with one hand free.',
    'hero.watch': 'Watch the demo',
    'hero.note': 'Access runs on an invite code, issued within 24 hours. Works in the browser on any phone, tablet or laptop, with nothing to install.',
    'board.half': '1ST HALF',

    /* ---- index: problem ---- */
    'problem.h2': 'The sheet never survives the car park',
    'problem.p1': 'You wrote it down. Goals on the back of the team list, cards in the margin, saves somewhere near the bottom. By Tuesday the paper is in a kit bag and the numbers are a guess. Next season a new coach arrives and the record starts at zero again.',
    'problem.p2': 'Handball-Tracker keeps it. One tap per event during the match, and the season is already counted before you reach the car.',

    /* ---- index: tracking ---- */
    'track.h3': 'One tap per event',
    'track.p': 'Every player carries their own row. Goal, shot, assist, yellow, two minutes, red. The clock runs, the event log fills, and the numbers on the left update while you are still watching the next attack.',
    'track.li1': 'Goalkeepers get save and stop tracking with their own save rate',
    'track.li2': 'Shot placement by goal zone, so you can see where they beat you',
    'track.li3': 'Two-minute suspensions count themselves down',
    'track.li4': 'Undo on every action, because the hall is loud and thumbs are wide',
    'track.alt': 'Match screen mid-game: a running clock, a 5 to 0 score, one row per player with goal, shot, assist and card buttons, and a minute-stamped event log down the right side.',

    /* ---- index: squad ---- */
    'squad.h3': 'Your squad is already loaded',
    'squad.p': 'Set the roster once. Numbers, positions, goalkeepers, bench. Save it and it comes back for the next fixture, so the ten minutes before throw-off stay yours.',
    'squad.li1': 'Saved rosters for every team you coach',
    'squad.li2': 'Paste a squad list in and it imports',
    'squad.li3': 'Substitutions tracked between court and bench',
    'squad.alt': 'Roster setup screen listing players with shirt numbers and positions, goalkeepers grouped separately from field players.',

    /* ---- index: demo ---- */
    'demo.stamp': 'HT &middot; HALFTIME',
    'close.stamp': 'FT &middot; FULL TIME',
    'demo.h2': 'See it run',
    'demo.p': 'Two minutes, no narration. Sign in, build the roster, track a few goals, go live, save the match, read the season.',
    'demo.videoAria': 'Silent walkthrough of Handball-Tracker, from sign in to season statistics',
    'demo.videoFallback': 'Your browser cannot play this video. The walkthrough covers sign in, roster setup, live goal tracking, broadcasting, saving a match and reading season statistics.',

    /* ---- index: live ---- */
    'live.h3': 'For everyone who could not get there',
    'live.p': 'Put the match on a link. Parents at work, players who are injured, the away supporters who did not travel: they open one page and watch the score and the event log update as you tap. No account, no app, no login wall.',
    'live.li1': 'Share one link, watched on any number of screens',
    'live.li2': 'Score, clock and events follow the match live',
    'live.li3': 'Stop broadcasting whenever you want',
    'live.alt': 'Public live page showing the current score and a running list of match events, viewed by a follower with no account.',

    /* ---- index: stats ---- */
    'stats.h3': 'The season adds itself up',
    'stats.p': 'Every saved match rolls into the season. Top scorers, save percentages, cards, shot efficiency. When someone asks who is actually converting, the answer is a page, not an argument.',
    'stats.li1': 'Separate seasons, so last year stays last year',
    'stats.li2': 'Full match history, every event kept',
    'stats.li3': 'Export to Excel when the club wants its own copy',
    'stats.alt': 'Season statistics page with a top scorers table, goalkeeper stop percentage and a most cards panel.',

    /* ---- index: closing + faq ---- */
    'close.h2': 'Track your next match',
    'close.lede': 'Ask for a code, bring one team, and see whether it survives a real Saturday. If it does, the rest of the club can follow.',
    'close.see': 'See what is included',
    'faq.h2': 'Questions',
    'faq.q1': 'Do I need an invite code?',
    'faq.a1': 'Yes. Accounts are created with an invite code while the product is in early access. If your club already uses it, ask whoever set it up. If not, use Request access above and a personal code comes back within 24 hours.',
    'faq.q2': 'What do I run it on during a match?',
    'faq.a2': 'A browser. Phone, tablet or laptop, whatever you already carry. A tablet gives you the biggest buttons, which matters more than you would think at 3 to 3 with four minutes left. There is nothing to install and no app store.',
    'faq.q3': 'Can more than one person track the same match?',
    'faq.a3': 'Your matches sync across your own devices, so you can start on a phone and finish on a tablet. Followers watching the live link see the match update but cannot change anything.',
    'faq.q4': 'Who owns the data?',
    'faq.a4': 'You do. Every match and season can be exported to Excel at any time, so the club keeps its own copy of its own history regardless of what happens to any subscription.',
    'faq.q5': 'Is it only for handball?',
    'faq.a5': 'Only handball. Two-minute suspensions, seven metre throws, goalkeeper stop percentage and attack counts are built into the way it works, not bolted onto a generic sports tracker.',

    /* ---- pricing ---- */
    'pr.h1': 'Start with one team. Add the rest when it earns it.',
    'pr.lede': 'Every account begins on a trial so you can put it through a real Saturday before anyone pays anything. We are still setting final pricing, so rather than publish a number we have not committed to, tell us what you need and we will give you one.',
    'pr.personal.name': 'Personal',
    'pr.personal.for': 'One coach, one team. You track your own matches and keep your own season.',
    'pr.personal.price': 'Free trial',
    'pr.personal.note': 'Then a personal subscription. Ask for the current rate.',
    'pr.personal.li1': 'Full live match tracking',
    'pr.personal.li2': 'Live broadcast link for followers',
    'pr.personal.li3': 'Season statistics and match history',
    'pr.personal.li4': 'Saved rosters and squad import',
    'pr.personal.li5': 'Excel export of everything you record',
    'pr.club.name': 'Club',
    'pr.club.for': 'Several teams under one roof, with a record that outlasts any one coach.',
    'pr.club.price': 'By arrangement',
    'pr.club.note': 'Depends on how many teams you bring. Ask and we will give you a number.',
    'pr.club.li1': 'Everything in Personal',
    'pr.club.li2': 'An account for every coach in the club',
    'pr.club.li3': 'One club invite code, so new coaches join themselves',
    'pr.club.li4': 'Seasons kept per team, across every side you enter',
    'pr.club.li5': 'Help getting the first teams set up',
    'pr.club.cta': 'Talk about a club plan',
    'pr.cmp.h2': 'Side by side',
    'pr.cmp.caption': 'What each plan covers. Anything not listed is included in both.',
    'pr.cmp.feature': 'Feature',
    'pr.cmp.r1': 'Live match tracking',
    'pr.cmp.r2': 'Live broadcast link',
    'pr.cmp.r3': 'Season statistics',
    'pr.cmp.r4': 'Match history',
    'pr.cmp.r5': 'Excel export',
    'pr.cmp.r6': 'Coach accounts',
    'pr.cmp.r7': 'Invite code',
    'pr.cmp.r8': 'Setup help',
    'pr.cmp.included': 'Included',
    'pr.cmp.one': 'One',
    'pr.cmp.perCoach': 'One per coach',
    'pr.cmp.single': 'Personal, single use',
    'pr.cmp.clubwide': 'Club wide',
    'pr.cmp.byemail': 'By email',
    'pr.cmp.handson': 'Hands on',
    'pr.faq.h2': 'Before you ask',
    'pr.faq.q1': 'What does the free trial include?',
    'pr.faq.a1': 'The whole product. Track real matches, broadcast them, save them, read the season. Trial accounts are capped by the number of sign ins rather than crippled by feature, because a tracker you cannot fully use tells you nothing.',
    'pr.faq.q2': 'Why are there no prices on this page?',
    'pr.faq.a2': 'Because they are not final yet, and publishing a number we might change is worse than asking you to send one message. Email us and you will get the current rate the same way an existing customer would.',
    'pr.faq.q3': 'What happens to our data if we stop paying?',
    'pr.faq.a3': 'Export everything to Excel whenever you like, including before you decide. The club’s history belongs to the club and should never be the reason you feel stuck.',
    'pr.faq.q4': 'Can we start personal and move the club across later?',
    'pr.faq.a4': 'That is the usual route. One coach tries it for a season, it survives, and the club then moves to a club code so everyone else can join. Your existing matches come with you.',
    'pr.close.h2': 'Bring one team and see',
    'pr.close.lede': 'One match is enough to judge it. Codes are issued within 24 hours.',
    'pr.close.ask': 'Ask about pricing',

    /* ---- privacy ---- */
    'pv.h1': 'Privacy statement',
    'pv.lede': 'Handball-Tracker processes personal data of coaches who use the product and of players entered by their coach. Below is what data that is, why we process it, how long we keep it and what rights you have.',
    'pv.updated': 'Last updated: 20 July 2026',
    'pv.dutchPrevails': 'This is a translation for convenience. The Dutch version of this statement is the legally binding one; where the two differ, the Dutch text prevails.',

    'pv.h1_1': '1. Who is responsible',
    'pv.p1_1': 'Handball-Tracker is the controller for the data named in this statement, except where chapter 4 says otherwise.',
    'pv.todo1': 'Legal name, legal form, Chamber of Commerce number and registered address. These details are required under Article 13 GDPR and only you know them.',
    'pv.p1_2html': 'Privacy contact: <a href="mailto:info@handball-tracker.com">info@handball-tracker.com</a>',
    'pv.p1_3': 'We have not appointed a data protection officer. For an organisation of this size that is not required.',

    'pv.h1_2': '2. What data we process',
    'pv.h2_a': 'When you request access',
    'pv.p2_a': 'Through the request form we ask for your name and email address. A phone number and a message are optional: you may leave those fields blank.',
    'pv.h2_b': 'When you have an account',
    'pv.p2_b': 'Your email address, your team name, the invite code the account was created with, and data about your sign ins. Your password is stored encrypted by our hosting provider and is not readable by us.',
    'pv.h2_c': 'Data you enter about players yourself',
    'pv.p2_c': 'Names, shirt numbers and positions of players, and per match what they did: goals, shots, assists, saves, cards and suspensions. This data is about people other than you. See chapter 4.',
    'pv.h2_d': 'Technical data',
    'pv.p2_d': 'When an error occurs in the application, we record it together with your user ID, the type of browser and the page where the error happened. We use this only to fix faults.',
    'pv.p2_e_html': 'We use <strong>no</strong> analytics, no advertising networks and no tracking cookies.',

    'pv.h1_3': '3. Why, and on what basis',
    'pv.dt3_1': 'Assessing an access request',
    'pv.dd3_1': 'Basis: taking steps at your request prior to a contract (Article 6(1)(b) GDPR).',
    'pv.dt3_2': 'Delivering the application: account, matches, statistics, broadcasts',
    'pv.dd3_2': 'Basis: performance of the contract with you (Article 6(1)(b) GDPR).',
    'pv.dt3_3': 'Resolving faults and securing the service',
    'pv.dd3_3': 'Basis: legitimate interest (Article 6(1)(f) GDPR), namely being able to offer a working and secure product.',
    'pv.dt3_4': 'Keeping records and meeting tax obligations',
    'pv.dd3_4': 'Basis: legal obligation (Article 6(1)(c) GDPR).',

    'pv.h1_4': '4. Player data: your role and ours',
    'pv.notice4_html': '<strong>This chapter matters for coaches and clubs.</strong> Players do not enter their own data and often have no contact with us.',
    'pv.p4_1': 'For the data you enter about players, you or your club is the controller. We are the processor: we store that data and show it back, but we do not decide which players you enter or what you use the statistics for.',
    'pv.p4_2': 'That means the club is responsible for a valid basis to process player data and for informing players, and for minors their parents or guardians. A large part of youth handball involves minors; handle that carefully.',
    'pv.p4_3html': 'A data processing agreement between your club and us should exist for this processing (Article 28 GDPR). Request one from us at <a href="mailto:info@handball-tracker.com">info@handball-tracker.com</a>.',
    'pv.todo4': 'No data processing agreement has been drawn up yet. Until it exists, the paragraph above is not fully accurate. Have a model drawn up or reviewed before you sign up clubs.',

    'pv.h1_5': '5. Broadcasting live is public',
    'pv.p5_1html': 'When you broadcast a match live, a link to a public page is created. That page is <strong>not password protected</strong>: anyone with the link can see the score, the events and the names of the players.',
    'pv.p5_2': 'So share that link deliberately. Make sure your players, and for minors their parents or guardians, know that their name and performance can be visible this way. You can stop broadcasting at any moment.',

    'pv.h1_6': '6. Who else processes the data',
    'pv.p6_1': 'We use the following parties:',
    'pv.li6_1html': '<strong>Supabase</strong> &mdash; database, accounts and authentication.',
    'pv.li6_2html': '<strong>Cloudflare</strong> &mdash; hosting and delivery of this website and the application.',
    'pv.p6_2': 'We do not sell data and do not share it with third parties for marketing purposes.',
    'pv.todo6': 'Which region does the Supabase project run in? If it is outside the EEA, this is a transfer to a third country and you must state here which safeguard it relies on, for example standard contractual clauses.',

    'pv.h1_7': '7. How long we keep data',
    'pv.dt7_1': 'Access requests that do not lead to an account',
    'pv.dd7_1': '6 months after handling, then deleted automatically.',
    'pv.dt7_2': 'Error logs',
    'pv.dd7_2': '90 days, then deleted automatically.',
    'pv.dt7_3': 'Account, matches, seasons and player data',
    'pv.dd7_3': 'As long as your account exists. You can export your data to Excel at any time and ask for deletion.',
    'pv.todo7': 'Confirm these periods. They are a proposal and must match what data-retention-cleanup.sql actually does.',

    'pv.h1_8': '8. Your rights',
    'pv.p8_1': 'You have the right to:',
    'pv.li8_1': 'access your data;',
    'pv.li8_2': 'have incorrect data corrected;',
    'pv.li8_3': 'have your data deleted;',
    'pv.li8_4': 'have processing restricted;',
    'pv.li8_5': 'receive your data in a common file format;',
    'pv.li8_6': 'object to processing based on legitimate interest;',
    'pv.li8_7': 'withdraw consent at any time, without retroactive effect.',
    'pv.p8_2html': 'Send your request to <a href="mailto:info@handball-tracker.com">info@handball-tracker.com</a>. We respond within one month. If it concerns player data, address the club: it is responsible for that, and we help the club carry out the request.',

    'pv.h1_9': '9. Filing a complaint',
    'pv.p9_1html': 'If you disagree with how we handle your data, let us know. You also always have the right to file a complaint with the Dutch Data Protection Authority at <a href="https://www.autoriteitpersoonsgegevens.nl" rel="noopener">autoriteitpersoonsgegevens.nl</a>.',

    'pv.h1_10': '10. Cookies',
    'pv.p10_1': 'This website sets no cookies. The application stores only technically necessary data in your browser to keep you signed in. That requires no consent, which is why you see no cookie banner.',

    'pv.h1_11': '11. Security',
    'pv.p11_1html': 'Traffic runs over an encrypted connection and access to data is limited to your own account. If you discover a vulnerability, report it via <a href="mailto:info@handball-tracker.com">info@handball-tracker.com</a> and do not publish it.',

    'pv.h1_12': '12. Changes',
    'pv.p12_1': 'We update this statement when the product changes. The date at the top shows when that last happened. For significant changes we will let you know.'
  };

  var doc = document;
  var root = doc.documentElement;

  var nodes = [];   // { el, kind, key, orig }
  function collect(attr, kind) {
    var list = doc.querySelectorAll('[' + attr + ']');
    for (var i = 0; i < list.length; i++) {
      var el = list[i];
      var key = el.getAttribute(attr);
      var orig;
      if (kind === 'text') orig = el.textContent;
      else if (kind === 'html') orig = el.innerHTML;
      else if (kind === 'alt') orig = el.getAttribute('alt');
      else if (kind === 'aria') orig = el.getAttribute('aria-label');
      nodes.push({ el: el, kind: kind, key: key, orig: orig });
    }
  }

  collect('data-i18n', 'text');
  collect('data-i18n-html', 'html');
  collect('data-i18n-alt', 'alt');
  collect('data-i18n-aria', 'aria');

  var nlTitle = doc.title;
  var metaDesc = doc.querySelector('meta[name="description"]');
  var nlDesc = metaDesc ? metaDesc.getAttribute('content') : null;
  var enTitle = root.getAttribute('data-title-en');
  var enDesc = root.getAttribute('data-desc-en');

  function apply(lang) {
    var en = lang === 'en';
    root.setAttribute('lang', lang);

    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      var val = en ? (EN[n.key] != null ? EN[n.key] : n.orig) : n.orig;
      if (n.kind === 'text') n.el.textContent = val;
      else if (n.kind === 'html') n.el.innerHTML = val;
      else if (n.kind === 'alt') n.el.setAttribute('alt', val);
      else if (n.kind === 'aria') n.el.setAttribute('aria-label', val);
    }

    if (en && enTitle) doc.title = enTitle; else doc.title = nlTitle;
    if (metaDesc) metaDesc.setAttribute('content', en && enDesc ? enDesc : nlDesc);

    var btns = doc.querySelectorAll('.lang-btn');
    for (var b = 0; b < btns.length; b++) {
      var on = btns[b].getAttribute('data-lang') === lang;
      btns[b].setAttribute('aria-pressed', on ? 'true' : 'false');
    }

    // let the decorative scoreboard localise its generated rows
    doc.dispatchEvent(new CustomEvent('ht-lang', { detail: { lang: lang } }));
  }

  function get() {
    try { return localStorage.getItem(STORE); } catch (e) { return null; }
  }
  function set(lang) {
    try { localStorage.setItem(STORE, lang); } catch (e) {}
  }

  var start = get() === 'en' ? 'en' : DEFAULT;
  apply(start);

  doc.addEventListener('click', function (e) {
    var btn = e.target.closest ? e.target.closest('.lang-btn') : null;
    if (!btn) return;
    var lang = btn.getAttribute('data-lang');
    set(lang);
    apply(lang);
  });

  // expose for the scoreboard
  window.htLang = function () { return root.getAttribute('lang') || DEFAULT; };
})();
