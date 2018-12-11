/* -------------------------------------------------------------------- *\
   fresh webring code by wastebin: feel free to use this code to make
   your own webring. credit is appreciated, but not strictly required.

   instructions for ring joiners:
   this is not a webring, this is just the code necessary to make a
   webring. I (wastebin) do not currently have the wherewithal to
   operate a webring; if you are looking for a webring, I hear ourspace
   is making a comeback. if you aren’t interested in ourspace, or also
   want to also be in another webring (perhaps one with a focus
   relevant to your site), I’d recommend poking around (if you happen
   to have a site on video games, particularly Sonic, I’d recommend
   https://stationsquare.neocities.org/ring/), or, if, unlike me, you
   have the wherewithal to operate a webring, that you start your own
   webring.
   if so, read on.

   instructions for ring maintainers:

   read !!!ALL!!! of these instructions before following them.

   save this file and put it on your website.

   to configure the webring, begin at “!!! BEGINNING OF CONFIGURATION”,
   fill in every variable preceded by “!!!”, following the
   instructions, and stop when you reach “!!! END OF CONFIGURATION”.

   generally, hotlinking is rude, but this is one instance where it
   makes the most sense to host everything in one one place and have
   people link to it. so, just add the following to your webring’s
   homepage, with instructions to members to add it to their page,
   replacing the example URL with your copy of this ’s URL:
   <textarea><script src=https://example.com/ring.js></script></textarea>

   then, if you want your ring to be public, set up contact information
   or a form for people to apply to join, and update your ring when you
   receive applications.

   finally, make a homepage for your ring, and change the “instructions
   for ring joiners” to explain your ring and link to its homepage.

   remember to periodically check sites to make sure that they are
   still up, still contain the webring button, and do not violate any
   rules you have made. if this is infeasible, consider maintaining a
   site directory, rather than a webring. if a site has moved the
   webring button to another page, update the entry in the site list,
   if the site violates the webring’s rules or the operator has asked
   to leave the ring, remove the site’s entry, and if the site goes
   down or the button is removed without explanation, put a "//" before
   the site entry, and remove the "//" after the issue is resolved. you
   may also want to do this if a site is no longer being maintained or
   has been compromised.

   this concludes the instructions for ring maintainers.

   explanation of behavior:

   if there are no sites in the ring, no changes are made to the page,
   and an error is thrown; otherwise, the left, center, and right
   buttons are inserted once DOM content is loaded according to the
   following rules:

   if the  element that loaded this script is inside the document
   body, the buttons are inserted immediately after the script element
   that loaded this script; otherwise, the buttons are inserted at the
   very end of the document body. if the buttons are inserted, they
   will be linked in the following manner:

   the center button always links to the webring’s homepage. if the
   webpage this script is being loaded from belongs to a site in the
   webring, the left and right buttons will link to the previous and
   next sites in the ring respectively; if the webpage this script is
   being loaded from does not belong to a site in the webring, they
   will link to the last and first sites respectively.
\* -------------------------------------------------------------------- */

{
  // !!! BEGINNING OF CONFIGURATION

  // !!! ADD WEBRING HOMEPAGE URL HERE (URL must be in quotation marks):
  const homepage = "http://example.com/ring";

  const ring = [
    /* !!! ADD WEBRING SITES HERE (each site URL must be in quotation
           marks and should be on its own line, and every entry except the
           last one must have a comma after it, outside of the quotation
           marks):
    "http://example.com",
    "http://example.neocities.org",
    "http://example2.neocities.org"
  ];

  // !!! ADD BUTTON IMAGE URLS HERE (each URL must be in quotation marks):
  const prevButtonSource = "http://example.com/ring/left.png";
  const ringButtonSource = "http://example.com/ring/middle.png";
  const nextButtonSource = "http://example.com/ring/right.png";

  // !!! END OF CONFIGURATION

  // create left button + link
  const prevLink = document.createElement("a");
  const prevButton = document.createElement("img");
  prevButton.src = prevButtonSource;
  prevButton.title = "Previous site";
  prevLink.appendChild(prevButton);

  // create ring homepage button + link
  const ringLink = document.createElement("a");
  ringLink.href = homepage;
  const ringButton = document.createElement("img");
  ringButton.src = ringButtonSource;
  ringButton.title = "Ring homepage";
  ringLink.appendChild(ringButton);

  // create right button + link
  const nextLink = document.createElement("a");
  const right = document.createElement("img");
  right.src = ""; // !!! RIGHT IMAGE HERE
  right.title = "Next site";
  nextLink.appendChild(right);

  if (!ring.length) {
    throw new RangeError("Webring must contain at least one website.");
  }

  let here = -1;
  /* if the page this  is running on belongs to a site in the ring,
     this will be overwritten */

  /* find out which site in the ring the page that this  is running
     on belongs to */
  for (const [index, url] of ring.entries()) {
    // test if the page URL contains the site URL
    if (~location.href.indexOf(url)) {
      here = index;
      break;
    }
  }

  /* decide which sites the left and right buttons should link to; if the
     page this script is running on belongs to a site in the ring, they
     link to the previous and next site respectively; otherwise, they will
     link to the last and first site respectively */
  const prev =
    ((~here ? here - 1 : here) % ring.length + ring.length) % ring.length;
  const next = ((here + 1) % ring.length + ring.length) % ring.length;

  // hook up buttons
  prevLink.href = ring[prev];
  nextLink.href = ring[next];

  // get elements near current script; these must be saved now because once
  let { parentNode: addTo, nextSibling } = document.currentScript;

  // wait until document.body certainly exists
  addEventListener("DOMContentLoaded", function() {
    /* ensure that webring button will not be added outside of body; a
       quirk of HTMLElement#contains is that elements are regarded as
       containing themselves, so we don’t have to explicitly handle addTo
       being document.body */
    if (!document.body.contains(addTo)) {
      addTo = document.body;
      nextSibling = null; // append to very end
    }

    // insert elements after script
    addTo.insertBefore(prevLink, nextSibling);
    addTo.insertBefore(ringLink, nextSibling);
    addTo.insertBefore(nextLink, nextSibling);
  });
}
