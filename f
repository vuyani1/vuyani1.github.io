<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Feedback - VGAMES STUDIO</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="icon" href="favicon.ico" type="image/x-icon">
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Rajdhani:wght@300;500;700&display=swap" rel="stylesheet">
    <style>
        /* Additional styles specific to feedback page */
        .feedback-container {
            background: var(--glass);
            border: 1px solid var(--neon-blue);
            border-radius: 8px;
            padding: 30px;
            width: 100%;
            max-width: 800px;
            margin: 30px auto;
            box-shadow: 0 0 30px rgba(15, 240, 252, 0.2);
        }
        
        .feedback-header {
            text-align: center;
            margin-bottom: 30px;
        }
        
        .feedback-header h2 {
            font-size: 2.5rem;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        
        .feedback-header p {
            font-size: 1.2rem;
            opacity: 0.8;
        }
        
        .form-group {
            margin-bottom: 25px;
        }
        
        .form-label {
            display: block;
            margin-bottom: 10px;
            font-weight: 500;
            color: var(--neon-blue);
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .form-control {
            width: 100%;
            padding: 15px;
            background: rgba(10, 10, 18, 0.7);
            border: 2px solid var(--neon-purple);
            border-radius: 4px;
            color: white;
            font-family: 'Rajdhani', sans-serif;
            font-size: 1rem;
            transition: all 0.3s;
        }
        
        .form-control:focus {
            outline: none;
            border-color: var(--neon-blue);
            box-shadow: 0 0 15px var(--neon-blue);
        }
        
        textarea.form-control {
            min-height: 150px;
            resize: vertical;
        }
        
        .radio-group, .checkbox-group {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        
        .radio-option, .checkbox-option {
            display: flex;
            align-items: center;
            cursor: pointer;
        }
        
        .radio-option input, .checkbox-option input {
            margin-right: 10px;
            width: 20px;
            height: 20px;
            cursor: pointer;
            accent-color: var(--neon-pink);
        }
        
        .radio-option span, .checkbox-option span {
            font-size: 1.1rem;
        }
        
        .response-message {
            padding: 15px;
            border-radius: 4px;
            margin-bottom: 25px;
            display: none;
            border-left: 4px solid transparent;
        }
        
        .success-message {
            background: rgba(0, 255, 0, 0.1);
            border-color: #0f0;
            color: #0f0;
        }
        
        .error-message {
            background: rgba(255, 0, 0, 0.1);
            border-color: var(--neon-pink);
            color: var(--neon-pink);
        }
        
        .thank-you {
            text-align: center;
            padding: 40px 20px;
            display: none;
        }
        
        .thank-you h2 {
            color: var(--neon-blue);
            margin-bottom: 20px;
            font-size: 2.5rem;
            text-transform: uppercase;
        }
        
        .thank-you p {
            font-size: 1.2rem;
            margin-bottom: 30px;
        }
        
        .hidden {
            display: none;
        }
        
        /* Rating stars */
        .rating-container {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
        }
        
        .rating-star {
            font-size: 2rem;
            color: #333;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .rating-star:hover,
        .rating-star.active {
            color: var(--neon-pink);
            text-shadow: 0 0 10px var(--neon-pink);
        }
    </style>
</head>
<body>
    <div id="particles-js"></div>
    
    <div class="container">
        <img src="vgg.png" alt="VGAMES Logo" class="logo">
        
        <div class="feedback-container">
            <div class="feedback-header">
                <h2 class="neon-text">FEEDBACK</h2>
                <p class="cyberpunk">Help us improve your gaming experience</p>
            </div>
            
            <div id="feedbackForm">
                <form action="https://formsubmit.co/vuyaniphila86@gmail.com" method="POST" id="vgamesFeedbackForm">
                    <input type="hidden" name="_subject" value="New Feedback from VGAMES Website">
                    <input type="hidden" name="_template" value="table">
                    <input type="hidden" name="_next" value="https://vgames.run.place/feedback-thank-you.html">
                    <input type="hidden" name="_captcha" value="false">
                    
                    <div class="form-group">
                        <label for="feedbackType" class="form-label">Feedback Type</label>
                        <select id="feedbackType" name="Feedback Type" class="form-control" required>
                            <option value="" disabled selected>Select feedback type</option>
                            <option value="Bug Report">Bug Report</option>
                            <option value="Feature Request">Feature Request</option>
                            <option value="General Feedback">General Feedback</option>
                            <option value="Complaint">Complaint</option>
                            <option value="Praise">Praise</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="gameSelect" class="form-label">Game (if applicable)</label>
                        <select id="gameSelect" name="Game" class="form-control">
                            <option value="" selected>Select a game</option>
                            <!-- Games will be populated by JavaScript -->
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Rating</label>
                        <div class="rating-container">
                            <div class="rating-star" data-value="1">★</div>
                            <div class="rating-star" data-value="2">★</div>
                            <div class="rating-star" data-value="3">★</div>
                            <div class="rating-star" data-value="4">★</div>
                            <div class="rating-star" data-value="5">★</div>
                        </div>
                        <input type="hidden" id="ratingValue" name="Rating" value="">
                    </div>
                    
                    <div class="form-group">
                        <label for="feedbackText" class="form-label">Your Feedback</label>
                        <textarea id="feedbackText" name="Feedback" class="form-control" required placeholder="Please describe your feedback in detail..."></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label for="userEmail" class="form-label">Email (optional)</label>
                        <input type="email" id="userEmail" name="Email" class="form-control" placeholder="If you'd like us to follow up with you">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Can we contact you about this feedback?</label>
                        <div class="radio-group">
                            <label class="radio-option">
                                <input type="radio" name="Contact Permission" value="Yes" checked>
                                <span>Yes</span>
                            </label>
                            <label class="radio-option">
                                <input type="radio" name="Contact Permission" value="No">
                                <span>No</span>
                            </label>
                        </div>
                    </div>
                    
                    <div id="bugReportFields" class="hidden">
                        <div class="form-group">
                            <label for="bugDescription" class="form-label">Bug Details</label>
                            <textarea id="bugDescription" name="Bug Details" class="form-control" placeholder="Steps to reproduce the bug, what happened vs what you expected..."></textarea>
                        </div>
                        
                        <div class="form-group">
                            <label for="deviceInfo" class="form-label">Device Information</label>
                            <input type="text" id="deviceInfo" name="Device Info" class="form-control" placeholder="Device, OS, browser (if web game)...">
                        </div>
                    </div>
                    
                    <div id="featureRequestFields" class="hidden">
                        <div class="form-group">
                            <label for="featureDescription" class="form-label">Feature Details</label>
                            <textarea id="featureDescription" name="Feature Details" class="form-control" placeholder="Describe the feature you'd like to see..."></textarea>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">How important is this feature?</label>
                            <div class="radio-group">
                                <label class="radio-option">
                                    <input type="radio" name="Feature Importance" value="Nice to have">
                                    <span>Nice to have</span>
                                </label>
                                <label class="radio-option">
                                    <input type="radio" name="Feature Importance" value="Important">
                                    <span>Important</span>
                                </label>
                                <label class="radio-option">
                                    <input type="radio" name="Feature Importance" value="Critical">
                                    <span>Critical - I'd use it all the time</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    
                    <div class="response-message" id="responseMessage"></div>
                    
                    <button type="submit" class="btn btn-games" style="width: 100%; padding: 15px; font-size: 1.2rem;">
                        SUBMIT FEEDBACK
                    </button>
                </form>
            </div>
            
            <div id="thankYouMessage" class="thank-you hidden">
                <h2 class="neon-text">THANK YOU!</h2>
                <p class="cyberpunk">Your feedback helps us create better gaming experiences</p>
                <p>We appreciate you taking the time to share your thoughts with us.</p>
                <button id="newFeedbackBtn" class="btn btn-about">Submit New Feedback</button>
            </div>
        </div>
    </div>

    <!-- Font Awesome for icons -->
    <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>
    <!-- Particles.js -->
    <script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script>
    
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            particlesJS("particles-js", {
                particles: {
                    number: { value: 80, density: { enable: true, value_area: 800 } },
                    color: { value: "#0ff0fc" },
                    shape: { type: "circle" },
                    opacity: { value: 0.5, random: true },
                    size: { value: 3, random: true },
                    line_linked: { enable: true, distance: 150, color: "#0ff0fc", opacity: 0.4, width: 1 },
                    move: { enable: true, speed: 3, direction: "none", random: true, straight: false, out_mode: "out" }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: { enable: true, mode: "repulse" },
                        onclick: { enable: true, mode: "push" }
                    }
                }
            });
            
            const feedbackForm = document.getElementById('vgamesFeedbackForm');
            const feedbackType = document.getElementById('feedbackType');
            const bugReportFields = document.getElementById('bugReportFields');
            const featureRequestFields = document.getElementById('featureRequestFields');
            const gameSelect = document.getElementById('gameSelect');
            const ratingStars = document.querySelectorAll('.rating-star');
            const ratingValue = document.getElementById('ratingValue');
            const responseMessage = document.getElementById('responseMessage');
            const feedbackSection = document.getElementById('feedbackForm');
            const thankYouSection = document.getElementById('thankYouMessage');
            const newFeedbackBtn = document.getElementById('newFeedbackBtn');
            
            async function loadGames() {
                try {
                    const [localGames, externalGames] = await Promise.all([
                        fetch('games.json').then(res => res.json()),
                        fetch('https://www.onlinegames.io/media/plugins/genGames/embed.json').then(res => res.json())
                    ]);
                    
                    const allGames = [...localGames, ...externalGames];
                    const uniqueGames = allGames.filter((game, index, self) =>
                        index === self.findIndex(g => g.title === game.title)
                    );
                    
                    uniqueGames.forEach(game => {
                        const option = document.createElement('option');
                        option.value = game.title;
                        option.textContent = game.title;
                        gameSelect.appendChild(option);
                    });
                } catch (error) {
                    console.error('Error loading games:', error);
                }
            }
            
            feedbackType.addEventListener('change', function() {
                const type = this.value;
                
                bugReportFields.classList.add('hidden');
                featureRequestFields.classList.add('hidden');
                
                if (type === 'Bug Report') {
                    bugReportFields.classList.remove('hidden');
                } else if (type === 'Feature Request') {
                    featureRequestFields.classList.remove('hidden');
                }
            });
            
            ratingStars.forEach(star => {
                star.addEventListener('click', function() {
                    const value = parseInt(this.getAttribute('data-value'));
                    ratingValue.value = value;
                    
                    ratingStars.forEach((s, index) => {
                        if (index < value) {
                            s.classList.add('active');
                        } else {
                            s.classList.remove('active');
                        }
                    });
                });
                
                star.addEventListener('mouseover', function() {
                    const value = parseInt(this.getAttribute('data-value'));
                    ratingStars.forEach((s, index) => {
                        if (index < value) {
                            s.classList.add('hover');
                        } else {
                            s.classList.remove('hover');
                        }
                    });
                });
                
                star.addEventListener('mouseout', function() {
                    ratingStars.forEach(s => s.classList.remove('hover'));
                });
            });
            
            feedbackForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                if (!feedbackType.value) {
                    showResponse('Please select a feedback type', 'error');
                    return;
                }
                
                if (!feedbackText.value.trim()) {
                    showResponse('Please provide your feedback', 'error');
                    return;
                }
                
                if (feedbackType.value === 'Bug Report' && !bugDescription.value.trim()) {
                    showResponse('Please describe the bug in detail', 'error');
                    return;
                }
                
                feedbackSection.classList.add('hidden');
                thankYouSection.classList.remove('hidden');
                

            });
            
            newFeedbackBtn.addEventListener('click', function() {
                feedbackSection.classList.remove('hidden');
                thankYouSection.classList.add('hidden');
                feedbackForm.reset();
                ratingStars.forEach(star => star.classList.remove('active'));
                ratingValue.value = '';
            });
            
            function showResponse(message, type) {
                responseMessage.textContent = message;
                responseMessage.className = 'response-message ' + type + '-message';
                responseMessage.style.display = 'block';
                
                setTimeout(() => {
                    responseMessage.style.display = 'none';
                }, 5000);
            }
            
            loadGames();
            
            const logo = document.querySelector('.logo');
            if (logo) {
                logo.addEventListener('mouseover', () => {
                    logo.classList.add('glitch-effect');
                    setTimeout(() => logo.classList.remove('glitch-effect'), 500);
                });
            }
        });
    </script>
</body>
</html>
