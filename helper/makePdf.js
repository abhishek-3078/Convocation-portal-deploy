const puppeteer = require('puppeteer');

const makePDF = async (alumni) => {
    // console.log(alumni)
    const logoUrl = 'https://upload.wikimedia.org/wikipedia/en/7/75/National_Institute_of_Technology%2C_Kurukshetra_Logo.png';
    const mainImageUrl = 'https://upload.wikimedia.org/wikipedia/en/7/75/National_Institute_of_Technology%2C_Kurukshetra_Logo.png';
    const reactLogoUrl = 'https://w7.pngwing.com/pngs/452/495/png-transparent-react-javascript-angularjs-ionic-github-text-logo-symmetry-thumbnail.png';
    const backgroundUrl = 'https://ugcounselor-content.s3.ap-south-1.amazonaws.com/wp-content/uploads/2024/04/03203527/NIT-Kurukshetra.jpg';
    const venueUrl = 'https://ugcounselor-content.s3.ap-south-1.amazonaws.com/wp-content/uploads/2024/04/03203527/NIT-Kurukshetra.jpg';
    const venueLocation="NIT Kurukshetra"
    const venueDate="16 November, 2024"
    const venueTime="10:00 AM"
    const htmlTemplate = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>19th Convocation Ceremony</title>
      <style>
          body {
              font-family: 'Georgia', serif; /* Closer to the original serif font */
              background: url('${backgroundUrl}') no-repeat center center fixed;
              background-size: cover;
              opacity: 0.92;
              margin: 0;
              padding: 0;
          }
          .container {
              width: 70%;
              margin: 50px auto;
              padding: 30px;
              background-color: rgba(255, 255, 255, 0.85);
              border-radius: 8px;
              box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
              text-align: center;
              position: relative;
          }
          .logo {
              width: 130px;
              margin: 10px auto;
          }
          h1 {
              font-size: 30px;
              font-weight: bold;
              margin-top: 10px;
          }
          h2 {
              font-size: 24px;
              font-weight: 600;
              margin: 20px 0 30px 0;
          }
          .uuid {
              position: absolute;
              top: 10px;
              right: 20px;
              font-size: 16px;
              font-weight: bold;
              color: #333;
          }
          .details {
              display: flex;
              justify-content: space-between;
              margin-top: 20px;
          }
          .text-column, .value-column, .image-column {
              width: 30%;
              text-align: left;
          }
          .text-column p, .value-column p {
              font-size: 18px;
              line-height: 1.8;
              margin: 8px 0;
              font-weight: 500;
          }
          .value-column p {
              text-align: left;
          }
          .image-placeholder img {
              width: 100%;
              height: 150px;
              object-fit: contain;
              border-radius: 8px;
              margin-top: 10px;
          }
          .venue-image img {
              width: 100%;
              height: 200px;
              object-fit: cover;
              margin-top: 30px;
              border-radius: 8px;
          }
          footer {
              margin-top: 40px;
              font-style: italic;
              font-size: 18px;
              font-weight: 400;
              color: #333;
          }
              .venue-info {
            margin-top: 30px;
            font-size: 18px;
            font-weight: 500;
            color: #333;
            text-align: center;
        }
            .combined-column {
    text-align: left; /* Align text to the left */
}

.row {
    display: flex; /* Use flexbox for alignment */
    justify-content: space-between; /* Space between key and value */
    margin-bottom: 10px; /* Space between rows */
}

.key {
    flex: 0 0 150px; /* Fixed width for keys */
    font-weight: bold; /* Make keys bold */
}

.value {
    flex: 1; /* Take remaining space for values */
    text-align: left; /* Align values to the left */
}

      </style>
  </head>
  <body>
      <div class="container">
          <div class="uuid">
  ${(alumni.alumniId ?? alumni.rollNumber).toString().padStart(4, '0')}
</div>
          <img src="${logoUrl}" alt="NIT Kurukshetra Logo" class="logo">
          <h1>National Institute of Technology Kurukshetra</h1>
          <h2 style="font-family: 'Times New Roman', serif; font-weight: 400; font-style: italic; font-size: 24px;">
              welcomes you for <br><span style="font-size: 32px; font-weight: bold;">19th Convocation Ceremony</span>
          </h2>
          <div class="details">
              <div class="combined-column">
        <div class="row">
            <strong class="key">Student’s Name:</strong>
            <span class="value">${alumni.name}</span>
        </div>
        <div class="row">
            <strong class="key">Father’s Name:</strong>
            <span class="value">${alumni.fatherName}</span>
        </div>
        <div class="row">
            <strong class="key">Batch:</strong>
            <span class="value">${alumni.batch}</span>
        </div>
        <div class="row">
            <strong class="key">Branch:</strong>
            <span class="value">${alumni.branch}</span>
        </div>
        <div class="row">
            <strong class="key">Dept.:</strong>
            <span class="value">${alumni.department ?? "N/A"}</span>
        </div>
    </div>
              <div class="image-column">
                  <div class="image-placeholder">
                      <img src="${alumni.photo}" alt="Main Image">
                  </div>
                  <div class="image-placeholder" style="height: 50px;">
                      <img src="${alumni.signature}" alt="React Logo" style="height: 100%;">
                  </div>
              </div>
          </div>
          <div class="venue-info">
            <p><strong>Venue Location:</strong> ${venueLocation}</p>
            <p><strong>Date:</strong> ${venueDate}</p>
            <p><strong>Time:</strong> ${venueTime}</p>
        </div>
          <footer>
              Let’s come together to celebrate yesterday, cherish today, and welcome tomorrow.
          </footer>
      </div>
  </body>
  </html>`;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set HTML content and wait until all resources load
  await page.setContent(htmlTemplate, { waitUntil: 'networkidle0' });

  // Generate PDF
  const pdfBuffer = await page.pdf({
    path: './admit_card_12213082.pdf',
    format: 'A4',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  await browser.close();

  return pdfBuffer

};

module.exports = makePDF;