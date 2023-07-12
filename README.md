<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/claudiakosylak/bumble-clone-project">
    <img src="react-app/src/images/NoFlake_Logo.png" alt="Logo">
  </a>

<h3 align="center">noFlake</h3>

  <p align="center">
    noFlake is a dating site inspired by Bumble, where users can not only match with other users and start a conversation, they can schedule dates within the app and report on other users' "flaking" or "ghosting" activity culminating in that user's public "flake score" for accountability.
    <br />
    <a href="https://github.com/claudiakosylak/bumble-clone-project"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://noflake.onrender.com/">View Live Site</a>
    ·
    <a href="https://github.com/claudiakosylak/bumble-clone-project/issues">Report Bug</a>
    ·
    <a href="https://github.com/claudiakosylak/bumble-clone-project/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

![noFlake Screen Shot](./images/splash_screenshot.png)

Have you ever been disappointed with how many people flake on dating apps? This project is inspired by Bumble in its aesthetics and core matching functionality, but incorporates the ability to schedule dates and keep them accountable using the flake score.

Highlights:
* Socket.io is implemented to allow users to message each other in real time.
* Users can request dates with their existing matches, accept or reject dates, and see all of their upcoming, past and pending dates in one place.
* Users can report "ghosting" by a match at any time, as well as report on flaking activity after a date with different activities holding a different weight on that user's publicly available flake score.
* AWS S3 buckets are implemented to make the picture upload process as easy as possible.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![React][React.js]][React-url]
* ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
* ![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
* ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
* ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
* ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
* ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
* ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
* ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

1. Clone this repository

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file with your environment variables based on this example:

   SECRET_KEY=your_secret_key
   DATABASE_URL=your_db_url
   SCHEMA=your_schema_name

   S3_BUCKET=your_bucket_name
   S3_KEY=your_key
   S3_SECRET=your_secret_key

4. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

5. To set up the front end, cd into react-app in another terminal. Then install dependencies and start the app:

   ```bash
   npm install
   ```

   ```bash
   npm start
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

### Splash Page

Users are directed to the splash page where they can either choose to join the platform or sign in.

![splash-page](./images/splash_screenshot.png)

### Sign Up

Users can sign in giving their details, and must upload a primary photo for their profile to proceed.

![signup](./images/signup_screenshot.png)


### Log In

Users can log in with their credentials. They can also choose to log in as the demo user to test functionality without making an account.

![login](./images/login_screenshot.png)

### Potential Match Browse

Logged in users can browse potential matches and choose to "swipe right" or "swipe left". They can edit their age and gender preferences by clicking "filters" and applying those settings. When they match with someone who has also swiped right on them, they are notified and encouraged to start a conversation.

![match-browse](./images/potential-match-browse.gif)

### Unmessaged Matches

Logged in users can view their unmessaged matches in the carousel at the top of the left side of their screen. Clicking on the photo opens conversation view. If they message that person, they get moved to their active conversations list.

![unmessaged-matches](./images/unmessaged-matches.gif)

### Request a Date

Logged in users can request a date with their existing matches and suggest a time for them to accept or reject.

![request-date](./images/request-date.gif)

### Accept or Reject a Date

Once a match has requested a date of the user, the user can either accept or reject the date.

![accept-date](./images/accept-date.gif)

### Report on a Date

After a scheduled date has passed, a user can report negative or positive date activity that will affect the other users's flake score.

![date-report](./images/date-report.gif)

### Report Ghosting

Regardless of if there has been a scheduled date, users can always report the other user in a match as a ghoster.

![report-ghosting](./images/report-ghosting.gif)

### View all Scheduled and Pending Dates

Logged in users can view all of their scheduled and pending dates in one place by accessing their main navigation bar and clicking "Scheduled Dates".

![scheduled-dates](./images/scheduled-dates.gif)

### Edit Profile

Logged in users can edit their profile by uploading up to 6 pictures and editing their "about me" section.

![edit-profile](./images/edit-profile.gif)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [ ] An additional vertical carousel in browse view to flip through additional user pictures
- [ ] Implementing the ability for users to view other users' approximate locations and search by users within a certain radius
- [ ] Request, accept/reject and update or cancel dates all within schedule view
- [ ] View information on date reports/ghost reports you've made on other users 

See the [open issues](https://github.com/claudiakosylak/bumble-clone-project/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Claudia Kosylak - claudiakosylak@gmail.com

Project Link: [https://github.com/claudiakosylak/bumble-clone-project](https://github.com/claudiakosylak/bumble-clone-project)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/claudiakosylak/bumble-clone-project.svg?style=for-the-badge
[contributors-url]: https://github.com/claudiakosylak/bumble-clone-project/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/claudiakosylak/bumble-clone-project.svg?style=for-the-badge
[forks-url]: https://github.com/claudiakosylak/bumble-clone-project/network/members
[stars-shield]: https://img.shields.io/github/stars/claudiakosylak/bumble-clone-project.svg?style=for-the-badge
[stars-url]: https://github.com/claudiakosylak/bumble-clone-project/stargazers
[issues-shield]: https://img.shields.io/github/issues/claudiakosylak/bumble-clone-project.svg?style=for-the-badge
[issues-url]: https://github.com/claudiakosylak/bumble-clone-project/issues
[license-shield]: https://img.shields.io/github/license/claudiakosylak/bumble-clone-project.svg?style=for-the-badge
[license-url]: https://github.com/claudiakosylak/bumble-clone-project/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/claudiakosylak
[product-screenshot]: react-app/src/images/noFlake_main_screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/

