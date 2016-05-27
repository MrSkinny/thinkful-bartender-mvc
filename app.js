var QUESTIONS = [
   new Question('Do ye like yer drinks strong?', 'strong'),
   new Question('Do ye like it with a salty tang?', 'salty'),
   new Question('Are ye a lubber who likes it bitter?', 'bitter'),
   new Question('Would ye like a bit of sweetness with yer poison?', 'sweet'),
   new Question('Are ye one for a fruity finish?', 'fruity')
];

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
 * START: Bartender Class
 ********************/
function Bartender(questions){
  this.running = false;
  this.questions = questions;
  this.currQ = null;
  this.userPreferences = {};
}

Bartender.prototype.startQuestions = function(){
  var q;
  
  this.running = true;
  this.currQ = 0;
  q = this.questions[this.currQ];  
  
  return {
    text: q.text,
    category: q.category 
  };
};

Bartender.prototype.nextQuestion = function(){
  var q;
  
  if (this.running && this.currQ !== this.questions.length - 1 ) {
    this.currQ++;
    q = this.questions[this.currQ];  
    return {
      text: q.text,
      category: q.category
    };
  } else {
    return false;
  }
};

Bartender.prototype.createDrink = function(){
  console.log(this.userPreferences);
};

/********************
 * END: Bartender Class
 ********************/


/********************
 * START: VIEW Class
 ********************/
function View(){
}

View.prototype.templates = function(template){
  switch(template){
    case 'question':
      return `
        <div id="question" data-category="${this.category}">
          <h3>${this.text}</h3>
          <div class="container-fluid">
            <div class="row">
              <div class="col-sm-6">
                <div class="user-answer user-answer-true">YES</div>
              </div>
              <div class="col-sm-6">
                <div class="user-answer user-answer-false">NO</div>
              </div>
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

/***********************
 * START: CONTROLLER CLASS
 ***********************/
function Controller(model,view){
  this.model = model;
  this.view = view;
}

Controller.prototype.init = function(){
  var response = this.model.startQuestions();
  this.view.render($('.question-area'), 'question', response);
};

Controller.prototype.submitAnswer = function(response){
  // add answer to preferences
  this.model.userPreferences[response.category] = response.userAnswer;
  
  // move to next question
  var res = this.model.nextQuestion();
  
  // if last question, create drink!
  if (res){
    this.view.render($('.question-area'), 'question', res);
  } else {
    this.createDrink();
  }
};   

Controller.prototype.createDrink = function(){
  this.model.createDrink();
}
 
/***********************
 * END: CONTROLLER CLASS
 ***********************/
 

var view = new View();
var bartender = new Bartender(QUESTIONS);
var ctrl = new Controller(bartender, view);

$(function(){
  ctrl.init();
  
  $('#main').on('click', '.user-answer', function(e){
    var response = { 
      category: $(this).closest('#question').data('category'), 
      userAnswer: e.target.className.includes('user-answer-true')
    };
    
    ctrl.submitAnswer(response);
  });
});

