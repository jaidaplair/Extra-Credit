// JavaScript code for the game

        // Variables declaration
        var score = 0; // Current score
        var timeLeft = 300; // 60 seconds countdown timer
        var intervalId; // Interval ID for managing animation
        var gameTimerId; // Timer interval ID

        // Load the laser and explosion sounds
        var laserSound = document.getElementById("laser-sound");
        var explosionSound = document.getElementById("explosion-sound");

        // Function to generate a random emoji from an array
        function generateEmoji() {
            const emojis = [
                '\u{1F47D}', // Alien Face
                '\u{1F47E}', // Alien Monster
                '\u{1F6F8}', // Extraterrestrial Alien
                '\u{1F680}', // Alien in Spaceship (Combination of rocket and alien face)
            ];

            var randomIndex = Math.floor(Math.random() * emojis.length);
            var emoji = emojis[randomIndex];
            return emoji;
        }

        // Function to create and animate an emoji
        function createEmoji() {
            // Generate a random emoji
            var emoji = generateEmoji();
            // Create a new div element for the emoji
            var emojiElement = document.createElement("div");
            // Add CSS class to the emoji element
            emojiElement.classList.add("emoji");
            // Set the emoji as the text content of the element
            emojiElement.innerText = emoji;
            // Randomly position the emoji horizontally
            emojiElement.style.left = Math.random() * 350 + "px";
            // Append the emoji element to the game container
            document.getElementById("game-container").appendChild(emojiElement);

            var speed = Math.random() * 2 + 1; // Random speed for the emoji
            var position = 0; // Initial position of the emoji

            // Animation loop
            intervalId = setInterval(function() {
                position += speed; // Update position based on speed
                emojiElement.style.right = position + "px"; // Move the emoji vertically

                // Check if emoji reached the bottom of the game container
                if (position >= 900) {
                    document.getElementById("game-container").removeChild(emojiElement); // Remove the emoji from the container
                    score--; // Decrement the score
                    explosionSound.play(); // Play explosion sound
                    updateScore(); // Update the displayed score
                    clearInterval(intervalId); // Stop the animation loop

                    // Check if game over due to low score
                    if (score <= -10) {
                        endGame("You lost!");
                    }
                }
            }, 10); // Repeat animation every 10 milliseconds

            // Add click event listener to emoji
            emojiElement.addEventListener("click", function() {
                document.getElementById("game-container").removeChild(emojiElement); // Remove the clicked emoji
                score++; // Increment the score
                laserSound.play(); // Play laser sound
                updateScore(); // Update the displayed score
                clearInterval(intervalId); // Stop the animation loop
            });
        }

        // Function to update the displayed score
        function updateScore() {
            document.getElementById("score").innerText = "Score: " + score;
        }

        // Function to handle the countdown timer
        function startTimer() {
            gameTimerId = setInterval(function() {
                timeLeft--;
                document.getElementById("timer").innerText = "Time Left: " + timeLeft + "s";

                // End game when time runs out
                if (timeLeft <= 0) {
                    clearInterval(gameTimerId); // Stop the timer
                    endGame("Time's up! Your final score is: " + score);
                }
            }, 1000); // Decrease time every 1 second
        }

        // Function to end the game
        function endGame(message) {
            clearInterval(intervalId); // Stop the animation loop
            alert(message); // Display game over message
        }

        // Start the game by calling createEmoji function repeatedly at intervals
        intervalId = setInterval(createEmoji, 2000); // Call createEmoji every 2 seconds
        startTimer(); // Start the countdown timer