dealerHand.value()
playerHand.value()
playerHand.hasAce();
playerHand.isPair
describe('stand', function(){

// Always split aces and 8s.
// Split 2s and 3s against a dealer 4-7, and against a 2 or 3 if DAS is allowed.
// Split 4s only if DAS is allowed and the dealer shows a 5 or 6.
// Split 6s against a dealer 3-6, and against a 2 if DAS is allowed.
// Split 7s against a dealer 2-7.
// Split 9s against a dealer 2-6 or 8-9.

})

describe('double', function(){

// Double hard 9 vs. dealer 3-6.
// Double hard 10 except against a dealer 10 or A.
// Double hard 11 except against a dealer A.
// Double soft 13 or 14 vs. dealer 5-6.
// Double soft 15 or 16 vs. dealer 4-6.
// Double soft 17 or 18 vs. dealer 3-6.

})

describe('hit or stand', function(){

// Always hit hard 11 or less.
// Stand on hard 12 against a dealer 4-6, otherwise hit.
// Stand on hard 13-16 against a dealer 2-6, otherwise hit.
// Always stand on hard 17 or more.
// Always hit soft 17 or less.
// Stand on soft 18 except hit against a dealer 9, 10, or A.
// Always stand on soft 19 or more.

})
