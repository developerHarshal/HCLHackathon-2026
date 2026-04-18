Credit Card Application

Tech Stack: NextJs, ReactJs, Redux.

Pages: 1. New Application Registration 2. Application Status Check
a. Status Form & Status View 3. Approver:
a. Approver Dashboard
b. View Application

1. Application Submission Form:
   - Basic details like
     Name
     Contact No. - Phone num. validation
     Email - Email Validation
     Address,
     Pan (Add Mask) and Eye Button to view,
     Occupation - Text Area,
     Annual Income,
     DOB (Date field),
     Income Proof (Files upload)

- On Application Submission,
  BE will check if Application already exists, 1. If Exists - Return existing Application No. and application Status 2. In Not exists - Create New Application and return application number
  - FE will receive Status and application number and a key saying alreadyExists.
  - If Not Exists(New Application): On success - Show Application Created message
    If Exists: Show a message saying application already Exists, It will show Application No. and message saying you can check the Application and dispatch status details here: [View Status link]

2. View Application Status Page:

   - Form that will accept - Application number, - Contact Number - Pan No. - On Submit - If Values match to the application details, Show OTP verification Screen.
     OTP Verification Popup - - Enter OTP Text box - Submit Action button - Resend OTP (with count down timer) - Security Checks - Resend OTP has 2 mins Time to avoid multiple Resends - Max Retries allowed - 3
   - Once the OTP is submitted and successful, take user to the application Status Page
     - On Status Page, show details like - Application number, - Applicant Name, Status, Reason for rejection (if rejected status) - Tracking details if Credit card Dispatched Status

3. Application Approver

1) Approver login

- Username
- Password
  - If Valid BE will send Token, Store it in cookie. Send JWT Token on authenticated requests.
  - Cookies Prefered over local storage so that we can add it with HTTP Only (JS Cannot access cookies directly)and secure cookies, SameSite=strict

2. Application Dashboard

- List of applications pending for approval
- On Click of any list item, he will be taken to the Approval form page
- Approver will view and take action against the pending applications

3. Approval Form Page

- Display application details (User Details filled during application registration) in View mode.
- Action button for fetch credit score
- On credit score fetch Successful, Enable the Approval fields.
  It will Display:
  - credit score (read only)
  - credit limit (editable with applied validations provided for credit limit)
  - Action buttons - Approve / Reject
- On Credit score fetch Error -
  - Do not Enable Approval fields, Since we have approval condition based on credit score.
  - Display the message to the user saying Error in Fetching Credit Score Retry in some time.
