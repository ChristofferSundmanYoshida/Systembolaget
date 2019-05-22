let {$, $$, sleep} = require('./funcs.js')

//diverse variabler




module.exports = function () {

    // !! BACKGROUND !! BACKGROUND !! BACKGROUND !!

this.Given(/^that I succesfully load www\.systembolaget\.se$/, async function () {
    // Loads systembolaget.se
    await helpers.loadPage('https://systembolaget.se')

  });

this.When(/^I confirm that I am (\d+) years old or above$/, async function (arg1) {
    // Clicks the button to confirm webdriver is above 20 years old
    let confirm20 = await $('#modal-agecheck button.action')
    await confirm20.click()

    await sleep(500) //added for visibility

  });

this.Then(/^I should be presented with systembolagets main page$/, async function () {
    // Assert against an element that only exist after passing previous step to make sure this is the main page
    let mainpageCheck = await driver.findElement(by.css('#sb-header .login span')).getText()

    assert(mainpageCheck === "LOGGA IN", 'You are not on the main page')

  });

  // !! END OF BACKGROUND !! END OF BACKGROUND !! END OF BACKGROUND

this.When(/^I search for "([^"]*)"$/, async function (arg1) {
    // searches for "anchor steam"
    let inputField = await driver.findElement(by.css('#ProductSearchTextInput'))
    let searchButton = await driver.findElement(by.css('#ProductSearchSubmitButton'))

    await inputField.sendKeys('anchor steam')
    await searchButton.click()

    await sleep(500) //added for visibility
   
  });

this.When(/^I click the search result$/, async function () {
    // Clicks the anchor beer
    
    let anchor = await driver.findElement(by.css("#main .elm-product-list-item-full-info"))
    await anchor.click()

    await sleep(500) //added for visibility

  });    

this.Then(/^the descriptive text should contain "([^"]*)"$/, async function (arg1) {
    // Grabs the text from the description and asserts it against the requirement  
    
    let descriptionAnchor = await driver.findElement(by.css('#main .product-details')).getText()

    assert(descriptionAnchor.includes('Maltig, fruktig smak med inslag av torkade aprikoser'), 'Fel öl, prova en London Pride?')



  });

};

