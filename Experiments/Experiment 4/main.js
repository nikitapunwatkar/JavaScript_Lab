//Nikita Punwatkar 24070521175
function createPalindromeChecker() {
    var searchHistory = [];

    return function(input) {
        try {
            if (typeof input !== 'string') {
                throw new TypeError('Input must be a string.');
            }
            if (!input.replace(/^\s+|\s+$/g, '')) {
                throw new Error('Input cannot be empty.');
            }

            var cleaned = input.toLowerCase().replace(/[^a-z0-9]/g, '');
            var reversed = cleaned.split('').reverse().join('');
            var isPalindrome = cleaned === reversed;

            searchHistory.push({ original: input, result: isPalindrome });

            return "Result: " + (isPalindrome ? "Is a palindrome!" : "Is not a palindrome.") + 
                   " | History Count: " + searchHistory.length;

        } catch (error) {
            return "Error: " + error.message;
        }
    };
}

var checkPalindrome = createPalindromeChecker();

WScript.Echo("--- Palindrome Checker Terminal App ---");
WScript.StdOut.Write("Enter a word or phrase to check: ");

var userInput = WScript.StdIn.ReadLine();

WScript.Echo(checkPalindrome(userInput));
