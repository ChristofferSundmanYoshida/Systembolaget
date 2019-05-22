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

Scenario: Without using search confirming open hours in a specific store
     Given that I DO NOT use the search function
     When I find the open hours for Systembolaget, Burlöv 
     Then I should confirm that it is closed during Kristi Himmelsfärd (05/30/2019)

Scenario: Confirming set quantity of "Nanny State" at a specific store
    When I search for Nanny State
    And add it to the shopping cart
    And navigate to the shopping cart
    And specify the store to Hansa
    Then I should confirm that there are more than 10 bottles left

