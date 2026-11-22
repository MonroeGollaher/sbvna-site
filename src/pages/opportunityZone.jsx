import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import usePageMeta from "../utils/usePageMeta";
import "../styles/opportunity-zone.css";

function OpportunityForm({ name, successMessage, buttonLabel, children }) {
  const [status, setStatus] = useState("idle");

  async function handleSubmit(event) {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const body = new URLSearchParams(new FormData(form));
    setStatus("sending");

    try {
      const response = await fetch("/opportunity-zone-forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body
      });
      if (!response.ok) throw new Error("Form submission failed");

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="oz-form-box" name={name} method="POST" onSubmit={handleSubmit}>
      <input type="hidden" name="form-name" value={name} />
      <div hidden>
        <label>Leave this blank <input name="bot-field" tabIndex={-1} autoComplete="off" /></label>
      </div>
      {children}
      <button type="submit" disabled={status === "sending"}>{buttonLabel}</button>
      <p className="oz-form-status" role="status">
        {status === "sending" && "Sending…"}
        {status === "success" && successMessage}
        {status === "error" && (
          <>We couldn’t submit the form. Please try again or email <a href="mailto:sbvnaboise@gmail.com">sbvnaboise@gmail.com</a>.</>
        )}
      </p>
    </form>
  );
}

