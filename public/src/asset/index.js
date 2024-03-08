import geminiIcon from "./gemini_sparkle_blue_33c17e77c4ebbdd9490b683b9812247e257b6f70.svg";
import advanceGeminiIcon from "./gemini_sparkle_red_4ed1cbfcbc6c9e84c31b987da73fc4168aec8445.svg";
import avatarIcon from "./avater-icon.png";
import chatGeminiIcon from "./bard_sparkle_v2.svg";
import geminiLaoder from "./bard_sparkle_processing_v2_loader.gif";
import googleLogo from "./icons8-google-48.png";
import ytIcon from "./icons8-youtube-48.png";
import flightIcon from "./icons8-flight-64.png";
import mapIcon from "./icons8-google-maps-48.png";
import hotelIcon from "./icons8-hotel-48.png";
import sportsIcon from "./icons8-man-winner-48.png";
import googleBigIcon from "./icons8-google-144.png";

import { darkIcon } from "./darkIcon/darkIcon";
import { lightIcon } from "./lightIcon/lightIcon";

export const commonIcon = {
  geminiIcon,
  advanceGeminiIcon,
  avatarIcon,
  chatGeminiIcon,
  geminiLaoder,
  googleLogo,
  ytIcon,
  flightIcon,
  mapIcon,
  hotelIcon,
  googleBigIcon,
};

export const themeIcon = () => {
  const localTheme = localStorage.getItem("theme") || "dark";
  const icon = localTheme === "dark" ? darkIcon : lightIcon;

  return icon;
};

