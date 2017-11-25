## Analysis challenge

#Questions and answers

1. What do you think is wrong with this code, if anything?

- The code is poorly structured
- The code is difficult to read and uncommented
- The code is difficult to test
- Errors are not being properly handled

2.Can you see any potential problems that could lead to unexpected behaviour?

Errors are not being properly handled which could lead to unexpected behaviour - for example if server responds with status code different then 200 or 201. In addition to that, no content type is set on POST request which could lead to unexpected behaviour if the content type is wrong. Moreover, because the code is hard to test, there is a potential to errors being introduced in the future. Finally, the if statement 'if (shop.invitations.indexOf(invitationResponse.body.invitationId))' is imprecise: all numbers apart from zero coerce to 'true'. Therefore both in the situation where element doesnt exist in the array and if it exists as an element with index greater than zero, the statement will get executed which does not seem to be the desired behaviour.

3. How might you refactor this code?

- Restructure
- Write shorter functions that can be tested
- Add more error handling
- Add comments
- Add content type header
- Fix the if statement logic

An example of restructured code is inside the analysis-challenge folder.
