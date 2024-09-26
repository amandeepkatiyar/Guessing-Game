require([
    'jquery', 
    'Magento_Ui/js/modal/modal',
    'mage/translate'
], function($, modal, $t) {
    var options = {
        type: 'popup',
        responsive: true,
        innerScroll: true,
        title: $t('Guess the Number'),
        modalClass: 'guessing-game_modal',
        buttons: false
    };

    $(document).ready(function() {
        const guessModal = $('#guessing-modal');
        const openModalButton = $('#open-modal');
        const guessButton = $('#guess-button');
        const resetButton = $('#reset-button');
        const closeButton =$('.action-close');
        const guessInput = $('#guess-input');
        const feedbackMessage = $('#feedback-message');
        const historyMessage = $('#history-message');

        var popup = modal(options, guessModal);
        
        openModalButton.on('click',function(){ 
            guessModal.modal("openModal");
        });

        let randomNumber = Math.floor(Math.random() * 50) + 1;
        let guesses = [];
        console.log('randomNumber', randomNumber);
        // Guess button action
        guessButton.on('click', function() {
            const userGuess = Number(guessInput.val());
            if (userGuess < 1 || userGuess > 50) {
                feedbackMessage.text($t('Please enter a number between 1 and 50.'));
                return;
            }

            guesses.push(userGuess);
            if (userGuess < randomNumber) {
                feedbackMessage.text($t('The number entered was below the random number.')).addClass('error').removeClass('success');
                guessInput.val(''); // Clear input field
            } else if (userGuess > randomNumber) {
                feedbackMessage.text($t('The number entered was above the random number.')).addClass('error').removeClass('success');
                guessInput.val(''); // Clear input field
            } else {
                feedbackMessage.text($t('Congratulations! You guessed the number!')).addClass('success').removeClass('error');
                historyMessage.html($t('Your guesses:') + '<strong>' + guesses.join('</strong>, <strong>') + '</strong>');
                historyMessage.find('strong').last().addClass('highlight');
                // Reset game
                guesses = [];
                guessInput.val(''); // Clear input field
                randomNumber = Math.floor(Math.random() * 50) + 1;
                console.log('randomNumber', randomNumber);
            }
        });

        // Reset button action
        resetButton.on('click', function() {
            resetGame(); // Reset the game state
        });

        // Optional: Reset fields when clicking cross icon
        closeButton.on('click', function() {
                resetGame(); // Reset the game state
        });

        // Close modal and reset game
        $(document).on('click', function(event) {
            if (!$(event.target).closest('#guessing-modal, #open-modal').length) {
                resetGame(); // Reset the game state
            }
        });

        // Function to reset game state
        function resetGame() {
            guesses = [];
            randomNumber = Math.floor(Math.random() * 50) + 1;
            console.log('randomNumber = ', randomNumber);
            guessInput.val(''); // Clear input field
            feedbackMessage.empty('').removeClass('error success'); // Clear feedback message
            historyMessage.empty(''); // Clear history message
        }
    });
});
