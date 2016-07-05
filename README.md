# alphaPongRevised

The aim of the project was to reinvent the well-known arcade video game Pong. The game is one of the earliest arcade games where each player is presented with a two-dimensional ping-pong-like arena. The main aim is to defeat an opponent in a simulated table-tennis game by earning a higher score. This project aimed to meet these requirements of the game whilst also incorporating additional features and graphics effectively placing a modern twist on the retro game.

##Project Web 2.0 Features
Interactivity: Paddles controlled via JavaScript logic and HTML5 Canvas libraries
Interoperability with dual players plus spectators: 2 player game and any other clients connected are spectators
Using standardized technologies such as html5 and JavaScript: Allow for easy design and implementation and simplicity in the code
Modularity and portability: The site can run on many different systems and browsers and can be easily changed or have classes swapped out if need be

##Features Implemented

The completed project was able to implement a working two-dimensional table-tennis arena with multiplayer ability via network connection. The following outlines the extra features that were achieved in the design phase of this project.

1. A two-dimensional table tennis arena
2. Event driven, user controlled paddles via keyboard and mouse input
3. Multiplayer support via network connection
    - Player1hosts,player2join
    - Server is an intermediate between the two
    - Server controls what data is sent where to cut down on lag 
    - Spectator mode for a 3rd client to connect to
4. Simulated ball physics implementing table-tennis-like rules
5. Game effects
  - PerformancePenalty:Speedofballincreaseswithgameprogress
  - Comet Tail: Ball has comet tail showing path, the tail increases as the speed increases 
6. Scoring system to track game progress
7. Heads Up Display to display messages to the players
8. Power ups
    - Fast-ball:Speedofballtemporarilyincreases 
    - Multi-ball: ball divides by 3
