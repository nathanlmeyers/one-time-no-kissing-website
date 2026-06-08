/* reviews.js — single source of truth for the review tiles + expand modal.
 *
 * Progressive enhancement: each page ships the curated reviews as static
 * HTML inside #otnk-reviews. When JS is available this script replaces that
 * fallback with the full interactive tile grid (preview + click-to-expand
 * modal). No-JS / crawler visitors keep the static cards.
 *
 * Data model — each review: { name, title?, text:[paragraphs], preview? }.
 *  - `text` is an array of paragraphs (preserves multi-paragraph reviews).
 *  - `preview` (optional) overrides the auto ~100-word tile excerpt.
 *  - omit `title` for the "Anonymous" entries (no role line is rendered).
 *
 * Third-party private names have been reduced to initials at the user's
 * request; the author and public figures/orgs are left as written.
 */
(function () {
  'use strict';

  var PREVIEW_WORDS = 100;

  var REVIEWS = [
    /* ---- the three reviews already on the site (kept first) ---- */
    {
      name: 'Dianne Dreyer',
      title: 'Producer',
      // tile shows the punchy curated quote; modal shows the full review.
      preview: 'One Time, No Kissing had me turning pages, smiling. A remarkable, funny, poignant, and heartfelt story of a high-school basketball team — diverse students all somehow getting along, getting a good education, forming their own opinions. The sport, the passion for it, and the execution of the game is a character all by itself.',
      text: [
        `ONE TIME, NO KISSING (it’s a novella or perhaps a Young Adult novel - it’s NOT a screenplay) quite unexpectedly had me turning pages, smiling. It’s written by David Meyers and is semi autobiographical. Set in Pittsburgh sometime between 1969-1972, it’s a remarkable story of a high school basketball team, a community and an America that seems lost forever. It’s the story of a public school populated with diverse students - Black, White, Catholics, Jews, rich, poor, middle class - all somehow getting along, getting a good education from good teachers and forming their own opinions. These kids have families who are paying attention, or not, supporting them, or not, guiding them, or not into the future. It’s all set against the backdrop of the Viet Nam War (some of these kids will get drafted, some have siblings already in the service, some are already a part of the growing anti-war movement). The basketball team essentially has no coach. He’s a drunk and no one in authority seems to think the team deserves better so this is not a story about a heroic leader who guides his team to greatness. This is a story about an unlikely resourceful starting line-up who find a way to work around some unique challenges and have a surprisingly successful season that they pull off virtually on their own, as a team. The author, David Meyers, was the lone Jewish player in his senior year on this fictionalized team and the reason this story is so heartfelt.`,
        `The basketball of it all is a crucial component. It’s not just about a team and scheduled games and practices. Plenty of basketball happens just for fun in unlikely match ups, with pros and college kids taking an interest and classmates and friends who never had a hope of making the team but just love playing the game. It’s a way of getting to know each other, testing boundaries, acknowledging greatness and accepting defeat. The sport, the passion for it and the execution of the game is a character all by itself. There’s even a data driven kid who calculates what works and what doesn’t and presents the numbers… not unlike what became the story of MONEYBALL.`,
        `Ultimately this is a “feel good” story full of characters and subplots that are genuine and familiar. I could easily imagine Rob Reiner having written and directed it. It’s a coming of age story - one I haven’t seen but that I recognize from my own childhood in Brooklyn, before all the White folks, including my own, fled for the suburbs - when integration suddenly became too real and people in power made us fear the possibilities. What a shame.`
      ]
    },
    {
      name: 'W. D. Ehrhart',
      title: 'Author, Vietnam-Perkasie: A Combat Marine Memoir',
      text: [
        `If you came of age in the later 1960s and early '70s amid the turbulence of Vietnam, the antiwar movement, and the demands for civil rights and justice — this book will resonate deeply. For any thoughtful reader, Meyers offers a spellbinding story that is vibrant and alive, and deeply moving.`
      ]
    },
    {
      name: 'Alan Paul',
      title: 'Best-selling author of One Way Out; Senior Basketball Writer, Slam',
      text: [
        `This book brings to life the joy and wonder of youth. It's easy to forget how much fun it was to be in high school, but this book won't let you. Every page is filled with keen insight into the intensity of youthful relationships of all sorts.`
      ]
    },

    /* ---- the newly collected reviews ---- */
    {
      name: 'Paul A. Smith',
      title: 'Writer, Poet, Former Publishing Executive, and Dedicated Volunteer at Homeboy Industries',
      text: [
        `When I got a copy of “One Time, No Kissing,” its basketball-themed cover led me to expect a hopefully engaging sports novel. In truth, it was certainly that, but it was so much more. In addition to the realistic, funny, rousing descriptions of lonely skill-building, hard but necessary practices, and highly interesting and suspenseful high school basketball games, the book touches upon many other important topics. It is set in 1969, a seminal year in America to be sure with Vietnam raging and the drug culture starting to affect many cities and young people. Those topics are admirably covered here, but the novel also depicts the effects of World War II and the Holocaust and the rich ethnic tapestry—warts and all—to be found in Pittsburgh and other American cities at the time. Yet it also brilliantly portrays the familial situations, friendships, conflicts with others, and the main character’s slowly budding interest in girls that virtually all adolescent boys must navigate. I found it fast-paced, funny, exciting, humane, and constantly interesting with a broad cast of characters diverse in age, cultural background, and personal story. It is the oxymoronic type of book that I wish there were more of—It reads very quickly, but at the end you wish it were twice as long because it’s been such fun.`
      ]
    },
    {
      name: 'Jodi Mitchel Tolman',
      title: 'Author of One From Each Column',
      text: [
        `One Time, No Kissing is an engrossing, compelling, and loving portrayal of coming of age at Pittsburgh’s Allderdice high school in the ‘70s. I couldn't put it down and read it twice in rapid succession. In this love letter to Pittsburgh and Squirrel Hill, where Meyers grew up, he brings both heartbreaking and hilarious characters to palpable life, one of the most dynamic of which is basketball. The game becomes as engaging as Troubles Schwartz, Doc, Louis, and a never-named girl who we want to know more and more about. And we experience the game as if we‘re a player, where the stakes and drama of each could not be higher. Masterfully woven into the narrative are themes of racism, poverty, antisemitism, parental neglect, the Viet Nam war and the Holocaust to poignant and powerful effect. I was hooked from the first pages and discovered scenes I wasn’t expecting around so many corners. I was quite sad coming to the end, knowing I had to leave Allderdice and all those who walked its halls.`
      ]
    },
    {
      name: 'David Witherbee',
      title: 'Naturalist',
      text: [
        `I much enjoyed One Time, No Kissing because it took me back to the years when I was learning most everything. A teenager in high school goes through daily lessons and emotions and challenges along with wins and losses. We had to learn how everything works, such as classes, class mates and schooling, team sports, teachers and coaches and even girls. The latter we learned a lot about, but it was not enough. We still don’t know much about girls.`,
        `The book had me laughing and chuckling, cringing and cheering. Many emotions are used to be a high school kid and they stick with us. Some of this I missed out on because I went to Wilbraham Academy, a boys school. (I did enjoy it and it worked for me). Nicknames are much used in the high schooling world and we can still chuckle about them. One Time, No Kissing connects so many of us with similar worlds.`
      ]
    },
    {
      name: 'Jan Connery',
      title: 'Vice President and Senior Writer at Eastern Research Group',
      text: [
        `I just finished reading One Time, No Kissing. In short: I loved it!! This feeling was clear after the first few pages and never waned. I loved the style – short simple sentences and chapters with just the right amount of detail to tell the story. It’s first book I’ve read with that spare a style. For this story, it’s perfect. I loved the tone – gentle, respectful, warm, and caring throughout. I knew early on this was a book I would truly enjoy spending time with.`,
        `I loved the characters – so many felt like people I would want to have met in real life. The main character’s care and respect for the others is heartwarming, and that made it a pleasure to accompany him on his coming-of-age journey. From the start and throughout, the story had gentle intrinsic momentum that carried me along, making it effortless to read and always making me want to know what would come next. It was almost as if the pages were turning themselves.`,
        `While the novel covers a number of serious subjects, it does so with an intriguing blend of depth, humor, and lightness all at once. I loved the pace of development – the slow, skillful weaving in and out of the various story elements, gently knitting them together to set the stage rather perfectly for the culmination. As the days go on after I set the book down, I find it leaves me with a lingering inspirational feeling of belief in and hope for goodness in our world. That’s pretty cool!`,
        `This story is naturally visual—it almost feels as if you have written it cinematically with each chapter being a scene—so it’s easy to envision it as a movie. I’d love to see that happen.`
      ]
    },
    {
      name: 'Mark Lowenthal',
      title: 'Actor, Director, Producer',
      text: [
        `I enjoyed and cherished the story immensely laughing numerous times and weeping a few others (tears of sweetness). Thank you for writing and sharing your story. Your story in itself is a “kindness,” and I very much enjoyed the entire journey. Congratulations!`
      ]
    },
    {
      name: 'Anonymous',
      text: [
        `I just finished Dave Meyers’s book, and thoroughly enjoyed it. When I first got it I was skeptical because the many short chapters and the relatively few words on each page. However, the different characters, the good basketball writing, and the range of interesting issues—Vietnam, race and ethnicity, coming of age, abortion, the shadows of WWII and The Holocaust—really hooked me. I’ve talked to L. about it, and will give him my copy. I must confess up front that neither of my boys has ever found any of my suggestions for movies based on books I’ve read at all interesting. I got a sort of “I-Told-You-So” about Yann Martel’s 15 years ago, when I told M. I had just read “Life of Pi” and found it a remarkable story. He didn’t get it (from my summary) and passed, and a few years later it won the Best Picture Oscar. L.’s company—which is now pretty much him and his long-time boss J.S. (a minority owner of the Chicago Bulls)—has over the years done documentaries on sports and politics and theater, a handful of feature films, and, of course, their Emmy-winning series, “Last Chance U,” which is 5 seasons on different community college football programs that try provide college athletes who have flamed out for some reason (grades, arrests, injuries, drugs, etc.) with one last chance to make it to Division 1 programs and maybe a shot at the NFL. After the 5 football seasons, they did two on a community college basketball program. Also, J.S.’s son S. is a graduate assistant coach at Nebraska. So, the basketball hook might be a useful one. Also, J.S. is Jewish so that could also be a factor. Let’s see what happens.`
      ]
    },
    {
      name: 'Anonymous',
      text: [
        `Dave wrote a book?  Dave wrote a book!`,
        `This was quite a surprise. I scanned the cover, opened to a random page, and came across a passage about your dad being in trouble. That caught my attention, so I started reading. Finished it in one sitting!`,
        `Did you keep a diary? How did you manage to recall all those details, names, places??`,
        `So many characters! Great job bringing them to life.`,
        `Your friend Louis was the star. Ragging the Chinese laundry guy for having a wrinkled shirt cracked me up. But you also have the drunken coach, Omi and Zondy, Ray Rat, Danny G.`,
        `Some highlights for me: The Bergman twins! The late night junkyard tour! Assisting with a Caesarean! Groping the cheerleader/gymnast under the stands!`,
        `Happy I didn't have to squirm through a scene where you lost your v-card though...`,
        `Had to wait too long for the first “jagoff.”`,
        `Loved your use of “You can look it up, but…”.`,
        `Black Power!`
      ]
    },
    {
      name: 'Anonymous',
      text: [
        `Sorry to have taken so long to get back to you. I greatly enjoyed the book. You've created something special. J. feels the same way. As a highschool teacher for 35 years, she thought you nailed the voice of a teenage boy.`,
        `It’s more a novella than novel, though I have described it as basketball fantasy, given the actual City League record of our team in 1970. I love the blend of real people with fiction, though I'd like to know more about Louis and Martha since I don't recognize them and could not imagine them based on people I knew. The closest I could come up with was D.K. and M.S., and they are not that close to your characters, though there may be more to D.K. than I know.`
      ]
    },
    {
      name: 'Anonymous',
      text: [
        `Hope you had a great Thanksgiving. You were a big part of mine as I read your book the last several nights with gusto.`,
        `First off, your sense of detail and character development is wonderful. It was, of course, very easy for me to relate to many of the characters and places. I learned so much about cousin Trubs. I had no idea that he was a full time gambler and D Day survivor. I knew nothing about your dad and the abortion case. That must have happened when I was gone. I'm sure E., mom and the rest of the family were closely following it but somehow I missed it. I was aware of all of your moms political involvements. Your basketball successes also never made it to where I was. I knew you played but did not know Alderdice was a city champ with you at the helm, That must have been fabulous.`,
        `Your development of the many characters is terrific! I kept trying to figure out if I knew them or their fathers. But, Squirrel Hill and East End were pretty far apart in many ways. Of course all of my cousins lived there and my fraternity played against the Sq, Hill fraternities with great animosity, not to mention the tennis rivalries`,
        `The plot line of you and the guy that was after your position was also very familiar.`,
        `I was the last guy cut when I tried out for Peabody varsity. I still remember the skinny black kid that got the position B.E. I thought about him many times and knew I was better. At least my 36 point intramural point record held up for something like 15 years.`,
        `I could go on but, your awakening to Viet Nam and how people have so much in common if we just take the time to look....suffice to say, I greatly enjoyed what you have written and my only question is,`,
        `So, what happens now?`
      ]
    }
  ];

  // ---- helpers ---------------------------------------------------------

  function flatten(text) { return text.join(' '); }

  function wordCount(str) {
    var t = str.trim();
    return t ? t.split(/\s+/).length : 0;
  }

  function isExpandable(r) {
    if (r.preview) return true;
    return wordCount(flatten(r.text)) > PREVIEW_WORDS;
  }

  // Tile excerpt: explicit preview, else first ~PREVIEW_WORDS words on a
  // word boundary with an ellipsis only when actually truncated.
  function previewText(r) {
    if (r.preview) return r.preview;
    var full = flatten(r.text);
    var words = full.split(/\s+/);
    if (words.length <= PREVIEW_WORDS) return full;
    return words.slice(0, PREVIEW_WORDS).join(' ') + '…';
  }

  function el(tag, className, textContent) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (textContent != null) node.textContent = textContent;
    return node;
  }

  // ---- modal -----------------------------------------------------------

  var modalEls = null;
  var lastTrigger = null;

  function buildModal() {
    var overlay = el('div', 'otnk-modal');
    var panel = el('div', 'otnk-modal-panel');
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
    panel.setAttribute('aria-labelledby', 'otnk-modal-name');
    panel.tabIndex = -1;

    var close = el('button', 'otnk-modal-close');
    close.type = 'button';
    close.setAttribute('aria-label', 'Close review');
    close.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';

    var body = el('div', 'otnk-modal-body');
    var foot = el('div', 'otnk-modal-foot');
    var name = el('div', 'otnk-modal-name');
    name.id = 'otnk-modal-name';
    var role = el('div', 'otnk-modal-role');
    foot.appendChild(name);
    foot.appendChild(role);

    panel.appendChild(close);
    panel.appendChild(body);
    panel.appendChild(foot);
    overlay.appendChild(panel);
    document.body.appendChild(overlay);

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeModal();
    });
    close.addEventListener('click', closeModal);

    modalEls = { overlay: overlay, panel: panel, body: body, name: name, role: role };
  }

  function onKeydown(e) {
    if (e.key === 'Escape') { e.preventDefault(); closeModal(); }
  }

  function openModal(r, trigger) {
    if (!modalEls) buildModal();
    lastTrigger = trigger || null;

    modalEls.name.textContent = r.name;
    if (r.title) {
      modalEls.role.textContent = r.title;
      modalEls.role.hidden = false;
    } else {
      modalEls.role.textContent = '';
      modalEls.role.hidden = true;
    }

    modalEls.body.textContent = '';
    r.text.forEach(function (para) {
      modalEls.body.appendChild(el('p', 'otnk-modal-para', para));
    });
    modalEls.body.scrollTop = 0;
    modalEls.panel.scrollTop = 0;

    document.body.classList.add('otnk-modal-open');
    modalEls.overlay.classList.add('is-open');
    document.addEventListener('keydown', onKeydown);
    // Force layout so the now-visible panel is focusable, focus it, THEN make
    // the background inert. Focusing before applying inert keeps the browser
    // from bouncing focus to <body> (inert only relocates focus inside it).
    void modalEls.overlay.offsetWidth;
    modalEls.panel.focus();
    var frame = document.querySelector('.otnk-frame');
    if (frame) frame.setAttribute('inert', '');
    // Fallback: re-assert focus on the next macrotask if the synchronous focus
    // didn't take. (setTimeout fires reliably; rAF is paused for background tabs.)
    setTimeout(function () {
      if (modalEls.overlay.classList.contains('is-open') &&
          document.activeElement !== modalEls.panel &&
          !modalEls.panel.contains(document.activeElement)) {
        modalEls.panel.focus();
      }
    }, 0);
  }

  function closeModal() {
    if (!modalEls) return;
    modalEls.overlay.classList.remove('is-open');
    document.body.classList.remove('otnk-modal-open');
    var frame = document.querySelector('.otnk-frame');
    if (frame) frame.removeAttribute('inert');
    document.removeEventListener('keydown', onKeydown);
    if (lastTrigger && typeof lastTrigger.focus === 'function') lastTrigger.focus();
    lastTrigger = null;
  }

  // ---- tiles -----------------------------------------------------------

  function buildTile(r) {
    var expandable = isExpandable(r);
    var tile = document.createElement(expandable ? 'button' : 'div');
    tile.className = 'otnk-review-tile reveal' + (expandable ? ' otnk-review-tile--button' : '');
    if (expandable) tile.type = 'button';

    // Spans (phrasing content) so the tile is valid inside a <button>.
    tile.appendChild(el('span', 'otnk-review-quote', previewText(r)));

    var foot = el('span', 'otnk-review-foot');
    foot.appendChild(el('span', 'otnk-review-name', r.name));
    if (r.title) foot.appendChild(el('span', 'otnk-review-role', r.title));
    if (expandable) foot.appendChild(el('span', 'otnk-review-readmore', 'Read full review'));
    tile.appendChild(foot);

    if (expandable) {
      tile.addEventListener('click', function () { openModal(r, tile); });
    }
    return tile;
  }

  // ---- render ----------------------------------------------------------

  function render() {
    var container = document.getElementById('otnk-reviews');
    if (!container) return;

    var frag = document.createDocumentFragment();
    REVIEWS.forEach(function (r) { frag.appendChild(buildTile(r)); });

    // Swap the static fallback for the enhanced grid in one operation.
    container.removeAttribute('style');
    container.classList.add('otnk-review-grid');
    container.replaceChildren(frag);

    // Build the modal up front so the first open can focus it synchronously
    // (focusing a freshly-created element the same tick can silently fail).
    if (!modalEls) buildModal();
  }

  render();
})();
