Feature: Individual assignment for G MVT18 Testdesign
    Using aquired competences certain tasks must be completed using Selenium Webdriver at www.systembolaget.se.
    This involves finding specific spirits, checking availability, open hours and the shopping cart.

Background:
    Given that I succesfully load www.systembolaget.se
    When I confirm that I am 20 years old or above
    Then I should be presented with systembolagets main page

Scenario: Finding Anchor Steam and taste
     When I search for anchor steam
     And I click the search result
     Then the descriptive text should contain Maltig, fruktig smak med inslag av torkade aprikoser

Scenario: Finding Ballast and reporting quantity
    When I search for Ballast
    Then a report of how many articles there are should be created