export default function OpportunityZone() {
  usePageMeta({
    title: "Opportunity Zone",
    description: "What the federal Opportunity Zone designation means for South Boise Village, with a tract map, timeline, and answers to common questions."
  });

  const faqRef = useRef(null);
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
  }, [hash]);

  function setFaqOpen(open) {
    for (const item of faqRef.current.querySelectorAll("details")) {
      item.open = open;
    }
  }

  return (
    <article className="oz-page">
      <header className="oz-intro">
        <h1>South Boise Village and the Opportunity Zone</h1>
        <p className="oz-updated">Last updated <time dateTime="2026-11-21">November 21, 2026</time></p>
        <p className="oz-lead">A federal Opportunity Zone covering South Boise Village takes effect in 2027. Learn what it could mean for our neighborhood and how to have a voice in what comes next.</p>
      </header>

      <div className="oz-overview">
        <section>
          <h2>What's Happening</h2>
          <p>The City of Boise nominated the census tract that includes South Boise Village, the Governor’s Economic Advisory Council recommended it, and the U.S. Treasury certified it in fall 2026. The tract is one of <a href="https://commerce.idaho.gov/incentives/opportunity-zones/">25 Idaho tracts selected in this round</a>. The designation takes effect on January 1, 2027, and lasts for ten years.</p>
          <p>The South Boise Village Neighborhood Association is tracking development applications and asking the City and State what neighbors can expect.</p>

          <h2>Timeline</h2>
          <ul className="oz-timeline">
            <li><span className="oz-when">Summer 2026</span>Idaho cities and counties nominate eligible census tracts. The City of Boise nominates South Boise Village, and the Governor's Economic Advisory Council reviews the nominations.</li>
            <li><span className="oz-when">Fall 2026</span>The Governor recommends Idaho's list, and the U.S. Treasury certifies 25 Idaho tracts, including ours.</li>
            <li className="oz-current"><span className="oz-when">Now</span>The association is gathering information, tracking development applications, and seeking answers from the City and the State.</li>
            <li><time className="oz-when" dateTime="2027-01-01">January 1, 2027</time>The designation takes effect.</li>
            <li><time className="oz-when" dateTime="2036-12-31">December 31, 2036</time>The designation is scheduled to end after ten years.</li>
          </ul>
        </section>
        <section className="oz-map-section" aria-labelledby="oz-map-heading">
          <h2 id="oz-map-heading">Where Is the Opportunity Zone?</h2>
          <figure className="oz-map">
            <img
              src="/images/opportunity-zone-tract.svg"
              width="440"
              height="470"
              loading="lazy"
              alt="Map showing census tract 16001000901 extending south from Boise Avenue toward Victory Road. The South Boise Village neighborhood boundary is marked with a dashed line."
            />
            <figcaption>
              <div className="oz-map-key">
                <span className="oz-map-key__tract">Opportunity Zone tract</span>
                <span className="oz-map-key__neighborhood">South Boise Village neighborhood</span>
              </div>
              <p>The zone follows the boundaries of census tract <strong>16001000901</strong> and extends beyond the neighborhood.</p>
              <p className="oz-map-links">
                <a href="/zoning-maps/">Explore the interactive zoning map</a>
                <a href="https://www.policymap.com/embed/widget/12163/DNAOEK4MOFUIAGJCCEX7MVRX9IRWBIKG">Open Idaho Commerce’s tract map</a>
              </p>
              <p className="oz-note">In the Idaho Commerce map, select Census Tract and search for 16001000901.</p>
            </figcaption>
          </figure>
        </section>
      </div>

      <h2>What Is an Opportunity Zone?</h2>
      <p>Opportunity Zones are a federal program meant to encourage private investment in specific neighborhoods. The program offers federal tax benefits to investors who put their capital gains into businesses or real estate inside a zone.</p>
      <p>In simple terms, investors who use the program can:</p>
      <ul>
        <li><strong>Put off paying tax</strong> on gains they reinvest in the zone, for a period of years.</li>
        <li><strong>Pay less tax</strong> on that original gain if they stay invested long enough.</li>
        <li><strong>Exclude eligible investment gains</strong> if they hold the investment for 10 years or more.</li>
      </ul>
      <p>Existing buildings generally must be substantially improved to qualify when their original use did not begin with the fund or a qualifying business.</p>

      <h2>What Could It Mean for South Boise Village?</h2>
      <p>The designation could bring new interest from developers and investors. That could mean:</p>
      <ul>
        <li><strong>Possible benefits:</strong> new housing, local businesses, jobs, and neighborhood improvements.</li>
        <li><strong>Possible challenges:</strong> rising rents, higher property values and taxes, and pressure on long-time residents and small businesses.</li>
      </ul>
      <p>The effects will be different for homeowners, renters, and business owners. Nothing is set in stone, and neighborhoods that stay informed and engaged have a real say in how growth serves the people who already live here.</p>

      <h2>What the Association Is Doing</h2>
      <ul>
        <li><strong>Seeking answers from the City and the State</strong> about why our neighborhood was selected and what they expect to happen next.</li>
        <li><strong>Tracking development applications</strong> in our neighborhood on <a href="/ongoing-development/">our development tracker</a> and using our <a href="/zoning-maps/">zoning map</a> to see the association’s estimates of which lots may attract investment.</li>
        <li><strong>Advocating for the neighborhood's priorities,</strong> such as safe walking and biking connections, affordability, and space for local businesses.</li>
      </ul>

      <h2>How You Can Get Involved</h2>
      <ul>
        <li>Check our <a href="/ongoing-development/">development tracker</a> for new applications.</li>
        <li>Come to association meetings and <a href="#signup">sign up for our emails</a>.</li>
        <li>Host a yard sign for neighborhood events.</li>
        <li>Volunteer to attend city meetings and report back.</li>
        <li><a href="#ask">Send us a question</a> or contact us at <a href="mailto:sbvnaboise@gmail.com">sbvnaboise@gmail.com</a>.</li>
      </ul>

      <h2 id="faq">Frequently Asked Questions</h2>
      <div className="oz-faq" ref={faqRef}>
        <div className="oz-faq-controls">
          <button type="button" onClick={() => setFaqOpen(true)}>Expand all</button>
          <button type="button" onClick={() => setFaqOpen(false)}>Collapse all</button>
        </div>

        <details>
          <summary>Why was South Boise Village selected?</summary>
          <div className="oz-answer">
            <p>Opportunity Zones must be low-income census tracts that meet federal eligibility rules. The City of Boise nominated our tract, and the state ranked nominations partly on how likely each area was to attract investment. We've reached out to the City and the State to learn more about their reasoning and will share what we learn.</p>
          </div>
        </details>

        <details>
          <summary>Did the neighborhood have a say in the designation?</summary>
          <div className="oz-answer">
            <p>Nominations were made by cities, counties, and tribes, not by neighborhood associations. That's one reason we're working to make sure residents have a strong voice in what happens next.</p>
          </div>
        </details>

        <details>
          <summary>Is Manitou Park likely to be impacted?</summary>
          <div className="oz-answer">
            <p>We don't expect the designation itself to affect Manitou Park. Opportunity Zones offer tax benefits to private investors. They don't change zoning, sell public land, or give anyone new authority over our parks. Manitou Park is public land, and any change to how it's used would have to go through the City's public processes, such as a rezone, which include public notice and hearings. The association will keep an eye on it, and if anything were ever proposed, neighbors would have plenty of opportunity to weigh in.</p>
          </div>
        </details>

        <details>
          <summary>Is the sign at the park about the Opportunity Zone?</summary>
          <div className="oz-answer">
            <p>No. The sign at the park is from the Ada County Highway District (ACHD) and is about the Southeast Boise transportation master plan. It's a separate effort. Visit the <a href="https://engage.achdidaho.org/southeast-boise-neighborhood-transportation-plan-update">ACHD project page</a> for current updates and opportunities to give feedback.</p>
          </div>
        </details>

        <details>
          <summary>Does this change the zoning in our neighborhood?</summary>
          <div className="oz-answer">
            <p>No. The designation doesn't change zoning or land use rules. Any project still has to follow Boise's zoning code and go through the normal city review process.</p>
          </div>
        </details>

        <details>
          <summary>How is my neighborhood zoned right now?</summary>
          <div className="oz-answer">
            <p>Visit our <a href="/zoning-maps/">Zoning page</a> to see the current zoning in South Boise Village and what kinds of buildings and uses each zone allows. The Opportunity Zone designation doesn't change any of this.</p>
          </div>
        </details>

        <details>
          <summary>How do I see what projects have been proposed for my neighborhood?</summary>
          <div className="oz-answer">
            <p>There are two places to look:</p>
            <ul>
              <li><strong>The City of Boise's development tracker:</strong> Open the City map and use the neighborhood filter to find South Boise Village in the <a href="https://www.cityofboise.org/departments/planning-and-development-services/planning/zoning/maps/development-tracker/">City’s Development Tracker</a>.</li>
              <li><strong>The SBVNA development tracker:</strong> Our <a href="/ongoing-development/">development tracking page</a> pulls information from the City's Planning and Zoning website and puts it all in one place for our neighborhood. For our assessment of which lots may attract investment, see the <a href="/zoning-maps/">zoning map</a>.</li>
            </ul>
            <p>Check back regularly to see new applications and find out when public hearings are coming up.</p>
          </div>
        </details>

        <details>
          <summary>Will my property taxes go up?</summary>
          <div className="oz-answer">
            <p>The designation doesn't directly change tax rates. But if new investment raises property values, assessments may rise over time. Homeowners on fixed incomes may want to learn about Idaho's property tax relief programs.</p>
          </div>
        </details>

        <details>
          <summary>Will my rent go up?</summary>
          <div className="oz-answer">
            <p>The designation doesn't set or change rents. However, renters can be the most affected if new investment drives up demand and prices. This is a key concern the association plans to raise with the City.</p>
          </div>
        </details>

        <details>
          <summary>What tax breaks do developers and investors get, and how does it work?</summary>
          <div className="oz-answer">
            <p>The tax breaks go to investors who put capital gains, such as profits from selling stock or property, into a Qualified Opportunity Fund. That fund then invests in businesses or real estate inside a zone. Developers benefit when they invest their own gains this way, or when they raise money from investors who do.</p>
            <p>Under the current federal rules, there are three main benefits:</p>
            <ol>
              <li><strong>Deferral:</strong> Investors put off paying tax on their original gain, generally for up to five years.</li>
              <li><strong>A partial discount:</strong> If they hold the investment for at least five years, 10% of that original gain is never taxed. Rural zones get a larger discount, but South Boise Village is an urban zone.</li>
              <li><strong>Tax-free growth:</strong> After at least 10 years, investors generally can elect to exclude eligible appreciation through the 30th anniversary of their investment.</li>
            </ol>
            <p>See <a href="https://www.govinfo.gov/content/pkg/PLAW-119publ21/html/PLAW-119publ21.htm">Public Law 119-21, section 70421</a>, for the rules that apply to investments made after 2026.</p>
            <p><strong>A simplified example:</strong> An investor sells stock for a $1 million profit and puts it into an Opportunity Fund. The fund turns an old building into apartments with shops on the ground floor. Five years later, the investor pays tax on $900,000 instead of $1 million. If the building is worth $2.5 million after 10 years and they sell, the $1.5 million in growth is tax-free.</p>
            <p>Because the largest benefit requires a 10-year commitment, the program rewards long-term projects. That gives investors a reason to stay invested in the neighborhood, and it gives residents a reason to ask what each project will contribute.</p>
            <p className="oz-note">A tax professional can explain how these rules apply to an individual investment.</p>
          </div>
        </details>

        <details>
          <summary>Do residents get any tax benefits?</summary>
          <div className="oz-answer">
            <p>Only people who invest capital gains through a Qualified Opportunity Fund receive the tax benefits. Simply living or owning a home in the zone doesn't qualify you. For personal tax questions, please talk with a tax professional.</p>
          </div>
        </details>

        <details>
          <summary>Does this mean development is definitely coming?</summary>
          <div className="oz-answer">
            <p>No. The designation makes our area more attractive to certain investors, but it doesn't guarantee any project. Each project still depends on property owners, financing, and city approval.</p>
          </div>
        </details>

        <details>
          <summary>How long does the designation last?</summary>
          <div className="oz-answer">
            <p>It takes effect January 1, 2027, and lasts ten years.</p>
          </div>
        </details>

        <details>
          <summary>How can I weigh in on projects?</summary>
          <div className="oz-answer">
            <p>Watch our development tracker, sign up for our emails, attend public hearings, and come to association meetings. When a project needs a rezone, variance, or design review, the City notifies the neighborhood association and holds public hearings where anyone can comment.</p>
          </div>
        </details>

        <details>
          <summary>What should I do if an investor or developer wants to buy my property?</summary>
          <div className="oz-answer">
            <p>Once an area becomes an Opportunity Zone, some owners get unsolicited offers. There's no rush and no obligation to sell. Before signing anything, consider getting an independent appraisal, talking with a real estate attorney or trusted agent, and comparing offers. Be cautious of pressure to decide quickly.</p>
          </div>
        </details>

        <details>
          <summary>Is this the same as an urban renewal district?</summary>
          <div className="oz-answer">
            <p>No. Boise's urban renewal districts are run by the Capital City Development Corporation (CCDC) and use local property tax revenue to fund public improvements in a defined area. Opportunity Zones are a federal program that gives tax breaks to private investors. They don't redirect local taxes or create a new agency.</p>
          </div>
        </details>

        <details>
          <summary>Can local businesses benefit?</summary>
          <div className="oz-answer">
            <p>Yes, potentially. Qualified Opportunity Funds can invest in operating businesses inside the zone, not just real estate. Local business owners interested in investment may want to talk with a financial advisor. At the same time, businesses that rent their space should watch for rising commercial rents as interest in the area grows.</p>
          </div>
        </details>

        <details>
          <summary>What protections exist for renters?</summary>
          <div className="oz-answer">
            <p>The designation doesn't change renters' rights. Idaho law sets the rules for leases, notices, and evictions. Renters with questions can contact <a href="https://www.idaholegalaid.org/">Idaho Legal Aid Services</a> or the <a href="https://www.ifhcidaho.org/">Intermountain Fair Housing Council</a>. The association plans to raise renter concerns with the City.</p>
          </div>
        </details>

        <details>
          <summary>What is a community benefit agreement?</summary>
          <div className="oz-answer">
            <p>A community benefit agreement is a written commitment between a developer and the community. It can include things like affordable housing units, local hiring, space for local businesses, or public amenities. When the neighborhood association is a party to the agreement, it can be legally binding. The association may pursue these agreements for major projects in our neighborhood.</p>
          </div>
        </details>

        <details>
          <summary>Which other Boise neighborhoods were designated?</summary>
          <div className="oz-answer">
            <p>In addition to South Boise Village, Boise nominated Downtown, Shoreline, the University District, and West Boise. <a href="https://commerce.idaho.gov/incentives/opportunity-zones/">Idaho Commerce lists all five certified Boise tracts</a>.</p>
          </div>
        </details>

        <details>
          <summary>Did Boise have Opportunity Zones before, and what happened?</summary>
          <div className="oz-answer">
            <p>Yes. The program first began in 2018, and Boise had zones in that first round. We've asked the City what kinds of projects happened in those areas and what lessons apply to South Boise Village, and we'll share what we learn.</p>
          </div>
        </details>

        <details>
          <summary>Where can I learn more?</summary>
          <div className="oz-answer">
            <ul>
              <li><a href="https://commerce.idaho.gov/incentives/opportunity-zones/">Idaho Commerce: Opportunity Zones</a></li>
              <li><a href="https://www.cityofboise.org/programs/energize/project-areas/south-boise-village/">City of Boise: South Boise Village Energize Project Area</a></li>
            </ul>
          </div>
        </details>
      </div>

      <div className="oz-contact">
        <section>
          <h2 id="ask">Have a Question?</h2>
          <p>Don't see your question here? Send it to us. We'll answer it directly if you leave your email, and we may add it to this page.</p>
          <OpportunityForm name="oz-question" buttonLabel="Send question" successMessage="Thanks for sending your question.">
            <label htmlFor="q-name">Name <span className="oz-optional">(optional)</span></label>
            <input type="text" id="q-name" name="name" autoComplete="name" />
            <label htmlFor="q-email">Email <span className="oz-optional">(optional, if you'd like a reply)</span></label>
            <input type="email" id="q-email" name="email" autoComplete="email" />
            <label htmlFor="q-question">Your question</label>
            <textarea id="q-question" name="question" required />
          </OpportunityForm>
        </section>
        <section>
          <h2 id="signup">Stay Updated</h2>
          <p>Get email updates about the Opportunity Zone, development in our neighborhood, and association news.</p>
          <OpportunityForm name="oz-signup" buttonLabel="Sign up" successMessage="Thanks for signing up for updates.">
            <label htmlFor="s-name">Name</label>
            <input type="text" id="s-name" name="name" autoComplete="name" required />
            <label htmlFor="s-email">Email</label>
            <input type="email" id="s-email" name="email" autoComplete="email" required />
            <label htmlFor="s-street">Street you live on <span className="oz-optional">(optional)</span></label>
            <input type="text" id="s-street" name="street" />
          </OpportunityForm>
        </section>
      </div>
    </article>
  );
}
