function Question(text, category){
  this.text = text;
  this.category = category;
}

function Ingredient(name, category){
  this.name = name;
  this.category = category;
}

function Pantry(ingredients){
  this.ingredients = ingredients;
}

var QUESTIONS = [
   new Question('Do ye like yer drinks strong?', 'strong'),
   new Question('Do ye like it with a salty tang?', 'salty'),
   new Question('Are ye a lubber who likes it bitter?', 'bitter'),
   new Question('Would ye like a bit of sweetness with yer poison?', 'sweet'),
   new Question('Are ye one for a fruity finish?', 'fruity')
];

var myPantry = new Pantry(
  [
    new Ingredient('glug of Rum', 'strong'),
    new Ingredient('slug of Whiskey', 'strong'),
    new Ingredient('splash of Gin', 'strong'),
    new Ingredient('olive on a stick', 'salty'),
    new Ingredient('salt-dusted rim', 'salty'),
    new Ingredient('rasher of bacon', 'salty'),
    new Ingredient('shake of bitters', 'bitter'),
    new Ingredient('splash of tonic', 'bitter'),
    new Ingredient('twist of lemon peel', 'bitter'),
    new Ingredient('sugar cube', 'sweet'),
    new Ingredient('spoonful of honey', 'sweet'),
    new Ingredient('splash of Cola', 'sweet'),
    new Ingredient('slick of orange', 'fruity'),
    new Ingredient('dash of cassis', 'sweet'),
    new Ingredient('cherry on top', 'sweet')
  ]
);

/********************
 * START: VIEW Class
 ********************/
function View(){
}

View.prototype.templates = function(template){
  switch(template){
    case 'question':
      return `
        <h3>${this.text}</h3>
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-6">
              <div class="user-answer" id="user-answer-true">YES</div>
            </div>
            <div class="col-sm-6">
              <div class="user-answer" id="user-answer-false">NO</div>
            </div>
          </div>
        </div>
      `;
  }
};

View.prototype.render = function(el, template, data) {
  var html = this.templates.call(data, template)
  el.html(html);
};

/********************
 * END: VIEW CLASS
 ********************/

var view = new View();

view.render($('.question'), 'question', {text: QUESTIONS[0].text});


$(function(){
  
});

