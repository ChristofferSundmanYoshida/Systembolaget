let {$, $$, sleep} = require('./funcs.js') // OBS !! OBS !! $ och $$ är inte 100% som de Tomas gjorde! $=element $$=elements

//diverse variabler
//kanske

let inputField, searchButton


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

  //This is here to let me show in the cucumber report the info I get from the tests. See Ballast and Kristi Himmelsfärd scenarios
this.Before(function (scenario, callback) {
    scenarioName = scenario
    callback();

  });

this.When(/^I search for anchor steam$/, async function () {
    // searches for "anchor steam"
    inputField = await driver.findElement(by.css('#ProductSearchTextInput'))
    searchButton = await driver.findElement(by.css('#ProductSearchSubmitButton'))

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

this.Then(/^the descriptive text should contain Maltig, fruktig smak med inslag av torkade aprikoser$/, async function () {
    // Grabs the text from the description and asserts it against the requirement  
    
    let descriptionAnchor = await driver.findElement(by.css('#main .product-details')).getText()

    assert(descriptionAnchor.includes('Maltig, fruktig smak med inslag av torkade aprikoser'), 'Fel öl, prova en London Pride?')

    await sleep(500) //added for visibility

  });

this.When(/^I search for Ballast$/, async function () {
    // Input ballast into the searchfield and click the search button
    
    let inputField = await driver.findElement(by.css('#ProductSearchTextInput'))
    let searchButton = await driver.findElement(by.css('#ProductSearchSubmitButton'))

    await inputField.sendKeys('ballast')
    await searchButton.click()

    await sleep(500) //added for visibility


  });

this.Then(/^a report of how many articles there are should be created$/, async function () {
    // this code will search for and grab the overall quantity and in store of Ballast and show it in a consol.log (atm)

    await sleep(500) //added for visibility

    let fullAssortment = await driver.findElement(by.css('.full-assortment .ng-binding')).getText()
    let storeAssortmentClick = await driver.findElement(by.css('.store-hits'))
    await storeAssortmentClick.click()

    await sleep(500) //needed some of the time to actually get something from .getText below

    let storeAssortment = await driver.findElement(by.css('.store-hits .ng-binding')).getText()

    // Console.log is one way to report.
    console.log('Det finns totalt ' + fullAssortment + ' flaskor i hela sortimentet, varav ' + storeAssortment + ' stycken i butik eller via ombud.')
    //This attaches the information stored in variables to the cucumber report.
    scenarioName.attach(`Det finns totalt ${fullAssortment} flaskor i hela sortimentet, varav ${storeAssortment} stycken i butik eller via ombud. `, 'text/html')  

  });

this.Given(/^that I DO NOT use the search function$/, function () {
    
    //Well, automatic pass - but it felt necessary to REALLY point out that search is not used/allowed
    
  });

this.When(/^I find the open hours for Systembolaget, Burlöv$/, async function () {
    // Click all the relevant buttons to move through the menues until you reach Burlöv, then click that too!
    await driver.findElement(by.css("#sb-header .sb-nav-container a[href*='/butiker-ombud/']")).click()

    await driver.findElement(by.css('div.col-sm-8 > div:nth-child(3) > div:nth-child(1) > ul > li:nth-child(11) > a')).click() //lös detta långa aber till platspekare

    await sleep(1500)

    await driver.findElement(by.css('div.cmp-region-info.col-sm-8 div:nth-child(1) a:nth-child(2)')).click() //lös detta långa aber till platspekare
 
  });

this.Then(/^I should confirm that it is closed during Kristi Himmelsfärd \((\d+)\/(\d+)\/(\d+)\)$/, async function (arg1, arg2, arg3) {
    // Loop through all the open hours '.pull-right' and find Kristi Himmelsfärd, save it to a variable
    // and assert it to make sure you can't buy Anchor Steam on that day...
    
    await sleep(1000) //arbitrary wait because this site is finicky

    let jesus = await '';
    let getJesusHere = await driver.findElements(by.css('.pull-right'));

    for (let elem of getJesusHere) {
      jesus = await elem.getText();
      if (jesus.includes("Kristi")) {
        break;
  
      }
    }
    //assert the information against the given correct information. If pass, well, pass.
  assert(jesus === 'Kristi himmelfärd, Stängt', 'öppet på kristi flygare? Yey, ÖL!')
    //attaches the information about kristi to the cucumber report for visibility.
  scenarioName.attach(`Information på hemsidan gällande 30/5 - 2019: ${jesus} `, 'text/html')
  console.log(jesus);

  });

this.When(/^I search for Nanny State$/, async function () {
    // Use the search field to search for Nanny State
    inputField = await driver.findElement(by.css('#ProductSearchTextInput'))
    searchButton = await driver.findElement(by.css('#ProductSearchSubmitButton'))

    await inputField.sendKeys('nanny state')
    await searchButton.click()

    await sleep(200) //added for visibility

  });

this.When(/^add it to the shopping cart$/, async function () {
    // adds Nanny State to the shopping cart

    let addToBasket = await driver.findElement(by.css('.click-area .icon-basket')) 
    await addToBasket.click()

    await sleep(500)
  });

this.When(/^navigate to the shopping cart$/, async function() {
    // goes to the shoppingcart, there are 2 .icon-basket but if you only specify one at this stage, it will allways go to cart.
    let basket = await driver.findElement(by.css('.icon-basket')) 
    await basket.click()

    //await sleep(500)
    
  });

  this.When(/^specify the store to Hansa$/, async function () {
    // Searches within the cart after a specific store.
    await sleep(500)
    let cartSearch = await driver.findElement(by.css('div .cmp-storefinder-not-selected'))
    await sleep(500)
        await cartSearch.click() 

    await sleep(500) //arbitrary sleep because page is stupid

    let storeSearchInput = await driver.findElement(by.css('#site-picker-input'))
      await storeSearchInput.sendKeys('hansa')
      await sleep(200)
      
    let hansaInTheCity = await driver.findElement(by.css('.cmp-storefinder-results-container'))
    await sleep(200)
    await hansaInTheCity.click()

  });
  
  this.Then(/^I should confirm that there are more than (\d+) bottles left$/, async function (arg1) {
    // This might be a very convoluted solution, but I had fun and tried new things.
    // It loops through the .stock classes and grabs the info when it finds "st"
    
    
    await sleep(500) //required to let all the elements load properly

    let nanny = await '';
    let getNannyHere = await driver.findElements(by.css('li.stock'));

    for (let elem of getNannyHere) {
      nanny = await elem.getText();
      if (nanny.includes('st')) {
        await sleep(100) // <- probably required, because page is stupid
        break;
  
      }
    }

    //below will manipulate the result from above loop to only show the required number.
    nannyArr = await nanny.split('')
    result = await nannyArr.slice(23, 25)
    innanSlutResultat = await result.join('')
    slutResultat = await innanSlutResultat.toString()
    console.log(slutResultat)

    assert(slutResultat > 10, 'Snart slut på Alkoholfri öl!!')

    scenarioName.attach(`det är: ${slutResultat} kvar hos Hansa i Malmö`, 'text/html')

  });

};
