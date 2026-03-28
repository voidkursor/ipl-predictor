const teams = {
    CSK: ["Ruturaj Gaikwad", "MS Dhoni", "Sanju Samson", "Dewald Brevis", "Ayush Mhatre", "Sarfaraz Khan", "Shivam Dube", "Anshul Kamboj", "Jamie Overton", "Matthew Short", "Khaleel Ahmed", "Noor Ahmad", "Nathan Ellis", "Rahul Chahar", "Shreyas Gopal", "Matt Henry"],
    MI: ["Rohit Sharma", "Suryakumar Yadav", "Hardik Pandya", "Tilak Varma", "Ryan Rickelton", "Quinton de Kock", "Sherfane Rutherford", "Will Jacks", "Mitchell Santner", "Shardul Thakur", "Jasprit Bumrah", "Trent Boult", "Deepak Chahar", "Naman Dhir", "Corbin Bosch"],
    RCB: ["Virat Kohli", "Rajat Patidar", "Phil Salt", "Devdutt Padikkal", "Jitesh Sharma", "Tim David", "Krunal Pandya", "Venkatesh Iyer", "Jacob Bethell", "Romario Shepherd", "Bhuvneshwar Kumar", "Josh Hazlewood", "Yash Dayal", "Nuwan Thushara", "Vicky Ostwal"],
    KKR: ["Ajinkya Rahane", "Angkrish Raghuvanshi", "Rinku Singh", "Cameron Green", "Rovman Powell", "Finn Allen", "Rahul Tripathi", "Rachin Ravindra", "Sunil Narine", "Varun Chakravarthy", "Matheesha Pathirana", "Harshit Rana", "Akash Deep", "Umran Malik", "Vaibhav Arora"],
    SRH: ["Travis Head", "Ishan Kishan", "Heinrich Klaasen", "Abhishek Sharma", "Nitish Kumar Reddy", "Liam Livingstone", "Kamindu Mendis", "Harshal Patel", "Brydon Carse", "Pat Cummins", "Jaydev Unadkat", "Shivam Mavi", "Zeeshan Ansari", "Harsh Dubey", "Jack Edwards"],
    DC: ["KL Rahul", "Prithvi Shaw", "David Miller", "Ben Duckett", "Axar Patel", "Nitish Rana", "Sameer Rizvi", "Kuldeep Yadav", "Mitchell Starc", "T Natarajan", "Mukesh Kumar", "Lungi Ngidi", "Kyle Jamieson", "Tristan Stubbs", "Karun Nair"],
    PBKS: ["Shikhar Dhawan", "Prabhsimran Singh", "Josh Inglis", "Nehal Wadhera", "Shreyas Iyer", "Marcus Stoinis", "Glenn Maxwell", "Arshdeep Singh", "Kagiso Rabada", "Yuzvendra Chahal", "Xavier Bartlett", "Azmatullah Omarzai", "Harpreet Brar", "Lockie Ferguson", "Suryansh Shedge"],
    RR: ["Sanju Samson", "Yashasvi Jaiswal", "Jos Buttler", "Riyan Parag", "Dhruv Jurel", "Shimron Hetmyer", "Rovman Powell", "Ravichandran Ashwin", "Trent Boult", "Sandeep Sharma", "Avesh Khan", "Wanindu Hasaranga", "Kuldeep Sen", "Kunal Rathmore", "Akash Vasisht"],
    GT: ["Shubman Gill", "Jos Buttler", "David Miller", "Wriddhiman Saha", "Shahrukh Khan", "Rashid Khan", "Rahul Tewatia", "Mohammed Siraj", "Kagiso Rabada", "Spencer Johnson", "Noor Ahmad", "Prasidh Krishna", "Darshan Nalkande", "Sai Kishore", "Jayant Yadav"],
    LSG: ["Rishabh Pant", "Aiden Markram", "Mitchell Marsh", "Nicholas Pooran", "Josh Inglis", "Abdul Samad", "Shahbaz Ahmed", "Ravi Bishnoi", "Avesh Khan", "Mohsin Khan", "Akash Deep", "Matthew Breetzke", "Himmat Singh", "Arshin Kulkarni", "Mark Wood"]
};
const matches = [
    {
        id: 1,
        team1: "Royal Challengers Bengaluru",
        team2: "Sunrisers Hyderabad",
        date: "2026-03-28",
        time: "19:30",
        venue: "M Chinnaswamy Stadium, Bengaluru",
        short1: "RCB",
        short2: "SRH" ,
        squad :{team1 : teams.RCB , team2: teams.SRH}
    },
    {
        id: 2,
        team1: "Mumbai Indians",
        team2: "Kolkata Knight Riders",
        date: "2026-03-29",
        time: "19:30",
        venue: "Wankhede Stadium, Mumbai",
        short1: "MI",
        short2: "KKR",
        squad :{team1: teams.MI , team2: teams.KKR}
    },
    {
        id: 3,
        team1: "Chennai Super Kings",
        team2: "Mumbai Indians",
        date: "2026-03-24",
        time: "19:30",
        venue: "MA Chidambaram Stadium, Chennai",
        short1: "CSK",
        short2: "MI",
        squad :{team1: teams.CSK , team2: teams.MI}
    },
    {
        id: 4,
        team1: "Delhi Capitals",
        team2: "Punjab Kings",
        date: "2026-03-25",
        time: "19:30",
        venue: "Arun Jaitley Stadium, Delhi",
        short1: "DC",
        short2: "PBKS",
        squad : {team1: teams.DC , team2: teams.PBKS}
    },
    {
        id: 5,
        team1: "Gujarat Titans",
        team2: "Lucknow Super Giants",
        date: "2026-03-26",
        time: "19:30",
        venue: "Narendra Modi Stadium, Ahmedabad",
        short1: "GT",
        short2: "LSG",
        squad : {team1: teams.GT , team2: teams.LSG}
    }
];

export default matches;