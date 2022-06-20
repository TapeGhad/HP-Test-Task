# HP-Test-Task
HP Test Task

Task 1 (back and front folders).

BACK: Nodejs, Express, TS, Jest
FRONT: Vue3, TS, Vite, Pinia, Vuetify-3, Vitest

Link for a first task: https://hp-test-front.herokuapp.com/ (takes a while to build & show)
![image](https://user-images.githubusercontent.com/61677623/174615917-b7a981af-7e8a-423a-900a-159759dbb0b9.png)

Task 2 (review)

Q/A
1. Used var (old type, let or const prefered to use). Lack of destruction. To much callbacks used, makes code unreadable.
2. If there is no shopId in request, would be exeption in `Shop.findById`. Same with invitationBody, it should be checked before sending it to another API via `superagent`
3. - Minimum use of callbacks, async/await can help in some places.
	- Add checks and move some logic to separate functions.
	- Add checks to avoid exceptions
	- Return either required data or errors, no empty return.
4. Spread (...) operator can be used. Let - Const. Arrow Functions. Async Await