export const suggestPrompt = [
  {
    id: 1,
    sort: "Help me plan a game night with 5 friends for under $100 ",
    long: "Help me plan a game night with 5 friends. I have dice and cards, but no board games. I would be willing to get board games for under $100",
    icon: "ideaIcon",
  },
  {
    id: 2,
    sort: "Help write SQL to generate a report",
    long: `Given the schema below, write BigQuery compatible SQL to generate a report with the top 10 users by total price of all purchases.



CREATE TABLE users (

 id SERIAL PRIMARY KEY,

 name VARCHAR(255) NOT NULL,

 email VARCHAR(255) NOT NULL UNIQUE

);



CREATE TABLE orders (

 id SERIAL PRIMARY KEY,

 user_id INTEGER REFERENCES users (id) ON DELETE CASCADE,

 date TIMESTAMP NOT NULL,

 shipping_destination VARCHAR(255) NOT NULL,

 model_number VARCHAR(255) NOT NULL,

 price DECIMAL(10,2) NOT NULL

);
`,
    icon: "codeIcon",
  },
  {
    id: 3,
    sort: "Settle a debate: how should you store bread?",
    long: "Settle a debate: should bread be left out, refrigerated, or put in the freezer?",
    icon: "ideaIcon",
  },
  {
    id: 4,
    sort: "Help me understand American football",
    long: "Help me understand the hype and intrigue about American football. Explain as you would to someone who is new to the sport.",
    icon: "ideaIcon",
  },
  {
    id: 5,
    sort: "Suggest beautiful places to see on an upcoming road trip",
    long: "I'm doing a road trip to the U.S. Southwest in November. What are the most beautiful places to visit?",
    icon: "navigateIcon",
  },
  {
    id: 6,
    sort: "Explain the key rules of rugby, starting with the basics",
    long: "Explain the key rules of rugby. Start with the basics and go step-by-step.",
    icon: "ideaIcon",
  },
  {
    id: 7,
    sort: "Find hotels for a New Year’s trip to San Francisco",
    long: "Find hotels for a 4-day trip to San Francisco for new years eve",
    icon: "navigateIcon",
  },
  {
    id: 8,
    sort: "What are tips to improve public speaking skills?",
    long: "What are some tips to improve public speaking skills for beginners?",
    icon: "ideaIcon",
  },
  {
    id: 9,
    sort: "Write a product description for a new type of toothbrush",
    long: "I’m selling a new type of toothbrush and need a description that will help me sell it. Here are the details: it’s electric, solar powered, and has a 2-minute cleaning cycle",
    icon: "writeIcon",
  },
  {
    id: 10,
    sort: "Evaluate and rank common camera categories",
    long: "Evaluate and rank the following: film, digital, and polaroid cameras across price, photo quality, and trendiness.",
    icon: "ideaIcon",
  },
  {
    id: 11,
    sort: "Write a thank you note to my colleague",
    long: "Help me write a thank you note to my colleague for going above and beyond",
    icon: "writeIcon",
  },
  {
    id: 12,
    sort: "Recommend new types of water sports, including pros & cons",
    long: "Recommend 3-5 different types of water sports that might be a good fit for me. Include a brief overview of each sport, as well as the pros and cons of each one.",
    icon: sportsIcon,
  },
  {
    id: 13,
    sort: "Help me plan a game night with 5 friends for under $100",
    long: "Help me plan a game night with 5 friends. I have dice and cards, but no board games. I would be willing to get board games for under $100",
    icon: "writeIcon",
  },
  {
    id: 14,
    sort: "Suggest a Python library to solve a problem",
    long: "Suggest Python libraries I should use if I want to perform a k-means clustering analysis on a dataset",
    icon: "codeIcon",
  },
  {
    id: 15,
    sort: "List power words for my resume that show teamwork",
    long: "List some power words to use on my resume that show teamwork.",
    icon: "writeIcon",
  },
  {
    id: 16,
    sort: "Generate unit tests for the following C# function",
    long: `Generate four unit tests for the following C# function



CountDatesMatchingToday(List<DateTime> dates) that counts how many dates in the input list fall on the same day of the week as today. Test with an empty list,  a list with some matches, a list with no matches, and a list with all elements matching. Make sure the tests are robust and work independently of when they are run (don't hard code today's date).`,
    icon: "codeIcon",
  },
  {
    id: 17,
    sort: "Act like Mowgli from The Jungle Book and answer questions",
    long: "Act like Mowgli from The Jungle Book. Answer this question: What's your favorite memory with Baloo?",
    icon: "ideaIcon",
  },
  {
    id: 18,
    sort: "Write code for a specific task, including edge cases",
    long: "Write a Java function that takes a path as an input and creates a file storing the current system date. Consider edge cases.",
    icon: "codeIcon",
  },
  {
    id: 19,
    sort: "Draft an email with a packing list for an upcoming trip",
    long: "Draft a packing list for my weekend fishing and camping trip in Yosemite with friends. Make a table for the list, with a column for if I have the item yet or not. Draft an email with the table included.",
    icon: "writeIcon",
  },
  {
    id: 20,
    sort: "Help me get organized with a list of 10 tips",
    long: "Give me 10 tips for room organization.",
    icon: "navigateIcon",
  },
  {
    id: 21,
    sort: "Flights to Tokyo and Seoul, and things to do",
    long: "Show me flights to Tokyo and give me ideas of things to do. How about Seoul too?",
    icon: flightIcon,
  },
  {
    id: 22,
    sort: "Suggest videos to quickly solve a problem",
    long: "Find videos of how to quickly get grape juice out of a wool rug",
    icon: ytIcon,
  },
  {
    id: 23,
    sort: "Find YouTube videos with inspiring best man speeches",
    long: "Show me YouTube videos about inspiring best man speeches and give me tips on how to write my own",
    icon: ytIcon,
  },
  {
    id: 24,
    sort: "What's the time it takes to walk to several landmarks",
    long: "How long does it take to walk from Buckingham Palace to Big Ben in London? What about from Big Ben to Trafalgar Square?",
    icon: mapIcon,
  },
  {
    id: 25,
    sort: "Road trip drive time and kid entertainment ideas",
    long: "How long is the drive from Atlanta to Orlando and give me some ideas for how to keep 3 kids entertained in the car",
    icon: mapIcon,
  },
  {
    id: 26,
    sort: "Find hotels in Recoleta in Buenos Aires, and things to do",
    long: "Can you find me some hotels in the Recoleta area of Buenos Aires and suggest things to see while there?",
    icon: hotelIcon,
  },
  {
    id: 27,
    sort: "Find flights and weather for an upcoming trip",
    long: "Find flights to Miami for New Years. What's the usual temperature then?",
    icon: flightIcon,
  },
  {
    id: 28,
    sort: "Create an image of an intergalactic event",
    long: "Generate an image of a grand intergalactic bake-off, where star-forged chefs compete with otherworldly confections amidst swirling nebulae and shimmering galaxies.",
    icon: "writeIcon",
  },
];
