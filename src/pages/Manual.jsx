import "./Manual.css";
import manual from "../assets/manual.pdf";


function Manual() {
  return (
    <div className="manual-page">
      <div className="manual-header">
        <h1>Campus Connect Manual</h1>
        <p>
          This guide explains how to use the CampusConnect system.
        </p>
      </div>

      <div className="manual-container">

        <div className="manual-card">
          <h2>1. Register an Account</h2>
          <p>
            Create an account using your full name, student email address, student number and password. You have to agree with Terms&Services.
          </p>
        </div>

        <div className="manual-card">
          <h2>2. Report a Lost Item</h2>
          <p>
            Open the "Lost Item" form on the Lost&Found page and provide the item name,
            description, category, location on campus, date and photographs if available.
          </p>
        </div>

        <div className="manual-card">
          <h2>3. Report a Found Item</h2>
          <p>
            Open the "Found Item" form on the Lost&Found page and provide the item name,
            description, category, location on campus, date and photographs if available.
          </p>
        </div>

        <div className="manual-card">
          <h2>4. Search for Items</h2>
          <p>
            Use filters on Lost&Found page to find matching lost or found items.
          </p>
        </div>

        <div className="manual-card">
          <h2>5. Claim an Item</h2>
          <p>
            Submit a claim request by clicking an item and provide the request message.
            Administrators will review the request. It will open up a new request on your profile.
          </p>
        </div>

        <div className="manual-card">
          <h2>6. Messaging</h2>
          <p>
            Use the built-in messaging system to communicate safely with other users. To open the chat you need to click on your request.
          </p>
        </div>

        <div className="manual-card">
          <h2>7. Administration</h2>
          <p>
            Administrators can review reports, approve claims and archive cases.
          </p>
        </div>

        <div className="manual-card">
          <h2>8. Privacy</h2>
          <p>
            Personal information is protected and only visible to authorized personnel.
          </p>
        </div>

        <div className="manual-card download-card">
          <h2>Download Manual</h2>
          <p>You can download the full manual in PDF format.</p>

          <a
            href={manual}
            target="_blank"
            rel="noopener noreferrer"
            className="pdf-button"
          >
            Open PDF Manual
          </a>
        </div>

      </div>
    </div>
  );
}

export default Manual;