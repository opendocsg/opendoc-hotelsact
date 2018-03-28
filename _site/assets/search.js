(function() {
  var buildNav, clearButton, createEsQuery, debounce, enableSearchBox, endpoint, esSearch, initSubsections, lunrSearch, main, maxResults, maxSnippets, menuToggle, pageIndex, pageOrder, pages, renderSearchResults, renderSearchResultsFromServer, renderToc, searchBoxElement, searchIndexPromise, searchOnServer, search_endpoint, sectionIndex, setSelectedAnchor, site, siteHierarchy, siteNavElement, siteSearchElement, snippetSpace, startBuildingHierarchy, startBuildingIndex, translateLunrResults,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    slice = [].slice;

  siteNavElement = document.getElementsByClassName("site-nav")[0];

  siteSearchElement = document.createElement("div");

  siteSearchElement.classList.add("site-search");

  siteSearchElement.innerHTML = "<svg class=\"search-icon\" viewBox=\"0 0 18 18\" width=\"18\" height=\"18\">\n  <path ill=\"#222222\" d=\"M12.43 11.73C13.41 10.59 14 9.11 14 7.5 14 3.91 11.09 1 7.5 1S1 3.91 1 7.5 3.91 14 7.5 14c1.61 0 3.09-.59 4.23-1.57l.7-.7zM7.5 12C5.01 12 3 9.99 3 7.5S5.01 3 7.5 3 12 5.01 12 7.5 9.99 12 7.5 12z\"/>\n  <path fill=\"#222222\" d=\"M12.41293 11l4.7982 4.79818-1.41423 1.41422L11 12.39863\"/>\n</svg>";

  clearButton = document.createElement("label");

  clearButton.classList.add("clear-button");

  clearButton.innerHTML = "<svg class=\"clear-icon\" viewBox=\"0 0 18 18\" width=\"18\" height=\"18\">\n  <path d=\"M2.42755 1L17.0331 15.60554l-1.41423 1.4142L1 2.38402\"/>\n  <path d=\"M1 15.51932L15.51933 1l1.4142 1.4142L2.2978 17.0331\"/>\n</svg>";

  searchBoxElement = document.createElement("input");

  searchBoxElement.id = "search-box";

  searchBoxElement.setAttribute("type", "text");

  searchBoxElement.setAttribute("placeholder", "Building site hierarchy...");

  searchBoxElement.setAttribute("disabled", "");

  siteSearchElement.prepend(clearButton);

  siteSearchElement.prepend(searchBoxElement);

  siteNavElement.prepend(siteSearchElement);

  clearButton.onclick = function() {
    searchBoxElement.value = "";
    return searchBoxElement.dispatchEvent(new Event('input', {
      'bubbles': true,
      'cancelable': true
    }));
  };

  searchBoxElement.oninput = function(event) {
    if (searchBoxElement.value.length > 0) {
      return siteSearchElement.classList.add("filled");
    } else {
      return siteSearchElement.classList.remove("filled");
    }
  };

  endpoint = "https://opendoc.sg/clm";

  search_endpoint = endpoint + '/search';

  site = {
    title: "Community Legal Clinics Manual, Law Society of Singapore",
    url: "http://localhost:4000"
  };

  pages = [
    {
      "name": "index.md",
      "title": "Hotels Act",
      "content": "<h1 id=\"hotels-act\">Hotels Act</h1>\n<h2 id=\"chapter-127\">Chapter 127</h2>\n\n<p>An Act for the licensing and control of hotels and lodging-houses.​\n[10th August 1956]</p>\n\n<h3 id=\"1-short-title\">1. Short title</h3>\n\n<p>This Act may be cited as the Hotels Act.</p>\n\n<h3 id=\"2-interpretation\">2. Interpretation</h3>\n\n<p>In this Act, unless the context otherwise requires —</p>\n\n<p>“Board” means the Hotels Licensing Board established under section 3 (1);</p>\n\n<p>“hotel” includes a boarding-house, lodging-house, guest-house and any building or premises not being a public institution and containing not less than 4 rooms or cubicles in which persons are harboured or lodged for hire or reward of any kind and where any domestic service is provided by the owner, lessee, tenant, occupier or manager for the person so harboured or lodged;</p>\n\n<p>“hotel-keeper” means any person to whom a licence to keep or manage a hotel has been granted under section 7.</p>\n\n<h3 id=\"3-hotels-licensing-board\">3. Hotels Licensing Board</h3>\n\n<blockquote>\n  <p>i. There shall be established a Hotels Licensing Board consisting of a chairman and 4 other members, to be appointed by the Minister.</p>\n</blockquote>\n\n<blockquote>\n  <p>ii. The chairman and every member of the Board shall hold office for a period of 3 years from the date of appointment.</p>\n</blockquote>\n\n<blockquote>\n  <p>iii. The Minister may, at any time, revoke any such appointment.</p>\n</blockquote>\n\n<blockquote>\n  <p>iv. If any vacancy occurs by death, resignation or otherwise, a new chairman or member, as the case may be, shall be appointed by the Minister in accordance with subsection (i).</p>\n</blockquote>\n\n<blockquote>\n  <p>v. Any person appointed to fill a casual vacancy under subsection (4) shall hold office so long only as the person in whose place he is appointed would have held office.</p>\n</blockquote>\n\n<blockquote>\n  <p>vi. The powers of the Board may be exercised notwithstanding any vacancy in their number.</p>\n</blockquote>\n\n<blockquote>\n  <p>vii. The quorum of the Board shall be 3.</p>\n</blockquote>\n\n<blockquote>\n  <p>viii. The Board may appoint any member of the Board to be the vice-chairman of the Board and, in the absence of the chairman, the vice-chairman shall preside at meetings of the Board.</p>\n</blockquote>\n\n<h3 id=\"4-secretary-and-other-officers\">4. Secretary and other officers</h3>\n\n<p>The Minister may appoint a secretary and such other officers as he may consider necessary.</p>\n\n<h3 id=\"5-registration-of-premises-as-hotel\">5. Registration of premises as hotel</h3>\n\n<blockquote>\n  <p>i. No premises shall be used as a hotel unless they are registered under this section.</p>\n</blockquote>\n\n<blockquote>\n  <p>ii. Every application for registration of any premises as a hotel shall be made to the Board in the prescribed form.</p>\n</blockquote>\n\n<blockquote>\n  <p>iii. Where an application is duly made under subsection (2) for the registration of premises as a hotel, the Board may, after such inquiry as it considers necessary and on payment of the prescribed fee, grant a certificate of registration in the prescribed form.</p>\n</blockquote>\n\n<blockquote>\n  <p>iv. The Board may, in its discretion, refuse to register any premises as a hotel without assigning any reason therefor.</p>\n</blockquote>\n\n<h3 id=\"6-conditions-for-grant-of-certificate-of-registration\">6. Conditions for grant of certificate of registration</h3>\n\n<p>No certificate of registration shall be granted under section 5 (3) unless the Board is satisfied —</p>\n\n<blockquote>\n  <p>a. that the premises will not be conducted as a disorderly house;</p>\n</blockquote>\n\n<blockquote>\n  <p>b. that the premises to be registered are structurally adapted for use as a hotel;</p>\n</blockquote>\n\n<blockquote>\n  <p>c. that proper provision has been made in all respects for the sanitation of the premises;</p>\n</blockquote>\n\n<blockquote>\n  <p>d. that the situation of the premises is suitable for the purpose; and</p>\n</blockquote>\n\n<blockquote>\n  <p>e.that the standard of accommodation provided is adequate for the class within which the applicant desires the premises to be registered as a hotel.</p>\n</blockquote>\n\n<h3 id=\"7-licensing-of-managers\">7. Licensing of managers</h3>\n\n<blockquote>\n  <p>i. No person shall keep or manage any premises for the purposes of a hotel unless he is the holder of a valid licence granted in respect of the premises in accordance with the provisions of this Act.</p>\n</blockquote>\n\n<blockquote>\n  <p>ii. Such licences may be granted by the Board on payment of the prescribed fees.</p>\n</blockquote>\n\n<blockquote>\n  <p>iii. Licences shall be subject to —</p>\n</blockquote>\n\n<blockquote>\n  <ul>\n    <li>a. such conditions as may be prescribed; and</li>\n  </ul>\n</blockquote>\n\n<blockquote>\n  <ul>\n    <li>b. such further conditions, if any, as may in each case be imposed by the Board.</li>\n  </ul>\n</blockquote>\n\n<blockquote>\n  <p>iv. Any condition imposed under subsection (3) (b) shall be set out in the licence.</p>\n</blockquote>\n\n<blockquote>\n  <p>v. Every licence shall be —</p>\n</blockquote>\n\n<blockquote>\n  <ul>\n    <li>a. in the form prescribed; and</li>\n  </ul>\n</blockquote>\n\n<blockquote>\n  <ul>\n    <li>b. granted on or after 1st January in every year and shall expire on 31st December next following the date of grant.</li>\n  </ul>\n</blockquote>\n\n<blockquote>\n  <p>vi. No licence shall be granted by the Board unless the person applying satisfies the Board that —</p>\n</blockquote>\n\n<blockquote>\n  <ul>\n    <li>a. the premises in respect of which the application is made will not be conducted as a disorderly house; and</li>\n  </ul>\n</blockquote>\n\n<blockquote>\n  <ul>\n    <li>b. he is of good character and a fit and proper person to keep and manage a hotel.</li>\n  </ul>\n</blockquote>\n\n<blockquote>\n  <p>vii. The Board may, in its discretion, refuse to grant or renew a licence without assigning any reason therefor.</p>\n</blockquote>\n\n<h3 id=\"8-suspension-and-cancellation-of-licence-and-certificate-of-registration\">8. Suspension and cancellation of licence and certificate of registration</h3>\n\n<blockquote>\n  <p>i. Where it appears to the Board that a hotel is being conducted in an improper or unsatisfactory manner, the Board may —</p>\n</blockquote>\n\n<blockquote>\n  <ul>\n    <li>a. cancel the certificate of registration of the hotel;</li>\n  </ul>\n</blockquote>\n\n<blockquote>\n  <ul>\n    <li>b. cancel the licence granted to the hotel-keeper in respect of the hotel; or</li>\n  </ul>\n</blockquote>\n\n<blockquote>\n  <ul>\n    <li>c. cancel both the certificate and licence.</li>\n  </ul>\n</blockquote>\n\n<blockquote>\n  <p>ii. Where it appears to the Board that a hotel is being kept in an unclean or insanitary condition, the Board may, by notice in writing, require the hotel-keeper to remedy the defect within such period not being less than one month as may be specified in the notice.</p>\n</blockquote>\n\n<blockquote>\n  <p>iii. If the hotel-keeper fails to remedy the defect to the satisfaction of the Board within the period so specified, the Board may</p>\n</blockquote>\n\n<blockquote>\n  <ul>\n    <li>a. suspend the certificate of registration of the hotel for such period as it thinks fit or cancel the certificate of registration of the hotel; and</li>\n  </ul>\n</blockquote>\n\n<blockquote>\n  <ul>\n    <li>b. cancel the licence granted to the hotel-keeper in respect of the hotel.</li>\n  </ul>\n</blockquote>\n\n<blockquote>\n  <p>iv. No suspension or cancellation under subsections (1) and (3) shall take effect until the expiration of 10 days from the date of the suspension or cancellation.</p>\n</blockquote>\n\n<blockquote>\n  <p>v. Where an appeal has been made against any suspension or cancellation within the period of 10 days prescribed by section 11, the suspension or cancellation shall not take effect until the appeal has been determined and the Minister confirms the suspension or cancellation.</p>\n</blockquote>\n\n<h3 id=\"9-cancellation-of-licence-and-certificate-of-registration-on-conviction\">9. Cancellation of licence and certificate of registration on conviction</h3>\n\n<p>Where any hotel-keeper is convicted of an offence under Part XI of the Women’s Charter (Cap. 353), the Board shall —</p>\n\n<blockquote>\n  <p>a. cancel any licence granted to that hotel-keeper under section 7; and</p>\n</blockquote>\n\n<blockquote>\n  <p>b. cancel the certificate of registration of any hotel in respect of which the offence was committed.</p>\n</blockquote>\n\n<h3 id=\"10-re-classification-of-hotels\">10. Re-classification of hotels</h3>\n\n<p>Where it appears to the Board that a hotel is not being kept or managed in a manner conformable to the standard of a hotel of the class in which the hotel is registered, the Board may, upon giving notice thereof to the hotel-keeper, remove the name of the hotel from that class and place it in a lower class.</p>\n\n<h3 id=\"11-appeal-to-minister\">11. Appeal to Minister</h3>\n\n<p>Any person aggrieved by —</p>\n\n<blockquote>\n  <p>a. the refusal of the Board to register any premises as a hotel;</p>\n</blockquote>\n\n<blockquote>\n  <p>b. the refusal of the Board to grant or renew a licence;</p>\n</blockquote>\n\n<blockquote>\n  <p>c. the suspension or cancellation of a certificate of registration by the Board under section 8; or</p>\n</blockquote>\n\n<blockquote>\n  <p>d. the cancellation of a licence by the Board under section 8, may, within 10 days from the date of the refusal, suspension or cancellation, appeal to the Minister whose decision shall be final and conclusive.</p>\n</blockquote>\n\n<h3 id=\"12-exemption\">12. Exemption</h3>\n\n<p>The provisions of this Act shall not apply to any premises or class of premises exempted by regulations made under this Act.</p>\n\n<h3 id=\"13-liability-of-managers-for-act-of-servant\">13. Liability of managers for act of servant</h3>\n\n<blockquote>\n  <p>i. Whenever any person licensed under this Act would be liable under the provisions of this Act or of any regulations made thereunder to any pecuniary penalty or forfeiture for any act, omission, neglect or default, he shall be liable to the same pecuniary penalty or forfeiture for every similar act, omission, neglect or default of any agent or servant employed by him in the course of his business as such licensed person.</p>\n</blockquote>\n\n<blockquote>\n  <p>ii. Every person who appears to be employed in any hotel registered under this Act, shall, for the purposes of this section, be deemed to be a servant of the person licensed in respect thereof.</p>\n</blockquote>\n\n<blockquote>\n  <p>iii. Nothing in this section shall be construed as relieving any such agent or servant from any penalty or forfeiture to which he would otherwise be liable.</p>\n</blockquote>\n\n<h3 id=\"14-presumptions\">14. Presumptions</h3>\n\n<p>In any prosecution under this Act, it shall be presumed until the contrary is proved -</p>\n\n<blockquote>\n  <p>a. that any premises in which rooms or parts of rooms are let or sub-let for hire for periods of less than one week constitute a hotel; and</p>\n</blockquote>\n\n<blockquote>\n  <p>b. that any person who has or appears to have the care or management of such premises is the occupier of those premises.</p>\n</blockquote>\n\n<h3 id=\"15-powers-of-entry-and-inspection\">15. Powers of entry and inspection</h3>\n\n<blockquote>\n  <p>i. The chairman or any member of the Board or any person duly authorised by the chairman in writing may, subject to such regulations as may be made by the Minister, at any time of the day or night without previous notice enter and inspect any hotel or any premises reasonably suspected of being used for the purposes of a hotel.</p>\n</blockquote>\n\n<blockquote>\n  <p>ii. Any person who refuses to allow the chairman or any member of the Board or any such person to enter and inspect any hotel or any such premises or obstructs the entry or inspection in any way shall be guilty of an offence.</p>\n</blockquote>\n\n<h3 id=\"16-penalties\">16. Penalties</h3>\n\n<blockquote>\n  <p>i. Any person who keeps or manages any premises as a hotel in respect of which no certificate of registration under this Act is in force shall be guilty of an offence.</p>\n</blockquote>\n\n<blockquote>\n  <p>ii. Any person who, being the owner or occupier of any premises in respect of which no certificate of registration under this Act is in force, permits the premises to be used as a hotel shall be guilty of an offence.</p>\n</blockquote>\n\n<blockquote>\n  <p>iii. Any person who keeps or manages any hotel in respect of which he holds no valid licence shall be guilty of an offence.</p>\n</blockquote>\n\n<blockquote>\n  <p>iv. Any person who, being the owner or occupier of any premises, permits any other person (in respect of whom no licence granted under section 7 is in force) to manage or keep the premises as a hotel shall be guilty of an offence.</p>\n</blockquote>\n\n<blockquote>\n  <p>v. Any hotel-keeper who fails to comply with or contravenes any of the conditions set out in his licence shall be guilty of an offence.</p>\n</blockquote>\n\n<blockquote>\n  <p>vi. Any person who, for the purpose of obtaining whether for himself or for any other person the grant or renewal of any certificate of registration or licence under the provisions of this Act, makes any declaration or statement which is false in any material particular or knowingly utters, produces, or makes use of, any such declaration or statement or any document containing the same shall be guilty of an offence.</p>\n</blockquote>\n\n<blockquote>\n  <p>vii. Any person guilty of an offence shall be liable on conviction to a fine not exceeding $2,000 and, in the case of a second or subsequent offence, to such fine or to imprisonment for a term not exceeding 6 months or to both.</p>\n</blockquote>\n\n<blockquote>\n  <p>viii. In addition to any other penalty imposed, the court may cancel or suspend any certificate of registration and may cancel any licence granted under this Act.</p>\n</blockquote>\n\n<h3 id=\"17-regulations\">17. Regulations</h3>\n<blockquote>\n  <p>i. The Minister may make such regulations as he may consider expedient for the purposes of this Act.</p>\n</blockquote>\n\n<blockquote>\n  <p>ii. Without prejudice to the generality of subsection (1), regulations may be made for any of the purposes or with respect to any of the following matters:</p>\n</blockquote>\n\n<blockquote>\n  <ul>\n    <li>a. the control and management of hotels</li>\n  </ul>\n</blockquote>\n\n<blockquote>\n  <ul>\n    <li>b. the classification of hotels</li>\n  </ul>\n</blockquote>\n\n<blockquote>\n  <ul>\n    <li>c. the standards of hygiene to be observed in hotels;</li>\n  </ul>\n</blockquote>\n\n<blockquote>\n  <ul>\n    <li>d. the powers of entry into and inspection of premises</li>\n  </ul>\n</blockquote>\n\n<blockquote>\n  <ul>\n    <li>e. the regulation of the procedure and proceedings of the Board</li>\n  </ul>\n</blockquote>\n\n<blockquote>\n  <ul>\n    <li>f. the forms of certificates of registration, applications, licences, notices and any other forms which require to be prescribed under the provisions of this Act</li>\n  </ul>\n</blockquote>\n\n<blockquote>\n  <ul>\n    <li>g. the fees to be paid for certificates of registration and licences and any other fees which require to be prescribed under the provisions of this Act</li>\n  </ul>\n</blockquote>\n\n<blockquote>\n  <ul>\n    <li>h. the conditions under which licences may be granted;</li>\n  </ul>\n</blockquote>\n\n<blockquote>\n  <ul>\n    <li>i. the exemption of premises or classes of premises from the provisions of this Act; and</li>\n  </ul>\n</blockquote>\n\n<blockquote>\n  <ul>\n    <li>j. prescribing that any act or omission in contravention of the provisions of any regulations made under this Act shall be an offence, and imposing penalties for such offences which penalties may extend to the cancellation or suspension of any certificate of registration and to the cancellation of any licence granted under the provisions of this Act, but shall not exceed a fine of $2,000</li>\n  </ul>\n</blockquote>\n\n<h3 id=\"legislation-history\">LEGISLATION HISTORY</h3>\n<p>HOTELS ACT (CHAPTER 127)</p>\n\n<p>1. Ordinance 24 of 1954 — Hotels Ordinance 1954</p>\n<blockquote>\n  <p><em>Date of First Reading &gt; 17.8.54 (Bill No. 25/54 published on 20.8.54) \nDate of Second Reading &gt; 21.9.54 \nDate of Third Reading &gt; 12.10.54 \nDate of commencement &gt; 12.10.54</em></p>\n</blockquote>\n\n<p>2. Ordinance 17 of 1956 — Hotels (Amendment) Ordinance 1956</p>\n<blockquote>\n  <p><em>Date of First Reading &gt; 4.4.56 (Bill No. 48/56 published on 13.4.56) \nDate of Second and Third Readings &gt; 6.6.56 \nDate of commencement &gt; 22.6.56</em></p>\n</blockquote>\n\n<p>3. Ordinance 45 of 1959 — Hotels (Amendment) Ordinance 1959</p>\n<blockquote>\n  <p><em>Date of First, Second and Third Readings &gt; 13.8.59 (Bill No. 10/59) \nDate of commencement &gt; 21.8.59</em></p>\n</blockquote>\n\n<p>4. Ordinance 71 of 1959 — Transfer of Powers Ordinance 1959</p>\n<blockquote>\n  <p><em>Date of First Reading &gt; 22.9.59 (Bill No. 30/59 published on 30.9.59) \nDate of Second and Third Readings &gt; 11.11.59 \nDate of commencement &gt; 20.11.59</em></p>\n</blockquote>\n\n<p>5. Ordinance 72 of 1959 — Transfer of Powers (No. 2) Ordinance 1959</p>\n<blockquote>\n  <p><em>Date of First Reading &gt; 22.9.59 (Bill No. 31/59 published on 30.9.59)\nDate of Second and Third Readings &gt; 14.10.59 \nDate of commencement &gt; 20.11.59</em></p>\n</blockquote>\n\n<p>6. Act 7 of 1996 — Maritime and Port Authority of Singapore Act 1996 (Consequential amendments made by)</p>\n<blockquote>\n  <p><em>Date of First Reading &gt; 5.12.95 (Bill No. 46/95 published on 6.12.95) \nDate of Second and Third Readings &gt; 18.1.96 \nDate of commencement &gt; 2.2.96</em></p>\n</blockquote>\n\n<h3 id=\"comparative-table\">COMPARATIVE TABLE</h3>\n<p>HOTELS ACT (CHAPTER 127)</p>\n\n<p><em>The following provisions in the 1985 Revised Edition of the Hotels Act have been renumbered by the Law Revision Commissioners in this 1999 Revised Edition. This Comparative Table is provided for the convenience of users. It is not part of the Hotels Act.</em></p>\n\n<p>1999 Ed.\n1985 Ed.\n3—(3)\tProviso to 3—(2)\n(4) and (5)\t(3)\n(6)\t(4)\n(7)\t(5)\n(8)\t(6)\n7—(3) and (4)\t7—(3)\n(5)\t(4)\n(6)\t(5)\n(7)\t(6)\n8—(2) and (3)\t8—(2)\n(4)\t(3)\n(5)\t(4)\n13\t14\n14\t15\n15\t16\n16\t17\n17\t13\nThe above information is obtained with permission from LAWNET Singapore.</p>\n",
      "url": "/"
    }
  ];

  pageIndex = {};

  pageOrder = ["Community Legal Clinic Manual", "Clinic Management", "Civil Claims (General)", "Family Law", "Bankruptcy and Insolvency", "Criminal Law and Procedure", "Property", "Intellectual Property", "Wills, Intestacy, Probate and Administration", "Data Protection Law", "Advance Medical Directive", "Juvenile Issues", "Military Law", "Alternative Dispute Resolution", "The Traffic Court"];

  if (pageOrder.length > 0) {
    pages.sort(function(a, b) {
      if (pageOrder.indexOf(a.title) < pageOrder.indexOf(b.title)) {
        return -1;
      } else {
        return 1;
      }
    });
  } else {
    pageOrder = ["index.md"];
    pages.sort(function(a, b) {
      if (pageOrder.indexOf(a.name) < pageOrder.indexOf(b.name)) {
        return -1;
      } else {
        return 1;
      }
    });
  }

  pages.forEach(function(page) {
    return pageIndex[page.url] = page;
  });

  siteHierarchy = {
    component: site,
    title: site.title,
    url: site.url,
    text: []
  };

  sectionIndex = {};

  initSubsections = function(pages) {
    var sections;
    sections = pages.map(function(page) {
      var root;
      root = {
        parent: siteHierarchy,
        component: page,
        title: page.title,
        url: page.url,
        text: [],
        subsections: []
      };
      return root;
    });
    return sections;
  };

  siteHierarchy.subsections = initSubsections(pages);

  buildNav = function(section) {
    var expandButton, navBranch, navLinkElement;
    navBranch = document.createElement('div');
    navBranch.classList.add('nav-branch');
    if (section.subsections.length > 0) {
      expandButton = document.createElement('div');
      expandButton.classList.add('expand-button');
      expandButton.onclick = function(event) {
        return navBranch.classList.toggle("expanded");
      };
      navBranch.appendChild(expandButton);
    }
    navLinkElement = document.createElement('a');
    navLinkElement.classList.add('nav-link');
    navLinkElement.setAttribute('href', section.url);
    navLinkElement.innerHTML = section.title;
    navBranch.appendChild(navLinkElement);
    section.subsections.forEach(function(section) {
      return navBranch.appendChild(buildNav(section));
    });
    return navBranch;
  };

  startBuildingHierarchy = function() {
    var promise;
    promise = new Promise(function(resolve, reject) {
      var statusElement, worker;
      statusElement = document.createElement('div');
      statusElement.id = 'hierarchyWorkerStatus';
      statusElement.textContent = 'Building site hierarchy';
      statusElement.classList.add('loading');
      document.body.append(statusElement);
      worker = new Worker("/assets/hierarchyWorker.js");
      worker.onmessage = function(event) {
        var serializableSiteSections;
        worker.terminate();
        statusElement.remove();
        renderToc(event.data.hierarchy);
        sectionIndex = event.data.sectionIndex;
        serializableSiteSections = Object.values(sectionIndex).map(function(section) {
          var serializableSection;
          serializableSection = Object.assign({}, section);
          delete serializableSection.parent;
          delete serializableSection.component;
          delete serializableSection.subsections;
          return serializableSection;
        });
        return resolve(serializableSiteSections);
      };
      worker.onerror = function(error) {
        return Promise.reject(error);
      };
      return worker.postMessage(pages);
    });
    return promise;
  };

  startBuildingIndex = function(sections) {
    var promise;
    searchBoxElement.setAttribute("placeholder", "Building search index...");
    promise = new Promise(function(resolve, reject) {
      var worker;
      worker = new Worker("/assets/worker.js");
      worker.onmessage = function(event) {
        worker.terminate();
        return resolve(lunr.Index.load(event.data));
      };
      worker.onerror = function(error) {
        return Promise.reject(error);
      };
      return worker.postMessage(sections);
    });
    return promise;
  };

  searchOnServer = false;

  searchIndexPromise = new Promise(function(resolve, reject) {
    var req;
    req = new XMLHttpRequest();
    req.timeout = 1000;
    req.addEventListener('readystatechange', function() {
      var hierarchyPromise, ref, successResultCodes;
      if (req.readyState === 4) {
        successResultCodes = [200, 304];
        if (ref = req.status, indexOf.call(successResultCodes, ref) < 0) {
          hierarchyPromise = startBuildingHierarchy();
          return hierarchyPromise.then(function(sections) {
            var indexPromise;
            indexPromise = startBuildingIndex(sections);
            return indexPromise.then(function(searchIndex) {
              return resolve(searchIndex);
            });
          });
        } else {
          searchOnServer = true;
          return resolve('Connected to server');
        }
      }
    });
    req.open('GET', search_endpoint, true);
    req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    return req.send('');
  });

  snippetSpace = 40;

  maxSnippets = 4;

  maxResults = 10;

  translateLunrResults = function(lunrResults) {
    lunrResults.slice(0, maxResults);
    return lunrResults.map(function(result) {
      var field, fields, match, matchedDocument, position, positionIndex, positions, postMatch, preMatch, snippet, snippets, term;
      matchedDocument = sectionIndex[result.ref];
      snippets = [];
      for (term in result.matchData.metadata) {
        fields = result.matchData.metadata[term];
        for (field in fields) {
          positions = fields[field].position;
          positions = positions.slice(0, 3);
          for (positionIndex in positions) {
            position = positions[positionIndex];
            preMatch = matchedDocument[field].substring(position[0] - snippetSpace, position[0]);
            match = matchedDocument[field].substring(position[0], position[0] + position[1]);
            postMatch = matchedDocument[field].substring(position[0] + position[1], position[0] + position[1] + snippetSpace);
            snippet = '...' + preMatch + '<strong>' + match + '</strong>' + postMatch + '...  ';
            snippets.push(snippet);
            if (snippets.length >= maxSnippets) {
              break;
            }
          }
          if (snippets.length >= maxSnippets) {
            break;
          }
        }
        if (snippets.length >= maxSnippets) {
          break;
        }
      }
      return {
        title: matchedDocument.title,
        description: snippets.join(''),
        url: matchedDocument.url
      };
    });
  };

  renderSearchResults = function(searchResults) {
    var container;
    container = document.getElementsByClassName('search-results')[0];
    container.innerHTML = '';
    searchResults.forEach(function(result) {
      var description, element;
      element = document.createElement('a');
      element.classList.add('nav-link');
      element.setAttribute('href', result.url);
      element.innerHTML = result.title;
      description = document.createElement('p');
      description.innerHTML = result.description;
      element.appendChild(description);
      container.appendChild(element);
    });
  };

  renderSearchResultsFromServer = function(searchResults) {
    var container, error;
    container = document.getElementsByClassName('search-results')[0];
    container.innerHTML = '';
    if (typeof searchResults.hits === 'undefined') {
      error = document.createElement('p');
      error.innerHTML = searchResults;
      return container.appendChild(error);
    } else if (searchResults.hits.hits.length === 0) {
      error = document.createElement('p');
      error.innerHTML = 'Results matching your query were not found';
      return container.appendChild(error);
    } else {
      searchResults.hits.hits.forEach(function(result) {
        var description, element;
        element = document.createElement('a');
        element.classList.add('nav-link');
        element.setAttribute('href', result._source.url);
        element.innerHTML = result._source.title;
        description = document.createElement('p');
        description.innerHTML = "..." + result.highlight.content.join("...");
        description.innerHTML += "...";
        element.appendChild(description);
        container.appendChild(element);
      });
    }
  };

  debounce = function(func, wait, immediate) {
    var timeout;
    timeout = null;
    return function() {
      var args, callImmediately, context, later;
      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      context = this;
      later = function() {
        timeout = null;
        if (!immediate) {
          return func.apply(context, args);
        }
      };
      callImmediately = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callImmediately) {
        return func.apply(context, args);
      }
    };
  };

  createEsQuery = function(queryStr) {
    var bool_q, content_q, highlight, source, title_q;
    source = ['title', 'url'];
    title_q = {
      "match_phrase_prefix": {
        "title": {
          "query": queryStr,
          "slop": 3,
          "max_expansions": 10,
          "boost": 2
        }
      }
    };
    content_q = {
      "match_phrase_prefix": {
        "content": {
          "query": queryStr,
          "slop": 3,
          "max_expansions": 10
        }
      }
    };
    bool_q = {
      "bool": {
        "should": [title_q, content_q]
      }
    };
    highlight = {};
    highlight.require_field_match = false;
    highlight.fields = {};
    highlight.fields['content'] = {
      "fragment_size": 80,
      "number_of_fragments": 3,
      "pre_tags": ["<strong>"],
      "post_tags": ["</strong>"]
    };
    return {
      "_source": source,
      "query": bool_q,
      "highlight": highlight
    };
  };

  esSearch = function(query) {
    var esQuery, req;
    req = new XMLHttpRequest();
    req.addEventListener('readystatechange', function() {
      var ref, result, successResultCodes;
      if (req.readyState === 4) {
        successResultCodes = [200, 304];
        if (ref = req.status, indexOf.call(successResultCodes, ref) >= 0) {
          result = JSON.parse(req.responseText);
          if (typeof result.error === 'undefined') {
            return renderSearchResultsFromServer(result.body);
          } else {
            return renderSearchResultsFromServer(result.error);
          }
        } else {
          return renderSearchResultsFromServer('Error retrieving search results ...');
        }
      }
    });
    esQuery = createEsQuery(query);
    req.open('POST', search_endpoint, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    return req.send(JSON.stringify(esQuery));
  };

  lunrSearch = function(searchIndex, query) {
    var lunrResults, results;
    lunrResults = searchIndex.search(query + "~1");
    results = translateLunrResults(lunrResults);
    return renderSearchResults(results);
  };

  enableSearchBox = function(searchIndex) {
    searchBoxElement.removeAttribute("disabled");
    searchBoxElement.classList.remove('loading');
    searchBoxElement.setAttribute("placeholder", "Type here to search...");
    searchBoxElement.addEventListener('input', function(event) {
      var query, searchResults, toc;
      toc = document.getElementsByClassName('table-of-contents')[0];
      searchResults = document.getElementsByClassName('search-results')[0];
      query = searchBoxElement.value;
      if (query.length === 0) {
        searchResults.setAttribute('hidden', true);
        return toc.removeAttribute('hidden');
      } else {
        toc.setAttribute('hidden', '');
        return searchResults.removeAttribute('hidden');
      }
    });
    return searchBoxElement.addEventListener('input', debounce(function() {
      var query;
      query = searchBoxElement.value;
      if (query.length > 0) {
        if (searchOnServer) {
          return esSearch(query);
        } else {
          return lunrSearch(searchIndex, query);
        }
      }
    }, 200, !searchOnServer));
  };

  searchIndexPromise.then(function(searchIndex) {
    enableSearchBox(searchIndex);
    if (searchOnServer) {
      return startBuildingHierarchy();
    }
  });

  setSelectedAnchor = function(path) {
    var i, j, k, ref, ref1, selectedAnchors;
    selectedAnchors = document.querySelectorAll("a.nav-link.selected");
    for (i = j = 0, ref = selectedAnchors.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      selectedAnchors[i].classList.remove('selected');
    }
    if (path.endsWith('/')) {
      selectedAnchors = document.querySelectorAll("a.nav-link[href$='" + path + "']");
    } else {
      selectedAnchors = document.querySelectorAll("a.nav-link[href^='" + path + "']");
    }
    if (selectedAnchors.length > 0) {
      for (i = k = 0, ref1 = selectedAnchors.length; 0 <= ref1 ? k < ref1 : k > ref1; i = 0 <= ref1 ? ++k : --k) {
        selectedAnchors[i].classList.add('selected');
      }
      return selectedAnchors[0].parentNode.classList.add('expanded');
    }
  };

  renderToc = function(siteHierarchy) {
    var tocElement;
    tocElement = document.getElementsByClassName("table-of-contents")[0];
    tocElement.innerHTML = "";
    siteHierarchy.subsections.forEach(function(section) {
      return tocElement.appendChild(buildNav(section));
    });
    return setSelectedAnchor(window.location.pathname);
  };

  renderToc(siteHierarchy);

  main = document.getElementsByTagName("main")[0];

  menuToggle = document.getElementById("menu-toggle");

  document.body.addEventListener("click", function(event) {
    var anchor;
    anchor = event.target;
    while ((anchor != null) && anchor.tagName !== "A") {
      anchor = anchor.parentNode;
    }
    if ((anchor != null) && anchor.host === window.location.host) {
      event.preventDefault();
      event.stopPropagation();
      menuToggle.checked = false;
      history.pushState(null, null, anchor.href);
      if (anchor.hash.length > 0) {
        return window.location = anchor.hash;
      } else {
        return window.location = "#";
      }
    }
  }, true);

  window.addEventListener("popstate", function(event) {
    var page, path, testBody;
    path = window.location.pathname;
    setSelectedAnchor(path);
    page = pageIndex[path];
    testBody = new DOMParser().parseFromString(page.content, "text/html").body;
    if (main.innerHTML.trim() !== testBody.innerHTML.trim()) {
      return main.innerHTML = page.content;
    }
  });

}).call(this);
