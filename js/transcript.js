/* ============================================
   ABSTRAKT - Live Call Transcript Simulator
   Floating panel that types out a realistic
   BDR-to-prospect call for the selected industry
   ============================================ */

(function () {
  const industry = localStorage.getItem('abstrakt_industry');
  if (!industry || industry === 'all') return;

  const scripts = {
    hvac: {
      prospect: { name: 'Mike Reynolds', title: 'VP of Sales', company: 'Summit Mechanical Services' },
      lines: [
        { s: 'bdr', t: 'Hey Mike, this is Sarah with Abstrakt. I know I\'m catching you out of the blue -- do you have just a quick moment?' },
        { s: 'prospect', t: 'Uh, yeah I\'ve got about two minutes. What\'s this about?' },
        { s: 'bdr', t: 'Totally fair. I\'ll be brief. We work with commercial HVAC companies like Summit to fill their pipeline with qualified facility manager meetings. Curious -- how are you guys currently generating new commercial accounts?' },
        { s: 'prospect', t: 'Honestly, it\'s mostly referrals and our existing maintenance contracts. We\'ve tried some digital stuff but nothing consistent.' },
        { s: 'bdr', t: 'That\'s really common in HVAC. Most of our partners were in that same spot. We actually just helped a mechanical contractor in Columbus book 14 qualified facility manager meetings in their first 60 days with us.' },
        { s: 'prospect', t: 'Fourteen meetings? That\'s... actually solid. What does that process look like on your end?' },
        { s: 'bdr', t: 'We build a custom target list of property managers and facility directors in your service area, then our BDR team runs multi-channel outbound -- calls, emails, LinkedIn -- on your behalf. You just show up to the meetings.' },
        { s: 'prospect', t: 'So we don\'t have to hire in-house for this? Because we tried that and the ramp time killed us.' },
        { s: 'bdr', t: 'Exactly. No hiring, no training, no turnover headaches. We\'re fully ramped from day one with a team that already knows how to sell into commercial HVAC. Would it make sense to set up 20 minutes with our VP to walk through exactly how the program would look for Summit?' },
        { s: 'prospect', t: 'Yeah, actually, let\'s do that. I\'m curious what the numbers look like for our market.' },
        { s: 'bdr', t: 'Perfect. I\'ll send a calendar link right after this. Looking forward to it, Mike.' },
        { s: 'system', t: 'Meeting booked -- Discovery call scheduled for Thursday 2:00 PM CT' },
      ],
    },
    roofing: {
      prospect: { name: 'Jason Torres', title: 'Owner', company: 'Apex Commercial Roofing' },
      lines: [
        { s: 'bdr', t: 'Hey Jason, this is Marcus with Abstrakt. Got a quick second?' },
        { s: 'prospect', t: 'Make it fast, I\'m headed to a job site.' },
        { s: 'bdr', t: 'Respect that. Quick question -- are you guys actively going after new commercial re-roofing and maintenance contracts, or mostly running on referrals right now?' },
        { s: 'prospect', t: 'We want more commercial work but we\'re a roofing company, not a sales operation. My guys are on roofs, not making cold calls.' },
        { s: 'bdr', t: 'That\'s exactly why companies like yours hire us. We become your outbound sales team. We just helped a commercial roofer in Atlanta book 11 property manager meetings in 45 days -- all buildings over 20,000 square feet.' },
        { s: 'prospect', t: 'Those are exactly the jobs we want. How are you finding these people?' },
        { s: 'bdr', t: 'We build a custom list of facility managers and property owners in your territory, then hit them with calls, emails, and LinkedIn touches. When someone\'s interested, we book the meeting directly on your calendar.' },
        { s: 'prospect', t: 'And I don\'t need to hire a salesperson?' },
        { s: 'bdr', t: 'Nope. We are the salesperson -- but purpose-built for commercial roofing. Our team knows the difference between TPO and EPDM and why that matters in the conversation.' },
        { s: 'prospect', t: 'Alright, I\'m actually interested. What\'s the next step?' },
        { s: 'bdr', t: 'Let me get 20 minutes on your calendar with our VP. He\'ll map out exactly what Apex\'s pipeline could look like. What does Thursday afternoon look like?' },
        { s: 'prospect', t: 'Thursday at 3 works. Send me the details.' },
        { s: 'system', t: 'Meeting booked -- Discovery call scheduled for Thursday 3:00 PM CT' },
      ],
    },
    construction: {
      prospect: { name: 'Dave Kimball', title: 'Business Dev Manager', company: 'Keystone Builders Group' },
      lines: [
        { s: 'bdr', t: 'Hey Dave, this is Sarah with Abstrakt. We work with commercial construction firms on pipeline development. Do you have a quick minute?' },
        { s: 'prospect', t: 'Yeah, go ahead. What do you mean by pipeline development?' },
        { s: 'bdr', t: 'We build your outbound sales engine. Instead of waiting on GC referrals and plan rooms, we proactively fill your pipeline with decision-makers who need ground-up or tenant improvement work.' },
        { s: 'prospect', t: 'We\'ve been talking about getting more proactive. Right now we\'re too dependent on three or four repeat clients.' },
        { s: 'bdr', t: 'That concentration risk is exactly what we solve. A commercial builder in Denver went from 80% repeat work to having 6 new project opportunities in their first quarter with us.' },
        { s: 'prospect', t: 'What type of prospects are we talking about? We focus on healthcare and retail build-outs.' },
        { s: 'bdr', t: 'We\'d target healthcare facility directors, retail real estate developers, and property groups in your region. Our BDRs handle all outbound outreach -- calls, emails, LinkedIn -- and book qualified meetings directly on your team\'s calendar.' },
        { s: 'prospect', t: 'That\'s interesting. We looked at hiring a BD rep but the cost was north of $120K with benefits.' },
        { s: 'bdr', t: 'And that\'s before they\'re even productive. We\'re a fraction of that cost and producing meetings from month one. Would it be worth 20 minutes to see how this maps to Keystone specifically?' },
        { s: 'prospect', t: 'Yeah, set it up. I\'ll bring our owner in on the call too.' },
        { s: 'system', t: 'Meeting booked -- Discovery call scheduled for Wednesday 10:00 AM CT' },
      ],
    },
    landscaping: {
      prospect: { name: 'Carlos Mendez', title: 'Operations Director', company: 'GreenEdge Commercial Landscaping' },
      lines: [
        { s: 'bdr', t: 'Hey Carlos, Marcus from Abstrakt here. We help commercial landscaping companies book more property management meetings. Quick minute?' },
        { s: 'prospect', t: 'Sure, but we\'re mostly residential right now. Trying to go more commercial though.' },
        { s: 'bdr', t: 'That\'s actually the ideal time to talk. We just helped a landscaping company in Phoenix transition from 70% residential to landing 8 new commercial maintenance contracts in one quarter.' },
        { s: 'prospect', t: 'That\'s exactly what we\'re trying to do. HOAs, office parks, that kind of thing.' },
        { s: 'bdr', t: 'Perfect. We\'d build a target list of property managers, HOA boards, and facility directors in your area, then run multi-channel outreach to get you in the room with them.' },
        { s: 'prospect', t: 'We don\'t really know how to sell to those bigger accounts. It\'s different than residential.' },
        { s: 'bdr', t: 'That\'s the thing -- our team already knows how. We handle the entire conversation up to the meeting. You just show up and talk about what you\'re great at: the work itself.' },
        { s: 'prospect', t: 'What kind of investment are we talking about?' },
        { s: 'bdr', t: 'It depends on territory size and goals. Can I get 20 minutes on your calendar with our VP? He\'ll build out a custom plan and show you the ROI based on your average contract value.' },
        { s: 'prospect', t: 'Yeah, let\'s do it. We need to make this move.' },
        { s: 'system', t: 'Meeting booked -- Discovery call scheduled for Tuesday 1:00 PM CT' },
      ],
    },
    paving: {
      prospect: { name: 'Tom Brecker', title: 'Owner', company: 'Brecker Paving & Sealcoat' },
      lines: [
        { s: 'bdr', t: 'Hey Tom, Sarah with Abstrakt. We work with commercial paving companies to fill their pipeline. Got a second?' },
        { s: 'prospect', t: 'Paving\'s seasonal -- we\'re about to get slammed. What\'s this about?' },
        { s: 'bdr', t: 'That\'s exactly my point. What if heading into next season you already had 10-15 qualified meetings with property managers who need lot repairs, overlays, and sealcoating?' },
        { s: 'prospect', t: 'That would be a game-changer honestly. We usually just bid on whatever comes in.' },
        { s: 'bdr', t: 'Reactive bidding is tough because you\'re always competing on price. We helped a paving company in Nashville start conversations with property managers before projects even went to bid -- they won 5 new contracts in 60 days.' },
        { s: 'prospect', t: 'How does that work exactly? I don\'t have time to make sales calls.' },
        { s: 'bdr', t: 'You don\'t make a single call. We build your target list, run outreach to property managers and facility directors, and book meetings directly on your calendar. You just show up and estimate.' },
        { s: 'prospect', t: 'And you guys know the paving space? Not just generic sales stuff?' },
        { s: 'bdr', t: 'Our team is trained specifically on commercial paving -- lot assessment, ADA compliance, lifecycle planning. We speak the language.' },
        { s: 'prospect', t: 'Alright, set something up. I want to hear more before the season hits.' },
        { s: 'system', t: 'Meeting booked -- Discovery call scheduled for Monday 11:00 AM CT' },
      ],
    },
    'commercial-cleaning': {
      prospect: { name: 'Lisa Tran', title: 'CEO', company: 'PristineClean Solutions' },
      lines: [
        { s: 'bdr', t: 'Hey Lisa, this is Marcus with Abstrakt. We help commercial cleaning companies land larger janitorial contracts. Do you have a moment?' },
        { s: 'prospect', t: 'Yeah, I\'m always looking for new accounts. What do you do differently?' },
        { s: 'bdr', t: 'We build an outbound sales team for you -- our BDRs reach out to facility managers, property managers, and office administrators to book meetings where you can pitch your services.' },
        { s: 'prospect', t: 'We\'ve been relying on word of mouth and some internet leads, but the leads are usually small offices. We want the big buildings.' },
        { s: 'bdr', t: 'That\'s what we specialize in. A janitorial company in Tampa used to average 5,000 sq ft accounts. After 90 days with us, they landed three accounts over 40,000 square feet each.' },
        { s: 'prospect', t: 'That\'s the size we need. How do you find those opportunities?' },
        { s: 'bdr', t: 'We target property management companies, healthcare facilities, corporate campuses -- whoever fits your ideal profile. Our team handles calls, emails, and LinkedIn, then books the meeting on your calendar.' },
        { s: 'prospect', t: 'And your people understand janitorial? Like day porter vs. nightly cleaning?' },
        { s: 'bdr', t: 'Absolutely. Our team is trained on commercial cleaning service lines so the conversations are credible and professional. Let me set up 20 minutes with our VP to map this out for PristineClean.' },
        { s: 'prospect', t: 'Do it. Send me some times for this week.' },
        { s: 'system', t: 'Meeting booked -- Discovery call scheduled for Friday 9:00 AM CT' },
      ],
    },
    flooring: {
      prospect: { name: 'Ryan Kraft', title: 'Sales Manager', company: 'Summit Flooring Group' },
      lines: [
        { s: 'bdr', t: 'Hey Ryan, Sarah with Abstrakt here. We help commercial flooring companies book qualified meetings with GCs and facility managers. Got a minute?' },
        { s: 'prospect', t: 'Yeah, we\'ve been trying to grow the commercial side. What do you guys do?' },
        { s: 'bdr', t: 'We become your outbound sales team. We target general contractors, property managers, and facility directors who need commercial flooring -- polished concrete, VCT, carpet tile, epoxy, whatever your sweet spot is.' },
        { s: 'prospect', t: 'Our sweet spot is polished concrete and epoxy for warehouses and retail. But breaking into new GC relationships is brutal.' },
        { s: 'bdr', t: 'It is when you\'re doing it alone. We helped a flooring installer in Charlotte get in front of 9 new GCs in 45 days. Three of those turned into active subcontract relationships.' },
        { s: 'prospect', t: 'How? GCs don\'t usually take cold calls.' },
        { s: 'bdr', t: 'Our team uses a multi-touch approach -- calls, project-specific emails, LinkedIn. We reference active projects in your area so the outreach is relevant, not generic.' },
        { s: 'prospect', t: 'That\'s smart. I\'ve been saying we need somebody dedicated to business development but we can\'t afford a full-time hire.' },
        { s: 'bdr', t: 'That\'s exactly the gap we fill. Fraction of the cost, producing from day one. Can I get 20 minutes on your calendar to show you what Summit\'s pipeline could look like?' },
        { s: 'prospect', t: 'Yeah, let\'s do it. Wednesday or Thursday works.' },
        { s: 'system', t: 'Meeting booked -- Discovery call scheduled for Wednesday 2:00 PM CT' },
      ],
    },
    electrical: {
      prospect: { name: 'Brian Walsh', title: 'VP Operations', company: 'Meridian Electric' },
      lines: [
        { s: 'bdr', t: 'Hey Brian, Marcus from Abstrakt. We work with commercial electrical contractors to generate new project pipeline. Quick minute?' },
        { s: 'prospect', t: 'We\'re always looking for work. What\'s your angle?' },
        { s: 'bdr', t: 'We build and run your outbound sales function. Our team reaches out to GCs, facility managers, and property developers to book qualified meetings for your estimating team.' },
        { s: 'prospect', t: 'Most of our work comes through GC relationships and plan rooms. But we lose more bids than we win because we\'re always late to the table.' },
        { s: 'bdr', t: 'That\'s the problem. You\'re competing on bids instead of building relationships early. We helped an electrical contractor in Dallas get 12 meetings with GCs before projects even hit the plan room.' },
        { s: 'prospect', t: 'Pre-bid relationships? That would completely change our win rate.' },
        { s: 'bdr', t: 'Exactly. Our BDRs position Meridian as the go-to electrical sub before the bid list is even finalized. We also target facility directors for service and retrofit work.' },
        { s: 'prospect', t: 'What does this cost compared to hiring a business development person?' },
        { s: 'bdr', t: 'Significantly less, and we\'re productive from month one. Let me set up a call with our VP to walk through the program and ROI. Does this week work?' },
        { s: 'prospect', t: 'Friday morning. Let\'s see what you\'ve got.' },
        { s: 'system', t: 'Meeting booked -- Discovery call scheduled for Friday 10:00 AM CT' },
      ],
    },
    'fire-protection': {
      prospect: { name: 'Kevin Doyle', title: 'Owner', company: 'Sentinel Fire & Safety' },
      lines: [
        { s: 'bdr', t: 'Hey Kevin, Sarah from Abstrakt. We help commercial fire protection companies grow their inspection and install pipeline. Got a second?' },
        { s: 'prospect', t: 'Fire protection is a niche space. You guys actually work in this industry?' },
        { s: 'bdr', t: 'We do -- sprinkler, suppression, alarms, extinguisher service, the whole scope. We just helped a fire protection company in Chicago add 18 new inspection accounts in one quarter.' },
        { s: 'prospect', t: 'Eighteen? We\'d kill for that. Our problem is we do great work but we don\'t have time to prospect.' },
        { s: 'bdr', t: 'That\'s the story we hear every time. You\'re out running inspections, not making sales calls. We handle all of that -- targeting property managers, facility directors, restaurant groups, healthcare buildings -- anyone who needs fire protection compliance.' },
        { s: 'prospect', t: 'Restaurant groups are huge for us. Hood suppression is a big revenue line.' },
        { s: 'bdr', t: 'Perfect. We\'d build a target list heavy on restaurant management companies and commercial kitchen operators in your area. Our team sets the meetings, you close the deals.' },
        { s: 'prospect', t: 'I like the sound of this. What do I need to do?' },
        { s: 'bdr', t: 'Just give me 20 minutes with our VP -- he\'ll map out Sentinel\'s target market and show you projected pipeline. What\'s your availability this week?' },
        { s: 'prospect', t: 'I can do Thursday at 11. Let\'s talk.' },
        { s: 'system', t: 'Meeting booked -- Discovery call scheduled for Thursday 11:00 AM CT' },
      ],
    },
    painting: {
      prospect: { name: 'Angela Price', title: 'Business Dev', company: 'ProCoat Commercial Painting' },
      lines: [
        { s: 'bdr', t: 'Hey Angela, Marcus with Abstrakt here. We help commercial painting companies get in front of more property managers and GCs. Got a minute?' },
        { s: 'prospect', t: 'Yeah, we\'ve been trying to grow beyond our current base. What do you do?' },
        { s: 'bdr', t: 'We build and run your outbound sales team. Our BDRs reach out to property managers, GCs, and facility directors who need commercial painting -- interior refreshes, exterior repaints, new construction.' },
        { s: 'prospect', t: 'We mostly get subcontract work from two GCs right now. If one of them slows down, we\'re in trouble.' },
        { s: 'bdr', t: 'That\'s a risky position. A commercial painter we work with in Phoenix had the same problem. In 60 days, we booked them meetings with 8 new GCs and 5 property management companies.' },
        { s: 'prospect', t: 'Property management companies are gold for us. Recurring repaints every 3-5 years.' },
        { s: 'bdr', t: 'Exactly -- that recurring revenue is the goal. We\'d target multifamily, office, and retail property managers in your area. Our team handles all outreach and books meetings on your calendar.' },
        { s: 'prospect', t: 'How quickly do you ramp up?' },
        { s: 'bdr', t: 'Most clients see their first meetings within 30 days. Let me get 20 minutes with our VP to walk through the specifics for ProCoat. Does this week work?' },
        { s: 'prospect', t: 'Wednesday at 2 works. Send the invite.' },
        { s: 'system', t: 'Meeting booked -- Discovery call scheduled for Wednesday 2:00 PM CT' },
      ],
    },
    solar: {
      prospect: { name: 'Nate Harmon', title: 'Director of Sales', company: 'Apex Solar Solutions' },
      lines: [
        { s: 'bdr', t: 'Hey Nate, Sarah with Abstrakt. We help commercial solar companies fill their pipeline with property owner and facility manager meetings. Quick minute?' },
        { s: 'prospect', t: 'Always interested. Solar is competitive right now -- hard to break through the noise.' },
        { s: 'bdr', t: 'That\'s exactly why outbound works. Instead of competing for inbound leads, we proactively target building owners, facility managers, and property groups who are good fits for commercial solar.' },
        { s: 'prospect', t: 'We\'ve been mostly inbound -- Google, referrals. But the cost per lead keeps going up.' },
        { s: 'bdr', t: 'And inbound leads are comparing you against 4 other quotes. With outbound, you\'re the only one in the room. We helped a commercial solar company in Denver book 10 qualified meetings in 45 days -- all buildings with 10,000+ sq ft of usable roof space.' },
        { s: 'prospect', t: 'That\'s our sweet spot. Warehouses, retail, light industrial. How do you target them?' },
        { s: 'bdr', t: 'We build a list based on building size, roof type, energy spend, and ownership. Then our BDRs run multi-channel outreach -- calls, ROI-focused emails, LinkedIn. When someone\'s interested, they\'re on your calendar.' },
        { s: 'prospect', t: 'And you handle the entire front end? We just show up to present?' },
        { s: 'bdr', t: 'Exactly. Let me set up a call with our VP to build out Apex\'s target market and projected pipeline. What does your Thursday look like?' },
        { s: 'prospect', t: 'Thursday at 1. Let\'s see it.' },
        { s: 'system', t: 'Meeting booked -- Discovery call scheduled for Thursday 1:00 PM CT' },
      ],
    },
    'general-contracting': {
      prospect: { name: 'Steve Blackwell', title: 'President', company: 'Blackwell General Contractors' },
      lines: [
        { s: 'bdr', t: 'Hey Steve, Marcus with Abstrakt here. We work with commercial GCs to generate project opportunities outside the plan room. Got a second?' },
        { s: 'prospect', t: 'Outside the plan room? What do you mean?' },
        { s: 'bdr', t: 'Instead of competing on public bids, we help you build direct relationships with building owners, developers, and facility directors who have upcoming projects -- so you\'re negotiating, not just bidding.' },
        { s: 'prospect', t: 'That\'s the dream. Plan room work is a race to the bottom on price.' },
        { s: 'bdr', t: 'Exactly. We just helped a GC in Kansas City land 3 negotiated projects in one quarter by getting in front of developers before they went public with their bid packages.' },
        { s: 'prospect', t: 'How are you finding these developers?' },
        { s: 'bdr', t: 'We use permit data, commercial real estate activity, and direct outreach to developers, REITs, and facility directors. Our BDR team runs calls, emails, and LinkedIn to build the relationship and book meetings for your team.' },
        { s: 'prospect', t: 'So you\'re basically my business development department.' },
        { s: 'bdr', t: 'That\'s exactly right. Purpose-built for commercial construction. Let me get 20 minutes with our VP to show you what Blackwell\'s pipeline could look like.' },
        { s: 'prospect', t: 'I want to see it. Tuesday afternoon works.' },
        { s: 'system', t: 'Meeting booked -- Discovery call scheduled for Tuesday 3:00 PM CT' },
      ],
    },
    plumbing: {
      prospect: { name: 'Rich Santoro', title: 'Owner', company: 'Santoro Commercial Plumbing' },
      lines: [
        { s: 'bdr', t: 'Hey Rich, Sarah from Abstrakt. We help commercial plumbing companies fill their pipeline with facility manager and GC meetings. Got a quick second?' },
        { s: 'prospect', t: 'Yeah, we\'re mostly service calls right now. Trying to land more project work.' },
        { s: 'bdr', t: 'That transition from service to project work is exactly what we help with. We just helped a commercial plumber in Indianapolis go from 90% reactive service to booking 7 new project meetings in 60 days.' },
        { s: 'prospect', t: 'That\'s what we need. New construction, tenant buildouts, re-pipes. The bigger jobs.' },
        { s: 'bdr', t: 'Perfect. We\'d target GCs, property managers, and facility directors in your area who need commercial plumbing on upcoming projects. Our team handles all the outreach and books meetings on your calendar.' },
        { s: 'prospect', t: 'I don\'t have a sales team. It\'s just me and my crews.' },
        { s: 'bdr', t: 'That\'s the beauty of it. We are your sales team. No hiring, no training. We already know how to sell into commercial plumbing because that\'s all we do.' },
        { s: 'prospect', t: 'And these are meetings with real decision makers? Not just tire kickers?' },
        { s: 'bdr', t: 'Qualified decision makers who have a need and a timeline. Let me set up 20 minutes with our VP to walk through Santoro\'s target market and projected results. This week work?' },
        { s: 'prospect', t: 'Thursday morning. Let\'s go.' },
        { s: 'system', t: 'Meeting booked -- Discovery call scheduled for Thursday 9:00 AM CT' },
      ],
    },
  };

  const script = scripts[industry];
  if (!script) return;

  /* --- Build DOM --- */
  const panel = document.createElement('div');
  panel.className = 'transcript';
  panel.innerHTML = `
    <div class="transcript__header">
      <div class="transcript__live"><span class="transcript__dot"></span> LIVE CALL</div>
      <div class="transcript__meta">${script.prospect.company}</div>
      <button class="transcript__toggle" aria-label="Toggle transcript">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
      </button>
    </div>
    <div class="transcript__body" id="transcriptBody">
      <div class="transcript__scroll" id="transcriptScroll"></div>
      <div class="transcript__typing" id="transcriptTyping">
        <span></span><span></span><span></span>
      </div>
    </div>
  `;

  document.body.appendChild(panel);

  const body = panel.querySelector('.transcript__body');
  const scroll = panel.querySelector('#transcriptScroll');
  const typing = panel.querySelector('#transcriptTyping');
  const toggleBtn = panel.querySelector('.transcript__toggle');

  let collapsed = false;
  toggleBtn.addEventListener('click', () => {
    collapsed = !collapsed;
    panel.classList.toggle('is-collapsed', collapsed);
    toggleBtn.querySelector('svg').style.transform = collapsed ? 'rotate(180deg)' : '';
  });

  /* --- Typing Engine --- */
  let lineIndex = 0;

  function speakerLabel(s) {
    if (s === 'bdr') return '<span class="transcript__speaker transcript__speaker--bdr">Abstrakt BDR</span>';
    if (s === 'system') return '<span class="transcript__speaker transcript__speaker--system">SYSTEM</span>';
    return `<span class="transcript__speaker transcript__speaker--prospect">${script.prospect.name.split(' ')[0]}</span>`;
  }

  function typeNextLine() {
    if (lineIndex >= script.lines.length) {
      typing.style.display = 'none';
      return;
    }

    const line = script.lines[lineIndex];
    typing.style.display = 'flex';
    scrollToBottom();

    const delay = line.s === 'system' ? 800 : 1500 + Math.random() * 1000;

    setTimeout(() => {
      typing.style.display = 'none';

      const msg = document.createElement('div');
      msg.className = `transcript__msg transcript__msg--${line.s}`;
      msg.innerHTML = `${speakerLabel(line.s)}<span class="transcript__text"></span>`;
      scroll.appendChild(msg);

      const textEl = msg.querySelector('.transcript__text');
      let charIndex = 0;
      const text = line.t;
      const speed = line.s === 'system' ? 15 : 22 + Math.random() * 10;

      function typeChar() {
        if (charIndex < text.length) {
          textEl.textContent += text[charIndex];
          charIndex++;
          scrollToBottom();
          setTimeout(typeChar, speed);
        } else {
          lineIndex++;
          const pause = line.s === 'system' ? 1200 : 2000 + Math.random() * 1500;
          setTimeout(typeNextLine, pause);
        }
      }

      typeChar();
    }, delay);
  }

  function scrollToBottom() {
    body.scrollTop = body.scrollHeight;
  }

  /* --- Start after a delay so user sees the page first --- */
  setTimeout(() => {
    panel.classList.add('is-visible');
    setTimeout(typeNextLine, 1200);
  }, 2000);
})();
