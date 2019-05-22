




module.exports = function () {

//Background
this.Given(/^that I succesfully load www\.systembolaget\.se$/, async function () {
    await helpers.loadPage('https://systembolaget.se')
  });

this.When(/^I confirm that I am (\d+) years old or above$/, function (blaargh) {


  });

this.Then(/^I should be presented with systembolagets main page$/, function () {


  });

};