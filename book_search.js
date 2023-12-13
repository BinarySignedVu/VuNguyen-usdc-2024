// "/** 
//  * RECOMMENDATION
//  * 
//  * To test your code, you should open "tester.html" in a web browser.
//  * You can then use the "Developer Tools" to see the JavaScript console.
//  * There, you will see the results unit test execution. You are welcome
//  * to run the code any way you like, but this is similar to how we will
//  * run your code submission.
//  * 
//  * The Developer Tools in Chrome are available under the "..." menu, 
//  * futher hidden under the option "More Tools." In Firefox, they are 
//  * under the hamburger (three horizontal lines), also hidden under "More Tools." 
//  */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
function findSearchTermInBooks(searchTerm, scannedTextObj) {
    var result = {
        "SearchTerm": "",
        "Results": []
    };

    // Update the SearchTerm in the result object with the actual searchTerm
    result.SearchTerm = searchTerm;

    // Check if the search term is empty
    if (searchTerm === "") {
        // If search term is empty, return the result with the empty Results array
        return result;
    }

    // Iterate over each book in the scannedTextObj array
    for (let i = 0; i < scannedTextObj.length; i++) {
        let book = scannedTextObj[i];

        // Iterate over each content block in the current book
        for (let j = 0; j < book.Content.length; j++) {
            let content = book.Content[j];
            let sentence = content.Text;

            // Check if the current sentence contains the search term
            if (sentence.indexOf(searchTerm) >= 0) {
                // If the search term is found 
                //push the location information to Results array (result object)
                result.Results.push({
                    "ISBN": book.ISBN,
                    "Page": content.Page,
                    "Line": content.Line
                });
            }
        }
    }

    // Return the result object with updated SearchTerm and Results
    return result;
}






/** Example input object. */
const twentyLeaguesIn = 
[
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": 
        [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]
    
/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}


//------------------------Case Sensitivity Test output---------------------------------------------------

const expectedCaseSensitiveResult = {
    "SearchTerm": "The",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
};

const caseTestResultSensitive = findSearchTermInBooks("The", twentyLeaguesIn); // Use a search term with different letter casing

if (JSON.stringify(expectedCaseSensitiveResult) === JSON.stringify(caseTestResultSensitive)) {
    console.log("PASS: Case Sensitivity Test for 'The'");
    console.log(JSON.stringify(findSearchTermInBooks("the", twentyLeaguesIn)));
} else {
    console.log("FAIL: Case Sensitivity Test for 'The'");
    console.log("Expected:", JSON.stringify(expectedCaseSensitiveResult));
    console.log("Received:", JSON.stringify(caseTestResultSensitive));
}




//------------------------Empty String Test---------------------------------------------------

const expectedEmptyStringResult = {
    "SearchTerm": "",
    "Results": [] // Assuming no matches are expected for an empty search term
};


const emptyStringTestResult = findSearchTermInBooks("", twentyLeaguesIn);

if (JSON.stringify(expectedEmptyStringResult) === JSON.stringify(emptyStringTestResult)) {
    console.log("PASS: Empty String Test");
} else {
    console.log("FAIL: Empty String Test");
    console.log("Expected:", JSON.stringify(expectedEmptyStringResult));
    console.log("Received:", JSON.stringify(emptyStringTestResult));
}




//------------------------No Match Test---------------------------------------------------

const expectedNoMatchResult = {
    "SearchTerm": "unicorn",
    "Results": [] // Expecting an empty array since "unicorn" should not be in the text
};

const noMatchTestResult = findSearchTermInBooks("unicorn", twentyLeaguesIn);

if (JSON.stringify(expectedNoMatchResult) === JSON.stringify(noMatchTestResult)) {
    console.log("PASS: No Match Found");
} else {
    console.log("FAIL: Match Test");
    console.log("Expected:", JSON.stringify(expectedNoMatchResult));
    console.log("Received:", JSON.stringify(noMatchTestResult));
}




//------------------------Match Test---------------------------------------------------

const expectedMatchResult = {
    "SearchTerm": "momentum",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 8
        }
    ]
};

// Match Test
const matchTestResult = findSearchTermInBooks("momentum", twentyLeaguesIn);

if (JSON.stringify(expectedMatchResult) === JSON.stringify(matchTestResult)) {
    console.log("PASS: Match Test");
} else {
    console.log("FAIL: Match Test");
    console.log("Expected:", JSON.stringify(expectedMatchResult));
    console.log("Received:", JSON.stringify(matchTestResult));
}





